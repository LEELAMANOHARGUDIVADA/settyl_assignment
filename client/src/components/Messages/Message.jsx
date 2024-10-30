import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import { Loader } from "lucide-react";
import MessagesList from "./MessagesList";

const Message = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
    {isLoading ? (
      <div className="h-screen w-full flex items-center justify-center">
      <Loader color="#4E4F50" />
    </div>
    ) : (
      <div>
      <h2 className="text-center my-5 text-sm font-bold">Thread</h2>
      <div className="w-[360px] sm:w-[420px]  md:w-[480px] lg:w-[580px] relative h-screen max-h-screen overflow-y-auto overflow-x-hidden border rounded-t-3xl hide-scrollbar">
        <div className="sticky top-0 z-10 w-full ">
          <MessagesList />
        </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default Message;
