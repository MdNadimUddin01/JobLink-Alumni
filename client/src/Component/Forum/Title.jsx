import React from 'react'

function Title({title1 , title2}) {
    return (
        <h1 className="text-6xl lg:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title1}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {" "}{title2}
            </span>
        </h1>
    )
}

export  {Title}
