import React, { useState } from 'react';
import axios from "axios";
import { eventEndpoints } from '../../../Utils/api';
import { addEvent } from '../../../Services/apiService';
import { useNavigate } from 'react-router';


export const AddEvent = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        typeOfEvent: '',
        criteria: '',
        modeOfApply: '',
        startDateToApply: '',
        lastDateToApply: '',
        startTimeToApply: '',
        endTimeToApply : '',
        status: true
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    
    const handleSubmit = async(e) => {
        e.preventDefault();

        await addEvent(formData , navigate);
       
        console.log(formData)
        // alert('Event added successfully!');
    };

    const applyModes = [
        'Online Application',
        'Email Registration',
        'Physical Registration',
        'Phone Registration',
        'Walk-in Registration'
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Event</h1>
                    <p className="text-gray-600">Create and manage your event details</p>
                </div>

                {/* Form */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8 space-y-8">

                        {/* Basic Information Section */}
                        <div className="border-b border-gray-200 pb-8">
                            <div className="flex items-center mb-6">
                                <span className="text-blue-600 mr-2 text-lg">📝</span>
                                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                            </div>

                            <div className='mb-6'>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Name *
                                </label>
                                <input
                                    type="text"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter event name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Type of Event *
                                    </label>
                                    <input
                                        type="text"
                                        name="typeOfEvent"
                                        value={formData.typeOfEvent}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder='Enter the type of event'
                                        required
                                    />

                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-400">📍</span>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter event location"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter event description"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date & Time Section */}
                        <div className="border-b border-gray-200 pb-8">
                            <div className="flex items-center mb-6">
                                <span className="text-blue-600 mr-2 text-lg">📅</span>
                                <h2 className="text-xl font-semibold text-gray-900">Date & Time</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Time *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-400">🕐</span>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Time *
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-400">🕐</span>
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Application Details Section */}
                        <div className="border-b border-gray-200 pb-8">
                            <div className="flex items-center mb-6">
                                <span className="text-blue-600 mr-2 text-lg">👥</span>
                                <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Criteria *
                                    </label>
                                    <textarea
                                        name="criteria"
                                        value={formData.criteria}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter eligibility criteria"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mode of Apply *
                                    </label>
                                    <select
                                        name="modeOfApply"
                                        value={formData.modeOfApply}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select application mode</option>
                                        {applyModes.map(mode => (
                                            <option key={mode} value={mode}>{mode}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Application Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="startDateToApply"
                                        value={formData.startDateToApply}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Date to Apply *
                                    </label>
                                    <input
                                        type="date"
                                        name="lastDateToApply"
                                        value={formData.lastDateToApply}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Time to Apply*
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-400">🕐</span>
                                        <input
                                            type="time"
                                            name="startTimeToApply"
                                            value={formData.startTimeToApply}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Time to Apply*
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-400">🕐</span>
                                        <input
                                            type="time"
                                            name="endTimeToApply"
                                            value={formData.endTimeToApply}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="pb-8">
                            <div className="flex items-center mb-6">
                                <span className="text-blue-600 mr-2 text-lg">⚙️</span>
                                <h2 className="text-xl font-semibold text-gray-900">Event Status</h2>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={formData.status}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    Event is active and visible to users
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                            >
                                <span className="mr-2">+</span>
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
