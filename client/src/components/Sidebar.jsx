import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import threads from "../assets/threads.png";
import threads_light from "../assets/threads-light.png"
import { GoHeart, GoHome } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaPlus, FaRegUser } from "react-icons/fa6";
import { CgDetailsMore } from "react-icons/cg";
import AuthContext from "@/context/AuthContext";
import { FaRegCommentDots } from "react-icons/fa";
import { useTheme } from "./theme-provider";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const quickLinks = [
    { id: 1, name: "Home", icon: GoHome, path: "/" },
    { id: 2, name: "Search", icon: HiMagnifyingGlass, path: "/search" },
    { id: 3, name: "Create", icon: FaPlus, path: "/create-post" },
    { id: 4, name: "Profile", icon: FaRegUser, path: `/profile/${user?.id}` },
  ];

  return (
    <div className="hidden sm:w-1/4 md:w-2/4 lg:w-full h-screen sm:flex flex-col justify-between">
      <Link to={`/`} className="relative left-8 top-4">
        <img
          src={theme === "dark" ? threads : threads_light}
          alt="threads"
          className="w-10 hover:scale-105 transform duration-150"
        />
      </Link>

      <ul className="mt-8 space-y-5 font-semibold">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeLink === item.path;

          return (
            <Link
              to={item.path}
              key={item.id}
              className={`w-16 flex items-center relative left-5 gap-3`}
              onClick={() => setActiveLink(item.path)}
            >
              <div
                className={`py-2 px-3 rounded-lg hover:bg-[#4E4F50]/25 transition-all duration-150 ${
                  isActive ? "bg-[#4E4F50]/25" : ""
                }`}
              >
                <Icon
                  className={`text-2xl ${
                    isActive ? "text-white" : "text-[#4E4F50]"
                  }`}
                />
              </div>
            </Link>
          );
        })}
      </ul>

      <div className="invisible relative left-8 flex flex-col gap-8 bottom-5">
        <Link to={`/messages`} className="w-0">
          <FaRegCommentDots className="text-2xl text-[#4E4F50]" />
        </Link>
        <Link to={`/`} className="w-0">
          <CgDetailsMore className="text-2xl text-[#4E4F50]" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
