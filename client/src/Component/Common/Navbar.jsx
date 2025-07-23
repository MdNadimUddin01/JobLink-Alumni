import React, { useState } from 'react'
import CTAButton from './CTAButton'
import { data, Link, NavLink, useNavigate } from 'react-router'
import { DropDown, Logo } from './'
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from '../../Services/apiService'

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

            <div className='container max-[650px]:px-4 mx-auto flex justify-between items-center font-medium'>

                <div className='flex gap-2 justify-center items-center'>
                    <Logo property={'w-10 h-10 text-md'} />
                    <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-gray-900">JobLink Alumni</span>
                    </div>
                </div>

                <ul className='hidden min-[900px]:flex min-[1100px]:space-x-8 gap-4  items-center text-gray-600 font-medium'>

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
                   
                </ul>

                {
                    user && <div className='min-[900px]:flex hidden gap-4 items-center justify-center'>
                        <div>{user.role === "Admin" ? "Admin" : user.userName}</div>
                        <CTAButton handler={handleLogout} title={"Logout"} property={"bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"}>

                        </CTAButton>
                    </div>
                }

                {!user && <div className="div  gap-2 min-[900px]:flex hidden">
                    <Link to={"signIn"}>
                        <CTAButton title={"Sign In"} handler={() => { }} property={" text-black px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"} />
                    </Link>
                    <Link to={"signUp"}>
                        <CTAButton title={"Sign Up"} handler={() => { }} property={"bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"} />
                    </Link>
                </div>}

                <button
                    className="max-[900px]:flex hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <span className="text-2xl">✕</span>
                    ) : (
                        <span className="text-2xl">☰</span>
                    )}
                </button>

            </div>


        </div>
    )
}

export default Navbar
