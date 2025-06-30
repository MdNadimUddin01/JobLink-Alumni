import React from 'react'
import { Logo } from './'

export function Footer() {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 text-center border-t border-gray-200">
            <Logo property={"w-15 h-15 mb-5"}/>
            <h3 className="text-gray-800 text-xl font-bold mb-2">Alumni Tracker System</h3>
            <p className="text-gray-600 text-sm mb-5">Connecting graduates, building networks, creating opportunities</p>

            <div className="pt-5 border-t border-gray-200">
                <p className="text-gray-500 text-sm mb-1">
                    Need help? Contact us at{' '}
                    <a href="mailto:support@alumnitracker.com" className="text-indigo-500 hover:underline font-semibold">
                        support@alumnitracker.com
                    </a>
                </p>
                <p className="text-gray-500 text-sm">© 2025 Alumni Tracker System. All rights reserved.</p>
            </div>
        </div>
    )
}

