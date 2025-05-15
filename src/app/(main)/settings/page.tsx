"use client"

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

const SettingsPage = () => {
  return (
    <Button onClick={() => signOut()} className='cursor-pointer'>Sign Out</Button>
  )
}

export default SettingsPage