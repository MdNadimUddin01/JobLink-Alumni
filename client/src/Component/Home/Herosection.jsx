import React, { useState, useEffect } from 'react';
import firstImage from "../../assets/Home/firstImage.jpg"
import secondImage from "../../assets/Home/secondImage.jpg"
import { useNavigate } from 'react-router';

export const HeroSection = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const handleScroll = () => setScrollY(window.scrollY);
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const stats = [
        { number: '50,000+', label: 'Active Alumni' },
        { number: '500+', label: 'Partner Companies' },
        { number: '5,000+', label: 'Job Placements' },
        { number: '95%', label: 'Success Rate' }
    ];

    const features = [
        {
            icon: '🌍',
            title: 'Global Network',
            description: 'Connect with alumni worldwide across all industries and career levels. Our platform brings together professionals from every corner of the globe.',
            gradient: 'from-blue-500 to-blue-600'
        },
        {
            icon: '🎯',
            title: 'Career Opportunities',
            description: 'Access exclusive job postings and career advancement opportunities. Get insider access to positions that aren\'t publicly advertised.',
            gradient: 'from-red-500 to-pink-600'
        },
        {
            icon: '🤝',
            title: 'Mentorship Program',
            description: 'Get guidance from experienced professionals in your field. Our mentorship program pairs you with industry leaders.',
            gradient: 'from-amber-500 to-orange-600'
        }
    ];

    return (
        <div className="min-h-screen">
            


            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-gray-900 mb-4">Why Choose JobLink Alumni?</h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                            Everything you need to advance your career and build lasting professional relationships
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={ index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center group">
                                <div className="text-3xl sm:text-4xl md:text-5xl mb-6">{feature.icon}</div>
                                <h3 className="text-md sm:text-lg md:text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 text-sm sm:text-base md:text-md">{feature.description}</p>
                         </div>
                            

                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Building Bridges to Success</h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                                At JobLink Alumni, we believe that your education is just the beginning. Our platform is designed to help you leverage your alumni network to accelerate your career growth and achieve your professional goals.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                                Whether you're a recent graduate looking for your first opportunity or an experienced professional seeking to expand your network, our community provides the tools and connections you need to succeed.
                            </p>
                            <button onClick={() => navigate("/jobs")} className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center">
                                Discover Your Potential <span className="ml-2">→</span>
                            </button>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative">
                                    <img src={firstImage} alt=""  className='object-contain'/>    
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Exclusive Events & Networking</h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                                Join exclusive alumni events, workshops, and networking sessions designed to help you stay connected with your professional community. From industry meetups to skill-building workshops, our events are tailored to support your career journey.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                                Get access to insider industry insights, learn from successful alumni, and build relationships that can transform your career. Our events span across multiple cities and industries.
                            </p>
                            <button onClick={() => navigate("/events")} className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center">
                                <span className="mr-2">📅</span> Explore Events
                            </button>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <img src={secondImage} alt="" className='object-contain'/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
                        <p className="text-sm sm:text-base md:text-lg mb-8 max-w-3xl mx-auto opacity-90">
                            Join thousands of successful professionals who have accelerated their careers through our alumni network.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center">
                                <span className="mr-2">🏆</span> Get Started Today
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};


