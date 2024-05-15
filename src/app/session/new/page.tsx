"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid'
import { TaskNumber, useAppContext } from '../../../contexts/AppContext'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import Input from '../../../components/Input'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { exportData } from '../../../helpers/exportData'
import SelectField, { SelectFieldRef } from '../../../components/SelectField'

const NewSession: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const selectRef = useRef<SelectFieldRef<TaskNumber>>(null)
  const router = useRouter()
  const [session_id, setSessionId] = useState('')

  const { addUserSession, user_sessions } = useAppContext()
  const handleSubmit = useCallback(async (data: any) => {
    try {
      if (formRef.current && selectRef.current) {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required("Esse campo é obrigatório"),
          number_serial_per_block: Yup.number()
            .transform((value) => Number.isNaN(value) ? 0 : value)
            .defined("Esse campo deve conter apenas números")
            .min(1, "O mínimo para esse campo é 1")
            .required("Esse campo é obrigatório"),
          number_blocks_per_session: Yup.number()
            .transform((value) => Number.isNaN(value) ? 0 : value)
            .defined("Esse campo deve conter apenas números")
            .min(1, "O mínimo para esse campo é 1")
            .required("Esse campo é obrigatório"),
          max_time: Yup.number()
            .transform((value) => Number.isNaN(value) ? 0 : value)
            .defined("Esse campo é obrigatório")
            .min(1, "O mínimo para esse campo é 1")
            .required("Esse campo é obrigatório")
        })

        await schema.validate(data, {
          abortEarly: false
        })

        data.max_time = Number(data.max_time) * 60000

        addUserSession({
          id: data.id,
          max_time: data.max_time,
          name: data.name,
          number_serial_per_block: Number(data.number_serial_per_block),
          blocks: [],
          number_blocks_per_session: Number(data.number_blocks_per_session),
          taskNumber: selectRef.current.value
        })

        router.push(`/session/execution/?session_id=${data.id}`)
      }

    } catch (err) {
      console.log(err)
      const validationErrors: any = {}

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          if (error && error.path) {
            validationErrors[error.path] = error.message
          }
        })
      }

      formRef.current?.setErrors(validationErrors)
    }
  }, [addUserSession, router])

  useEffect(() => {
    setSessionId(v4())
  }, [])

  const exportDataToYaml = useCallback(async () => {
    await exportData('sessions.yaml', { sessions: user_sessions })
  }, [user_sessions])

  return <div className="bg-white h-screen flex relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
    <div className="mx-auto my-auto w-7xl px-6 lg:px-8 border border-gray rounded-md text-middle shadow-xl">
      <div className="bg-white h-2xl p-8 mx-auto my-auto rounded-md">
        {user_sessions.some((item) => (item.blocks || []).length > 0) &&
          <div className="mt-1 mb-10 flex items-center justify-end gap-x-6">
            <button onClick={() => exportDataToYaml()} type="button" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Exportar dados</button>
          </div>}

        <Form ref={formRef} placeholder={null} onSubmit={(value) => handleSubmit(value)}>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Iniciar sessão</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Todas os campos devem ser preenchidos</p>
            <div className="block mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
              <Input defaultValue={session_id} label="Id" name="id" readOnly />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <Input label="Nome" name="name" />
              <Input defaultValue={10} label="Quantidade de blocos" name="number_blocks_per_session" type="number" placeholder="Quantidade de blocos" />
              <Input defaultValue={10} label="Quantidade de sequências por bloco" name="number_serial_per_block" type="number" />
              <Input defaultValue={10} label="Tempo máximo da sessão" name="max_time" type="number" placeholder="Em minutos" />
              <SelectField ref={selectRef} name="tasks" label="Tarefa" items={[{
                id: 0,
                name: "Tarefa 1",
                value: TaskNumber.FIRST
                }, {
                  id: 1,
                  name: "Tarefa 2",
                  value: TaskNumber.SECOND
                }]} />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar sessão</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
}

export default NewSession