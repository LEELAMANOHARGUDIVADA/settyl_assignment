import { Link, useParams } from "react-router-dom"
import img from "../assets/default-dp.png"
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FiMoreHorizontal, FiSend } from "react-icons/fi";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { formatTimeAgo } from "@/utils/formatTime.js";
import { Smile, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Comment = ({ post }) => {

    const { user } = useContext(AuthContext);
    const liked = post.likes.includes(user.id);
    const SERVERURL = import.meta.env.VITE_API_URL;
    const [postComments, setPostComments] = useState([]);
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(liked);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [profile, setProfile] = useState();

    const fileExtension = post.postUrl.split(".").pop();
    const {id} = useParams();
    const token = localStorage.getItem("token");

    const fetchPostComments = async() => {
        
        try {
            const response = await axios.get(`${SERVERURL}/api/post/allPostComments/${id}`);
            setPostComments(response.data.comments);
            // console.log(postComments);
        } catch (error) {
            console.error(error);
        }
    };

    const handleComment = async(e) => {
        e.preventDefault();
        let data = {
            commentText: comment,
            userId: user.id,
            postId: post._id
        }
        // console.log(data);

        try {
            const response = await axios.post(`${SERVERURL}/api/post/create-comment`, data, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            });
            // console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setComment("");

        post.comments.length += 1;

        fetchPostComments();
    }

    const handleCommentDelete = async(commentId) => {
        try {
            const response = await axios.delete(`${SERVERURL}/api/post/delete-comment/${commentId}`,  {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            });
            console.log(response.data);

            post.comments.length -= 1;
            
            fetchPostComments();
        } catch (error) {
            console.error(error);
        }
    }

    const handleLike = async ({ postId }) => {
        if (!user.id) {
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
              userId: user.id,
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

      const handleSelectEmoji = (emoji) => {
        setComment((prevMessage) => prevMessage + emoji.native);
        setShowEmojiPicker(false);
      };

    const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${SERVERURL}/api/user/getUserProfile/${user?.id}`, {
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
    fetchUserProfile();
  }, [user]);

    useEffect(() => {
        fetchPostComments();
    },[]);
  return (
    <div>
        {post && <div className='w-full p-4 border-b bg-[#4E4F50]/15'>
        <div className="w-full flex items-center justify-between gap-5">
        <Link to={`/profile/${post.userId._id}`} className='w-full flex items-center justify-between gap-5'>
            <div className="flex items-center gap-7">
                {post.userId.profileUrl ? <img src={`${SERVERURL}/${post.userId.profileUrl}`} alt="" className="w-12 h-12 object-cover object-center border rounded-full" /> :
                    <img src={img} alt="" className="w-12 border rounded-full" />
                }
            <div className="space-y-2">
                <h2 className="font-semibold">{post.userId.name}</h2>
                <p className="text-sm">{post.postContent}</p>
            </div>
            </div>

        </Link>
        
        {post.userId._id === user.id && <Popover>
          <PopoverTrigger>
            <FiMoreHorizontal className="cursor-pointer" size={20} />
          </PopoverTrigger>
          <PopoverContent className="w-32 bg-black/50 h-10 rounded-lg flex items-center justify-center">
            <Link onClick={handlePostDelete} className="flex items-center justify-center gap-2">
              <p className="text-xs text-red-500">Delete</p>
              <Trash2 className="text-red-500" size={12} />
            </Link>
          </PopoverContent>
        </Popover>}
        </div>

        
        {fileExtension.toLowerCase().startsWith("mp4") ? (
        <div className="mt-5 relative left-16">
          <div className="w-2/3 ">
            <video src={`${SERVERURL}/${post.postUrl}`} controls autoPlay className="rounded-xl"></video>
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
            <Link className="flex items-center gap-2">
                <FaRegComment size={22} className="text-[#4E4F50]" />
                <h4 className="text-sm font-light">{post.comments.length}</h4>
            </Link>
            <Link className="flex items-center gap-2">
                <FiSend size={22} className="text-[#4E4F50]" />
                {/* <h4 className="text-sm font-light">5</h4> */}
            </Link>
        </div>
    </div>}

    <div className='w-full p-4 border-b bg-[#4E4F50]/15 pb-16'>
        <div className="w-full flex items-center justify-evenly gap-5 mb-5 ">
             {profile.profileUrl ? <img src={`${SERVERURL}/${profile.profileUrl}`} alt="" className="w-12 h-12 object-cover object-center border rounded-full" /> :
                    <img src={img} alt="" className="w-12 border rounded-full" />
                }
            <div className="w-full flex items-center h-12 bg-black/30 rounded-full px-4 gap-5 ">
        <div type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Smile size={28} className="cursor-pointer" />
        </div>
        {showEmojiPicker && (
          <div className="relative right-32 bottom-60 md:right-16 ">
            <Picker className="" data={data} onEmojiSelect={handleSelectEmoji} />
          </div>
        )}
        <input
          type="text"
          name="title"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Comment..."
          className="text-white w-full h-12 bg-transparent outline-none"
          required
        />
        </div>
            <Button onClick={handleComment}>Reply</Button>
        </div>
        {postComments && postComments.map((comment, index) => (
            <div className="w-full border-b flex items-center justify-between" key={index}>
            <div className="my-4 mx-1.5 flex items-center justify-start gap-10">
                 {post.userId.profileUrl ? <img src={`${SERVERURL}/${post.userId.profileUrl}`} alt="" className="w-12 h-12 object-cover object-center border rounded-full" /> :
                    <img src={img} alt="" className="w-12 border rounded-full" />
                }
                <div>
                <p className="text-sm font-semibold">{comment.userId.name}</p>
                <h3 className="mt-2 ">{comment.commentText}</h3>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xs text-[#4E4F50]">{formatTimeAgo(comment.createdAt)}</p>
                {comment.userId._id === user.id && <Trash2 className="text-red-500 mt-2 cursor-pointer" size={18} onClick={() => handleCommentDelete(comment._id)}  />}
            </div>
        </div>
        ))}
    </div>
    </div>
  )
}

export default Comment
