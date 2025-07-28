import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { axiosInstance } from '../../Services';
import {toast} from "react-hot-toast"
export const VerifyEmail = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    console.table([email, id]);


    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error
    // const [copyStatus, setCopyStatus] = useState('Copy');


    const verifyEmail = async () => {
        setIsVerifying(true);
        const toastId = toast.loading("Verifying email ...")
        try {
            // Simulate API call
            const response = await axiosInstance({
                url: import.meta.env.VITE_BACKEND_URL +'/alumni/verifyEmail',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data : {email , id}
            });

            toast.success("Email verified ...", { id: toastId })
            
            setVerificationStatus('success');

            setTimeout(() => {
                navigate("/signIn");
            } , 1000)

        } catch (error) {
            setVerificationStatus('error');
            console.log("Error : " , error)
            toast.error("Email Verification Failed", { id: toastId })

            setTimeout(() => {
                setVerificationStatus('pending');
                setIsVerifying(false);
            }, 3000);
        }
        setIsVerifying(false);
        
    };

    // const copyLink = async () => {
    //     try {
    //         await navigator.clipboard.writeText(verificationLink);
    //         setCopyStatus('Copied!');
    //         setTimeout(() => setCopyStatus('Copy'), 2000);
    //     } catch (error) {
    //         alert('Failed to copy link. Please select and copy manually.');
    //     }
    // };

    const getButtonContent = () => {
        if (isVerifying) return '⏳ Verifying...';
        if (verificationStatus === 'success') return '✅ Verified Successfully!';
        if (verificationStatus === 'error') return '❌ Verification Failed';
        return '✓ Click to Verify My Email Address';
    };

    const getButtonColor = () => {
        if (verificationStatus === 'success') return 'from-green-400 to-green-500';
        if (verificationStatus === 'error') return 'from-red-500 to-red-600';
        return 'from-indigo-500 to-purple-600';
    };

    return (
        <div className=" flex items-center justify-center p-5">
            <div className=" bg-transparent overflow-hidden ">
                {/* Header */}
                {/* <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-spin origin-center w-full h-full"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-5 flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
                            <span className="text-3xl">🎓</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-2 tracking-tight">Alumni Tracker System</h1>
                        <p className="text-lg opacity-95">Connecting Alumni Communities</p>
                    </div>
                </div> */}

                {/* Content */}
                <div className="p-12 text-center">
                    {/* Email Icon with Animation */}
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-200 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse">
                        <span className="text-4xl">📧</span>
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-3 border-white animate-bounce">
                            !
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                        Verify Your Email Address
                    </h2>

                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        Welcome to the Alumni Tracker System! We're excited to have you join our community of alumni.
                        <br /><br />
                        To complete your registration and secure your account, please click the button below to verify your email address.
                    </p>

                    {/* Email Display */}
                    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                        <div className="absolute -top-4 left-5 bg-white px-3 py-1 rounded-full">
                            <span className="text-lg">✉️</span>
                        </div>
                        <p className="text-blue-900 mb-1">
                            <strong>Email to verify:</strong>
                        </p>
                        <p className="text-blue-800 text-xl font-bold tracking-wide">{email}</p>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={verifyEmail}
                        disabled={isVerifying || verificationStatus === 'success'}
                        className={`
                        relative overflow-hidden inline-block bg-gradient-to-r ${getButtonColor()} 
                        text-white font-bold text-lg px-10 py-5 rounded-full 
                        shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                        active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed
                        ${isVerifying ? 'cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <span className="relative z-10">{getButtonContent()}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full transition-transform duration-500 hover:translate-x-full"></div>
                    </button>

                    {/* Success Message */}
                    {verificationStatus === 'success' && (
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-5 mt-5 text-green-800">
                            <strong>✅ Email Verified Successfully!</strong><br />
                            Your account is now active. You will be redirected to the login page shortly.
                        </div>
                    )}

                    {/* Alternative Section */}
                    {/* <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-l-6 border-indigo-500 rounded-r-2xl p-8 mt-10">
                        <div className="absolute -top-3 -left-4 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-content text-sm">
                            🔗
                        </div>
                        <h3 className="text-gray-800 mb-4 text-lg font-semibold">🔗 Having trouble with the button?</h3>
                        <p className="text-gray-600 mb-4 text-sm">You can also copy and paste this verification link into your browser:</p>

                        <div
                            className="bg-gray-200 p-4 rounded-xl font-mono text-xs break-all cursor-pointer hover:bg-gray-300 transition-colors relative"
                            onClick={copyLink}
                        >
                            {verificationLink}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyLink();
                                }}
                                className={`absolute top-2 right-2 px-3 py-1 rounded text-xs font-sans transition-colors ${copyStatus === 'Copied!'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                                    }`}
                            >
                                {copyStatus}
                            </button>
                        </div>
                    </div> */}

                    {/* Security Notice */}
                    {/* <div className="relative bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-300 rounded-2xl p-6 mt-8">
                        <div className="absolute -top-4 left-5 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-base">
                            🔒
                        </div>
                        <h3 className="text-yellow-800 font-bold text-lg mb-3">🔒 Security Notice</h3>
                        <p className="text-yellow-700 text-sm leading-relaxed">
                            This verification link will expire in 24 hours for your security. If you didn't create an account with Alumni Tracker System, please ignore this message and delete this email.
                        </p>
                    </div> */}
                </div>

                {/* Footer */}
               
            </div>
        </div>
    );
};

