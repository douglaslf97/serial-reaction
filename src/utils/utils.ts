import { UserSession, useAppContext } from "../contexts/AppContext";

export function getUserSessions(): Array<UserSession> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user_sessions  } = useAppContext()

  const isArray = Array.isArray(user_sessions)

  return isArray && user_sessions.length > 0 ? user_sessions : []
}