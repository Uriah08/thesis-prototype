"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const Step2 = () => {
  const router = useRouter()

  const [configuration, setConfiguration] = useState('')
  const [fallback, setFallback] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
      setConfiguration(localStorage.getItem('configuration') || '')
      setFallback(localStorage.getItem('fallback') || '')
      setHasMounted(true)
    }, [])

  useEffect(() => {
      setIsValid(configuration.trim() !== '' && fallback.trim() !== '')
    }, [configuration, fallback])
  
    const handleNext = () => {
      localStorage.setItem('configuration', configuration)
      localStorage.setItem('fallback', fallback)
      router.push('/agents/create/step-2')
    }
  
    if (!hasMounted) return null

  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full mx-auto mt-10">
      <h1 className="text-sm mt-5">Cofiguration</h1>
        <Textarea
          placeholder="Enter voice settings and other configurations here."
          className="text-sm w-full resize-none"
          value={configuration}
          onChange={(e) => setConfiguration(e.target.value)}
        />
        <h1 className="text-sm mt-5">Fallback</h1>
        <Input
          placeholder="I'm sorry, Could you please repeat?"
          className="w-full text-sm"
          value={fallback}
          onChange={(e) => setFallback(e.target.value)}
        />
      <div className="flex justify-between mt-5">
        <Link href="/agents/create/step-1" className="w-fit cursor-pointer">
          <Button className="cursor-pointer">Previous</Button>
        </Link>
        <Link href="/agents/create/step-3" className="w-fit cursor-pointer">
          <Button disabled={!isValid} onClick={handleNext} className="cursor-pointer">Next</Button>
        </Link>
      </div>
    </div>
  )
}

export default Step2
