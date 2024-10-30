import { Link } from "react-router-dom";
import img from "@/assets/default-dp.png";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FiMoreHorizontal, FiSend } from "react-icons/fi";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const PostCard = ({ post, liked }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const SERVERURL = import.meta.env.VITE_API_URL;

  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(liked);

  const fileExtension = post.postUrl.split(".").pop();
  const token = localStorage.getItem("token");

  const handleLike = async ({ postId }) => {
    if (!userId) {
      toast({
        title: "Login To Like Posts!!",
        variant: "destructive",
      });
    }
    try {
      const response = await axios.post(
        `${SERVERURL}/api/post/like-post`,
        {
          postId: postId,
          userId: userId,
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      // console.log(response.data);

      if (response.data.message === "Liked") {
        setIsLiked(true);
        setLikes((prev) => prev + 1);
      } else if (response.data.message === "Unliked") {
        setIsLiked(false);
        setLikes((prev) => prev - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostDelete = async() => {
    try {
      const response = await axios.delete(`${SERVERURL}/api/post/delete-post/${post._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      window.location.href = '/';
      toast({
        title: "Post Deleted",
        variant: "success"
      });
      
    } catch (error) {
      console.error(error);
      toast({
        title: "Post Deletion Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  }

  return (
    <div className="w-full p-4 border-b bg-[#4E4F50]/15">
      <div className="w-full flex items-center justify-between gap-5">
        <Link
          to={`/profile/${post.userId._id}`}
          className="flex items-center gap-7"
        >
          {post.userId.profileUrl ? (
            <img src={`${SERVERURL}/${post.userId.profileUrl}`} alt="" className="w-12 h-12 object-cover object-center border rounded-full" />
          ) : (
            <img src={img} alt="" className="w-12 border rounded-full" />
          )}
          <div className="space-y-2">
            <h2 className="font-semibold">{post.userId.name}</h2>
            <p className="text-sm">{post.postContent}</p>
          </div>
        </Link>

        {post.userId._id === user?.id && <Popover>
          <PopoverTrigger>
            <FiMoreHorizontal className="cursor-pointer" size={20} />
          </PopoverTrigger>
          <PopoverContent>
            <Link onClick={handlePostDelete} className="flex items-center justify-center gap-2">
              <p className="text-xs text-red-500">Delete</p>
              <Trash2 className="text-red-500" size={12} />
            </Link>
          </PopoverContent>
        </Popover>}
      </div>

      {fileExtension.toLowerCase().startsWith("mp4") ? (
        <div className="mt-5 relative left-16">
          <div className="w-2/3 cursor-pointer ">
            <video
              src={`${SERVERURL}/${post.postUrl}`}
              controls
              className="rounded-xl"
            ></video>
          </div>
        </div>
      ) : (
        <Link to={`/posts/${post._id}`}>
          <div className="mt-5 relative left-16">
            <div className="w-2/3  object-cover rounded-xl ">
              <img
                src={`${SERVERURL}/${post.postUrl}`}
                alt=""
                className=" object-cover rounded-xl"
              />
            </div>
          </div>
        </Link>
      )}

      <div className=" mt-5 relative left-20 flex items-center gap-10">
        <Link className="flex items-center gap-2">
          {isLiked ? (
            <GoHeartFill
              size={22}
              className="text-red-500"
              onClick={() => handleLike({ postId: post._id })}
            />
          ) : (
            <GoHeart
              size={22}
              className="text-[#4E4F50]"
              onClick={() => handleLike({ postId: post._id })}
            />
          )}
          <h4 className="text-sm font-light">{likes}</h4>
        </Link>
        <Link to={`/posts/${post._id}`} className="flex items-center gap-2">
          <FaRegComment size={22} className="text-[#4E4F50]" />
          <h4 className="text-sm font-light">{post.comments.length}</h4>
        </Link>
        <Link className="flex items-center gap-2">
          <FiSend size={22} className="text-[#4E4F50]" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
