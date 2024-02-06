"use client";
import { SerialReaction } from '../contexts/AppContext';
import React, { FocusEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
  //userSession: UserSession
  serialReaction: SerialReaction
  randomCode: string
  isFinished: boolean
  setValid: (isValid: boolean) => void
  setFinished: (isToCount: boolean) => void
  addError: (spent_time: number) => void
}

const VerifyCode: React.FC<Props> = ({ randomCode, serialReaction, setValid, addError, setFinished, isFinished }) => {
  const [startTime, setStartTime] = useState<number>(Date.now())
  const length = 4
  const formRef = useRef<HTMLFormElement>(null)
  const [isValid, setIsValid] = useState(false)
  const [code, setCode] = useState<string[]>(Array(length).fill(""))

  const update = useCallback((index: number, val: string) => {
    setCode(() => {
      const slice = code.slice()
      slice[index] = val

      return slice
    })
  }, [code]);

  const handleKeyDown = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    const index = parseInt(evt.currentTarget.dataset.index as string)
    const form = formRef.current

    if (isNaN(index) || form === null) return; // just in case

    const prevIndex = index - 1
    const nextIndex = index - 1
    const prevInput: HTMLInputElement | null = form.querySelector(`.input-${prevIndex}`)
    const nextInput: HTMLInputElement | null = form.querySelector(`.input-${nextIndex}`)

    switch (evt.key) {
      case "Backspace":
        if (code[index]) {/* update current input*/ }
        else if (prevInput) prevInput.select()
        break
      case "ArrowRight":
        evt.preventDefault()
        if (nextInput) nextInput.focus()
        break
      case "ArrowLeft":
        evt.preventDefault();
        if (prevInput) prevInput.focus();
    }
  }, [code])

  useEffect(() => {
    const inp: HTMLInputElement | null = document.querySelector('.input-0')
    inp?.focus()
  }, [])

  useLayoutEffect(() => {
    setStartTime(startTime)
  }, [startTime])


  const handleChange = useCallback((evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    const index = parseInt(evt.currentTarget.dataset.index as string)
    const form = formRef.current
    if (isNaN(index) || form === null) return // just in case

    let nextIndex = index + 1
    let nextInput: HTMLInputElement | null = form.querySelector(`.input-${nextIndex}`)

    const updatedCode = code.slice()
    updatedCode[index] = value[0]

    const isValid = randomCode.toLowerCase().startsWith(updatedCode.join("").toLowerCase())
    setIsValid(isValid)

    if (isValid) {
      update(index, value[0] || "")
      evt.currentTarget.classList.remove('border-red-700')
      evt.currentTarget.classList.remove('ring-red-700')
      if (value.length === 1) nextInput?.focus()
      else if (index < length - 1) {
        const split = value.slice(index + 1, length).split("")
        split.forEach((val) => {
          update(nextIndex, val)
          nextInput?.focus()
          nextIndex++
          nextInput = form.querySelector(`.input-${nextIndex}`)
        });
      }
    } else {
      addError(Date.now() - startTime)
      evt.currentTarget.classList.add('border-red-500')
      evt.currentTarget.classList.add('ring-red-700')
      evt.currentTarget.focus()
    }
  }, [addError, code, randomCode, update])

  const handleFocus = (evt: FocusEvent<HTMLInputElement>) => {
    evt.currentTarget.select()
  }

  useEffect(() => {
    if (code.every(i => i != "")) {
      if (isValid) {
        serialReaction.spent_time = Date.now() - startTime
        serialReaction.finished = true
        setValid(true)
      } else {
        serialReaction.spent_time = Date.now() - startTime
        serialReaction.finished = false
        setValid(false)
      }
      setFinished(true)
    } else if(isFinished) {
      serialReaction.spent_time = Date.now() - startTime
      serialReaction.finished = false
      setValid(false)
      setFinished(false)
    }
  }, [code, serialReaction])


  return <div className="relative flex h-screen w-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">

      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-2xl text-blue-600">
            <p>Escreva a sequência correta das letras</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>Caso uma letra digitada for errônea será inválidada a resposta</p>
          </div>
        </div>

        <div>
          <form ref={formRef} action="" method="post">
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {code.map((value, i) => {
                  return <div key={i} className="w-16 h-16 ">
                    <input
                      data-index={i}
                      onChange={(evt) => handleChange(evt)}
                      onKeyUp={handleKeyDown} onFocus={handleFocus}
                      value={value}
                      className={`input-${i} w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg text-black bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 uppercase`} type="text" name="" id="" />
                  </div>
                })}

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
}

export default VerifyCode;