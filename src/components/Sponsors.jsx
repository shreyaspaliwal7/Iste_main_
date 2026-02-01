import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sponsors = () => {
    const [loading, setLoading] = useState(true);

    // Mimic the loading delay from Sponsors2.js (reduced to 2s for better UX)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const images = import.meta.glob('../assets/sponsors/*.{webp,svg}', { eager: true });


    const sponsorList = useMemo(() => Object.values(images).map(img => img.default), [images]);

    return (
        <section className=" w-full py-16" id='sponsors'>
            <div className="container mx-auto px-8 md:px-12 max-w-5xl">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[#f06f2b] font-paytone text-4xl tracking-wide uppercase"
                    >
                        OUR SPONSORS
                    </motion.h2>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {sponsorList.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: (index % 3 === 0) ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="h-full"
                        >
                            <div
                                className="bg-[#4d4d4d] border border-white/10 rounded-2xl h-36 flex items-center justify-center p-6 hover:scale-105 hover:border-[#f06f2b] hover:shadow-[0_0_15px_rgba(188,144,64,0.3)] transition-all duration-300 relative overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div
                                            key="skeleton"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full bg-gray-600/50 animate-pulse rounded-lg"
                                        />
                                    ) : (
                                        <motion.img
                                            key="image"
                                            src={src}
                                            alt={`Sponsor ${index + 1}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="max-w-full max-h-full object-contain"
                                            loading="lazy"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
