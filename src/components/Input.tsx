"use client"
import React, { useRef, InputHTMLAttributes, useEffect } from 'react';
import { useField } from '@unform/core'

// import { Container } from './styles';
interface Props extends InputHTMLAttributes<HTMLInputElement> { 
  name: string,
  label: string
}

const Input: React.FC<Props> = ({ name, label, className, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])


  return <div className={`sm:col-span-3 ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
    <div className="mt-2">
      <input ref={inputRef} name={name} defaultValue={defaultValue} className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 readonly" {...rest} />
      <p className="text-red-500 text-xs italic">{error}</p>
    </div>
  </div>
}

export default Input;