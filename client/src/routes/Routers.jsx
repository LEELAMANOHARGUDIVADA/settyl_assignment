import { Routes, Route  } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProfilePage from "@/pages/ProfilePage"
import ProtectedRoute from "@/components/Protected/ProtectedRoute"
import CreatePost from "@/components/Post/CreatePostCard"
import PostPage from "@/pages/PostPage"
import ChatPage from "@/pages/ChatPage"
import MessagesPage from "@/pages/Messages"
import SearchPage from "@/pages/SearchPage"
import CreatePostPage from "@/pages/CreatePostPage"

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
        } />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/register" element={
          <Register />
          } />
        <Route path="/profile/:id" element={
          <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute>
          <SearchPage />
        </ProtectedRoute>
        } />
        <Route path="/chat/:id" element={
          <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
        } />
        <Route path="/create-post" element={
          <ProtectedRoute>
          <CreatePostPage />
        </ProtectedRoute>
        } />
        <Route path="/posts/:id" element={
          <ProtectedRoute>
          <PostPage />
        </ProtectedRoute>
        } />
    </Routes>
  )
}

export default Routers