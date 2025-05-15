"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateAgentMutation } from '@/store/api'

const Step2 = () => {
  const router = useRouter()
  const [createAgent] = useCreateAgentMutation()

  const [agentName, setAgentName] = useState('')
  const [greetings, setGreetings] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const storedAgentName = localStorage.getItem('agentName')
    const storedGreetings = localStorage.getItem('greetings')

    if (!storedAgentName?.trim() || !storedGreetings?.trim()) {
      router.push('/agents/create/step-1')
    } else {
      setAgentName(storedAgentName)
      setGreetings(storedGreetings)
      setIsMounted(true)
    }
  }, [router])

  const handleCreate = async () => {
    try {
      await createAgent({
        agentName,
        greetings,
      }).unwrap()

      localStorage.removeItem('agentName')
      localStorage.removeItem('greetings')

      router.push('/agents')
    } catch (err) {
      console.error('Failed to create agent:', err)
    }
  }

  if (!isMounted) return null

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full mx-auto mt-10">
      <div className="flex justify-between mt-5">
        <Link href="/agents/create/step-1" className="w-fit self-start cursor-pointer">
          <Button className="cursor-pointer">Previous</Button>
        </Link>

        <Button className="cursor-pointer" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default Step2
