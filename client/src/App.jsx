import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './context/AuthContext'
import Routers from './routes/Routers'
import { Toaster } from "@/components/ui/toaster"


function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
      <Routers />
      <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
