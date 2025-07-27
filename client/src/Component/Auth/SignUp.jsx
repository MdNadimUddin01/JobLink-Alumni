import React, { useState } from 'react';
import { FileUpload } from '../';
import axios from "axios";
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export function SignUp() {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

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
        terms: false
    });

    const [profile, setProfile] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        if (!formData.userName.trim()) {
            newErrors.userName = 'Name is required';
        } else if (formData.userName.trim().length < 2) {
            newErrors.userName = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.userName.trim())) {
            newErrors.userName = 'Name can only contain letters and spaces';
        }

        if (!formData.contact.trim()) {
            newErrors.contact = 'Contact number is required';
        } else if (!/^[0-9]{10}$/.test(formData.contact.replace(/\D/g, ''))) {
            newErrors.contact = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18 || age > 80) {
                newErrors.dateOfBirth = 'Age must be between 18 and 80 years';
            }
        }

        if (!formData.gender) {
            newErrors.gender = 'Please select your gender';
        }

        if (!formData.passoutYear) {
            newErrors.passoutYear = 'Passout year is required';
        } else {
            const year = parseInt(formData.passoutYear);
            const currentYear = new Date().getFullYear();
            if (year < 1990 || year > currentYear + 2) {
                newErrors.passoutYear = `Year must be between 1990 and ${currentYear + 2}`;
            }
        }

        if (!formData.stream) {
            newErrors.stream = 'Please select your stream';
        }

        if (!formData.branch.trim()) {
            newErrors.branch = 'Branch/Specialization is required';
        } else if (formData.branch.trim().length < 2) {
            newErrors.branch = 'Branch must be at least 2 characters long';
        }

        if (!formData.experience) {
            newErrors.experience = 'Please select your experience level';
        }

        if (formData.linkedInProfileLink.trim() &&
            !/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(formData.linkedInProfileLink)) {
            newErrors.linkedInProfileLink = 'Please enter a valid LinkedIn profile URL';
        }

        if (!formData.terms) {
            newErrors.terms = 'You must agree to the terms and conditions';
        }

        if (!profile) {
            newErrors.profile = 'Profile image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            handleSignUpapi();
        } else {
            toast.error('Please fix the errors in the form');
        }
    };

    const handleSignUpapi = async () => {
        if (isSubmitting) return; 

        setIsSubmitting(true);
        const toastId = toast.loading("Creating alumni account...");

        try {
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
                userName: userName.trim(),
                contact: contact.replace(/\D/g, ''), // Remove non-digits
                dateOfBirth,
                gender,
                passoutYear: parseInt(passoutYear),
                stream,
                branch: branch.trim(),
                experience,
                currentCompany: currentCompany.trim(),
                designation: designation.trim(),
                linkedInProfileLink: linkedInProfileLink.trim()
            }

            const formdata = new FormData();
            formdata.append("profile", profile, profile.name);
            formdata.append("email", formData.email.trim().toLowerCase());
            formdata.append("password", formData.password);
            formdata.append("alumni", JSON.stringify(alumni));

            const data = await axios.post(BASE_URL + "/alumni/signUp", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Alumni Account created successfully!", { id: toastId });
            navigate("/signIn");

        } catch (error) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Failed to create alumni account";

            if (error?.response?.status === 400) {
                if (errorMessage.toLowerCase().includes('email')) {
                    setErrors(prev => ({ ...prev, email: 'This email is already registered' }));
                } else if (errorMessage.toLowerCase().includes('username')) {
                    setErrors(prev => ({ ...prev, userName: 'This username is already taken' }));
                }
            }

            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInputClass = (fieldName) => {
        const baseClass = "w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-slate-500 bg-white";
        return errors[fieldName]
            ? `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500`
            : `${baseClass} border-slate-300 focus:ring-slate-500`;
    };

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

                            <form onSubmit={handleSubmit} className="space-y-8">
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
                                                    className={getInputClass('email')}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                                                    className={getInputClass('password')}
                                                    placeholder="Create password"
                                                />
                                            </div>
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
                                                    className={getInputClass('userName')}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
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
                                                    className={getInputClass('contact')}
                                                    placeholder="10-digit phone number"
                                                />
                                            </div>
                                            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
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
                                                    className={getInputClass('dateOfBirth')}
                                                />
                                            </div>
                                            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
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
                                                    className={getInputClass('gender')}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                            </div>
                                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <FileUpload setFile={setProfile} />
                                        {errors.profile && <p className="text-red-500 text-sm mt-1">{errors.profile}</p>}
                                    </div>
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
                                                    className={getInputClass('passoutYear')}
                                                    placeholder="Graduation year"
                                                />
                                            </div>
                                            {errors.passoutYear && <p className="text-red-500 text-sm mt-1">{errors.passoutYear}</p>}
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
                                                    className={getInputClass('stream')}
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
                                            {errors.stream && <p className="text-red-500 text-sm mt-1">{errors.stream}</p>}
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
                                                    className={getInputClass('branch')}
                                                    placeholder="Your specialization"
                                                />
                                            </div>
                                            {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
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
                                                    className={getInputClass('experience')}
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
                                            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
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
                                                    className={getInputClass('currentCompany')}
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
                                                    className={getInputClass('designation')}
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
                                                    className={getInputClass('linkedInProfileLink')}
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                />
                                            </div>
                                            {errors.linkedInProfileLink && <p className="text-red-500 text-sm mt-1">{errors.linkedInProfileLink}</p>}
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
                                    {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${isSubmitting
                                                ? 'bg-slate-400 cursor-not-allowed'
                                                : 'bg-slate-700 hover:bg-slate-800 cursor-pointer'
                                            } text-white`}
                                    >
                                        <span>{isSubmitting ? '⏳' : '✓'}</span>
                                        <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}