import React from 'react'

function Card({ title  , content , icon}) {
    return (
        <div className='flex gap-3 px-3 py-4'>
            <div>
                {icon}
            </div>
            <div>
                <h1>{title}</h1>
                <div>{content}</div>
            </div>
        </div>
    )
}

export default Card
