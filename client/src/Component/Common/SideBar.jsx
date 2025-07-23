import React from 'react'
import { Logo } from './Logo'
import { NavLink } from 'react-router'

function SideBar({ setIsMenuOpen, adminList, alumniList, user }) {


    return (
        <div className="max-[900px]:flex z-100 absolute top-0 right-0 hidden h-screen flex-col justify-between border-e border-gray-100 bg-white">
            <div className="px-4 py-6">
                <div className='flex justify-between'>
                    <Logo />

                    <button onClick={() => { setIsMenuOpen(false) }}><span className="text-2xl">✕</span></button>
                </div>
                <ul className="mt-6 space-y-1">

                    {(!user || user.role === "Alumni") && (
                        alumniList.map((alumniLi) => (
                            alumniLi?.data != null && user ? (<li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="text-sm font-medium"> {alumniLi.label} </span>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                        {

                                            alumniLi.data.map((alumniData) => {
                                                return (<li onClick={() => setIsMenuOpen(false)} key={alumniData.path}><NavLink to={alumniData.path} className={({ isActive }) => `block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${isActive ? "text-purple-500" : ""}`}>{alumniData.label}</NavLink></li>)
                                            })

                                        }
                                    </ul>
                                </details>
                            </li>) : (<li onClick={() => setIsMenuOpen(false)} key={alumniLi.path}><NavLink to={alumniLi.path} className={({ isActive }) => `block rounded-lg px-4 py-2 text-sm font-medium ${user ? "" : "pr-22"} text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${isActive ? "text-purple-500" : ""}`}>{alumniLi.label}</NavLink></li>)
                        ))
                    )}
                   
                    {
                        user && user.role === "Admin" && (
                            adminList.map((adminLi) => (
                                adminLi?.data != null && user ? (<li>
                                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                                        <summary
                                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            <span className="text-sm font-medium"> {adminLi.label} </span>

                                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="size-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </summary>

                                        <ul className="mt-2 space-y-1 px-4">
                                            {

                                                adminLi.data.map((adminData) => {
                                                    return (<li onClick={() => setIsMenuOpen(false)} key={adminData.path}><NavLink to={adminData.path} className={({ isActive }) => `block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${isActive ? "text-purple-500" : ""}`}>{adminData.label}</NavLink></li>)
                                                })

                                            }
                                        </ul>
                                    </details>
                                </li>) : (<li onClick={() => setIsMenuOpen(false)} key={adminLi.path}><NavLink to={adminLi.path} className={({ isActive }) => `block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${isActive ? "text-purple-500" : ""}`}>{adminLi.label}</NavLink></li>)
                            ))
                        )
                    }
                </ul>
            </div>

            {user && <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="size-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">

                            <span> {user.email}</span>

                        </p>
                    </div>
                </a>
            </div>}

        </div>
    )
}

export default SideBar
