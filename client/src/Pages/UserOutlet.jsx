import React from 'react'
import { Footer, Navbar } from '../Component'
import { Outlet } from 'react-router'

export function UserOutlet() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  flex flex-col items-center justify-between">

            <Navbar />
            <div className='w-full'>
                <Outlet />
            </div>
            <div className='w-full'>
                <Footer />
            </div>
        </div>
    )
}

