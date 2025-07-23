import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import firstBannerImage from "../../assets/Slider/firstBannerImage.png"
import secondBannerImage from "../../assets/Slider/secondBannerImage.jpg"
import thirdBannerImage from "../../assets/Slider/thirdBannerImage.jpg"


function BannerSlider() {

    const data = [firstBannerImage, secondBannerImage, thirdBannerImage];
    const [currentIndex, setCurrentIndex] = useState(0);


    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {

        const timer = setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % data.length);
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentIndex, data]);

    return (

        <div className="container mx-auto -z-10">

            <div className="relative max-[320px]:h-40 max-[450px]:h-47 h-53 sm:h-61 md:h-68 lg:h-78 xl:h-88 2xl:h-108">
                {data.map((image, index) => {
                    return (
                        <div
                            key={index}
                            className={`absolute rounded-md w-full h-full transition-all duration-1000 ease-in-out ${index == currentIndex ? "opacity-95" : "opacity-0"
                                }`}
                        >
                            <img key={index} src={image} alt={`Slider ${index + 1}`} className="w-full h-full rounded-md" />
                        </div>
                    );
                })}
            </div>


            <div className="flex items-center justify-self-center mx-24 mt-2 sm:gap-5 sm:m-4">

                <button
                    type="button"
                    onClick={goToPrevious}
                    className="bg-white cursor-pointer bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="w-4 h-4 text-gray-800" />
                </button>

                <div className="flex justify-center items-center gap-2 mx-auto mt-2">


                    {data.map((image, index) => {
                        return (
                            <div
                                key={image}
                                className={` cursor-pointer w-1.5 h-1.5 md:w-3 md:h-3 rounded-full ${currentIndex === index
                                    ? "bg-gray-500 w-2 md:w-3"
                                    : "bg-gray-300 hover:bg-gray-400 md:w-2"
                                    }`}
                            ></div>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={goToNext}
                    className=" bg-white cursor-pointer bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="Next slide"
                >
                    <FaChevronRight className="w-4 h-4 text-gray-800" />
                </button>

            </div>


        </div>
    );
}

export default BannerSlider;
