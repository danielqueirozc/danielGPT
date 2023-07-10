"use client"

import { Chat } from '@/@types/Chat'
import { ChatArea } from '@/components/ChatArea'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { SidebarChatButton } from '@/components/SidebarChatButton'
import { openai } from '@/utils/openai'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [chatList, setChatList] = useState<Chat[]>([])
  const [chatActiveId, setChatActiveId] = useState('')
  const [ChatActive, setChatActive] = useState<Chat>()
  const [AIloading, setAILoading] = useState(false)

  useEffect(() => {
    setChatActive(chatList.find(item => item.id === chatActiveId))
  }, [chatActiveId, chatList])

  useEffect(() => {
    if (AIloading) getAIResponse()
  }, [AIloading])

  function openSidebar() {
    setSidebarOpened(true)
  }

  function closeSidebar() {
    setSidebarOpened(false)
  }

  async function getAIResponse() {
    let chatListClone = [...chatList]
    let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)
   if (chatIndex > -1) {
    const response = await openai.generate(
      openai.translateMessages(chatListClone[chatIndex].messages)
    )
    if (response) {
      chatListClone[chatIndex].messages.push({
        id: uuidv4(),
        author: 'ai',
        body: response
      })
     }
   } 
   setChatList(chatListClone)
   setAILoading(false)
  }
  

   function handleClearConversations() {
    if (AIloading) return

    setChatActiveId('')
    setChatList([])
   }

   function handleNewChat() {
    if (AIloading) return
    
    setChatActiveId('')
    closeSidebar()
   }

   function handleSendMessage(message: string) {
    if (!chatActiveId) {
      let newChatId = uuidv4()
      setChatList([{
        id: newChatId,
        title: message,
        messages: [
          {id: uuidv4(), author: 'me', body: message}
        ]
      },...chatList])

      setChatActiveId(newChatId)
    } else {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId)
      chatListClone[chatIndex].messages.push({
        id: uuidv4(), author: 'me', body: message
      })
      setChatList(chatListClone)
    }

    setAILoading(true)
   }

   function handleSelectChat(id: string) {
    if (AIloading) return

    let item = chatList.find(item => item.id === id)
    if (item) setChatActiveId(item.id)
    closeSidebar()
   }

   function handleDeleteChat(id: string) {
    let chatListClone = [...chatList]
    let chatIndex = chatListClone.findIndex(item => item.id === id)
    chatListClone.splice(chatIndex, 1)
    setChatList(chatListClone)
    setChatActiveId('')
   }

   function handleEditChat(id: string, newTitle: string) {
    if (newTitle) {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(item => item.id === id)
      chatListClone[chatIndex].title = newTitle
      setChatList(chatListClone)
    }

  }
   
  return (
    <main className='flex min-h-screen bg-gpt-gray'>
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >
        {chatList.map(item => (
          <SidebarChatButton 
            key={item.id} 
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
      </Sidebar>
      <section className='flex flex-col w-full'>
        <Header openSidebarClick={openSidebar} title={ChatActive ? ChatActive.title : 'Nova conversa'}
        newChatClick={handleNewChat} />
        
        <ChatArea chat={ChatActive} loading={AIloading} />

        <Footer onSendMessage={handleSendMessage} disabled={AIloading} />
      </section>
    </main>
  )
}
