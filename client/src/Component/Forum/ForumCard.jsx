import React from 'react'
import { adminRemoveForum, alumniDeleteForum, alumniJoinForum } from '../../Services/apiService'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';

function ForumCard({ forum, joinedForm, adminForm, myform, allForm, forumData }) {

    const navigate = useNavigate();

    const categoryIcons = {
        "General": "💬",
        'All Forums': "",
        'Support': "🔧",
        'Gaming': "🎮",
        'Education': "📚",
        'Creative': "🎨",
        "Career": "💼"
    }

    const categoryColor = {
        "General": "bg-gradient-to-br from-blue-500 to-purple-600",
        'All Forums': "bg-gradient-to-br from-purple-500 to-purple-600",
        'Support': "bg-gradient-to-br from-green-500 to-teal-600",
        'Gaming': "bg-gradient-to-br from-red-500 to-pink-600",
        'Education': "bg-gradient-to-br from-cyan-500 to-blue-600",
        'Creative': "bg-gradient-to-br from-yellow-500 to-orange-600",
        "Career": "bg-gradient-to-br from-indigo-500 to-purple-600"
    }

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleJoinForm = async () => {
        await alumniJoinForum(forum._id, navigate);
    }

    const handleDelete = async () => {
        await alumniDeleteForum(forum._id);
        forumData();
    }

    const handleAdminDelete = async () => {
        await adminRemoveForum(forum._id);
        forumData();
    }

    return (
        <div
            key={forum.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
        >

            <div className={`${categoryColor[forum.category]} p-4 sm:p-6 rounded-t-xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl sm:text-3xl lg:text-4xl">{categoryIcons[forum.category]}</span>
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">→</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight">{forum.forumTopic}</h3>
                    <p className="text-white/90 text-xs sm:text-sm line-clamp-2 leading-relaxed">{forum.description}</p>
                </div>
            </div>

            {/* Forum Stats */}
            <div className="p-4 sm:p-6">
                {/* <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <span className="text-slate-400 text-sm">👥</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-700">{forum.members.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Members</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <span className="text-slate-400 text-sm">💬</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-700">{forum.posts.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Posts</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <span className="text-slate-400 text-sm">🕐</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-700">{forum.lastActivity}</p>
                        <p className="text-xs text-slate-500">Last Activity</p>
                    </div>
                </div> */}

                {/* Action Button */}
                <div className='flex sm:flex-row flex-col gap-2'>
                    {allForm && <button onClick={handleJoinForm} className="w-full border border-gray-200 cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base">
                        <span>Join Forum</span>
                        <span className="text-sm">→</span>
                    </button>}

                    {
                        adminForm && forum.status && <button
                            onClick={handleAdminDelete}
                            className="px-3 py-3 sm:py-4  h-full w-full cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg   flex items-center justify-center space-x-2 sm:text-basetransition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
                            title="Delete Event"
                        >
                            🗑️ Delete
                        </button>
                    }

                    {
                        adminForm && !forum.status && <button
                            onClick={handleAdminDelete}
                            className="px-3 py-3 sm:py-4 bg-red-500  h-full w-full cursor-pointer text-white   rounded-lg   flex items-center justify-center space-x-2 sm:text-basetransition-all duration-200 text-sm font-semibold border border-gray-200 "
                            title="Delete Event"
                        >
                            🗑️ Deleted
                        </button>
                    }
                </div>

                {joinedForm && <button onClick={handleJoinForm} className="w-full cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <span>View Forum</span>
                    <span className="text-sm">→</span>
                </button>}

                {
                    myform && <div className="flex items-center justify-end gap-4 ml-3">
                        <Link
                            to={"/alumni/updateForum/" + forum._id}
                            className="px-3 py-2 text-gray-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-blue-200"
                            title="Update Event"
                        >
                            ✏️ Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-2 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
                            title="Delete Event"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export { ForumCard }
