"use client"

import { ReactNode, createContext, useContext, useState } from "react"

interface User {
  iracingId: string
  name: string
}

export const VisitedContext = createContext({
  visited: [] as Array<User>,
  addVisited: (user: User) => {},
})

export const VisitedProvider = ({ children }: { children: ReactNode }) => {
  const [visited, setVisited] = useState<Array<User>>([])

  const addVisited = (user: User) => {
    setVisited((prev) => {
      return [user, ...prev.filter((u) => u.iracingId !== user.iracingId)]
    })
  }

  console.log({ visited })

  return (
    <VisitedContext.Provider value={{ visited, addVisited }}>
      {children}
    </VisitedContext.Provider>
  )
}

export const useVisited = () => {
  return useContext(VisitedContext)
}
