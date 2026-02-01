
import React from 'react';
import "./Aboutus.css"
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start text-[#1A1A1A] font-sans pt-12 pb-20 relative" id='about'>

            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className='text-4xl font-paytone text-[#f06f2b] text-center mb-3 relative z-50'
            >
                ABOUT US
            </motion.h2>

            <main className=" max-w-6xl mx-auto px-6 space-y-24">

                {/* --- First Section --- */}
                <div className="bg-black/70 top-16 p-10 rounded-[2.5rem] shadow-xl relative">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-4">
                            {/* Dark Image Container */}

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-white rounded-xl overflow-hidden border-[6px] border-[#2A2A2A] transition-all duration-500 hover:scale-105 hover:brightness-115"
                            >
                                <img
                                    src="\Images\DSC06543.JPG"
                                    alt="Laptop Workspace"
                                    className="w-full h-auto block"
                                />

                            </motion.div>

                        </div>

                        <div className="pt-8">
                            <motion.p
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-white text-base leading-relaxed fontdesc"
                            >
                                Indian Society for Technical Education (ISTE) is a National level non-profit Society for the Technical Education System in our country. ISTE assists and contributes to the production and development of top quality professional technocrats. It has over 1505 Student Chapters at the institutional level, one such chapter is ISTE SC MANIT. ISTE SC MANIT is one of the oldest student organizations in MANIT. Started in 2003, it has been actively contributing towards the professional and technical education of the students at MANIT and beyond. It has been conducting national level events like ChimeraX - The Multi-city Quizzing Competition, CODATHON - The Inter NIT Coding Contest, Anubhuti - The Talkshow, Megatreopuz - The Online Cryptic Hunt, Version β - The National level Hackathon. Events like these have gifted ISTE SC MANIT the Best Students' Chapter Award in the MP & Chhattisgarh region, not once but thrice.
                            </motion.p>
                        </div>
                    </section>
                </div>
            </main>
        </div >
    );
};

export default AboutPage;