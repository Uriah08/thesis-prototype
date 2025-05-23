"use client"

import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

const CreateAgentPage = ({ children }: LayoutProps) => {
    
  return (
    <div className='flex justify-center w-full h-full'>
        <div className='flex flex-col max-w-[1000px] h-full w-full border-l-2 border-r-2 dark:border-[#171717] p-3'>
        <h1 className='text-3xl font-bold text-center mt-5'>Customize Your Agent</h1>
        <div className="h-fit w-full py-16">
            <div className="container mx-auto">
                <div>
                    <div className="w-11/12 lg:w-2/6 mx-auto">
                        <div className="bg-zinc-100 h-1 flex items-center justify-between">
                            <div className="w-1/3 h-1 flex items-center">
                                <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-1/3 flex justify-between bg-indigo-700 h-1 items-center relative">
                                <div className="absolute right-0 -mr-2">
                                    <div className="relative bg-white shadow-lg px-2 py-1 rounded mt-16 -mr-12">
                                        <svg className="absolute top-0 -mt-1 w-full right-0 left-0" width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="Progress-Bars" transform="translate(-322.000000, -198.000000)" fill="#FFFFFF">
                                                    <g id="Group-4" transform="translate(310.000000, 198.000000)">
                                                        <polygon id="Triangle" points="20 0 28 8 12 8"></polygon>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <p tabIndex={0} className="focus:outline-none text-indigo-700 text-xs font-bold">Step 3: Analyzing</p>
                                    </div>
                                </div>
                                <div className="bg-indigo-700 h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                </div>
                                <div className="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative">
                                    <div className="h-3 w-3 bg-indigo-700 rounded-full"></div>
                                </div>
                            </div>
                            <div className="w-1/3 flex justify-end">
                                <div className="bg-white h-6 w-6 rounded-full shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h1 className='text-center text-xl font-semibold mt-10'>Introduction</h1>
          {children}
        </div>
    </div>
  )
}

export default CreateAgentPage