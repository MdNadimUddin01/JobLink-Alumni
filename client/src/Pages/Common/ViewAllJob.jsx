import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { adminViewJobs, getAlumni, viewAllJobData, viewAlumniJobData } from '../../Services/apiService';
import { JobCard } from '../../Component';
import { useSelector } from 'react-redux';

export const ViewAllJob = ({ myjob }) => {
    // console.log("myjob : " , myjob)

    const [selectedAlumni, setSelectedAlumni] = useState(false);
    const [filter, setFilter] = useState('all');
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [alumniData, setAlumniData] = useState([]);
    const user = useSelector(state => state.profile.user);

    const jobData = useCallback(async () => {
        let jobsData = []
        try {
            if (user && user.role === "Admin") {
                jobsData = await adminViewJobs();

            } else {
                if (!myjob) {
                    jobsData = await viewAllJobData();

                } else {
                    jobsData = await viewAlumniJobData();
                }
            }

        } catch (error) {
            console.log(error);
        }

        setJobs(jobsData ? jobsData : []);
    }, [myjob]);


    useEffect(() => {
        // console.log("JOB CALLED")
        jobData();
    }, [myjob, jobData])

    const alumniHandler = async (alumniId) => {
        // console.log(alumniId);
        const alumni = await getAlumni(alumniId);
        setSelectedAlumni(alumni);

        setAlumniData([{ icon: '👤', label: 'Name', value: alumni.userName },
        { icon: '📧', label: 'Email', value: alumni.email },
        { icon: '🎓', label: 'Graduation', value: `${alumni.passoutYear} Passout` },
        { icon: '🏢', label: 'Current Role', value: `${alumni.designation} at ${alumni.currentCompany}` }])
    }

    const filterType = [
        { key: 'all', label: '🌟 All Jobs', count: jobs.length },
        { key: 'Part Time', label: '🔥 Part Time', count: jobs.filter(j => j.jobType === "Part Time").length },
        { key: 'Full Time', label: '💼 Full Time', count: jobs.filter(j => j.jobType === 'Full Time').length },
        { key: 'Internship', label: '🎓 Internships', count: jobs.filter(j => j.jobType === 'Internship').length },
        { key: 'Referral', label: '🎓 Referral', count: jobs.filter(j => j.referralAvailable === 'Yes').length },
    ];

    const filteredJobs = jobs.filter(job => {
        if (filter === 'all') return true;
        if (filter === 'Part Time') return job.jobType === "Part Time";
        if (filter === 'Full Time') return job.jobType === 'Full Time';
        if (filter === 'Internship') return job.jobType === 'Internship';
        if (filter === "Referral") return job.referralAvailable === "Yes"
        return job.jobType.toLowerCase().replace(' ', '') === filter;
    });


    const closeAlumniInfo = () => {
        setSelectedAlumni(null);
    };

    return (
        <div className="min-h-screen container mx-auto text-black">

            {/* Premium Job Cards */}
            <div className="relative  p-y-3 lg:p-8">
                <div className=" mx-auto max-w-6xl">


                    <div className="text-center">
                        <div className="relative inline-block mb-4">
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl animate-pulse"></div> */}
                            <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                                <span className="text-4xl animate-bounce">🚀</span>
                            </div>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-black mb-4">
                            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Dream
                            </span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                                {" "}Careers
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-black/80 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                            Unlock exclusive opportunities curated by our elite alumni network.
                            <span className="block mt-2 text-black/60">Your next big break is just one click away.</span>
                        </p>

                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 ">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {filterType.map(filterOption => (
                                    <button
                                        key={filterOption.key}
                                        onClick={() => setFilter(filterOption.key)}
                                        className={`px-6 py-3 cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-105 ${filter === filterOption.key
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-black/20  hover:bg-black/30 border border-white/30'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{filterOption.label}</span>
                                            <span className="bg-white/40  text-black px-2 py-1 rounded-full text-xs">
                                                {filterOption.count}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {jobs.length > 0 && <div className="grid gap-8 lg:grid-cols-2">
                        {filteredJobs.map((job, index) => (
                            <JobCard jobData={jobData} key={job._id} job={job} showAlumniIcon={!myjob} alumniHandler={alumniHandler} />
                        ))}
                    </div>}


                    {selectedAlumni && (
                        <div className="fixed inset-0 bg-white/70 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn">
                            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/30 transform animate-slideUp">
                                <div className="text-center mb-8">
                                    <div className="relative inline-block mb-6">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl mx-auto">
                                            <img
                                                src={selectedAlumni.profile}
                                                alt={selectedAlumni.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <span className="text-white text-md">✓</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold  mb-2">Alumni Profile</h3>
                                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
                                </div>

                                <div className="space-y-4">
                                    {alumniData.map((info, idx) => (
                                        <div key={idx} className="bg-gray-200 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{info.icon}</span>
                                                <div>
                                                    <p className="text-sm font-medium  uppercase tracking-wide">{info.label}</p>
                                                    <p className="font-semibold ">{info.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <button
                                        onClick={closeAlumniInfo}
                                        className="flex-1 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border-2 cursor-pointer border-black/30 hover:scale-105"
                                    >
                                        Close
                                    </button>
                                    <button className="flex-1 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                        <span className="flex items-center justify-center gap-2">
                                            <span>📧</span>
                                            <span>Connect</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {
                        jobs.length === 0 && <div className="relative mb-8">

                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-500"> <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"> <span className="text-5xl animate-bounce">🔍</span> </div> </div>

                            <div className="mb-8 flex flex-col justify-center items-center text-center">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight"> No Jobs Found </h2>
                                <div className="space-y-2 text-lg text-gray-600">
                                    {searchQuery ?
                                        (<p> We couldn't find any jobs matching{' '} <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg"> "{searchQuery}" </span> </p>)
                                        : (<p>No jobs match your current filters</p>)} <p className="text-base"> Try adjusting your search criteria or explore other opportunities </p> </div> </div>

                        </div>
                    }


                </div>
            </div>


        </div>
    );
};