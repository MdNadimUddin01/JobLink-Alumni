import React from 'react'
import CTAButton from './CTAButton'
import { data, Link, NavLink, useNavigate } from 'react-router'
import { DropDown, Logo } from './'
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from '../../Services/apiService'

function Navbar() {

    const { user } = useSelector((state) => state.profile);
    // console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminList = [
        {
            path: "/",
            label: "Home"
        },
        {
            label: "Events",
            data: [
                {
                    path: "/admin/events",
                    label: "View Events"
                },
                {
                    path: "/admin/addEvent",
                    label: "Add Event"
                }
            ]
        },
        {
            path: "/Jobs",
            label: "Jobs"
        },
        {
            path: "/admin/alumni",
            label: "Alumni"
        },
        {
            path: "/forums",
            label: "Forums"
        },
        {
            path: "/admin/gallery",
            label: "Gallery"
        }
    ];

    const alumniList = [
        {
            path: "/",
            label: "Home"
        },
        {
            label: "Jobs",
            path: "/jobs",
            data: [
                {
                    path: "/jobs",
                    label: "View All Jobs"
                },
                {
                    path: "/alumni/viewMyJob",
                    label: "My Jobs"
                },
                {
                    path: "/alumni/addjobPost",
                    label: "Add Job"
                }
            ]
        },
        {
            path: "/events",
            label: "Events"
        },
        {
            path: "/forums",
            label: "Forums",
            data: [
                {
                    path: "/forums",
                    label: "View All Forums"
                },
                {
                    path: "/alumni/viewMyForum",
                    label: "My forums"
                },
                {
                    path: "/alumni/viewJoinedForum",
                    label: "Joined Forum"
                },
                {
                    path: "/alumni/addForum",
                    label: "Add Forum"
                }

            ]
        },
        {
            path: "/faqs",
            label: "FAQS"
        },
        {
            path: "/about",
            label: "About"
        }
    ]

    const handleLogout = async () => {

        // console.log("Logout")
        logoutUser(dispatch, navigate);

    }


    return (
        <div className='w-full py-4  bg-gradient-to-b from-gray-50 to-gray-50 border-b border-gray-200'>

            <div className='container hidden   mx-auto sm:flex justify-between items-center'>

                <div className='flex gap-2 justify-center items-center'>
                    <Logo property={'w-10 h-10 text-md'} />
                    <div className='text-xl'>
                        Alumini Tacker
                    </div>
                </div>

                <ul className='flex items-center gap-4 text-gray-600'>

                    {(!user || user.role === "Alumni") && (
                        alumniList.map((alumniLi) => (
                            alumniLi?.data != null && user ? <li key={alumniLi.label}><DropDown title={alumniLi.label} dataArray={alumniLi.data} /></li> : <li key={alumniLi.path}><NavLink to={alumniLi.path} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>{alumniLi.label}</NavLink></li>
                        ))
                    )
                    }


                    {
                        user && user.role === "Admin" &&
                        adminList.map((adminLi) =>
                            adminLi.label === "Events" ? <li key={adminLi.label}><DropDown title={adminLi.label} dataArray={adminLi.data} /></li> : <li key={adminLi.label}><NavLink to={adminLi.path} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>{adminLi.label}</NavLink></li>
                        )
                    }
                    {/* {
                        (user || user.role === "Alumni") &&
                        
                    } */}
                    {/* <li><NavLink to={""} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>Home</NavLink></li>
                    <li><NavLink to={"about"} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>About</NavLink></li>
                    <li><NavLink to={"jobs"} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>Jobs</NavLink></li>
                    <li><NavLink to={"forums"} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>Forums</NavLink></li>
                    <li><NavLink to={"faqs"} className={({ isActive }) => `${isActive ? "text-purple-500" : "text-gray-700"}`}>Faqs</NavLink></li> */}
                    {/* <li>Options</li> */}
                </ul>

                {
                    user && <div className='flex gap-4 items-center justify-center'>
                        <div>{user.role === "Admin" ? "Admin" : user.userName}</div>
                        <CTAButton handler={handleLogout} title={"Logout"}>

                        </CTAButton>
                    </div>
                }

                {!user && <div className="div flex gap-2">
                    <Link to={"signIn"}>
                        <CTAButton title={"Sign In"} handler={() => { }} property={"text-black"} />
                    </Link>
                    <Link to={"signUp"}>
                        <CTAButton title={"Sign Up"} handler={() => { }} property={"bg-purple-500 hover:bg-purple-600 text-white rounded-2xl  border-purple-100"} />
                    </Link>
                </div>}

            </div>

            <div className='container flex sm:hidden px-3'>
                <div className='font-extrabold'>
                    Alumini Tracker
                </div>
            </div>

        </div>
    )
}

export default Navbar
