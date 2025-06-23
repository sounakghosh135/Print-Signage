import React from 'react'

const About = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">About Us</h2>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg">
                        <p className="text-md md:text-lg text-gray-700 leading-relaxed text-center">
                            PRINT & SIGNAGE is a premier advertisement and printing of Durgapur. We have a vast experience in publishing advertisement, printing various products used in office, schools, and others firms. We are providing services directly or indirectly to many organizations since inception namely NEW INDIA ASSURANCE CO. LTD., CENTRAL BANK OF INDIA, UNION BANK OF INDIA, AIR FORCE STATION, ENGINEERING COLLEGES, SCHOOLS, BAKERIES, etc. CUSTOMER SATISFACTION is our MOTTO. We are very keenly and strictly follow the instruction of our customers who giving orders. Repeat orders are the result of our HIGHLY ORGANISED SERVICES. We always try our extreme to deliver the goods on committed time & place.
                            <br />
                            In present market there are many players like but our customers appreciate us not giving cheap rates but for appropriate service and advice which are cost effective. We believe that as long as our customer business is running our service will go on and for this we always suggest our customer for cost effective products.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">5+</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Years Experience</h3>
                            <p className="text-gray-600">Delivering quality solutions</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">50+</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Happy Clients</h3>
                            <p className="text-gray-600">Satisfied customers</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">24/7</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Support</h3>
                            <p className="text-gray-600">Always here to help</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About