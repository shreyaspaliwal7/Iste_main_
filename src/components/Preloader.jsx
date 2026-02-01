import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    // Colors based on requested accent (Gold/Orange)
    const accentColor = "#ea580c"; // orange-600
    const accentLight = "#f97316"; // orange-500

    // Force re-render/animation restart on mount is handled by key in App.jsx

    const letterVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 30, // Much slower spring for ~4s feel
                duration: 4 // Explicit duration fallback
            }
        }
    };

    const wordVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 30, // Much slower spring
                duration: 4
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5, // 500ms delay
            }
        }
    };

    const subtitleContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // word by word
                delayChildren: 1.0, // Starts after title
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden font-roboto"
        >
            {/* Background Gradient Orbs - Warm Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-900/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-900/20 rounded-full blur-[100px]"
                />
            </div>

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center scale-110 md:scale-125 px-4 w-full">
                {/* Scale 110 on mobile (instead of 100), 125 on desktop. Reduced padding to prevent cutting */}

                {/* Architectural Ring SVG */}
                <svg className="w-80 h-80 absolute -top-24 opacity-20" viewBox="0 0 200 200">
                    <motion.circle
                        cx="100" cy="100" r="80"
                        fill="none"
                        stroke={accentColor}
                        strokeWidth="1"
                        strokeDasharray="500"
                        strokeDashoffset="500"
                        animate={{ strokeDashoffset: 0, rotate: 360 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="100" cy="100" r="60"
                        fill="none"
                        stroke={accentLight}
                        strokeWidth="1"
                        strokeDasharray="400"
                        strokeDashoffset="400"
                        animate={{ strokeDashoffset: 0, rotate: -360 }}
                        transition={{ duration: 4, ease: "easeInOut", delay: 0.2 }}
                    />
                </svg>

                {/* Main Text: ISTE - Mobile: text-8xl, space-x-0.5, tracking-normal. Desktop: text-9xl, space-x-4, tracking-widest */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex space-x-0.5 md:space-x-4 mb-6 px-4"
                >
                    {['I', 'S', 'T', 'E'].map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="text-8xl md:text-9xl font-black text-white font-roboto tracking-normal md:tracking-widest block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Subtitle: STUDENTS' CHAPTER MANIT */}
                <motion.div
                    variants={subtitleContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex space-x-2 text-center flex-wrap justify-center max-w-[95vw]"
                >
                    {["STUDENTS'", "CHAPTER", "MANIT"].map((word, index) => (
                        <motion.span
                            key={index}
                            variants={wordVariants}
                            className="text-orange-500 tracking-[0.2em] text-base md:text-xl font-bold uppercase font-roboto"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Loading Line */}
                <div className="w-48 md:w-64 h-[2px] bg-gray-900 rounded-full mt-10 relative overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-600 to-amber-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.8, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
