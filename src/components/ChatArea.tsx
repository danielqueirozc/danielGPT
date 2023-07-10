import { Chat } from "@/@types/Chat"
import { ChatPlaceholder } from "./ChatPlaceholder"
import { ChatMessageItem } from "./ChatMessageItem"
import { ChatMessageLoading } from "./ChatMessageLoading"
import { useEffect, useRef } from "react"

interface Props {
  chat: Chat | undefined
  loading: boolean
}

export function ChatArea({ chat, loading }: Props) {
  const scrolllArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrolllArea.current?.scrollTo(0, scrolllArea.current?.scrollHeight)
  }, [loading, chat?.messages.length])

  return (
    <section ref={scrolllArea} className='flex-auto h-0 overflow-y-scroll'>
      {!chat && <ChatPlaceholder />}
      {chat && chat.messages.map(item => (
        <ChatMessageItem key={item.id} item={item} />
      ))}
      {loading && <ChatMessageLoading />}
    </section>
  )
}