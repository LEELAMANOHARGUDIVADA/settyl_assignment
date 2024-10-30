import { Button } from '@/components/ui/button'
import logo from '../assets/threads.png'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user]);

  const { login } = useContext(AuthContext);

  const { toast } = useToast();

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      await login(email,password);
      navigate('/');
      toast({
        title: "Login Successful!",
        variant: "success",
        position: "topright",
        location: "topright"
      });
    } catch (error) {
      console.log("Error Logging in: ", error);
      toast({
        title: "Login Failed!",
        description: error,
        variant: "destructive"
      });
    }
  }
  

  return (
    <div className='w-full h-screen'>
      
      <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div>
        <img src={logo} alt="Threads" className='w-16' />
      </div>
      <div className='flex flex-col gap-5 items-center justify-center'>
      <h2 className='text-xl mt-5 font-semibold'>Login </h2>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-5'>
        <input required type="text" className=' outline-white w-72 h-12 text-md px-4 rounded-2xl bg-[#4E4F50]/20' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
          Login
        </Button>
        </form>

        <div>
          <h3 className='text-sm font-semibold'>Don't have an account? <Link to='/register' className='text-sm underline ${theme === "dark" ? "text-white" : "text-black"} '>register</Link> </h3>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
