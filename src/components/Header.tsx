import IconMenu from "./IconMenu"
import { IconAdd } from "./icons/IconAdd"

interface Props {
  openSidebarClick: () => void
  title: string
  newChatClick: () => void
}

export function Header({ openSidebarClick, title, newChatClick }: Props) {
  return (
    <div className='text-white'>
      <header className='flex justify-between items-center w-full border-b border-b-gray-600 p-2 md:hidden'>
        <div onClick={openSidebarClick}>
          <IconMenu width={24} height={24} />
        </div>
        <div className='mx-2 truncate'>
          {title}
        </div>
        <div onClick={newChatClick}>
          <IconAdd width={24} height={24} />
        </div>
      </header>
    </div>
  )
}