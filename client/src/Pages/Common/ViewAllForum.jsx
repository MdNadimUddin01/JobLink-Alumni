import React, { useCallback, useEffect, useState } from 'react';
import { adminGetAllForum, alumniViewForum, getAllForum, getAllJoinedForum } from '../../Services/apiService';
import { ForumCard, Loader, Title } from '../../Component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { getAllForumIfLogin } from '../../Services/apiService/forumApiService';
// import { ForumCard } from './ForumCard';

const ViewAllForum = ({ myform, joinedForm, allForm }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();
    const [forums, setForums] = useState([]);
    // const { alumniMyForum } = useSelector(state => state.profile.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const loadAllFormData = async () => {
        // setLoading(true)
        const result = await getAllForum(navigate);
        setForums(result);
    }

    const loadAllFormDataIfLogin = async () => {
        const result = await getAllForumIfLogin(navigate);
        setForums(result);
    }

    const { user } = useSelector(state => state.profile)

    const [adminForm, setAdminForum] = useState(user && user.role === "Admin");

    const getMyForm = async () => {
        // setLoading(true)
        const result = await alumniViewForum(navigate);
        setForums(result)
        // setLoading(false)
    }

    const getJoinedForm = async () => {
        const alumniJoinedForum = await getAllJoinedForum(dispatch, navigate)
        setForums(alumniJoinedForum)
    }

    const getAdminForm = async () => {
        // setLoading(true)
        const result = await adminGetAllForum(navigate);
        setForums(result)
        // setLoading(false)
    }

    const forumData = useCallback(async () => {
        setLoading(true);
        console.log(user)
        try {
            if (adminForm) {
                await getAdminForm()
            }
            else if (allForm) {
                user ? await loadAllFormDataIfLogin() : await loadAllFormData();
            } else if (myform) {
                await getMyForm();
            }
            else if (joinedForm) {
                await getJoinedForm();
            }

        } catch (error) {
            console.log(error);
        }

        // setTimeout(() => {
        // } , 3000)
        setLoading(false)


    }, [myform, joinedForm, allForm, adminForm]);



    useEffect(() => {
        // setLoading(true)
        console.table([myform, joinedForm, allForm, adminForm]);
        forumData();
        // setLoading(false)
    }, [myform, joinedForm, allForm, adminForm, forumData]);



    const categories = [
        { id: 'All', name: 'All Forums', count: forums.length },
        { id: 'General', name: 'General', count: forums.filter(f => f.category === 'General').length },
        { id: 'Support', name: 'Support', count: forums.filter(f => f.category === 'Support').length },
        { id: 'Gaming', name: 'Gaming', count: forums.filter(f => f.category === 'Gaming').length },
        { id: 'Creative', name: 'Creative', count: forums.filter(f => f.category === 'Creative').length },
        { id: 'Career', name: 'Career', count: forums.filter(f => f.category === 'Career').length },
        { id: 'Education', name: 'Education', count: forums.filter(f => f.category === 'Education').length }
    ];

    const filteredForums = forums.filter(forum => {
        const matchesSearch = forum.forumTopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            forum.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || forum.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen mx-auto container bg-gradient-to-br from-slate-50 to-slate-100 py-4">

            {!loading && <div className="text-center">
                <div className="relative inline-block mb-4">
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl animate-pulse"></div> */}
                    <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-4xl animate-bounce">🚀</span>
                    </div>
                </div>

                {myform && <Title title1={"My"} title2={"Forum"} />}

                {joinedForm && <Title title1={"Joined"} title2={"Forum"} />}

                {allForm && (!user || user.role !== "Admin") && <Title title1={"All"} title2={"Forum"} />}

                {adminForm && <Title title1={"Admin"} title2={"Forum"} />}

                <p className="text-xl lg:text-2xl text-black/80 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                    Unlock exclusive opportunities curated by our elite alumni network.
                    <span className="block mt-2 text-black/60">Your next big break is just one click away.</span>
                </p>

                <div className="flex justify-center mb-6">
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                </div>
            </div>}

            {
                loading && <Loader />
            }

            {!loading && <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Search and Filter Bar */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                        <input
                            type="text"
                            placeholder="Search forums..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200 text-sm sm:text-base"
                        />
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-2">
                        <span className="text-slate-500 text-lg">⚙️</span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-shadow duration-200 text-sm sm:text-base min-w-0"
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name} ({category.count})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-xs sm:text-sm font-medium">Total Forums</p>
                                <p className="text-xl sm:text-2xl font-bold text-slate-800">{forums.length}</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-blue-600 text-xl sm:text-2xl">📋</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-xs sm:text-sm font-medium">Total Members</p>
                                <p className="text-xl sm:text-2xl font-bold text-slate-800">{forums.reduce((acc, forum) => acc + forum.members, 0).toLocaleString()}</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-green-600 text-xl sm:text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-xs sm:text-sm font-medium">Total Posts</p>
                                <p className="text-xl sm:text-2xl font-bold text-slate-800">{forums.reduce((acc, forum) => acc + forum.posts, 0).toLocaleString()}</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-purple-600 text-xl sm:text-2xl">📝</span>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Forum Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredForums.map((forum) => (
                        <ForumCard allForm={allForm} adminForm={adminForm} myform={myform} key={forum._id} forum={forum} joinedForm={joinedForm} forumData={forumData} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredForums.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-slate-400 text-2xl">🔍</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-700 mb-6">No forums found</h3>
                        {forums.length > 0 && <p className="text-slate-500">Try adjusting your search or filter criteria.</p>}
                        {forums.length == 0 && user && <Link to={"/alumni/addForum"} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Create Forum
                        </Link>}

                    </div>
                )}
            </div>
            }

        </div>
    );
};

export { ViewAllForum };