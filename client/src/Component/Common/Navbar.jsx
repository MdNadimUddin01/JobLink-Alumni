import React from 'react'
import CTAButton from './CTAButton'

function Navbar() {
    return (
        <div className='w-full py-4  bg-gradient-to-b from-gray-100 to-gray-100 shadow-2xl mb-1'>

            <div className='container hidden   mx-auto sm:flex justify-between items-center'>

                <div className='text-xl'>
                    Alumini Tacker
                </div>

                <ul className='flex items-center gap-4 text-gray-600'>
                    <li className='text-purple-500'>Home</li>
                    <li>About</li>
                    <li>Jobs</li>
                    <li>Forums</li>
                    <li>Faqs</li>
                    <li>Options</li>
                </ul>
                
                <div className="div flex gap-2">
                    <CTAButton title={"Sign In"} handler={() => {}} property={"text-black"}/>
                    <CTAButton title={"Sign Up"} handler={() => {}} property={"bg-purple-500 hover:bg-purple-600 text-white rounded-2xl  border-purple-100"}/>
                </div>

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
