"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
// import { useCreateAgentMutation } from '@/store/api'

const Step4 = () => {
  // const [createAgent] = useCreateAgentMutation()
  // useEffect(() => {
  //   const storedConfiguration = localStorage.getItem('configuration')
  //   const storedFallback = localStorage.getItem('fallback')

  //   if (!storedConfiguration?.trim() || !storedFallback?.trim()) {
  //     router.push('/agents/create/step-1')
  //   } else {
  //     setConfiguration(storedConfiguration)
  //     setFallback(storedFallback)
  //     setIsMounted(true)
  //   }
  // }, [router])

  // const handleCreate = async () => {
  //   try {
  //     await createAgent({
  //       configuration,
  //       fallback,
  //     }).unwrap()

  //     localStorage.removeItem('configuration')
  //     localStorage.removeItem('fallback')

  //     router.push('/agents')
  //   } catch (err) {
  //     console.error('Failed to create agent:', err)
  //   }
  // }

  // if (!isMounted) return null
  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full mx-auto mt-10">
        <div className="flex justify-between mt-5">
            <Link href="/agents/create/step-2" className="w-fit cursor-pointer">
                <Button className="cursor-pointer">Previous</Button>
            </Link>
            <Link href="/agents/create/step-4" className="w-fit cursor-pointer">
                <Button className="cursor-pointer">Next</Button>
            </Link>
        </div>
    </div>
  )
}

export default Step4