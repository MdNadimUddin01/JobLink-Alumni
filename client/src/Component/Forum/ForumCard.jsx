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
        await alumniDeleteForum(forum._id , navigate);
        forumData();
    }

    const handleAdminDelete = async () => {
        await adminRemoveForum(forum._id , navigate);
        forumData();
    }

    return (
        <div className="bg-white rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
            {/* Header with Category Badge */}
            <div className="relative">
                <div className={`${categoryColor[forum.category]} px-6 py-4`}>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold uppercase tracking-wide text-white">{forum.category}</span>
                        <span className="text-sm opacity-90 text-white">#{forum.id}</span>
                    </div>
                </div>
                {forum.status && (
                    <div className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        Active
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Forum Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {forum.forumTopic}
                </h3>

                {/* Key Info Grid */}
                {/* <div className="grid grid-cols-2 gap-4 mb-5">
                    {forum.startDate && (
                        <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">📅 Start Date</div>
                            <div className="text-sm font-bold text-gray-900">
                                {new Date(forum.startDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                    )}

                    {forum.startTime && (
                        <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">🕒 Start Time</div>
                            <div className="text-sm font-bold text-gray-900">{forum.startTime}</div>
                        </div>
                    )}

                    {forum.members && (
                        <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-purple-600 text-xs font-semibold uppercase tracking-wide mb-1">👥 Members</div>
                            <div className="text-sm font-bold text-gray-900">{forum.members.toLocaleString()}</div>
                        </div>
                    )}

                    {forum.posts && (
                        <div className="bg-orange-50 rounded-lg p-3">
                            <div className="text-orange-600 text-xs font-semibold uppercase tracking-wide mb-1">💬 Posts</div>
                            <div className="text-sm font-bold text-gray-900">{forum.posts.toLocaleString()}</div>
                        </div>
                    )}
                </div> */}

                {/* Category Info */}
                <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">📍 Description</div>
                    <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <span className="text-lg">{categoryIcons[forum.category]}</span>
                        {forum.description}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-5">
                    <div className="text-gray-700 text-sm leading-relaxed">
                        
                    </div>
                </div>

                {/* Forum Activity Section */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-bold text-gray-700">🎯 Forum Status</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${forum.status
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            {forum.status ? '✅ ACTIVE' : '❌ INACTIVE'}
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        {forum.startDate && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Start Date:</span>
                                <span className="font-semibold">
                                    {new Date(forum.startDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                        {forum.startTime && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Start Time:</span>
                                <span className="font-semibold">{forum.startTime}</span>
                            </div>
                        )}
                        {/* {forum.lastActivity && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Last Activity:</span>
                                <span className="font-semibold">🕐 {forum.lastActivity}</span>
                            </div>
                        )} */}
                    </div>

                    {/* {forum.members && forum.members > 0 && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                            <div className="text-purple-600 text-xs font-semibold uppercase tracking-wide mb-1">👥 Community</div>
                            <div className="text-xs text-gray-700">{forum.members} members actively participating</div>
                        </div>
                    )} */}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex flex-col">
                        <span>📤 Created: </span>
                        <span>{forum.startDate || 'Recently'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* All Forms - Join Button */}
                        {allForm && forum.status && (
                            <button
                                onClick={handleJoinForm}
                                className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                🚀 Join Forum
                            </button>
                        )}

                        {allForm && !forum.status && (
                            <button
                                className="cursor-pointer bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                disabled
                            >
                                🚀 Forum Closed
                            </button>
                        )}

                        {/* Joined Forms - View Button */}
                        {joinedForm && (
                            <Link
                                to={"/forumChat/" + forum._id}
                                className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                🔍 View Forum
                            </Link>
                        )}

                        {/* My Forms - Edit and Delete */}
                        {myform && (
                            <div className="flex items-center gap-1 ml-3">
                                <Link
                                    to={"/alumni/updateForum/" + forum._id}
                                    className="px-3 py-2 text-gray-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-blue-200"
                                    title="Update Forum"
                                >
                                    ✏️ Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-3 py-2 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
                                    title="Delete Forum"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}

                        {/* Admin Forms */}
                        {adminForm && forum.status &&(
                            <div className="flex items-center gap-1 ml-3">
                                <button
                                    onClick={handleAdminDelete}
                                    className="px-3 py-2 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
                                
                                >
                                    🗑️ Remove
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ForumCard }
