import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../Comment";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import AuthContext from "@/context/AuthContext";

const Post = () => {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState();
  const token = localStorage.getItem("token");
  const SERVERURL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);
 
  const { id } = useParams();
  const fetchPost = async() => {
    try {
      const response = await axios.get(`${SERVERURL}/api/post/getSinglePost/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setPost(response.data.post);
      console.log(post);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  const userId = user?.id;
   const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${SERVERURL}/api/user/getUserProfile/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setProfile(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchUserProfile();
  },[])
  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-end md:justify-center">
        <Loader color="#4E4F50" />
      </div>
      ) : (
        <div>
        <h2 className="invisible md:visible text-center my-5 text-sm font-bold">{post.userId.name}'s Post</h2>
          <div className="w-[360px] sm:w-[420px]  md:w-[480px] lg:w-[580px] relative h-screen max-h-screen overflow-y-auto overflow-x-hidden  border rounded-t-3xl hide-scrollbar">
          <div className="sticky top-0 z-10 w-full ">
            <Comment post={post} profile={profile} />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Post;
