import ChatList from '@/components/Messages/MessagesList'
import Message from '@/components/Messages/Message'
import Profile from '@/components/Profile/Profile'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import AuthContext from '@/context/AuthContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const MessagesPage = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogOut = () => {
    logout();
  }
  return (
    <div className="w-full h-screen flex flex-col items-start justify-center overflow-y-hidden">
      <div className='w-[75%] h-full flex items-center justify-center '>
        <Sidebar className='fixed h-full'  />
        <div className='w-2/4 h-full'>
            <Message className="h-screen" />
        </div>
        {user ? <Link to={`/`} className='w-1/4 h-full'>
          <Button variant='destructive' className="absolute top-4 right-5" onClick={handleLogOut}>
            Logout
          </Button>
        </Link> : <Link to={`/login`} className='w-1/4 h-full'>
          <Button className="absolute top-4 right-5">
            Login
          </Button>
        </Link>}
        </div>
    </div>
  )
}

export default MessagesPage