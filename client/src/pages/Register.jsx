import { Button } from '@/components/ui/button'
import threads from '../assets/threads.png';
import threads_light from '../assets/threads-light.png';
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import AuthContext from '@/context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import { useTheme } from "@/components/theme-provider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const { theme } = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleSignUp = async(e) => {
    e.preventDefault();

    try {
      await register({ name,email,password });
      navigate('/');
      toast({
        title: "Registration Successful!",
        variant: "success",
        position: "topright",
        location: "topright"
      });
    } catch (error) {
      console.log("Error Logging in: ", error);
      toast({
        title: "Registration Failed!",
        description: error.message,
        variant: "destructive"
      });
    }
  }
  const {user} = useContext(AuthContext);
  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user]);

  return (
    <div className='w-full h-screen'>
      
      <div className='w-full h-screen flex flex-col items-center justify-center gap-10'>
      <div>
        { theme === "dark" ? <img
          src={threads}
          alt="threads"
          className="w-16"
        /> : <img
          src={threads_light}
          alt="threads"
          className="w-16"
        /> }
      </div>
      <div className='flex flex-col gap-5 items-center justify-center'>
      <h2 className='text-xl font-semibold'>Register</h2>
        <form onSubmit={handleSignUp} className='flex flex-col items-center justify-center gap-5'>
        <input type="text" className=' outline-white w-72 h-12 text-md px-4 rounded-2xl bg-[#4E4F50]/20' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
        <input type="email" className=' outline-white w-72 h-12 text-md px-4 rounded-2xl bg-[#4E4F50]/20' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className='flex items-center justify-center ml-5'>
        <input required type={showPassword ? 'text' : 'password'} className=' outline-white w-72 h-12 text-md px-6 rounded-2xl bg-[#4E4F50]/20' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <div
        onClick={togglePasswordVisibility}
        className="relative right-8"
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </div>
        </div>
        <Button type="submit" className="w-72 h-10">
          Register
        </Button>
        </form>

        <div>
          <h3 className='text-sm font-semibold'>Already have an account? <Link to='/login' className='text-sm underline ${theme === "dark" ? 'text-white': 'text-black'} '>login</Link> </h3>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
