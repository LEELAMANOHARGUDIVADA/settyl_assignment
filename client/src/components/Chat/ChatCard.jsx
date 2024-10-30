import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { io } from 'socket.io-client'
import axios from 'axios';
import AuthContext from '@/context/AuthContext';
import { useParams } from 'react-router-dom';
import img from "@/assets/default-dp.png"
import { Loader, Smile } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from "@emoji-mart/data"

const SERVERURL = import.meta.env.VITE_API_URL;

const socket = io(`${SERVERURL}`);

const ChatCard = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [receiverStatus, setReceiverStatus] = useState("offline");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const chatContainerRef = useRef(null);
    const { user } = useContext(AuthContext);
    const userId = user?.id;
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const receiverId = id;

    useEffect(() => {
        async function getUserProfile() {
            try {
                const response = await axios.get(`${SERVERURL}/api/user/getUserProfile/${id}`,{
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setProfile(response.data.user);
            } catch (error) {
                console.error(error);
            }
        }

        getUserProfile();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        socket.emit("userOnline", user.id);

        socket.emit("joinRoom", userId);

        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on("userStatusChange", ({ userId, status }) => {
            if (userId === receiverId) {
                setReceiverStatus(status);
            }
        });

        async function fetchChatHistory() {
            const response = await axios.get(`${SERVERURL}/api/chat/${userId}/${receiverId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.data;
            setMessages(data);
        }
        fetchChatHistory();
        setIsLoading(false);

        return () => {
            socket.off("receiveMessage");
            socket.off("userStatusChange");
        };
    }, [userId, receiverId]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const messageObj = {
                senderId: userId,
                receiverId: receiverId,
                text: message,
                timestamp: new Date(),
            };
    
            socket.emit("sendMessage", messageObj);
            setMessages((prevMessages) => [...prevMessages, messageObj]);
            setMessage("");
        }
    };

    const handleSelectEmoji = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.native);
        setShowEmojiPicker(false); 
    };
    

  return (
    <div>
        {isLoading ? (
            <div className="h-screen w-full flex items-center justify-center">
            <Loader color="#4E4F50" />
          </div>
        ) : (
            <div className=' px-5 py-4 w-full h-screen flex flex-col '>
            <div className='flex items-center gap-10  py-2'>
                <div className='flex'>
                    {profile?.profileUrl ? <img src={`${SERVERURL/${profile?.profileUrl}`} alt={profile?.name} className='w-12 h-12 object-cover object-center rounded-full' /> : <img src={img} alt="" className='w-12' />
                        
                    }
                <span className={`${receiverStatus === "offline" ? 'bg-red-500' : 'bg-green-500'} w-3 h-3 z-10 relative right-4  rounded-full`}></span>
                </div>
                <h3 className='font-semibold'>{profile?.name}</h3>
            </div>
            <div ref={chatContainerRef} className='w-full  h-[72%] md:h-[80%] overflow-auto hide-scrollbar'>
                <div className='w-full'>
                    {messages.map((msg, index) => (
                        msg.senderId === userId ? (
                            <div key={index} className='my-4 w-full flex items-center justify-end '>
                            <p className='bg-[#4E4F50]/15 px-4 py-2 rounded-2xl '>{msg.text}</p>
                        </div>
                        ) : (
                            <div key={index} className='my-4 w-full flex items-center justify-start '>
                            <p className='bg-[#4E4F50]/15 px-4 py-2 rounded-2xl '>{msg.text}</p>
                        </div>
                        )
                    ) )}
                </div>
            </div>
            <div className=''>
                <form onSubmit={handleSendMessage} className='flex items-center justify-center gap-5 '>
                    <div className='flex items-center gap-2 w-full bg-[#4E4F50]/15 h-12 px-5 rounded-full'>
                    <div type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <Smile size={28} className='cursor-pointer' />
                    </div>
                    {showEmojiPicker && 
                      <div className='absolute bottom-48 left-0 md:left-10 md:bottom-32'>
                        <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                      </div>
                    
                    }
                    <input type="text" placeholder='Message' className='w-full bg-transparent outline-none' value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </div> 
                    <Button type="submit" >Send</Button>
                </form>
            </div>
        </div>
        )}
    </div>
  )
}

export default ChatCard;
