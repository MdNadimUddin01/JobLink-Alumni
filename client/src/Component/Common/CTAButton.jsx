import React from 'react'

function CTAButton({ title, handler, property }) {
    return (
        <button
            onClick={handler}
            className={`py-2 px-4 cursor-pointer hover:scale-105 transition-all duration-200 rounded-xl border-1 ${property}`}
        >
            {title}
        </button>
    )
}

export default CTAButton
