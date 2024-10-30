import React, { useContext } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import MobileNav from "@/components/MobileNav";
import Search from "@/components/Search/Search";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";
import threads from "../assets/threads.png"
import threads_light from "../assets/threads-light.png"

const SearchPage = () => {
  const { user, logout } = useContext(AuthContext);

  const {toast} = useToast();
  const { theme } = useTheme();

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
          { theme === "dark" ? <img
          src={threads}
          alt="threads"
          className="w-8 hover:scale-105 transform duration-150"
        /> : <img
          src={threads_light}
          alt="threads"
          className="w-14 hover:scale-105 transform duration-150"
        /> }
        </Link>
        <div className='w-2/4 h-full'>
            <Search className="h-screen" />
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
        <MobileNav />
    </div>
  );
};

export default SearchPage;
