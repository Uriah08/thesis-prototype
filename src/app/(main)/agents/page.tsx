"use client"
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { useGetAgentsQuery } from '@/store/api'
import { Skeleton } from '@/components/ui/skeleton'

const AgentPage = () => {
  const { data, isLoading } = useGetAgentsQuery()
  const agents = data?.agents || []
  return (
    <div className='p-5 flex flex-col gap-3'>
      <h1 className='text-3xl font-bold text-[#171717] dark:text-white mb-5'>Your Agents</h1>

      <div className='flex flex-wrap gap-5'>
        {isLoading ? (
          <Skeleton className='h-[120px] w-[240px] rounded-lg'/>
        ) : (
            agents.map((item) => (
              <Link href={`/agents/${item.id}`} key={item.id}>
                <div className='hover:bg-zinc-100 dark:hover:bg-zinc-900 duration-200 ease-in-out cursor-pointer border-2 rounded-lg h-[120px] w-[240px] flex p-3'>
                  <h1 className='text-lg font-semibold'>{item.name}</h1>
                </div>
              </Link>
            ))
        )}

      <Link href={'/agents/create/step-1'}>
        <div className='border-2 border-dashed hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg h-[120px] w-[240px] flex items-center justify-center'>
          <Plus className='text-zinc-400 dark:text-zinc-600'/>
        </div>
      </Link>
      </div>
    </div>
  )
}

export default AgentPage