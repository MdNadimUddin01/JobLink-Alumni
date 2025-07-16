import React, { useState, useRef, useEffect } from 'react';
import forumChatImage from "../../assets/Forum/forumChat.jpg"
import { useSelector } from 'react-redux';
import { data, useParams } from 'react-router';
import { getAllForumChat, sendMessage } from '../../Services/apiService';



export const ForumChat = () => {

    const [messageInput, setMessageInput] = useState('');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const { user } = useSelector(state => state.profile);

    const { forumId } = useParams();
    const { alumniJoinedForum } = useSelector(state => state.forum);

    const forumData = alumniJoinedForum.filter(data => forumId === data._id)[0];

    const [forumChat, setForumChat] = useState([]);

    const getForumChat = async() => {

        const data = await getAllForumChat(forumId);
        setForumChat(data)

    }

    useEffect(() => {
        scrollToBottom();
        getForumChat();
    }, [forumChat]);

    const handleSubmit = async() => {
        if (messageInput.trim()) {
            await sendMessage(forumId, messageInput.trim());
            setMessageInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="flex h-screen">
                <div className="flex mx-auto container ">
                  
                    <div className="w-150 bg-white/95 hidden border-r border-white/20 md:flex flex-col ">

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 text-center">
                            <h1 className="text-xl font-bold mb-1">{forumData?.forumTopic ?? ""}</h1>
                            <p className="text-sm opacity-90">{forumData?.description ?? ""}</p>
                        </div>

                        <img src={forumChatImage} className='mt-40 h-[500px]' />
                    </div>


                    <div className="flex-1 flex flex-col bg-white/95 backdrop-blur-sm shadow-xl">

                        <div className="bg-white/80 border-b  border-gray-200 p-6 flex items-center justify-between flex-shrink-0">

                            <div className="p-6 hidden">
                                <h1 className="text-xl font-bold mb-1">{forumData?.forumTitle}</h1>
                                <p className="text-sm opacity-90">{forumData?.description }</p>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800">General Discussion</h2>

                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                                    Members
                                </button>
                            </div>

                        </div>

                        <div className="overflow-y-auto p-6 space-y-4 flex-1 min-h-0">
                            {forumChat.map(chat => (
                                <div key={chat._id} className={`flex items-start gap-4 animate-fadeIn ${chat.alumniId === user._id ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${chat.alumniId === user._id
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                                        }`}>
                                        {chat.alumniName === 'You' ? 'Y' : chat.alumniName.charAt(0)}
                                    </div>
                                    <div className={`flex-1 max-w-xs md:max-w-md lg:max-w-lg ${chat.alumniId === user._id? 'text-right' : ''}`}>
                                        <div className={`flex items-center gap-2 mb-1 ${chat.alumniId === user._id ? 'flex-row-reverse' : ''}`}>
                                            <span className="font-semibold text-gray-800 text-sm">{chat.alumniName}</span>
                                            <span className="text-xs text-gray-500">{chat.sendTime}</span>
                                        </div>
                                        <div className={`p-3 rounded-2xl shadow-sm ${chat.alumniId === user._id
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-sm'
                                            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                                            }`}>
                                            {chat.message}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div ref={messagesEndRef} />

                            {
                                forumChat.length === 0 && <div className='text-center font-bold'>No message Found</div>
                            }
                        </div>

                        <div className="bg-white/90 border-t border-gray-200 p-6 w-full flex-shrink-0">
                            <div className="flex gap-4 items-end">
                                <textarea
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-3xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white/90 backdrop-blur-sm transition-all duration-200 resize-none"
                                    rows="1"
                                    style={{ minHeight: '50px', maxHeight: '120px' }}
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!messageInput.trim()}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 font-semibold min-w-20"
                                >
                                    Send
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

