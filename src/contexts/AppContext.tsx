"use client"

import React, { useCallback, useContext, useState } from 'react'
export enum TaskNumber {
  FIRST = "1",
  SECOND = "2"
}
export type SerialReaction = {
  id: string
  serial_code: string
  spent_time: number
  reaction_time: number
  finished: boolean
}

export type Blocks = {
  id: string
  completed: boolean
  spent_time: number
  serial_reactions: Array<SerialReaction>
  number_serial_reactions_completed: number
}

export type UserSession = {
  id: string
  name: string
  max_time: number,
  taskNumber: TaskNumber
  number_serial_per_block: number
  number_blocks_per_session: number
  blocks: Array<Blocks>
}

export interface AppContextData {
  user_sessions: Array<UserSession>
  getUserSession: (session_id: string) => UserSession | undefined
  addUserSession: (user_session: UserSession) => void
  removeUserSession: (user_session: UserSession) => void
  wipeUsersSessions: () => void
}

const AppContext = React.createContext({} as AppContextData)

interface Props {
  children: React.ReactNode
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [user_sessions, setUserSessions] = useState<UserSession[]>([])

  const addUserSession = useCallback((user_session: UserSession) => {
    setUserSessions([...user_sessions, user_session])
  }, [user_sessions])

  const removeUserSession = (user_session: UserSession) => {
    const sessions = user_sessions.filter(session => session.id !== user_session.id)

    setUserSessions(sessions)
  }

  const getUserSession = (session_id: string): UserSession | undefined => {
    return user_sessions.find(user => user.id === session_id)
  } 

  const wipeData = () => {
    setUserSessions([])
  }

  return <AppContext.Provider value={{
    user_sessions: user_sessions || [],
    getUserSession: getUserSession,
    addUserSession: addUserSession,
    removeUserSession,
    wipeUsersSessions: wipeData
  }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  return context
}