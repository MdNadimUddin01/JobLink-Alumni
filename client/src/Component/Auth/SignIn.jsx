import React, { useState } from 'react';
import loginImage from "../../assets/login.avif"
import { loginUser } from '../../Services';
import { useDispatch, useSelector } from 'react-redux';
import { data, Link, useNavigate } from 'react-router';

export const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; 
    };

    const clearError = (fieldName) => {
        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        clearError(name);
        clearError('general');
    };

    const user = useSelector((state) => state.profile.user);

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const hanldeLogin = async () => {
        try {
            setIsLoading(true);
            setErrors(prev => ({ ...prev, general: '' }));

            const login = await loginUser({
                email: formData.email,
                password: formData.password
            }, navigate, dispatch);

        } catch (error) {
            console.log(error);

            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || error.response.data?.error;

                if (status === 401) {
                    setErrors(prev => ({
                        ...prev,
                        general: 'Invalid email or password. Please try again.'
                    }));
                } else if (status === 404) {
                    setErrors(prev => ({
                        ...prev,
                        general: 'Account not found. Please check your email or sign up.'
                    }));
                } else if (status >= 500) {
                    setErrors(prev => ({
                        ...prev,
                        general: 'Server error. Please try again later.'
                    }));
                } else {
                    setErrors(prev => ({
                        ...prev,
                        general: message || 'Login failed. Please try again.'
                    }));
                }
            } else if (error.request) {
                setErrors(prev => ({
                    ...prev,
                    general: 'Network error. Please check your internet connection.'
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    general: 'An unexpected error occurred. Please try again.'
                }));
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Data : ");

        if (validateForm()) {
            hanldeLogin();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="hidden mx-auto items-center justify-center md:flex sm:w-1/2 bg-gradient-to-br from-pink-600 to-purple-700 relative overflow-hidden">
                <div className="relative z-10 flex flex-col gap-8 justify-center items-center text-white p-12">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Sign in to access your account and continue your journey with us.
                        </p>
                    </div>

                    <img className='rounded-md object-contain w-[80%]' src={loginImage}></img>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-gray-600">Enter your credentials to access your account</p>
                    </div>

                    {errors.general && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <span className="text-red-400 text-lg mr-2">⚠️</span>
                                <p className="text-red-700 text-sm">{errors.general}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-lg">📧</span>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg transition duration-200 bg-white ${errors.email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                        }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">❌</span>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 text-lg">🔒</span>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg transition duration-200 bg-white ${errors.password
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                        }`}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                                >
                                    <span className="text-gray-400 text-lg">
                                        {showPassword ? '🙈' : '👁️'}
                                    </span>
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <span className="mr-1">❌</span>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                className="text-sm cursor-pointer text-purple-600 hover:text-purple-500 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-purple-500 hover:bg-purple-600 cursor-pointer'
                                } text-white focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <span className="mr-2">⏳</span>
                                    Signing In...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative text-center">
                                <span className=" bg-gray-50 px-2 text-gray-500">Or</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account ?{' '}
                            <Link
                                to={"/signUp"}
                                type="button"

                                className="text-purple-600 cursor-pointer hover:text-purple-500 font-medium"
                            >
                                Sign up here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}