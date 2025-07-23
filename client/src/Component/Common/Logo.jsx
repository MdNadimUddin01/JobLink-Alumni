import React from 'react'

export function Logo({property}) {
    return (
        <div className='text-center'>
            <div className={`w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center ${property}`}>
                <span className="text-white font-bold text-lg">JL</span>
            </div>
        </div>
    )
}

