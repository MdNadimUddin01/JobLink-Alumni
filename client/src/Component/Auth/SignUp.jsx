import React, { useState } from 'react';
import { FileUpload } from '../';
import axios from "axios";


export function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userName: '',
        contact: '',
        dateOfBirth: '',
        gender: '',
        passoutYear: '',
        stream: '',
        branch: '',
        experience: '',
        currentCompany: '',
        designation: '',
        linkedInProfileLink: '',
    });

    const [profile, setProfile] = useState("");

    console.log(profile)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        handleSignUpapi();
    };


    const handleSignUpapi = async () => {

        try {

            console.log("FORM : ", formData);

            const {
                userName,
                contact,
                dateOfBirth,
                gender,
                passoutYear,
                stream,
                branch,
                experience,
                currentCompany,
                designation,
                linkedInProfileLink
            } = formData;

            const alumni = {
                userName,
                contact,
                dateOfBirth,
                gender,
                passoutYear,
                stream,
                branch,
                experience,
                currentCompany,
                designation,
                linkedInProfileLink
            }
            console.log("HELLEO")

            const formdata = new FormData();
            formdata.append("profile", profile, profile.name);
            formdata.append("email", formData.email);
            formdata.append("password", formData.password);

            console.log(formdata)

            // Convert object to JSON string
            formdata.append("alumni", JSON.stringify(alumni));

            const data = await axios.post("http://localhost:3000/api/alumni/signUp", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            console.log(data);

        } catch (error) {
            console.log("Error : ", error);
        }

    }

    return (
        <div className="min-h-screen w-full mx-auto bg-slate-50 flex">

            <div className='w-full mx-auto'>
                <div className="w-full flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-2xl">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-200">
                                    <span className="text-xl font-bold text-slate-600">👤</span>
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Create Your Account</h2>
                                <p className="text-slate-600">Please fill in your details to register</p>
                            </div>

                            <div className="space-y-8">
                                {/* Personal Information */}
                                <div className="border-b border-slate-200 pb-6">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                                        <span className="mr-2 text-slate-500 font-bold">👤</span>
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">✉</span>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                                Password <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">🔒</span>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Create password"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="userName" className="block text-sm font-medium text-slate-700">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">@</span>
                                                <input
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    required
                                                    value={formData.userName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Choose username"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="contact" className="block text-sm font-medium text-slate-700">
                                                Contact Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">📞</span>
                                                <input
                                                    type="tel"
                                                    id="contact"
                                                    name="contact"
                                                    required
                                                    value={formData.contact}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Phone number"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700">
                                                Date of Birth <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">📅</span>
                                                <input
                                                    type="date"
                                                    id="dateOfBirth"
                                                    name="dateOfBirth"
                                                    required
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="gender" className="block text-sm font-medium text-slate-700">
                                                Gender <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">👥</span>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    required
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <FileUpload setFile={setProfile} />


                                </div>

                                {/* Academic Information */}
                                <div className="border-b border-slate-200 pb-6">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                                        <span className="mr-2 text-slate-500 font-bold">🎓</span>
                                        Academic Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="passoutYear" className="block text-sm font-medium text-slate-700">
                                                Passout Year <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">📅</span>
                                                <input
                                                    type="number"
                                                    id="passoutYear"
                                                    name="passoutYear"
                                                    min="1990"
                                                    max="2030"
                                                    required
                                                    value={formData.passoutYear}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Graduation year"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="stream" className="block text-sm font-medium text-slate-700">
                                                Stream <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">📚</span>
                                                <select
                                                    id="stream"
                                                    name="stream"
                                                    required
                                                    value={formData.stream}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                >
                                                    <option value="">Select Stream</option>
                                                    <option value="engineering">Engineering</option>
                                                    <option value="medical">Medical</option>
                                                    <option value="commerce">Commerce</option>
                                                    <option value="arts">Arts</option>
                                                    <option value="science">Science</option>
                                                    <option value="management">Management</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label htmlFor="branch" className="block text-sm font-medium text-slate-700">
                                                Branch/Specialization <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">🔬</span>
                                                <input
                                                    type="text"
                                                    id="branch"
                                                    name="branch"
                                                    required
                                                    value={formData.branch}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Your specialization"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Information */}
                                <div className="pb-6">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                                        <span className="mr-2 text-slate-500 font-bold">💼</span>
                                        Professional Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="experience" className="block text-sm font-medium text-slate-700">
                                                Years of Experience <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">📈</span>
                                                <select
                                                    id="experience"
                                                    name="experience"
                                                    required
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                >
                                                    <option value="">Select Experience</option>
                                                    <option value="0 Year">Fresher</option>
                                                    <option value="1 Year">1 Year</option>
                                                    <option value="2 Years">2 Years</option>
                                                    <option value="3 Years">3 Years</option>
                                                    <option value="4 Years">4 Years</option>
                                                    <option value="5 Years">5 Years</option>
                                                    <option value="6-10 Years">6-10 Years</option>
                                                    <option value="10+ Years">10+ Years</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="currentCompany" className="block text-sm font-medium text-slate-700">
                                                Current Company
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">🏢</span>
                                                <input
                                                    type="text"
                                                    id="currentCompany"
                                                    name="currentCompany"
                                                    value={formData.currentCompany}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Current workplace"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="designation" className="block text-sm font-medium text-slate-700">
                                                Current Designation
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">🆔</span>
                                                <input
                                                    type="text"
                                                    id="designation"
                                                    name="designation"
                                                    value={formData.designation}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="Job title"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="linkedInProfileLink" className="block text-sm font-medium text-slate-700">
                                                LinkedIn Profile
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400 text-sm">🔗</span>
                                                <input
                                                    type="url"
                                                    id="linkedInProfileLink"
                                                    name="linkedInProfileLink"
                                                    value={formData.linkedInProfileLink}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-500 focus:border-slate-500 bg-white"
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Terms and Submit */}
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="terms"
                                            required
                                            checked={formData.terms}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded mt-1 mr-3"
                                        />
                                        <label htmlFor="terms" className="text-sm text-slate-700 leading-relaxed">
                                            I agree to the{' '}
                                            <a href="#" className="text-slate-600 hover:text-slate-800 underline font-medium">
                                                Terms and Conditions
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="text-slate-600 hover:text-slate-800 underline font-medium">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <span>✓</span>
                                        <span>Create Account</span>
                                    </button>

                                    <div className="text-center">
                                        <p className="text-sm text-slate-600">
                                            Already have an account?{' '}
                                            <a href="#" className="text-slate-700 hover:text-slate-900 font-medium underline">
                                                Sign in here
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}