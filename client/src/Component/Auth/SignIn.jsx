import React, { useState } from 'react';
import loginImage from "../../assets/login.avif"
import axios from "axios"
import { loginUser } from '../../Services';
import { useDispatch, useSelector } from 'react-redux';
import { data, useNavigate } from 'react-router';

export const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const user = useSelector((state) => state.profile.user);

    // console.log(user)


    const hanldeLogin = async () => {

        try {

            const login = loginUser({ email: formData.email, password: formData.password });
            await login(dispatch, navigate);
            console.log("user : " , user);
            
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SUbmitting Data : ");
        hanldeLogin();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Image */}
            <div className="hidden mx-auto items-center justify-center md:flex sm:w-1/2 bg-gradient-to-br from-pink-600 to-purple-700 relative overflow-hidden">
                {/* <div className="absolute inset-0  bg-opacity-20"></div> */}

                <div className="relative z-10 flex flex-col gap-8 justify-center items-center text-white p-12">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Sign in to access your account and continue your journey with us.
                        </p>
                    </div>

                    <img className='rounded-md object-contain w-[80%]' src={loginImage}></img>
                </div>
                {/* Decorative circles */}
                {/* <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
                <div className="absolute top-1/2 right-32 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div> */}
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-gray-600">Enter your credentials to access your account</p>
                    </div>

                    <div className="space-y-6">

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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition duration-200 bg-white"
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>
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
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg    transition duration-200 bg-white"
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
                            type="button"
                            onClick={handleSubmit}
                            className="w-full cursor-pointer bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
                        >
                            Sign In
                        </button>



                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative text-center">
                                <span className=" bg-gray-50 px-2 text-gray-500">Or</span>
                            </div>
                        </div>




                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account ?{' '}
                            <button
                                type="button"
                                className="text-purple-600 cursor-pointer hover:text-purple-500 font-medium"
                            >
                                Sign up here
                            </button>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}