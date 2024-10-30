import { Link, useParams } from "react-router-dom";
import img from "@/assets/default-dp.png";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import VideoFrameCapture from "../VideoFrameCapture";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageUpIcon } from "lucide-react";
import ImageWithFallback from "../ImageWithFallback";

const ProfileCard = ({ profile }) => {
  const { user } = useContext(AuthContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState(profile.followers.length);
  const [file, setFile] = useState(null);
  const userId = user.id;
  const token = localStorage.getItem("token");
  const SERVERURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const followed = profile.followers.includes(user.id);
    if(followed) {
      setIsFollowed(true);
    } else{
      setIsFollowed(false);
    }
  }, [profile]);

  const handleFollowUser = async () => {
    const data = {
      userId: user.id,
      userToBeFollowed: profile._id,
    };
    try {
      const response = await axios.post(
        `${SERVERURL}/api/user/follow-user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers((prev) => prev + 1);
      toast({
        title: await response.data.message,
        variant: "success",
      });
      setIsFollowed(true);
    } catch (error) {
      toast({
        title: response.data.message,
        variant: "success",
      });
      console.log();
    }
  };
  const handleUnFollowUser = async () => {
    const data = {
      userId: user.id,
      userToBeUnFollowed: profile._id,
    };
    try {
      const response = await axios.post(
        `${SERVERURL}/api/user/unfollow-user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers((prev) => prev - 1);
      toast({
        title: response.data.message,
        variant: "success",
      });
      setIsFollowed(false);
    } catch (error) {
      toast({
        title: error,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleImageUpload = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await axios.post(`${SERVERURL}/api/user/updateUserImage`, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full">
      {profile && (
        <div className="w-full p-4 border-b bg-[#4E4F50]/15">
          <div className="flex items-center justify-between px-4">
            <div>
              <h3>{profile.name}</h3>
            </div>

            {profile.profileUrl || profile._id === user?.id ? (
              <Dialog>
              <DialogTrigger>
                <div>
                  <ImageWithFallback src={`${SERVERURL}/${profile.profileUrl}`} fallbackSrc={img} alt={profile.name} className="w-20 h-20 object-cover object-center rounded-full border" />
                </div>
              </DialogTrigger>
              {
                profile._id === user?.id && <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Profile Photo</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                {file && <div className="w-full flex items-center justify-center">
                      <img src={URL.createObjectURL(file)}  alt="" className="w-20 h-20 object-cover object-center rounded-full" />
                    </div> }
          
                    <input
                      type="file"
                      name="file"
                      id="file-upload"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="hidden"
                    />

                    <label
                      htmlFor="file-upload"
                      className="w-full h-full cursor-pointer border-2 border-dashed rounded-2xl flex flex-col items-center justify-center my-5"
                    >
                      <ImageUpIcon size={30} />
                      <h3 className="text-sm md:text-md my-5">
                        Upload your image here or{" "}
                        <span className="text-blue-500">browse</span>
                      </h3>
                    </label>
                    <div className="w-full text-center">
                    <Button type="submit" onClick={handleImageUpload}>Change Photo</Button>
                    </div>
                  </DialogDescription>
              </DialogContent>
              }
            </Dialog>
            ) : (
              <div>
              <img src={img} alt="" className="w-20 rounded-full border" />
              </div>
            )}
            
          </div>

          <div className="flex items-center gap-2 px-4">
            <h3 className="text-[#4E4F50] text-sm">{followers} followers</h3>
            <h3 className="text-[#4E4F50] text-sm">
              {profile.following.length} following
            </h3>
          </div>

          {user.id != profile._id && (
            <div className="w-full px-4 mt-5 flex items-center justify-center gap-5">
              {isFollowed ? (
                <Button
                  className="w-1/2  bg-transparent text-white border hover:bg-transparent border-white"
                  onClick={handleUnFollowUser}
                >
                  UnFollow
                </Button>
              ) : (
                <Button
                  className="w-1/2 font-semibold"
                  onClick={handleFollowUser}
                >
                  Follow
                </Button>
              )}

              <Link to={`/chat/${profile._id}`} className="w-1/2">
                <Button className="w-full ">Message</Button>
              </Link>
            </div>
          )}

          <div className="w-full mt-5 px-4 flex items-center justify-start">
            <Link>
              <button>Posts</button>
            </Link>
          </div>
        </div>
      )}

      <div>
        <div className="grid grid-cols-3 w-full">
          {profile &&
            profile.posts.map((post, index) => {
              const fileExtension = post.postUrl.split(".").pop();
              return (
                <Link
                  to={`/posts/${post._id}`}
                  key={index}
                  className="w-full h-80 border"
                >
                  {fileExtension.toLowerCase().startsWith("mp4") ? (
                    <VideoFrameCapture
                      videoSrc={`${SERVERURL}/${post.postUrl}`}
                      captureTime={5}
                    />
                  ) : (
                    <img
                      src={`${SERVERURL}/${post.postUrl}`}
                      alt=""
                      className="w-full h-80 object-cover object-center"
                    />
                  )}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
