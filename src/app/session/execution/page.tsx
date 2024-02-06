import SessionId from './SessionId';

/*export async function generateStaticParams() {
  const user_sessions = getUserSessions()

  return user_sessions.map((item) => ({
    session_id: item.id,
  }))
}*/

export default function ExecutionSession() {
  return <SessionId />;
}
