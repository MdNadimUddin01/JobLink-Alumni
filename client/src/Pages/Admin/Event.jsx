import { useEffect, useState } from "react";
import { EventCard } from "../../Component/Admin/Event";
import { deleteEventData, getAllEventData } from "../../Services/apiService";

// Demo component showing multiple cards
export const Event = () => {

    const [event , setEvent] = useState([]);

    const loadEvent = async () => {
        
        const result = await getAllEventData();
        setEvent(result);

    }

    useEffect(() => {
        loadEvent();
    }, []);

    const deleteEvent = async (eventId) => {
        await deleteEventData(eventId);
        console.log("Deleted");
        loadEvent();
    }
    // const sampleEvents = [
    //     {
    //         serialNo: 1,
    //         eventName: "Annual Tech Conference 2025",
    //         startDate: "2025-07-15",
    //         endDate: "2025-07-17",
    //         startTime: "09:00",
    //         endTime: "18:00",
    //         location: "Convention Center, New Delhi",
    //         description: "Join us for three days of cutting-edge technology discussions, networking opportunities, and hands-on workshops. This premier event brings together industry leaders, developers, and innovators from across the globe.",
    //         eventType: "Conference",
    //         criteria: "Open to all professionals with 2+ years experience in technology",
    //         modeOfApply: "Online",
    //         applyFrom: "2025-06-01",
    //         applyTill: "2025-07-10",
    //         uploadTime: "2025-05-15T10:30:00"
    //     },
    //     {
    //         serialNo: 2,
    //         eventName: "AI/ML Workshop Series",
    //         startDate: "2025-08-05",
    //         endDate: "2025-08-05",
    //         startTime: "14:00",
    //         endTime: "17:00",
    //         location: "Tech Hub, Bangalore",
    //         description: "Hands-on workshop covering the fundamentals of Artificial Intelligence and Machine Learning. Perfect for beginners looking to enter the field.",
    //         eventType: "Workshop",
    //         criteria: "Basic programming knowledge required",
    //         modeOfApply: "Online",
    //         applyFrom: "2025-07-01",
    //         applyTill: "2025-08-01",
    //         uploadTime: "2025-06-20T15:45:00"
    //     },
    //     {
    //         serialNo: 3,
    //         eventName: "Startup Pitch Competition",
    //         startDate: "2025-09-10",
    //         endDate: "2025-09-10",
    //         startTime: "10:00",
    //         endTime: "16:00",
    //         location: "Innovation Center, Mumbai",
    //         description: "Present your startup idea to a panel of investors and industry experts. Winner receives funding and mentorship opportunities.",
    //         eventType: "Competition",
    //         criteria: "Early-stage startups with innovative business ideas",
    //         modeOfApply: "Online",
    //         applyFrom: "2025-08-01",
    //         applyTill: "2025-09-05",
    //         uploadTime: "2025-07-01T09:15:00"
    //     },
    //     {
    //         serialNo: 4,
    //         eventName: "Digital Marketing Webinar",
    //         startDate: "2025-06-28",
    //         endDate: "2025-06-28",
    //         startTime: "15:00",
    //         endTime: "16:30",
    //         location: "Online Platform",
    //         description: "Learn the latest digital marketing strategies and trends. Interactive session with Q&A.",
    //         eventType: "Webinar",
    //         criteria: "Open to all marketing professionals and students",
    //         modeOfApply: "Online",
    //         applyFrom: "2025-06-20",
    //         applyTill: "2025-06-25",
    //         uploadTime: "2025-06-15T11:20:00"
    //     }
    // ];

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 ${event.length == 0 ? "" : ""}`} >
            {event.length > 0 && <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">🎯 Upcoming Events</h1>
                    <p className="text-gray-600 text-lg">Discover amazing opportunities and register today!</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {event.length > 0 && event.map((event, index) => {
                        return <EventCard
                            key={index}
                            event={event}
                            serialNo={index + 1}
                            onUpdate={() => console.log('Update event:', event.serialNo)}
                            onDelete={() => deleteEvent(event._id)}
                            isAdmin={true}
                        />
                    })}
                </div>
            </div>}
            {
                event.length == 0 && <div className="flex flex-col mt-28 items-center justify-center py-16 px-6 text-center">
                    <div className="text-6xl mb-6 text-gray-300">
                        🗓️
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Events Found
                    </h3>

                    <p className="text-gray-500 max-w-md mb-6">
                        There are no events scheduled at the moment. Check back later for new events and updates.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Create Event
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Refresh
                        </button>
                    </div>
              </div>
            }
        </div>
    );
};

// export default Event;