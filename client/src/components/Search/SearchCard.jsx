import axios from 'axios';
import _ from 'lodash';
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import img from '@/assets/default-dp.png';
import { Link } from 'react-router-dom';

const SearchCard = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const token = localStorage.getItem("token");
    const SERVERURL = import.meta.env.VITE_API_URL;

    const debouncedSearch = _.debounce(async() => {
        try {
            const response = await axios.get(`${SERVERURL}/api/user/search?query=${query}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setResults(response.data.users);
        } catch (error) {
            console.error(error);
        }
    },500);

    useEffect(() => {
        if(query.trim()) {
            debouncedSearch(query);
        } else {
            setResults([]);
        }

        return () => debouncedSearch.cancel();
    },[query]);
  return (
    <div className="w-full h-screen p-4 border-b bg-[#4E4F50]/15 px-10">
        <div className=' w-full h-12 rounded-full text-lg bg-black/30 px-5 flex items-center gap-5'>
            <Search />
            <input type="text" className=' w-full h-12 rounded-full text-xs bg-transparent outline-none' placeholder='Search profiles' value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div>
            {results?.map(user => (
                <Link to={`/profile/${user._id}`} key={user._id} className='w-full flex items-center my-5 gap-5'>
                    {user.profileUrl ? <img src={`${SERVERURL}/${user.profileUrl}`} alt={user.name} className='w-12 h-12 object-cover object-center rounded-full' /> :
                    <img src={img} alt={user.name} className='w-12 h-12 object-cover object-center rounded-full' />  
                    }
                    <p>{user.name}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SearchCard
