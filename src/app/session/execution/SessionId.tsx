"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import Block, { BlockElement } from '../../../components/Block';
import { UserSession, useAppContext } from '../../../contexts/AppContext'
import React, { useCallback, useEffect, useRef, useState } from 'react'

// import { Container } from './styles';

const SessionId: React.FC = () => {
  const searchParams = useSearchParams()
  const blockRef = useRef<BlockElement>(null)
  const [session, setSession] = useState<UserSession>({ max_time: Number.MAX_VALUE } as UserSession)
  const { getUserSession } = useAppContext()

  const router = useRouter()

  const next = useCallback(() => {
    if(blockRef.current) {
      if (blockRef.current.isFinished) {
        router.push('/session/new')
      }
    }
  }, [router])

  useEffect(() => {
    function init() {
      const session_id = searchParams.get('session_id')
      const user_session = getUserSession(session_id as string)

      if (user_session) {
        setSession(user_session)
      }
    }

    init()

  }, [getUserSession, searchParams])

  return <div className='w-screen h-screen'>
    <Block ref={blockRef} next={next} session={session} />
  </div>;
}

export default SessionId;