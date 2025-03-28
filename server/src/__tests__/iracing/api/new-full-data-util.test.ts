import { describe, test, expect, mock as mockFn, spyOn } from 'bun:test';
import { getNewFullDataUtil } from '../../../iracing/api/new-full-data-util';
import * as clientModule from '../../../iracing/client';
import * as resultsModule from '../../../iracing/api/results';
import * as parseResultsModule from '../../../iracing/parse-results';
import { prisma } from '../../../db';

// Mock dependencies
mockFn.module('../../../iracing/client', () => ({
  getLoggedInIracingAPIClient: mockFn(() => ({
    results: {
      searchSeries: mockFn(),
    }
  }))
}));

mockFn.module('../../../iracing/api/results', () => ({
  getRaceResult: mockFn()
}));

mockFn.module('../../../iracing/parse-results', () => ({
  parseResults: mockFn()
}));

// Mock prisma
mockFn.module('../../../db', () => ({
  prisma: {
    seasonData: {
      upsert: mockFn(),
      update: mockFn()
    }
  }
}));

mockFn.module('../../../db/actions/upsert-season', () => ({
  upsertSeason: mockFn(() => ({ id: 'season-id' }))
}));

mockFn.module('../../../db/actions/upsert-user', () => ({
  upsertUser: mockFn(() => ({ iracingId: '12345' }))
}));

describe('getNewFullDataUtil', () => {
  const mockSendMessage = mockFn();
  
  test('should handle missing parameters', async () => {
    const result = await getNewFullDataUtil({
      iracingId: '',
      year: '',
      season: '',
      categoryId: '',
      sendMessage: mockSendMessage
    });
    
    expect(result).toBeNull();
  });
  
  test('should handle site maintenance', async () => {
    const mockClient = {
      results: {
        searchSeries: mockFn(() => ({ error: 'Site Maintenance' }))
      }
    };
    
    spyOn(clientModule, 'getLoggedInIracingAPIClient').mockImplementation(() => 
      Promise.resolve(mockClient)
    );
    
    spyOn(prisma.seasonData, 'upsert').mockImplementation(() => 
      Promise.resolve({
        id: 'season-data-id',
        data: { stats: {}, finalIRating: 2500, json: {} },
        lastRace: null,
        userId: 'user-id',
        seasonId: 'season-id',
        isPending: true
      })
    );
    
    await getNewFullDataUtil({
      iracingId: '12345',
      year: '2023',
      season: '3',
      categoryId: '2',
      sendMessage: mockSendMessage
    });
    
    expect(mockSendMessage).toHaveBeenCalledWith('DONE-MAINTENANCE', expect.anything());
    expect(prisma.seasonData.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'season-data-id' },
      data: { isPending: false }
    }));
  });
  
  test('should handle no races found', async () => {
    const mockClient = {
      results: {
        searchSeries: mockFn(() => [])
      }
    };
    
    spyOn(clientModule, 'getLoggedInIracingAPIClient').mockImplementation(() => 
      Promise.resolve(mockClient)
    );
    
    spyOn(prisma.seasonData, 'upsert').mockImplementation(() => 
      Promise.resolve({
        id: 'season-data-id',
        data: null,
        lastRace: null,
        userId: 'user-id',
        seasonId: 'season-id',
        isPending: true
      })
    );
    
    await getNewFullDataUtil({
      iracingId: '12345',
      year: '2023',
      season: '3',
      categoryId: '2',
      sendMessage: mockSendMessage
    });
    
    expect(mockSendMessage).toHaveBeenCalledWith('DONE', {
      count: { races: 0, newRaces: 0, fetched: 0 }
    });
    expect(prisma.seasonData.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'season-data-id' },
      data: { 
        isPending: false,
        data: undefined
      }
    }));
  });
  
  test('should process races successfully', async () => {
    const mockRaces = [
      { subsessionId: 1001, finishPositionInClass: 0, lapsComplete: 20 },
      { subsessionId: 1002, finishPositionInClass: 4, lapsComplete: 15 }
    ];
    
    const mockClient = {
      results: {
        searchSeries: mockFn(() => mockRaces)
      }
    };
    
    spyOn(clientModule, 'getLoggedInIracingAPIClient').mockImplementation(() => 
      Promise.resolve(mockClient)
    );
    
    spyOn(resultsModule, 'getRaceResult').mockImplementation((id) => 
      Promise.resolve({ 
        raceSummary: { subsessionId: parseInt(id) },
        licenseCategoryId: 2
      })
    );
    
    spyOn(parseResultsModule, 'parseResults').mockImplementation(() => ({
      stats: { races: 2, wins: 1, top5: 2, laps: 35 },
      finalIRating: 3000,
      foo: 'bar'
    }));
    
    spyOn(prisma.seasonData, 'upsert').mockImplementation(() => 
      Promise.resolve({
        id: 'season-data-id',
        data: { 
          id: 'data-id',
          stats: { races: 0, wins: 0, top5: 0, laps: 0 },
          finalIRating: 2500,
          json: {}
        },
        lastRace: null,
        userId: 'user-id',
        seasonId: 'season-id',
        isPending: true
      })
    );
    
    await getNewFullDataUtil({
      iracingId: '12345',
      year: '2023',
      season: '3',
      categoryId: '2',
      sendMessage: mockSendMessage
    });
    
    expect(resultsModule.getRaceResult).toHaveBeenCalledTimes(2);
    expect(parseResultsModule.parseResults).toHaveBeenCalledTimes(2);
    expect(prisma.seasonData.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'season-data-id' },
      data: { 
        isPending: false,
        lastRace: '1002',
        data: {
          upsert: expect.objectContaining({
            update: {
              finalIRating: 3000,
              json: { foo: 'bar' },
              stats: { races: 2, wins: 1, top5: 2, laps: 35 }
            }
          })
        }
      }
    }));
    expect(mockSendMessage).toHaveBeenCalledWith('DONE', expect.anything());
  });
}); 