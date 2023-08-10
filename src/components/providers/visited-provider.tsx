"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  iracingId: string;
  name: string;
}

export const VisitedContext = createContext({
  visited: [] as Array<User>,
  addVisited: (user: User) => {},
});

export const VisitedProvider = ({ children }: { children: ReactNode }) => {
  const [visited, setVisited] = useState<Array<User>>([]);

  const addVisited = (user: User) => {
    if (!user.iracingId || !user.name) return;

    const newVisited = [
      user,
      ...visited.filter((u) => u.iracingId !== user.iracingId),
    ];

    setVisited(newVisited);
    localStorage.setItem("visited", JSON.stringify(newVisited));
  };

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (visited) {
      setVisited(JSON.parse(visited));
    }
  }, []);

  return (
    <VisitedContext.Provider value={{ visited, addVisited }}>
      {children}
    </VisitedContext.Provider>
  );
};

export const useVisited = () => {
  return useContext(VisitedContext);
};
