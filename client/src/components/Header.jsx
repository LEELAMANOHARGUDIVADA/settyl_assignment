import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"

const Header = () => {
  return (
    <div className='w-full h-70  flex justify-between px-4 py-3'>
        <Link to={`/`} className="">
            <img src={quiklink} alt="quilink" className=" w-9 hover:scale-105 transform duration-150" />
        </Link>

        <ModeToggle />

        <Link to={`/login`}>
        <button className="bg-white h-9 px-5 py-4 rounded-xl text-black flex items-center justify-center text-sm font-semibold">
          Login
        </button>
          
        </Link>
    </div>
  )
}

export default Header