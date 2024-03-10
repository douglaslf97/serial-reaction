import React, { useCallback, useEffect, useState, memo, useRef } from 'react';
import RandomCode from './RandomCode';
import VerifyCode from './VerifyCode';
import { SerialReaction } from '../contexts/AppContext';
import { v4 } from 'uuid';
import { generateRandomString } from '../helpers/generatesRandomCode';

interface Props {
  next: (serialReaction: SerialReaction, isToCount: boolean) => void,
  updateBlock: (serial: SerialReaction) => void
  isFinished: boolean,
  isTaskTwo?: boolean
}

const Serial: React.FC<Props> = ({ next, isFinished, updateBlock, isTaskTwo }) => {
  const [serialReaction, setSerialReaction] = useState({ finished: false, spent_time: 0 } as SerialReaction)
  const [randomString, setRandomString] = useState("")
  const [visible, setVisible] = useState(true)
  const [isValid, setValid] = useState(true)
  const [time, setTime] = useState(0)

  const makeInvisible = useCallback(() => {
    document.removeEventListener('keydown', function(evt){})
    setTimeout(() => setVisible(false), 10)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time+1)
    }, 1)

    return () => clearInterval(interval)
  }, [time])

  useEffect(() => {
    function init() {
      const id = v4()
      const code = generateRandomString(isTaskTwo ? 1 : undefined)
      setRandomString(code)

      setSerialReaction((previous) => {
        return {
          ...previous,
          id: id,
          serial_code: code
        }
      })
    }

    init()
  }, [])

  const addErrors = useCallback((time: number) => {
    const serial = {...serialReaction}
    serial.spent_time = time
    setSerialReaction((_) => {
      return serial
    })

    updateBlock(serial)
    next(serialReaction, false)
  }, [next, serialReaction, updateBlock])

  useEffect(() => {
    document.addEventListener('keydown', function(_event) {
      makeInvisible()
    })

    return () => document.removeEventListener('keydown', function(evt){})
  }, [])

  useEffect(() => {
    if(!visible) {
      setSerialReaction({...serialReaction, reaction_time: time})
    }   
  }, [visible])

  const setFinished = (isToCount: boolean) => {
    const serial: SerialReaction = {
      ...serialReaction,
      finished: isValid
    }

    updateBlock(serial)
    next(serialReaction, isToCount)
  }

  return <>{visible ? <RandomCode randomPosition={isTaskTwo} randomString={randomString} /> : <VerifyCode setFinished={setFinished} isFinished={isFinished} addError={addErrors} serialReaction={serialReaction} setValid={setValid} randomCode={randomString} />}</>;
}

export default memo(Serial);