import { SerialReaction, UserSession, Blocks, TaskNumber } from '../contexts/AppContext';
import React, { HtmlHTMLAttributes, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import Serial from './Serial';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';


interface Props {
  next: () => void
  session: UserSession
}

export interface BlockElement extends HtmlHTMLAttributes<HTMLDivElement> {
  displayName?: string
  isFinished?: boolean
}
const Block = forwardRef<BlockElement, Props>(({ session, next }, ref) => {
  const [time, setTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [block, setBlock] = useState({} as Blocks)
  const [count, setCount] = useState(0)
  const [serialsElement, setSerials] = useState<Array<any>>([])
  const [serialReactions, setSerialReactions] = useState<Array<SerialReaction>>([])


  useImperativeHandle(ref, () => ({
    isFinished: finished
  }))

  const router = useRouter()

  const updateBlock = useCallback((block: Blocks) => {
    if (session.blocks.length < session.number_blocks_per_session) {
      if (session.blocks.length > 0) {
        const index = session.blocks.findIndex(item => item.id === block.id)
        if (index < 0) {
          session.blocks.push(block)
        } else {
          session.blocks[index] = block
        }
      } else {
        session.blocks.push(block)
      }
    } else {
      setFinished(true)
    }

  }, [session.blocks])


  const init = useCallback(() => {
    const id = v4()

    setBlock(() => {
      return {
        id: id
      } as Blocks
    })
  }, [])

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = time + 1000
      setTime(updatedTime)

      if (updatedTime >= (session.max_time)) {
        setFinished(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [session.max_time, time])


  const updateSerialOnBlock = useCallback((serial: SerialReaction) => {
    const serials = block.serial_reactions || []
    if (serials.length > 0) {
      const index = serials.findIndex((item) => item.id === serial.id)
      if (index < 0) {
        serials.push(serial)
      } else {
        serials[index] = serial
      }
    } else {
      serials.push(serial)
    }

    setBlock({
      ...block,
      serial_reactions: serials
    })
  }, [block])

  const updateSerialReactions = useCallback((serial: SerialReaction) => {
    if (serialReactions.length > 0) {
      const index = serialReactions.findIndex(item => item.id === serial.id)

      if (index < 0) {
        setSerialReactions([...serialReactions, serial])
      } else {
        setSerialReactions((previous) => {
          previous[index] = serial

          return previous
        })
      }
    } else {
      setSerialReactions([...serialReactions, serial])
    }
  }, [serialReactions])


  const createSerials = useCallback(() => {
    const length: number = session.number_serial_per_block as number
    const arr = Array(length).fill('').map((_, i) => {
      return <Serial isTaskTwo={TaskNumber.SECOND === session.taskNumber} key={i} isFinished={finished} updateBlock={updateSerialOnBlock} next={(serial, isToCount) => {
        if (isToCount) setCount(count + 1)
        updateSerialReactions(serial)
      }} />
    })
    setSerials(arr)
  }, [count, finished, session.number_serial_per_block, updateSerialOnBlock, updateSerialReactions])

  useEffect(() => {
    createSerials()
  }, [count, createSerials, finished, serialReactions, session.number_serial_per_block, updateSerialOnBlock])


  const updateBlocks = useCallback(() => {
    if (count === session.number_serial_per_block) {
      const _block: Blocks = {
        ...block,
        completed: true,
        number_serial_reactions_completed: count,
        serial_reactions: serialReactions,
        spent_time: serialReactions.reduce((a, b) => {
          return a + b.spent_time
        }, 0)
      }

      updateBlock(_block)
      if (finished) {
        next()
      } else {
        init()
        setCount(0)
        setSerials([])
        createSerials()
        setSerialReactions([])
      }
    } else if (finished) {
      const _block: Blocks = {
        ...block,
        completed: false,
        number_serial_reactions_completed: count,
        serial_reactions: serialReactions,
        spent_time: serialReactions.reduce((a, b) => {
          return a + b.spent_time
        }, 0)
      }

      updateBlock(_block)
      next()
    }
  }, [block, count, finished, next, serialReactions, session, updateBlock])

  useEffect(() => {
    updateBlocks()
  }, [count, finished, router, serialReactions, session, updateBlocks])

  return <>{serialsElement.map((item, i) => {
    if (i === count) {
      return item
    }
  })}</>;
})

Block.displayName = "Block"

export default Block