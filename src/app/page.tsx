"use client"

import Loading from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import useVapi from "@/components/hooks/use-vapi";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ui/toggle-theme";
import { toast } from "sonner";

const assistantOptions = {
  name: "VCommerce",
  firstMessage: "Hi! This is VCommerce assistant speaking, how can I help you?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You're the voice assistant for V-Commerce — a super cool website that helps online stores add voice agents to their site. You're here to help visitors navigate the V-Commerce website and answer their questions.

            Your main job is to guide users around the site and tell them what V-Commerce is all about. V-Commerce builds smart voice agents for e-commerce businesses. These agents can help online shoppers place orders, ask questions, track deliveries, and more — all using just their voice.

            Here’s what you can help users with:
            1) Explaining what V-Commerce does (voice agents for e-commerce)
            2) Directing them to different sections like "How it works", "Pricing", "Features", or "Get Started"
            3) Helping them understand the benefits of adding a voicebot to their store
            4) Redirecting them to sign up, contact support, or book a demo

            If the user asks about something outside the website or voice agents, just casually bring the conversation back to exploring the site or learning more about V-Commerce.

            Keep your tone super casual and witty. Don't be too formal — sound like a friendly, helpful buddy who knows their stuff. Use phrases like "Well...", "Umm...", or "Lemme think..." to make it feel real.

            Always keep your replies short and snappy — this is a voice conversation, so don’t ramble. Once the user gets the info they need or gets where they want to go, wrap it up naturally with something like “Alrighty, talk to you later!” or “Catch ya on the next click!”

            Just remember: your only job is to help users understand V-Commerce and guide them around the site. That’s it. Keep it fun and simple!`
      },
    ],
  },
};

export default function Home() {
  const { status } = useSession();
  const { messages, latestMessage, callStatus, isCallInactiveOrFinished, handleDisconnect, handleCall } = useVapi({assistantOptions})
  return (
    <>
    {status === "loading" ? (
      <div className='h-screen w-full flex items-center justify-center'>
        <Loading/>
      </div>
    ) : (
      <div className='h-full w-full flex justify-center'>
        <div className='absolute'><h1>Hello</h1><ToggleTheme/></div>
        <div className='max-w-[1200px] h-screen w-full flex items-center justify-center'>
          {messages.length  > 0 && (
            <div>{latestMessage}</div>
          )}
          {callStatus !== "ACTIVE" ? (
            <Button className="cursor-pointer" onClick={handleCall}>{isCallInactiveOrFinished ? 'Call': '. . .'}</Button>
          ): (
            <Button className="cursor-pointer" onClick={handleDisconnect}>End</Button>
          )}
          <Button onClick={() => toast("Hello",{
            description: "This is a toast message",
          })}>Toggle</Button>
        </div>
    </div>
    )}
    </>
  );
}
