import React, { useCallback, useEffect, useState, memo } from 'react';
import RandomCode from './RandomCode';
import VerifyCode from './VerifyCode';
import { SerialReaction } from '../contexts/AppContext';
import { v4 } from 'uuid';
import { generateRandomString } from '../helpers/generatesRandomCode';

interface Props {
  next: (serialReaction: SerialReaction, isToCount: boolean) => void,
  updateBlock: (serial: SerialReaction) => void
  isFinished: boolean
}

const Serial: React.FC<Props> = ({ next, isFinished, updateBlock }) => {
  const [serialReaction, setSerialReaction] = useState({ err_numb: 0, finished: false } as SerialReaction)
  const [randomString, setRandomString] = useState("")
  const [visible, setVisible] = useState(true)
  const [isValid, setValid] = useState(true)

  const makeInvisible = useCallback(() => {
    return setTimeout(() => {
      setVisible(false)
    }, 2000)
  }, [])

  useEffect(() => {
    function init() {
      const id = v4()
      const code = generateRandomString()
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

  const addErrors = useCallback((spent_time: number) => {
    const serial = {...serialReaction}
    serial.err_numb += 1
    serial.spent_time = spent_time
    setSerialReaction((_) => {
      return serial
    })

    updateBlock(serial)
    next(serialReaction, false)
  }, [next, serialReaction, updateBlock])

  const setFinished = (isToCount: boolean) => {
    const serial: SerialReaction = {
      ...serialReaction,
      finished: isValid
    }

    updateBlock(serial)
    next(serialReaction, isToCount)
  }

  useEffect(() => {
    makeInvisible()
  }, [visible, makeInvisible])

  return <>{visible ? <RandomCode randomString={randomString} /> : <VerifyCode setFinished={setFinished} isFinished={isFinished} addError={addErrors} serialReaction={serialReaction} setValid={setValid} randomCode={randomString} />}</>;
}

export default memo(Serial);