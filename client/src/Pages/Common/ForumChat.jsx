import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { data, useParams } from 'react-router';
import { getAllForumChat, sendMessage, getForumData } from '../../Services/apiService';
import { chatSocket } from '../../Services/socketConnector';



export const ForumChat = () => {

    const [message, setmessage] = useState('');
    const messagesEndRef = useRef(null);
    const forumChatRef = useRef([]);
    const [forumChat, setForumChat] = useState([]);
    const [totalMember, setTotalMember] = useState(0);

    useEffect(() => {
        forumChatRef.current = forumChat;
    }, [forumChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const { user } = useSelector(state => state.profile);
    const alumniId = user._id;
    const { forumId } = useParams();
    const { alumniJoinedForum } = useSelector(state => state.forum);

    const [forumData, setForumData] = useState(alumniJoinedForum.filter(data => forumId === data._id)[0]);
    

    const getForumChat = async () => {
        const data = await getAllForumChat(forumId);
        setForumChat(data)
    }

    const getForumInfo = async () => {
        const data = await getForumData(forumId);
        setForumData(data);
    }

    useEffect(() => {

        if (!forumData) {
            getForumInfo();
        }

        chatSocket.connect();

        chatSocket.emit("join_forum", { forumId });

        chatSocket.on("initial_data", ({ messages, member }) => {
            // console.log("Initail Data : " , message)
            setForumChat(messages)
            setTotalMember(member);
        });

        chatSocket.off("receive_message").on("receive_message", (message) => {

           const isExist =  forumChatRef.current.some(chat => chat._id === message._id);

            if (!isExist) {
                setForumChat((prev) => [...prev, message]);
            }

            setmessage("");
        });

        scrollToBottom();

        return () => {
            chatSocket.disconnect(); // ✅ clean up on unmount
        };

    }, []);

    // console.log("FORUM DATA : " , forumChat)
    const handleSubmit = async () => {
        if (message.trim()) {
            chatSocket.emit("send_message", { forumId, alumniId, message })
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="flex h-screen">
                <div className="flex mx-auto container max-w-8xl">

                    <div className="w-100 bg-white/90 backdrop-blur-xl hidden border-r border-purple-200/50 md:flex flex-col shadow-2xl">

                        {/* Header */}
                        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-3">
                                    <span className="text-2xl mr-2 animate-pulse">✨</span>
                                    <span className="text-2xl animate-bounce">💬</span>
                                </div>
                                <h1 className="text-2xl font-bold mb-2">{forumData?.forumTopic ?? ""}</h1>
                                <p className="text-sm opacity-90 font-medium">{forumData?.description ?? ""}</p>
                            </div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10"></div>
                        </div>

                        <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-purple-50/50 to-blue-50/50">
                            <div className="text-center space-y-6">

                                <div className="relative">
                                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                        <span className="text-5xl text-white">👥</span>
                                    </div>

                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                        <span className="text-sm">❤️</span>
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}>
                                        <span className="text-sm">⭐</span>
                                    </div>
                                    <div className="absolute top-8 -left-8 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '1s' }}>
                                        <span className="text-xs">☕</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                        <div className="h-0.5 w-16 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
                                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                        <div className="h-0.5 w-12 bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse"></div>
                                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                                    </div>
                                </div>

                                {/* Inspirational Text */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Connect & Inspire
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Building bridges between brilliant minds, creating tomorrow's innovations today.
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm backdrop-blur-sm">
                                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{ totalMember}</div>
                                        <div className="text-xs text-gray-600">Members</div>
                                    </div>
                                    <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm backdrop-blur-sm">
                                        <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">24/7</div>
                                        <div className="text-xs text-gray-600">Online Support</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl border-r border-l border-purple-200/30">

                        <div className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 p-6 flex items-center justify-between flex-shrink-0 shadow-sm">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                General Discussion
                            </h2>

                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold flex items-center space-x-2 hover:scale-105">
                                    <span className="text-sm bg-white text-clip bg-clip-text">👥</span>
                                    <span>Members</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto p-6 space-y-6 flex-1 min-h-0 bg-gradient-to-b from-white/50 to-purple-50/30">
                            {forumChat.map((chat, index) => {
                                return <div
                                    key={chat._id}
                                    className={`flex items-start gap-4 animate-fadeIn opacity-0 ${chat.alumniId == user._id ? 'flex-row-reverse' : ''}`}
                                    style={{
                                        animation: `slideIn 0.6s ease-out ${index * 0.1}s forwards`
                                    }}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg ring-2 ring-white ${chat.alumniId == user._id
                                        ? 'bg-gradient-to-br from-pink-500 to-rose-600'
                                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                                        }`}>
                                        {chat.alumniName == 'You' ? 'Y' : chat.alumniName.charAt(0)}
                                    </div>

                                    <div className={`flex-1 max-w-xs md:max-w-md lg:max-w-lg ${chat.alumniId == user._id ? 'text-right' : ''}`}>
                                        <div className={`flex items-center gap-2 mb-2 ${chat.alumniId == user._id ? 'flex-row-reverse' : ''}`}>
                                            <span className="font-semibold text-gray-800 text-sm">{chat.alumniName}</span>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{chat.sendTime}</span>
                                        </div>
                                        <div className={`p-4 rounded-3xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 ${chat.alumniId === user._id
                                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-lg shadow-blue-200'
                                            : 'bg-white/90 text-gray-800 rounded-tl-lg shadow-gray-200 border border-gray-100'
                                            }`}>
                                            {chat.message}
                                        </div>
                                    </div>
                                </div>
                            })}

                            {forumChat.length === 0 && (
                                <div className='text-center py-12'>
                                    <span className="text-6xl text-gray-400 mb-4 block">💬</span>
                                    <div className='text-xl font-bold text-gray-500'>Start the conversation!</div>
                                    <p className="text-gray-400 mt-2">Be the first to share your thoughts</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 p-6 w-full flex-shrink-0 shadow-lg">
                            <div className="flex gap-4 items-end">
                                <textarea
                                    value={message}
                                    onChange={(e) => setmessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Share your thoughts with the community..."
                                    className="flex-1 px-6 py-4 border-2 border-purple-200/50 rounded-3xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-200/50 bg-white/90 backdrop-blur-sm transition-all duration-300 resize-none shadow-sm hover:shadow-md"
                                    rows="1"
                                    style={{ minHeight: '56px', maxHeight: '120px' }}
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!message.trim()}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 font-semibold min-w-24 flex items-center space-x-2 hover:scale-105"
                                >
                                    <span className="text-sm">➤</span>
                                    <span>Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        </div>
    );
};




