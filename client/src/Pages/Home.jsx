import React from 'react'
import { BannerSlider, Card, HeroSection } from '../Component'

export const Home = () => {
    return (
        <div>
            <div className='pt-10   bg-gradient-to-br from-indigo-50 via-white to-purple-50  overflow-hidden'>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div> */}
                <BannerSlider />
                {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div> */}

            </div>
            <HeroSection/>
            <Card />
        </div>
    )
}

// export default Home
