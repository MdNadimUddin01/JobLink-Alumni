import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const EventCard = ({
    event,
    serialNo,
    onUpdate = () => { },
    onDelete = () => { },
    isAdmin = true
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const user = useSelector((state) => state.profile.user);
    // console.log("USER : " , user)

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

    function parseTime(timeStr) {
        // Remove asterisks and extract time
        const cleanTime = timeStr.replace(/\*/g, '');
        const [time, period] = cleanTime.split(' ');
        const [hours, minutes] = time.split(':');

        let hour24 = parseInt(hours);

        if (period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }

        // console.log("timeStr")

        return hour24 * 60 + parseInt(minutes); // Convert to minutes for easy comparison
    }
    
    function convertIn12Hr(timeStr) {
        // Remove asterisks and extract time
        if(!timeStr) return "";
        // console.log("TIMEEEEE : ",  timeStr)
        const cleanTime = timeStr.replace(/\*/g, '');
        const [hours, minutes] = cleanTime.split(':');
        let temp = "AM";

        let hour12 = parseInt(hours);
        if (hour12 >= 12) {
            temp = "PM";
            hour12 -= (hour12 > 12 ? 12 : 0);
        } 

        return `${hour12}:${minutes} ${temp}`; // Convert to minutes for easy comparison
    }

    const isApplicationOpen = () => {
        const now = new Date((new Date()).toDateString()).getTime();
        const applyFromDate = new Date(event.applyFrom).getTime();
        const applyTillDate = new Date(event.applyTill).getTime();

        const time = parseTime((new Date()).toLocaleTimeString());
        const applyEndTime = parseTime(event.endTime);
      
        return (now >= applyFromDate && now <= applyTillDate) || (now == applyTillDate && time <= applyEndTime);
    };

    const truncateDescription = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getDaysUntilEvent = () => {
        const now = new Date();
        const eventDate = new Date(event.startDate);
        const diffTime = eventDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getDaysUntilApplication = () => {
        const now = new Date();
        const applyTillDate = new Date(event.applyTill);
        const diffTime = applyTillDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysUntilEvent = getDaysUntilEvent();
    const daysUntilApplication = getDaysUntilApplication();

    return (
        <div className="bg-white rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">

            <div className="relative">
                <div className={`${getEventTypeColor(event.typeOfEvent)} px-6 py-4`}>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold uppercase tracking-wide">{event.typeOfEvent}</span>
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

                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {event.eventName}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">📅 Date</div>
                        <div className="text-sm font-bold text-gray-900">{event.startDate}</div>
                        {event.startDate !== event.endDate && (
                            <div className="text-xs text-gray-600">to {event.endDate}</div>
                        )}
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">🕒 Time</div>
                        <div className="text-sm font-bold text-gray-900">{convertIn12Hr(event.startTime)}</div>
                        <div className="text-xs text-gray-600">to {convertIn12Hr(event.endTime)}</div>
                    </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <div className="text-red-600 text-xs font-semibold uppercase tracking-wide mb-1">📍 Location</div>
                    <div className="text-sm font-medium text-gray-900">{event.location}</div>
                </div>

                <div className="mb-5">
                    <div className="text-gray-700 text-sm leading-relaxed">
                        {showFullDescription ? event.description : truncateDescription(event.description)}
                        {event.description.length > 100 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-blue-600 cursor-pointer hover:text-blue-800 ml-2 font-semibold text-xs underline"
                            >
                                {showFullDescription ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>

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
                            <div className='flex gap-2'>
                                <span className="font-semibold">{convertIn12Hr(event.startTimeToApply)}</span>
                                <span className="font-semibold">{event.startDateToApply}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Apply Till:</span>
                            <div className='flex gap-2'>
                                <span className="font-semibold">{convertIn12Hr(event.endTimeToApply)}</span>
                                <span className="font-semibold">{event.lastDateToApply}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Mode:</span>
                            <span className="font-semibold">🌐 {event.modeOfApply}</span>
                        </div>

                        {isApplicationOpen() && daysUntilApplication > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-3">
                                <div className="text-yellow-800 text-xs font-bold">
                                    ⏰ {daysUntilApplication} days left to apply!
                                </div>
                            </div>
                        )}
                    </div>

                    {event.criteria && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                            <div className="text-purple-600 text-xs font-semibold uppercase tracking-wide mb-1">👥 Eligibility</div>
                            <div className="text-xs text-gray-700">{event.criteria}</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex flex-col">
                        <span>📤 Uploaded: </span>
                        <span>{
                            event.uploadDate
                        }</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {(!user || user.role !== "Admin") && isApplicationOpen() && (
                            <button className=" cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                🚀 Apply Now
                            </button>
                        )}

                        {(!user || user.role !== "Admin") &&
                            !isApplicationOpen() && (
                                <button className=" cursor-pointer bg-gradient-to-r from-gray-600 to-gray-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                    🚀 Form Closed
                                </button>
                            )
                        }

                        {user && user.role === "Admin" && (
                            <div className="flex items-center gap-1 ml-3">
                                <button
                                    onClick={onUpdate}
                                    className="px-3 py-2 text-gray-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-blue-200"
                                    title="Update Event"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="px-3 py-2 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-semibold border border-gray-200 hover:border-red-200"
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

