"use client"

import { Bot, LayoutDashboard, Settings } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const sidebar = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Agents',
      href: '/agents',
      icon: Bot,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

const SideBar = () => {
    const pathname = usePathname()
    
  return (
    <div className="h-full p-3 flex flex-col gap-3 w-fit border-r-2 dark:border-[#171717]">
      {sidebar.map((item, index) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const Icon = item.icon

        return (
          <Link
            href={item.href}
            key={index}
            className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer transition 
              ${isActive ? 'dark:bg-white dark:text-[#171717] text-white bg-[#171717]' : 'hover:bg-zinc-100 dark:hover:bg-[#171717] dark:text-zinc-300 text-zinc-700'}`}
          >
            <Icon size={20} />
            <h1 className="text-sm hidden md:block">{item.name}</h1>
          </Link>
        )
      })}
    </div>
  )
}

export default SideBar