"use client"

import React from 'react'
import ToggleTheme from '@/components/ui/toggle-theme'
import SideBar from '@/components/container/SideBar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Loading from '@/components/ui/loading'
import Link from 'next/link'

type LayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession()
  return (
    <>
    {status === "loading" ? (
      <div className='h-screen w-full flex items-center justify-center'>
              <Loading/>
            </div>
    ):(
      <div className='h-screen w-full flex flex-col'>
        <div className='border-b-2 dark:border-[#171717] w-full py-2 px-3 flex justify-between items-center'>
            <Link href={'/'}>
              <h1 className='font-bold text-lg dark:text-zinc-300 text-zinc-700'>VCommerce</h1>
            </Link>
            <div className='flex items-center gap-3'>
                <ToggleTheme />
                <div className='flex gap-3 items-center'>
                    <h1 className='text-sm rounded-md px-2 py-1 bg-zinc-100 dark:bg-zinc-800'>{session?.user?.name}</h1>
                    <div className='h-[25px] w-[2px] dark:bg-zinc-700 bg-zinc-300'></div>
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    ) : <h1 className='rounded-full bg-zinc-300 dark:bg-zinc-700 h-[30px] w-[30px] flex items-center justify-center font-semibold'>VC</h1>}
                </div>
            </div>
        </div>
        <div className='flex w-full h-full'>
        <SideBar/>
        {children}
        </div>
    </div>
    )}
    </>
  )
}

export default MainLayout