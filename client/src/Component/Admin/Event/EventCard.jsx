import React, { useState } from 'react';

export const EventCard = ({
    serialNo = 1,
    eventName = "Annual Tech Conference 2025",
    startDate = "2025-07-15",
    endDate = "2025-07-17",
    startTime = "09:00",
    endTime = "18:00",
    location = "Convention Center, New Delhi",
    description = "Join us for three days of cutting-edge technology discussions, networking opportunities, and hands-on workshops. This premier event brings together industry leaders, developers, and innovators from across the globe.",
    eventType = "Conference",
    criteria = "Open to all professionals with 2+ years experience in technology",
    modeOfApply = "Online",
    applyFrom = "2025-06-01",
    applyTill = "2025-07-10",
    uploadTime = "2025-05-15T10:30:00",
    onUpdate = () => { },
    onDelete = () => { },
    isAdmin = true
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getEventTypeColor = (type) => {
        const colors = {
            'Conference': 'bg-blue-500 text-white',
            'Workshop': 'bg-green-500 text-white',
            'Seminar': 'bg-purple-500 text-white',
            'Competition': 'bg-red-500 text-white',
            'Webinar': 'bg-amber-500 text-white',
            'default': 'bg-gray-500 text-white'
        };
        return colors[type] || colors.default;
    };

    const isApplicationOpen = () => {
        const now = new Date();
        const applyFromDate = new Date(applyFrom);
        const applyTillDate = new Date(applyTill);
        return now >= applyFromDate && now <= applyTillDate;
    };

    const truncateDescription = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getDaysUntilEvent = () => {
        const now = new Date();
        const eventDate = new Date(startDate);
        const diffTime = eventDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getDaysUntilApplication = () => {
        const now = new Date();
        const applyTillDate = new Date(applyTill);
        const diffTime = applyTillDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntilEvent = getDaysUntilEvent();
    const daysUntilApplication = getDaysUntilApplication();

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
            {/* Header with Event Type Badge */}
            <div className="relative">
                <div className={`${getEventTypeColor(eventType)} px-6 py-4`}>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold uppercase tracking-wide">{eventType}</span>
                        <span className="text-sm opacity-90">#{serialNo}</span>
                    </div>
                </div>
                {daysUntilEvent > 0 && daysUntilEvent <= 30 && (
                    <div className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        {daysUntilEvent} days left
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Event Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {eventName}
                </h3>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    {/* Date */}
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">📅 Date</div>
                        <div className="text-sm font-bold text-gray-900">{formatDate(startDate)}</div>
                        {startDate !== endDate && (
                            <div className="text-xs text-gray-600">to {formatDate(endDate)}</div>
                        )}
                    </div>

                    {/* Time */}
                    <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">🕒 Time</div>
                        <div className="text-sm font-bold text-gray-900">{formatTime(startTime)}</div>
                        <div className="text-xs text-gray-600">to {formatTime(endTime)}</div>
                    </div>
                </div>

                {/* Location */}
                <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">📍 Location</div>
                    <div className="text-sm font-medium text-gray-900">{location}</div>
                </div>

                {/* Description */}
                <div className="mb-5">
                    <div className="text-gray-700 text-sm leading-relaxed">
                        {showFullDescription ? description : truncateDescription(description)}
                        {description.length > 100 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-blue-600 hover:text-blue-800 ml-2 font-semibold text-xs underline"
                            >
                                {showFullDescription ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Application Section */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="text-sm font-bold text-gray-700">🎯 Application</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${isApplicationOpen()
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            {isApplicationOpen() ? '✅ OPEN' : '❌ CLOSED'}
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Apply From:</span>
                            <span className="font-semibold">{formatDate(applyFrom)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Apply Till:</span>
                            <span className="font-semibold">{formatDate(applyTill)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Mode:</span>
                            <span className="font-semibold">🌐 {modeOfApply}</span>
                        </div>

                        {isApplicationOpen() && daysUntilApplication > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-3">
                                <div className="text-yellow-800 text-xs font-bold">
                                    ⏰ {daysUntilApplication} days left to apply!
                                </div>
                            </div>
                        )}
                    </div>

                    {criteria && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                            <div className="text-purple-600 text-xs font-semibold uppercase tracking-wide mb-1">👥 Eligibility</div>
                            <div className="text-xs text-gray-700">{criteria}</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                        📤 Uploaded: {new Date(uploadTime).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        {isApplicationOpen() && (
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                🚀 Apply Now
                            </button>
                        )}

                        {isAdmin && (
                            <div className="flex items-center gap-1 ml-3">
                                <button
                                    onClick={onUpdate}
                                    className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-blue-200"
                                    title="Update Event"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
                                    title="Delete Event"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

