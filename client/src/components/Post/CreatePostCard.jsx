import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { ImageUpIcon, Loader, Smile } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const CreatePostCard = () => {
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const SERVERURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  // console.log(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("postContent", postContent);
    if (file) {
      data.append("file", file);
    }
    data.append("userId", user.id);

    try {
      const response = await axios.post(
        `${SERVERURL}/api/post/create-post`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log(response.data);
      toast({
        title: response.data.message,
        variant: "success",
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSelectEmoji = (emoji) => {
    setPostContent((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="w-full h-screen flex p-10 bg-[#4E4F50]/15">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-start"
      >
        <div className="w-full flex items-center h-12 bg-black/30 rounded-full px-4 gap-5 ">
        <div type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Smile size={28} className="cursor-pointer" />
        </div>
        {showEmojiPicker && (
          <div className="absolute top-20">
            <Picker className="" data={data} onEmojiSelect={handleSelectEmoji} />
          </div>
        )}
        <input
          type="text"
          name="title"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
          placeholder="Post Title"
          className="text-white w-full h-12 bg-transparent outline-none"
          required
        />
        </div>
        <div className="my-5 w-full h-40 bg-black/30 rounded-2xl p-5">
          <input
            type="file"
            name="file"
            id="file-upload"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="w-full h-full cursor-pointer border-2 border-dashed rounded-2xl flex flex-col items-center justify-center"
          >
            <ImageUpIcon size={30} />
            <h3 className="text-sm md:text-md">
              Upload your image here or{" "}
              <span className="text-blue-500">browse</span>
            </h3>
          </label>

          <div className="mt-4">
            {file && file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-96 object-cover rounded-2xl"
              />
            )}
            {file && file.type.startsWith("video/") && (
              <video controls className="w-full h-96 object-cover rounded-2xl">
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className={` ${file && "relative"} ${file && "top-96"}`}>
          {loading ? <Loader /> : <Button type="submit">Create Post</Button>}
        </div>
      </form>
    </div>
  );
};

export default CreatePostCard;
