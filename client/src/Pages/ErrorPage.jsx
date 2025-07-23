import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-purple-500 p-6">
                    <div className="flex justify-center">
                        <svg className="h-24 w-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="p-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                        <p className="text-gray-600 mb-6">
                            The page you're looking for doesn't exist or has been moved.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
                            >
                                Go Back
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-500">
                <p>
                    <b>If you believe this is an error, please contact support.</b>
                </p>
            </div>
        </div>
    );
};

