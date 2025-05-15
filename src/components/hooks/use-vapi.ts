// import { useEffect, useRef, useState, useCallback } from "react";
// import Vapi from "@vapi-ai/web";

// const publicKey = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";
// const assistantId = process.env.NEXT_PUBLIC_VAPI_API_ASSISTANT_ID || "";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const useVapi = ({ assistantOptions } : { assistantOptions : any}) => {
//   const [volumeLevel, setVolumeLevel] = useState(0);
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [conversation, setConversation] = useState<
//     { role: string; text: string; timestamp: string; isFinal: boolean }[]
//   >([]);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const vapiRef = useRef<any>(null);

//   const initializeVapi = useCallback(() => {
//     if (!vapiRef.current) {
//       const vapiInstance = new Vapi(publicKey);
//       vapiRef.current = vapiInstance;

//       vapiInstance.on("call-start", () => {
//         setIsSessionActive(true);
//       });

//       vapiInstance.on("call-end", () => {
//         setIsSessionActive(false);
//         setConversation([]); // Reset conversation on call end
//       });

//       vapiInstance.on("volume-level", (volume: number) => {
//         setVolumeLevel(volume);
//       });

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       vapiInstance.on("message", (message: any) => {
//         if (message.type === "transcript") {
//           setConversation((prev) => {
//             const timestamp = new Date().toLocaleTimeString();
//             const updatedConversation = [...prev];
//             if (message.transcriptType === "final") {
//               // Find the partial message to replace it with the final one
//               const partialIndex = updatedConversation.findIndex(
//                 (msg) => msg.role === message.role && !msg.isFinal,
//               );
//               if (partialIndex !== -1) {
//                 updatedConversation[partialIndex] = {
//                   role: message.role,
//                   text: message.transcript,
//                   timestamp: updatedConversation[partialIndex].timestamp,
//                   isFinal: true,
//                 };
//               } else {
//                 updatedConversation.push({
//                   role: message.role,
//                   text: message.transcript,
//                   timestamp,
//                   isFinal: true,
//                 });
//               }
//             } else {
//               // Add partial message or update the existing one
//               const partialIndex = updatedConversation.findIndex(
//                 (msg) => msg.role === message.role && !msg.isFinal,
//               );
//               if (partialIndex !== -1) {
//                 updatedConversation[partialIndex] = {
//                   ...updatedConversation[partialIndex],
//                   text: message.transcript,
//                 };
//               } else {
//                 updatedConversation.push({
//                   role: message.role,
//                   text: message.transcript,
//                   timestamp,
//                   isFinal: false,
//                 });
//               }
//             }
//             return updatedConversation;
//           });
//         }

//         if (
//           message.type === "function-call" &&
//           message.functionCall.name === "changeUrl"
//         ) {
//           const command = message.functionCall.parameters.url.toLowerCase();
//           console.log(command);
//           // const newUrl = routes[command];
//           if (command) {
//             window.location.href = command;
//           } else {
//             console.error("Unknown route:", command);
//           }
//         }
//       });

//       vapiInstance.on("error", (e: Error) => {
//         console.error("Vapi error:", e);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     initializeVapi();

//     // Cleanup function to end call and dispose Vapi instance
//     return () => {
//       if (vapiRef.current) {
//         vapiRef.current.stop();
//         vapiRef.current = null;
//       }
//     };
//   }, [initializeVapi]);

//   const toggleCall = async () => {
//     try {
//       if (isSessionActive) {
//         await vapiRef.current.stop();
//       } else {
//         await vapiRef.current.start(assistantId, assistantOptions);
//       }
//     } catch (err) {
//       console.error("Error toggling Vapi session:", err);
//     }
//   };

//   const sendMessage = (role: string, content: string) => {
//     if (vapiRef.current) {
//       vapiRef.current.send({
//         type: "add-message",
//         message: { role, content },
//       });
//     }
//   };

//   const say = (message: string, endCallAfterSpoken = false) => {
//     if (vapiRef.current) {
//       vapiRef.current.say(message, endCallAfterSpoken);
//     }
//   };

//   const toggleMute = () => {
//     if (vapiRef.current) {
//       const newMuteState = !isMuted;
//       vapiRef.current.setMuted(newMuteState);
//       setIsMuted(newMuteState);
//     }
//   };

//   return {
//     volumeLevel,
//     isSessionActive,
//     conversation,
//     toggleCall,
//     sendMessage,
//     say,
//     toggleMute,
//     isMuted,
//   };
// };

// export default useVapi;


import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { toast } from "sonner";

enum CallStatus {
  INACTIVE = "INACTIVE",
  STARTING = "STARTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface Message {
  type: 'transcript' | 'function-call';
  role: 'user' | 'system' | 'assistant';
  transcript: string;
  transcriptType: 'partial' | 'final';
  functionCall?: {
    name: string;
    parameters: {
      url: string;
    }
  }
}

interface SavedMassaged {
  role: 'user' | 'system' | 'assistant';
  content: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useVapi = ({ assistantOptions } : { assistantOptions : any}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMassaged[]>([]);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if(message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript }

        setMessages((prev) => [...prev, newMessage])
      }
    }

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.error("Vapi error:", error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);
    vapi.on("volume-level", (volume: number) => {
      setVolumeLevel(volume);
    });

    return() => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
      vapi.off("volume-level", (volume: number) => {
        setVolumeLevel(volume);
      });
    }
  },[messages])

  useEffect(() => {
    if(callStatus === CallStatus.FINISHED) toast("Call Ended!",{
      description: "Call again if you need anything else.",
    })
  },[callStatus])

  const handleCall = async () => {
      setCallStatus(CallStatus.STARTING)

      await vapi.start(process.env.NEXT_PUBLIC_VAPI_API_ASSISTANT_ID!, {
        ...assistantOptions,
      })
    }
    const handleDisconnect = async () => {
      setCallStatus(CallStatus.INACTIVE)

      vapi.stop()
    }

    const latestMessage = messages[messages.length - 1]?.content
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED

    return (
      {
        volumeLevel,
        isSpeaking,
        callStatus,
        messages,
        handleCall,
        handleDisconnect,
        latestMessage,
        isCallInactiveOrFinished,
      }
    )
}

export default useVapi