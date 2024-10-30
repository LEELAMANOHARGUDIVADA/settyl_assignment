import React from 'react'
import { Link } from 'react-router-dom'
import img from '@/assets/default-dp.png'

const MessagesList = () => {
    const userMessagesList = async() => {
        
    }
  return (
    <div>
        <div className='w-full py-2 px-10 border-b bg-[#4E4F50]/15'>
            <div className='my-3'>
            <h2 className='text-2xl font-semibold px-2 '>Messages</h2>
                <Link to={`/chat/1`}>
                    <div className='flex items-center justify-start gap-10 mt-10'>
                        <div>
                            <img src={img} alt="" className='w-12' />
                        </div>
                        <div>
                            <h3 className='font-semibold'>Manu</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MessagesList