import { ChatMessageInput } from "./ChatMessageInput"

interface Props {
  disabled: boolean
  onSendMessage: (message: string) => void
}

export function Footer({ onSendMessage, disabled }: Props) {
  return (
    <footer className='w-full border-t border-t-gray-600 p-2'>
      <div className='max-w-4xl m-auto'>
        <ChatMessageInput onSend={onSendMessage} disabled={disabled} />
        <div className='pt-3 text-center text-xs text-gray-300'>
          Feito pela Daniel Interprise
          <a href="#" className="underline">clique para mais projetos</a>
        </div>
      </div>
    </footer>
  )
}