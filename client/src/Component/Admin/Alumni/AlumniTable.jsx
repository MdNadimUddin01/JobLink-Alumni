import React, { useState, useMemo, useEffect } from 'react';
import { getAlumniData, verifyAlumniEmail } from '../../../Services/apiService';

export const AlumniTable = () => {
    // Sample data
    const [alumni, setAlumni] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleApi = async () => {
        console.log("HAndle API")
        try {
            const data = await getAlumniData();
            setAlumni(data);

        } catch (error) {
            console.log(error);
        }

    }

    const handleVerify = async (alumniId) => {
        try {
            await verifyAlumniEmail(alumniId);
            handleApi();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleApi();
    }, []);

    const filteredUsers = useMemo(() => {
        let filtered = alumni.filter(user => {

            let currentStatus = "All";

            if (user.adminVerify === "Verified" && user.emailVerify === "Verified") {
                currentStatus = "Active"
            } else if (user.adminVerify === "Verified") {
                currentStatus = "Inactive"
            } else {
                currentStatus = "Pending"
            }
            user.status = currentStatus;

            // if()
            const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.currentCompany.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === "All" || currentStatus === filterStatus;
            return matchesSearch && matchesFilter;
        });


        return filtered;
    }, [alumni, searchTerm, filterStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const getStatusBadge = (status) => {
        const styles = {
            Active: "bg-green-100 text-green-800 border-green-200",
            Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            Inactive: "bg-red-100 text-red-800 border-red-200"
        };
        return `px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-800'}`;
    };

    const getVerificationIcon = (verified) => {
        return verified ? (
            <span className="text-green-500 font-bold">✓</span>
        ) : (
            <span className="text-red-500 font-bold">✗</span>
        );
    };



    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage and monitor user accounts</p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">

                            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
                            <input
                                type="text"
                                placeholder="Search Alumni..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-3">
                            {/* <Filter className="w-4 h-4 text-gray-400" /> */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Header Row */}
                    <div className="min-[500px]:grid flex justify-between  lg:grid-cols-10 min-[900px]:grid-cols-8 min-[800px]:grid-cols-7 min-[700px]:grid-cols-6 min-[600px]:grid-cols-5 min-[500px]:grid-cols-3  gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                        <div className="col-span-2  text-center">
                            User
                        </div>
                        <div className="col-span-2 justify-center hidden min-[600px]:flex text-center">
                            Company
                        </div>
                        <div className="col-span-1 justify-center hidden min-[800px]:flex text-center">
                            Experience
                        </div>
                        <div className="col-span-1 justify-center hidden min-[700px]:flex text-center">
                            Branch
                        </div>
                        <div className="lg:flex justify-center hidden col-span-1 text-center">Passout Year</div>
                        <div className="lg:flex hidden justify-center col-span-1 text-center">Contact</div>
                        <div className="col-span-1 hidden min-[900px]:flex justify-center text-center">
                            Status
                        </div>
                        <div className="col-span-1 text-center">
                            {
                                filterStatus === "Pending" ? "Actions" : "Verifications"
                            }
                        </div>
                    </div>

                    {/* Data Rows */}
                    <div className="divide-y divide-gray-200">
                        {paginatedUsers.length === 0 && (
                            <div className='flex justify-center items-center h-full  p-30'>
                                <div className='flex flex-col justify-center items-center gap-'>
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    <h1 className='text-xl font-semibold text-gray-800 mb-3'>No Alumni Found</h1>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        We couldn't find any alumni matching your search criteria. Try adjusting your filters or search terms.
                                    </p>

                                    <div className="space-y-3">

                                        {filterStatus !== "All" &&
                                            <button onClick={() => setFilterStatus("All")} className="w-full cursor-pointer px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
                                                Clear Filters
                                            </button>
                                        }

                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <p className="text-sm text-gray-500">
                                            Need help? <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Contact Support</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )

                        }
                        {paginatedUsers.map((user) => (
                            <div key={user._id} className="min-[500px]:grid flex justify-between lg:grid-cols-10 min-[900px]:grid-cols-8 min-[800px]:grid-cols-7 min-[700px]:grid-cols-6 min-[600px]:grid-cols-5 min-[500px]:grid-cols-3 gap-4 p-4 hover:bg-gray-50 transition-colors">
                                {/* User Info */}
                                <div className="min-[500px]:col-span-2 col-span-1 flex justify-start">
                                    <div className="flex items-center justify-start gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                            {user.userName.charAt(0)}
                                        </div>
                                        <div className='flex flex-col items-start justify-center'>
                                            <div className="font-medium text-gray-900">{user.userName}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="col-span-2 hidden min-[600px]:flex flex-col items-center justify-center">
                                    <div className="font-medium text-gray-900">{user.currentCompany}</div>
                                    <div className="text-sm text-gray-500">{user.designation}</div>
                                </div>

                                {/* Experience */}
                                <div className="col-span-1 hidden min-[800px]:flex justify-center items-center">
                                    <div className="text-sm font-medium text-gray-900">{user.experience}</div>
                                </div>

                                {/* Branch */}
                                <div className="col-span-1 hidden min-[700px]:flex  flex-col justify-center items-center">
                                    <div className="font-medium text-gray-900">{user.stream}</div>
                                    <div className="text-sm text-gray-500 text-center">{user.branch}</div>
                                </div>

                                {/* Contact */}

                                {/* Verification */}
                                <div className="col-span-1 hidden lg:flex justify-center items-center">
                                    <span>{user.passoutYear}</span>
                                </div>

                                <div className="col-span-1 hidden lg:flex justify-center items-center">
                                    <div className="text-sm text-gray-900">{user.contact}</div>
                                </div>


                                {/* Status */}
                                <div className="col-span-1 hidden min-[900px]:flex justify-center items-center" >
                                    <div>
                                        <span className={getStatusBadge(user.status)}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}

                                <div className="col-span-1 flex items-center justify-center">

                                    {
                                        filterStatus !== "Pending" &&

                                        <div className="flex flex-col justify-center items-start gap-2">
                                            <div className="flex items-center gap-1">
                                                {getVerificationIcon(user.emailVerify === "Verified")}
                                                <span className="text-xs text-gray-500">Email</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {getVerificationIcon(user.adminVerify === "Verified")}
                                                <span className="text-xs text-gray-500">Admin</span>
                                            </div>
                                        </div>
                                    }
                                    {
                                        filterStatus === "Pending" && <div className="flex items-center gap-2">
                                            <button onClick={() => handleVerify(user.alumniId)} className="p-2 text-white bg-green-400  hover:bg-green-500 rounded-lg transition-colors">
                                                {/* <Eye className="w-4 h-4" /> */}
                                                Verify
                                            </button>

                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} results
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

