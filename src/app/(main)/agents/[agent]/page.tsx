"use client"

import React from 'react'
import { useParams } from 'next/navigation'

const AgentPage = () => {
  const params = useParams()
  const agent = params?.agent
  return (
    <div>
      <h1 className='text-white'>{agent}</h1>
    </div>
  )
}

export default AgentPage