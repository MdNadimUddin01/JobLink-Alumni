import React, { useState } from 'react';
import { addJobPost, updateJobData, viewJobData } from '../../Services/apiService';
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from 'react';



export const AddJob = () => {
    const [formData, setFormData] = useState({
        jobId: '',
        post: '',
        companyName: '',
        noOfVacancy: '',
        salary: '',
        location: '',
        bond: 'No bound',
        timings: '',
        applystartDate: '',
        applyEndDate: '',
        requirement: '',
        jobType: 'Internship',
        status: true,
        referralAvailable: 'No',
    });

    const navigate = useNavigate();

    const { jobId } = useParams();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getJobData = async () => {
        const data = await viewJobData(jobId);
        setFormData(data);
    }

    useEffect(() => {

        if (jobId) {
            getJobData();
        }

    }, [jobId])
    
    const handleUpdate = async () => {
        
        if (jobId) {
            const res = await updateJobData(formData, jobId, navigate);
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // console.table(name, value, type, checked)
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.post.trim()) newErrors.post = 'Job position is required';
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.noOfVacancy || formData.noOfVacancy <= 0) newErrors.noOfVacancy = 'Number of vacancies must be greater than 0';
        if (!formData.salary.trim()) newErrors.salary = 'Salary is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.timings.trim()) newErrors.timings = 'Timings are required';
        if (!formData.applystartDate) newErrors.applystartDate = 'Application start date is required';
        if (!formData.applyEndDate) newErrors.applyEndDate = 'Application end date is required';
        if (!formData.requirement.trim()) newErrors.requirement = 'requirement  is required';

        // Date validation
        if (formData.applystartDate && formData.applyEndDate) {
            const startDate = new Date(formData.applystartDate);
            const endDate = new Date(formData.applyEndDate);
            if (endDate <= startDate) {
                newErrors.applyEndDate = 'End date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await addJobPost(formData, navigate);

            console.log('Job posting data:', {
                ...formData,
                noOfVacancy: parseInt(formData.noOfVacancy),
                postDate: new Date().toDateString(),
                postTime: new Date().toLocaleTimeString()
            });



            // Reset form
            setFormData({
                jobId: '',
                post: '',
                companyName: '',
                noOfVacancy: '',
                salary: '',
                location: '',
                bond: 'No bound',
                timings: '',
                applystartDate: '',
                applyEndDate: '',
                requirement: '',
                jobType: 'Internship',
                status: true
            });

        } catch (error) {
            alert('Error posting job. Please try again.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m5 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Post New Position</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Create compelling job opportunities that attract the best talent. Fill in the comprehensive details below to publish your position.
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Form Content */}
                    <div className="p-10">

                        {/* Basic Information Section */}
                        <div className="mb-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                                    <p className="text-gray-600 mt-1">Essential details about the position</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Job ID <span >(If Any)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="jobId"
                                        value={formData.jobId}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.jobId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Enter unique job identifier"
                                    />

                                </div>

                                <div className="space-y-2">

                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Referral Available
                                    </label>

                                    <select name='referralAvailable' onChange={handleInputChange} value={formData.referralAvailable} className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.jobId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>

                                </div>


                            </div>
                        </div>

                        {/* Job Details Section */}
                        <div className="mb-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Position Details</h2>
                                    <p className="text-gray-600 mt-1">Comprehensive job information</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Job Position <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="post"
                                        value={formData.post}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.post ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="e.g., Senior Software Engineer"
                                    />
                                    {errors.post && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.post}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Company Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Enter company name"
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Number of Vacancies <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="noOfVacancy"
                                        value={formData.noOfVacancy}
                                        onChange={handleInputChange}
                                        min="1"
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.noOfVacancy ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Number of open positions"
                                    />
                                    {errors.noOfVacancy && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.noOfVacancy}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Salary Package <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.salary ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="e.g., $75,000 - $95,000 annually"
                                    />
                                    {errors.salary && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.salary}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="City, State/Country or Remote"
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Contract Details
                                    </label>
                                    <input
                                        type="text"
                                        name="bond"
                                        value={formData.bond}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                        placeholder="e.g., 2 years service agreement or No bond"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Working Hours <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="timings"
                                        value={formData.timings}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.timings ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="e.g., 9:00 AM - 6:00 PM (Monday - Friday)"
                                    />
                                    {errors.timings && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.timings}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Employment Type
                                    </label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 bg-white"
                                    >
                                        <option value="Internship">Internship</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Application Timeline Section */}
                        <div className="mb-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1M8 7h8m-9 4v10a2 2 0 002 2h8a2 2 0 002-2V11a2 2 0 00-2-2H9a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Application Timeline</h2>
                                    <p className="text-gray-600 mt-1">Define application period</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Application Opens <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="applystartDate"
                                        value={formData.applystartDate}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.applystartDate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    />
                                    {errors.applystartDate && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.applystartDate}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Application Deadline <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="applyEndDate"
                                        value={formData.applyEndDate}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.applyEndDate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                    />
                                    {errors.applyEndDate && (
                                        <p className="text-red-500 text-xs mt-2 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.applyEndDate}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Requirements Section */}
                        <div className="mb-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Requirements & Qualifications</h2>
                                    <p className="text-gray-600 mt-1">Detailed candidate requirements</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Requirement <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="requirement"
                                    value={formData.requirement}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y ${errors.requirement ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    placeholder="Describe the experience requirement, technical skills, educational qualifications, certifications, and any other relevant requirements for this position..."
                                />
                                {errors.requirement && (
                                    <p className="text-red-500 text-xs mt-2 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.requirement}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="mb-12">
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Publication Status</h2>
                                    <p className="text-gray-600 mt-1">Control job posting visibility</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 pt-1">
                                        <input
                                            type="checkbox"
                                            name="status"
                                            checked={formData.status}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-emerald-600 border-2 border-emerald-300 rounded focus:ring-emerald-500 focus:ring-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                                            Activate Job Posting
                                        </h3>
                                        <p className="text-emerald-700 text-sm leading-relaxed">
                                            When enabled, this job posting will be visible to candidates and they can submit applications.
                                            You can disable this later to pause applications without deleting the posting.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                                <div className="text-sm text-gray-500">
                                    <span className="text-red-500">*</span> Required fields
                                </div>

                                <div className="flex space-x-4">

                                    <button
                                        type="button"
                                        onClick={jobId ? handleUpdate : handleSubmit}
                                        disabled={isSubmitting}
                                        className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center space-x-2">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Publishing...</span>
                                            </div>
                                        ) : (
                                            !jobId ?  (<div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                <span>Publish Job</span>
                                            </div>)
                                            :
                                             (<div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                <span>Update Job</span>
                                            </div>)

                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

