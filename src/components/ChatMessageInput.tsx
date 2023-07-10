import { KeyboardEvent, useEffect, useRef, useState } from "react";
import IconSend from "./icons/IconSend";

interface Props {
  disabled: boolean
  onSend: (message: string) => void
}

export function ChatMessageInput({ disabled, onSend }: Props) {
  const [text, setText] = useState('')
  const textEL = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textEL.current) {
      textEL.current.style.height = '0px'
      let scrollHeight = textEL.current.scrollHeight
      textEL.current.style.height = scrollHeight + 'px'
    }

  }, [text, textEL])

  function handleTextKeyUp(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code.toLocaleLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  function handleSendMessage() {
    if (!disabled && text.trim() !== '') {
      onSend(text)
      setText('')
    }
  }

  return (
    <div className={`flex border border-gray-800/50 bg-gpt-lightgray p-2 rounded-md ${disabled && 'opacity-50'}`}>
      <textarea 
        ref={textEL}
        className='flex-1 border-0 bg-transparent resize-none outline-none h-7 max-h-48 overflow-y-auto' 
        placeholder="Digite uma mensagem"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleTextKeyUp}
        disabled={disabled}
      >

      </textarea>
      <div onClick={handleSendMessage} className={`cursor-pointer self-end p-1 rounded ${text.length ? 'opacity-100 hover:bg-black/20' : 'opacity-20'}`}>
        <IconSend width={14} height={14} />
      </div>
    </div>
  )
}