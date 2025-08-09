import { useEffect, useState } from "react";
import { EventCard } from "../../Component/Admin/Event";
import { deleteEventData, getAllEventData } from "../../Services/apiService";
import { useNavigate } from "react-router";
import { Loader } from "../../Component";
import { useSelector } from "react-redux";

export const Event = () => {

    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.profile.user);
    console.log("USER : " , user)
    const loadEvent = async () => {
        setLoading(true)
        const result = await getAllEventData(navigate);
        setEvent(result);
        setLoading(false)

    }

    useEffect(() => {
        loadEvent();
    }, []);

    const deleteEvent = async (eventId) => {
        await deleteEventData(eventId, navigate);
        // console.log("Deleted");
        loadEvent();
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 ${event.length == 0 ? "" : ""}`} >
            {!loading && event.length > 0 && <div className="max-w-7xl mx-auto px-4">
                
                <div className="text-center">
                    <div className="relative inline-block mb-4">
                        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl animate-pulse"></div> */}
                        <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                            <span className="text-4xl animate-bounce">🚀</span>
                        </div>
                    </div>

                    <h1 className="text-6xl lg:text-7xl font-black mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            All
                        </span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                            {" "}Events
                        </span>
                    </h1>

                    <p className="text-xl lg:text-2xl text-black/80 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                        Discover amazing opportunities and register today!
                        <span className="block mt-2 text-black/60">Your next big break is just one click away.</span>
                    </p>

                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    </div>
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
                loading && <Loader/>
            }

            {!loading &&
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
                        {user && user.role == "Admin" && <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Create Event
                        </button>}
                        
                    </div>
                </div>
            }
        </div>
    );
};

// export default Event;