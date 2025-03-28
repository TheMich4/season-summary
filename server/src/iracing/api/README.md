# iRacing API Utilities

This directory contains utilities for interacting with the iRacing API.

## new-full-data-util.ts

This module is responsible for fetching and processing race data for a user's season. It has been refactored to improve readability and maintainability.

### Key Features:

1. **Request Throttling**: The module keeps track of concurrent requests and adjusts timeouts to avoid rate limiting from the iRacing API.

2. **Modular Design**: The code has been broken down into smaller, focused functions:
   - `getTimeout()`: Calculates the appropriate timeout based on concurrent requests
   - `processRaceResult()`: Processes a single race result
   - `updateStats()`: Updates statistics based on race results
   - `handleSiteMaintenance()`: Handles the site maintenance response
   - `handleNoRaces()`: Handles the case when no races are found
   - `getNewFullDataUtil()`: Main function that orchestrates the entire process

3. **Improved Typing**: Type definitions have been added to make the code more maintainable:
   - `Race`: Represents a race with its key properties
   - `Stats`: Represents statistics data
   - `SeasonDataParams`: Parameters for the main function

### Testing:

Unit tests have been added to ensure the functionality is working as expected. The tests cover:
- Handling missing parameters
- Handling site maintenance
- Handling no races found
- Processing races successfully

Run the tests with:
```bash
bun test
``` 