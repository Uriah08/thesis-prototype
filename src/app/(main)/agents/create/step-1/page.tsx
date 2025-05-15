"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"

const Step1 = () => {
  const [agentName, setAgentName] = useState('')
  const [greetings, setGreetings] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setAgentName(localStorage.getItem('agentName') || '')
    setGreetings(localStorage.getItem('greetings') || '')
    setHasMounted(true)
  }, [])

  useEffect(() => {
    setIsValid(agentName.trim() !== '' && greetings.trim() !== '')
  }, [agentName, greetings])

  const handleNext = () => {
    localStorage.setItem('agentName', agentName)
    localStorage.setItem('greetings', greetings)
    router.push('/agents/create/step-2')
  }

  if (!hasMounted) return null

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full mx-auto mt-10">
      <h1 className="text-sm">Agent Name</h1>
      <Input
        placeholder="Agent Alpha"
        className="w-full text-sm"
        value={agentName}
        onChange={(e) => setAgentName(e.target.value)}
      />

      <h1 className="text-sm mt-5">Greetings</h1>
      <Textarea
        placeholder="Hello, I am your assistant. How can I help you?"
        className="text-sm w-full resize-none"
        value={greetings}
        onChange={(e) => setGreetings(e.target.value)}
      />

      <div className="w-fit self-end mt-5">
        <Button
          onClick={handleNext}
          className="cursor-pointer"
          disabled={!isValid}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Step1
