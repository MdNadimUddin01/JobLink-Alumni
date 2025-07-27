import React, { useEffect, useState } from 'react';
import forumImage from "../../assets/Forum/addforum.jpg"
import { alumniAddForum, alumniUpdateForum, getForumData } from '../../Services/apiService/forumApiService';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const AddForum = () => {
    const [formData, setFormData] = useState({
        forumTopic: '',
        description: '',
        category : ''
    });

    const { forumId } = useParams();

    const { alumniMyForum } = useSelector(state => state.forum)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const getForumInfo = async () => {
        const data = await getForumData(forumId , navigate);

        {
            data && setFormData({
            forumTopic: data.forumTopic,
            description: data.description,
            category : data.category
        })}
    }

    useEffect(() => {

        if (forumId) {
            getForumInfo();
        }

    }, [forumId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (formData.forumTopic && formData.description && !forumId) {
            // Simulate API call
            await alumniAddForum(formData, navigate);
        }
        else if (formData.forumTopic && formData.description && forumId) {
            await alumniUpdateForum(formData, forumId , navigate)
        }

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const categories = [
        'General',
        'Support',
        'Gaming',
        'Education',
        'Creative',
        'Career'
    ];


    return (
        <div className="min-h-screen flex container mx-auto items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl sm:flex min-h-[600px] hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">

                <div className="flex-1 hidden sm:flex items-center justify-center relative overflow-hidden">
                    
                    <img src={forumImage} className='h-full'/>

                </div>

                <div className="flex-1 p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-3">
                            {!forumId ? "Create" : "Update"} Forum Topic
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg ">Fill in the details to start a new discussion</p>
                    </div>

                    <div className="space-y-6">
                        {/* Forum Topic Field */}
                        <div className="space-y-2">
                            <label htmlFor="forumTopic" className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                Forum Topic
                            </label>
                            <input
                                type="text"
                                id="forumTopic"
                                name="forumTopic"
                                placeholder="Enter your topic title..."
                                required
                                value={formData.forumTopic}
                                onChange={handleInputChange}
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl  text-sm sm:text-base md:text-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 focus:-translate-y-1"
                            />
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Describe your topic in detail..."
                                required
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl  text-sm sm:text-base md:text-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 focus:-translate-y-1 resize-y"
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select  Category</option>
                                {categories.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}

                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            className={`w-full py-4 px-8 rounded-xl text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group ${isSuccess
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                    : isSubmitting
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-purple-600 cursor-pointer text-white hover:bg-purple-700'
                                }`}
                        >
                            <span className="relative z-10">
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        {forumId ? "Updating..." : "Creating..."}
                                    </div>
                                ) : isSuccess ? (
                                        forumId ? '✓ Forum Updated!' : '✓ Forum Created!'
                                ) : (
                                            forumId ? 'Update Forum ' : 'Create Forum'
                                )}
                            </span>
                            {!isSubmitting && !isSuccess && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export  {AddForum};