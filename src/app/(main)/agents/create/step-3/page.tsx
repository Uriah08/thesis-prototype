"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { useRouter } from 'next/navigation'

const voices = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const Step3 = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [voiceType, setVoiceType] = useState('')
    const [voiceAggression, setVoiceAggression] = useState(0)
    const [content, setContent] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
      const storedVoice = localStorage.getItem('voiceType') || ''
      setVoiceType(storedVoice)
      setValue(storedVoice)
      setVoiceType(localStorage.getItem('voiceType') || '')
      setVoiceAggression(Number(localStorage.getItem('voiceAggression')) || 0)
      setContent(localStorage.getItem('content') || '')
      setHasMounted(true)
    }, [])

    useEffect(() => {
          setIsValid(voiceType.trim() !== '' && voiceAggression !== null && content.trim() !== '')
        }, [voiceType, voiceAggression, content])
      
        const handleNext = () => {
          localStorage.setItem('voiceType', voiceType)
          localStorage.setItem('voiceAggression', voiceAggression.toString())
          localStorage.setItem('content', content)
          router.push('/agents/create/step-2')
        }
      
        if (!hasMounted) return null
  return (
    <div className="flex flex-col gap-2 max-w-[500px] w-full mx-auto mt-10">
        <h1 className="text-sm mt-5">Voice Settings</h1>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between cursor-pointer"
            >
                {value
                ? voices.find((voice) => voice.value === value)?.label
                : "Select voice..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] md:w-[500px] p-0">
            <Command>
                <CommandInput placeholder="Search voice..." />
                <CommandList>
                <CommandEmpty>No voice found.</CommandEmpty>
                <CommandGroup>
                    {voices.map((voice) => (
                    <CommandItem
                        key={voice.value}
                        value={voice.value}
                        onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setVoiceType(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            value === voice.value ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {voice.label}
                    </CommandItem>
                    ))}
                </CommandGroup>
                </CommandList>
            </Command>
            </PopoverContent>
        </Popover>
        <h1 className="text-sm mt-5">Voice Aggresion</h1>
        <Slider defaultValue={[0]} max={100} step={1} 
            value={[voiceAggression]} onValueChange={(value) => {
                setVoiceAggression(value[0])
            }}
        />

        <h1 className="text-sm mt-5">Content</h1>
        <Textarea
            placeholder="Enter the content of your bot website here."
            className="text-sm w-full resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between mt-5">
            <Link href="/agents/create/step-2" className="w-fit cursor-pointer">
                <Button className="cursor-pointer">Previous</Button>
            </Link>
            <Link href="/agents/create/step-4" className="w-fit cursor-pointer">
                <Button disabled={!isValid} onClick={handleNext} className="cursor-pointer">Next</Button>
            </Link>
        </div>
    </div>
  )
}

export default Step3