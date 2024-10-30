import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileCard from "../Profile/ProfileCard";
import AuthContext from "@/context/AuthContext";
import { Loader } from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const SERVERURL = import.meta.env.VITE_API_URL;
  
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${SERVERURL}/api/user/getUserProfile/${id}`, {
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
  }, [id]);


  return (
    <div>
    {isLoading ? (
      <div className="w-full h-screen flex items-center justify-end md:justify-center">
      <Loader color="#4E4F50" />
    </div>
    ) : (
      <div>
      <h2 className=" invisible md:visible text-center my-5 text-sm font-bold">{profile?.name}</h2>
      <div className="w-[360px] sm:w-[420px]  md:w-[480px] lg:w-[580px] relative h-screen max-h-screen overflow-y-auto overflow-x-hidden border rounded-t-3xl hide-scrollbar">
        <div className="sticky top-0 z-10 w-full ">
          <ProfileCard profile={profile} />
        </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default Profile;
