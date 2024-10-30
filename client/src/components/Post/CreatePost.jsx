import { Loader } from "lucide-react";
import CreatePostCard from "./CreatePostCard";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    },300 )
  },[])
  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-end md:justify-center">
        <Loader color="#4E4F50" />
      </div>
      ) : (
        <div>
        <h2 className="invisible md:visible text-center my-5 text-sm font-bold">Create Post</h2>
          <div className="w-[360px] sm:w-[420px]  md:w-[480px] lg:w-[580px] relative h-screen max-h-screen overflow-y-auto overflow-x-hidden  border rounded-t-3xl hide-scrollbar">
          <div className="sticky top-0 z-10 w-full ">
            <CreatePostCard  />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default CreatePost;
