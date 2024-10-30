import React, { useContext } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import img from '@/assets/threads.png'
import MobileNav from "@/components/MobileNav";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  const {toast} = useToast();

  const handleLogOut = () => {
    logout();
    toast({
      variant: "success",
      title: "Logged Out!",
    });
  }

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center overflow-y-hidden">
      <div className='w-[75%] h-full flex items-center justify-center '>
        <Sidebar className='fixed h-full hidden md:block'  />
        <Link to={`/`} className="md:hidden absolute top-2 left-5 z-10">
          <img src={img} alt="" className="w-10" />
        </Link>
        <div className='w-2/4 h-full '>
            <Feed className="h-full" />
        </div>
        <div className="w-1/4 ">
          <div className="absolute right-32 top-4">
          <ModeToggle />
          </div>
          <div>
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
        </div>
        
        {/* Mobile Nav Bar  */}
        <MobileNav className="fixed h-full" />
    </div>
  );
};

export default Home;
