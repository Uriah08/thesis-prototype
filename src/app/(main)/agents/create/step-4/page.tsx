"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { useCreateAgentMutation } from '@/store/api'

const Step4 = () => {
  const [position, setPosition] = useState('')
  const [color, setColor] = useState('')
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
      <h1 className="text-sm mt-5">Position</h1>
      <div className='flex items-center gap-3 flex-wrap'>
        <div onClick={() => setPosition('right')} className={`${position === 'right' ? 'border-5 dark:bg-zinc-800 bg-zinc-200' : 'border-2 transition ease-in-out duration-200 hover:border-4 dark:hover:bg-zinc-800 hover:bg-zinc-200'} cursor-pointer p-2 h-[100px] w-[150px] rounded-lg border-zinc-300 dark:border-zinc-700 relative`}>
          <div className='h-[20px] w-[20px] rounded-full dark:bg-zinc-100 bg-zinc-900 absolute bottom-2 right-2'></div>
        </div>
        <div onClick={() => setPosition('middle')} className={`${position === 'middle' ? 'border-5 dark:bg-zinc-800 bg-zinc-200' : 'border-2 transition ease-in-out duration-200 hover:border-4 dark:hover:bg-zinc-800 hover:bg-zinc-200'} cursor-pointer p-2 h-[100px] w-[150px] rounded-lg border-2 border-zinc-300 dark:border-zinc-700 relative`}>
          <div className='h-[20px] w-[20px] rounded-full dark:bg-zinc-100 bg-zinc-900 absolute bottom-2 left-1/2 -translate-x-1/2'></div>
        </div>
        <div onClick={() => setPosition('left')} className={`${position === 'left' ? 'border-5 dark:bg-zinc-800 bg-zinc-200' : 'border-2 transition ease-in-out duration-200 hover:border-4 dark:hover:bg-zinc-800 hover:bg-zinc-200'} cursor-pointer p-2 h-[100px] w-[150px] rounded-lg border-2 border-zinc-300 dark:border-zinc-700 relative`}>
          <div className='h-[20px] w-[20px] rounded-full dark:bg-zinc-100 bg-zinc-900 absolute bottom-2 left-2'></div>
        </div>
      </div>
      <h1 className="text-sm mt-5">Color</h1>
      <div className='grid grid-cols-3 gap-2'>
        <div onClick={() => setColor('red')} className={`${color === 'red' ? 'dark:bg-zinc-800 bg-zinc-200' : 'transition ease-in-out duration-200 dark:hover:bg-zinc-800 hover:bg-zinc-200'} cursor-pointer flex gap-3 p-2 border rounded-sm items-center`}>
          <div className='w-[20px] h-[20px] rounded-full bg-red-500 ml-3'/>
          <h1>Red</h1>
        </div>
        <div onClick={() => setColor('blue')} className={`${color === 'blue' ? 'dark:bg-zinc-800 bg-zinc-200' : 'transition ease-in-out duration-200 dark:hover:bg-zinc-800 hover:bg-zinc-200'} cursor-pointer flex gap-3 p-2 border rounded-sm items-center`}>
          <div className='w-[20px] h-[20px] rounded-full bg-blue-500 ml-3'/>
          <h1>Blue</h1>
        </div>
      </div>
        <div className="flex justify-between mt-5">
            <Link href="/agents/create/step-3" className="w-fit cursor-pointer">
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