import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import SearchCard from "./SearchCard";

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div>
      {!isLoading ? (
        <div className="h-screen w-full flex items-center justify-center">
        <Loader color="#4E4F50" />
      </div>
      ) : (
        <div>
          <h2 className="invisible md:visible text-center my-5 text-sm font-bold">Search</h2>
          <div className="w-[360px] sm:w-[420px]  md:w-[480px] lg:w-[580px] relative h-screen max-h-screen overflow-y-auto overflow-x-hidden  border rounded-t-3xl hide-scrollbar">
          <div className="sticky top-0 z-10 w-full ">
            < SearchCard />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Search;
