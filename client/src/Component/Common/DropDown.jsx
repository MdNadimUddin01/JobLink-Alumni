import React, { useState } from 'react'
import { NavLink } from 'react-router'

export function DropDown({ title, dataArray }) {

    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-flex z-10">
            <span>
                <button
                    type="button"
                    onClick={() => setShow(prev => !prev)}
                    className="px-3 py-1.5 cursor-pointer"
                >
                    <div className='flex gap-1 items-center justify-center'>
                        <div>
                            {title}
                        </div>
                        {!show &&
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                           
                        }
                        {
                            show &&
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }


                        
                    </div>
                </button>

                {/* <button
                    type="button"
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                    aria-label="Menu"
                >
                    
                </button> */}
            </span>

            {show &&
                <div role="menu"
                    className="absolute end-0 top-12 z-auto w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">

                    <div onClick={() => setShow(prev => !prev)}>
                        {

                            dataArray.map((data) =>
                                <NavLink key={data.path} to={data.path} className="block px-3 py-2  hover:bg-gray-100"
                                    role="menuitem">{data.label}</NavLink>
                            )

                        }
                    </div>
                </div>
            }


            {/* <div
                role="menu"
                className="absolute end-0 top-12 z-auto w-56 divide-y divide-gray-200 overflow-hidden rounded border border-gray-300 bg-white shadow-sm dark:divide-gray-700 dark:border-gray-600 dark:bg-gray-800"
            >
                <div>
                    <a
                        href="#"
                        className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                        role="menuitem"
                    >
                        Storefront
                    </a>

                    <a
                        href="#"
                        className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                        role="menuitem"
                    >
                        Warehouse
                    </a>

                    <a
                        href="#"
                        className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
                        role="menuitem"
                    >
                        Stock
                    </a>
                </div>

                <button
                    type="button"
                    className="block w-full px-3 py-2 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:text-red-600 dark:hover:bg-red-700/20"
                >
                    Delete
                </button>
            </div> */}
        </div>
    )
}

