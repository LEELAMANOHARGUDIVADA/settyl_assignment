import AuthContext from '@/context/AuthContext';
import React, { useContext, useState } from 'react'
import { FaPlus, FaRegUser } from 'react-icons/fa';
import { GoHeart, GoHome } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = () => {

    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);


  const quickLinks = [
    { id: 1, name: "Home", icon: GoHome, path: "/" },
    { id: 2, name: "Search", icon: HiMagnifyingGlass, path: "/search" },
    { id: 3, name: "Create", icon: FaPlus, path: "/create-post" },
    { id: 4, name: "Profile", icon: FaRegUser, path: `/profile/${user?.id}` },
  ];
  return (
    <div className="sm:hidden w-full text-center absolute md: bottom-0 z-50 overflow-x-hidden">
          <div className="bg-black w-full h-14">
          <ul className="flex items-center justify-center font-semibold">
          {quickLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeLink === item.path;

          return (
            <Link
              to={item.path}
              key={item.id}
              className={`w-full flex items-center relative left-5 gap-3`}
              onClick={() => setActiveLink(item.path)}
            >
              <div
                className={`py-2 px-3 rounded-lg`}
              >
                <Icon
                  className={`text-2xl  mt-2 ${
                    isActive ? "text-white" : "text-[#4E4F50]"
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </ul>
          </div>
        </div>
  )
}

export default MobileNav