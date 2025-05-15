"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <div className='h-full w-full flex justify-center'>
        <div className='max-w-[1200px] h-screen w-full flex items-center justify-center'>
          <Button onClick={() => signIn("google")} className='cursor-pointer'>Sign In</Button>
        </div>
    </div>
  )
}

export default SignIn