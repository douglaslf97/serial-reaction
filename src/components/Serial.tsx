import React, { useCallback, useEffect, useState, memo } from 'react';
import RandomCode from './RandomCode';
import VerifyCode from './VerifyCode';
import { SerialReaction } from '../contexts/AppContext';
import { v4 } from 'uuid';

function generateRandomString(length: number, result: string = "", count: number = 0): string {
  const charset = "abcdefghijklmnopqrstuvwxyz"

  const randomIndex = Math.floor(Math.random() * charset.length)
  result += charset[randomIndex]
  count++

  return count < length ? generateRandomString(length, result, count) : result
}

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
      const code = generateRandomString(4)
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

  const addErrors = () => {
    const serial = serialReaction
    serial.err_numb += 1
    setSerialReaction((_) => {
      return serial
    })

    updateBlock(serial)
  }

  const setFinished = (isToCount: boolean) => {
    console.log('setFinished')
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