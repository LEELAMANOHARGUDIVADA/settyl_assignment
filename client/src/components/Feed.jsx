import React, { useContext, useEffect, useState } from "react";
import PostCard from "./Post/PostCard";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { Loader } from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const SERVERURL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${SERVERURL}/api/post/getAllPosts`
      );
      setPosts(response.data.posts);
      // console.log(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-end md:justify-center">
          <Loader color="#4E4F50" />
        </div>
      ) : (
        <div>
      <h2 className="invisible md:visible text-center my-5 text-sm font-bold">Home</h2>
      <div className="w-[360px] sm:w-[420px]  md:w-[480px] lg:w-[580px] relative h-screen max-h-screen overflow-y-auto overflow-x-hidden  border rounded-t-3xl hide-scrollbar pb-14">
        <div className="sticky top-0 z-10 w-full ">
          {posts &&
            posts.map((post, index) => {
              const isLiked = user?.id && post.likes.includes(user.id);
              return <PostCard post={post} key={index} liked={isLiked} />;
            })}
        </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default Feed;
