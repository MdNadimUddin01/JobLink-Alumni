import React from 'react'
import { deleteJobPost, removeJobPost } from '../../Services/apiService';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

export function JobCard({ jobData, job, showAlumniIcon, alumniHandler }) {

    const user = useSelector(state => state.profile.user);
    // console.log(user)

    const getJobTypeStyle = (jobType) => {
        const styles = {
            'Full Time': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25',
            'Part Time': 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25',
            'Internship': 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25',
        };
        return styles[jobType] || 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg shadow-gray-500/25';
    };

    const handleDelete = async () => {
        await deleteJobPost(job._id);
        jobData();
    }

    const handleRemove = async () => {
        await removeJobPost(job._id);
        jobData();
    }

    return (
        <div key={job.jobId}
            className="group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>

            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-lg p-8 hover:bg-white transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl">

                {/* Job Header with Enhanced Styling */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                                    <span className="text-white text-2xl">
                                        {job.jobType === 'Internship' ? '🎓' : job.jobType === 'Full Time' ? '💼' : '⏰'}
                                    </span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="text-xs text-white">✓</span>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                                    {job.post}
                                </h2>
                                <p className="text-lg text-gray-600 font-medium">{job.companyName}</p>

                                {/* Job ID Badge */}
                                <div className="flex items-center gap-2 mt-2 mb-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono">
                                        ID: {job.jobId}
                                    </span>
                                    {job.status && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium">
                                            Active
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {showAlumniIcon && <div className="flex items-center gap-3">
                        <button
                            onClick={() => alumniHandler(job.alumniId)}
                            className="group/btn relative cursor-pointer overflow-hidden bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center gap-2">
                                <span className="text-lg bg-white bg-clip-text text-transparent">👤</span>

                                <span>Alumni</span>
                            </span>
                        </button>
                    </div>}

                    {
                        !showAlumniIcon && !job.status && <div className="space-y-2 flex justify-end items-center" >
                            <h3 className="text-lg font-semibold text-red-800">
                                Job Removed by an administrator
                            </h3>
            
                      </div>
                        
                    }
                </div>

                {/* Enhanced Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                        { icon: '📍', label: 'Location', value: job.location, bgColor: 'bg-blue-50', textColor: 'text-blue-900', borderColor: 'border-blue-200' },
                        { icon: '💰', label: 'Salary', value: job.salary, bgColor: 'bg-green-50', textColor: 'text-green-900', borderColor: 'border-green-200' },
                        { icon: '👥', label: 'Positions', value: `${job.noOfVacancy} Available`, bgColor: 'bg-purple-50', textColor: 'text-purple-900', borderColor: 'border-purple-200' },
                        { icon: '🕐', label: 'Timings', value: job.timings, bgColor: 'bg-orange-50', textColor: 'text-orange-900', borderColor: 'border-orange-200' }
                    ].map((detail, idx) => (
                        <div key={idx} className={`${detail.bgColor} p-4 rounded-xl border ${detail.borderColor} hover:shadow-md transition-all duration-300`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{detail.icon}</span>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{detail.label}</p>
                            </div>
                            <p className={`font-semibold ${detail.textColor}`}>{detail.value}</p>
                        </div>
                    ))}
                </div>

                {/* Bond Information */}
                {job.bond && job.bond !== "No bound" && (
                    <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">📋</span>
                            <p className="font-semibold text-amber-900 text-sm uppercase tracking-wide">Bond Information</p>
                        </div>
                        <p className="text-amber-800 font-medium">{job.bond}</p>
                    </div>
                )}

                {/* Requirements Section */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">📋</span>
                        <p className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Requirements</p>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{job.requirement}</p>
                </div>

                {/* Application Timeline with Progress */}
                <div className="bg-indigo-50 rounded-xl p-5 mb-6 border border-indigo-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">📅</span>
                        <p className="font-semibold text-indigo-900 uppercase tracking-wide text-sm">Application Deadline</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Opens</p>
                            <p className="font-bold text-gray-900 text-sm">{job.applystartDate}</p>
                        </div>
                        <div className="flex-1 mx-4 relative">
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Closes</p>
                            <p className="font-bold text-gray-900 text-sm">{job.applyEndDate}</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getJobTypeStyle(job.jobType)} transform hover:scale-105 transition-all duration-300`}>
                        {job.jobType}
                    </span>

                    {job.status && (
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                            ✨ Active
                        </span>
                    )}

                    {job.referralAvailable === 'Yes' && (
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 transform hover:scale-105 transition-all duration-300">
                            🤝 Referral Available
                        </span>
                    )}

                    {job.bond && job.bond !== "No bound" && (
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 transform hover:scale-105 transition-all duration-300">
                            📋 Bond Required
                        </span>
                    )}
                </div>

                {/* Action Footer */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-2 mb-1">
                            <span>📅</span>
                            <span>Posted {job.postDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🕐</span>
                            <span>{job.postTime}</span>
                        </div>
                    </div>
                    {
                        !showAlumniIcon && <div className="flex items-center gap-1 ml-3">
                            <Link
                                to={"/alumni/updateJob/" + job._id}
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
                    {showAlumniIcon &&
                        <div className='flex gap-2 items-center'>
                            <button
                                className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                                disabled={!job.status}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center gap-2">
                                    <span>{job.status ? 'Apply Now' : 'Closed'}</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </span>
                            </button>
                            {user && user.role === "Admin" && <button
                                onClick={job.status ? handleRemove : () => { }}
                                className=" px-4 py-3  cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
                                title="Delete Event"
                            >
                                {job.status ? "🗑️ Remove" : "Removed" }
                            </button>}
                        </div>

                    }
                </div>
            </div>

        </div>
    )
}

