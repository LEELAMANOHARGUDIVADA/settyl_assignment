import Chat from "@/components/Chat/Chat";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import img from '@/assets/threads.png'
import MobileNav from "@/components/MobileNav";
const ChatPage = () => {

  const { user } = useContext(AuthContext);

  const handleLogOut = () => {
    logout();
  }
    
  return (
    <div className="w-full h-screen flex flex-col items-start justify-center overflow-y-hidden">
      <div className='w-[75%] h-full flex items-center justify-center '>
      <Sidebar className='fixed h-full hidden md:block'  />
        <Link to={`/`} className="md:hidden absolute top-2 left-5 z-10">
          <img src={img} alt="" className="w-10" />
        </Link>
        <div className='w-2/4 h-full'>
            <Chat className="h-screen" />
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

        <MobileNav />
    </div>
  );
};

export default ChatPage;
