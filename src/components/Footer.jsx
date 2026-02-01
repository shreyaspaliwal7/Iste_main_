import React from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Footer = () => {
    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/istemanit/", label: "Instagram" },
        { icon: Facebook, href: "https://www.facebook.com/ISTESCMANIT", label: "Facebook" },
        { icon: Linkedin, href: "https://www.linkedin.com/company/iste-sc-manit", label: "LinkedIn" }
    ];

    return (
        <footer className="bg-[#171a1f] text-white py-12 mt-24 relative overflow-hidden font-paytone flex flex-col justify-center h-[60vh]">
            {/* Background decoration matching theme */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f06f2b] to-transparent opacity-50" />

            <div className="container mx-auto px-6 relative z-10 w-full">


                <div className="mb-4 w-full">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                        className="mySwiper w-full pb-4"
                    >
                        {/* Address Section */}
                        <SwiperSlide>
                            <div className="flex flex-col items-center group space-y-4 h-full">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#f06f2b] transition-colors">
                                        <MapPin size={24} className="text-[#f06f2b]" />
                                    </div>
                                    <h3 className="text-2xl pt-1 text-gray-200">Address</h3>
                                </div>
                                <a
                                    href="https://maps.app.goo.gl/ZERHwrJJcutMMMig8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg text-gray-400 leading-relaxed hover:text-[#f06f2b] transition-colors text-center"
                                >
                                    <p className="text-[#f06f2b] mb-1">Maulana Azad</p>
                                    <p className="text-[#f06f2b] mb-1">National Institute of</p>
                                    <p className="text-[#f06f2b] mb-1">Technology, Bhopal</p>
                                </a>
                            </div>
                        </SwiperSlide>

                        {/* Contact Section */}
                        <SwiperSlide>
                            <div className="flex flex-col items-center group space-y-4 h-full">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#f06f2b] transition-colors">
                                        <Phone size={24} className="text-[#f06f2b]" />
                                    </div>
                                    <h3 className="text-2xl pt-1 text-gray-200">Contact</h3>
                                </div>

                                <div className="text-lg text-gray-400 leading-relaxed space-y-3 text-center">
                                    <div>
                                        <p className="text-[#f06f2b] mb-1 text-sm uppercase tracking-wider">Vanshika Agarwal</p>
                                        <a href="tel:+917691929205" className="hover:text-white transition-colors block font-sans">+91 9828534432</a>
                                    </div>
                                    <div>
                                        <p className="text-[#f06f2b] mb-1 text-sm uppercase tracking-wider">Dhananjay Borban</p>
                                        <a href="tel:+919109896779" className="hover:text-white transition-colors block font-sans">+91 9302720803</a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Email Section */}
                        <SwiperSlide>
                            <div className="flex flex-col items-center group space-y-4 h-full">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#f06f2b] transition-colors">
                                        <Mail size={24} className="text-[#f06f2b]" />
                                    </div>
                                    <h3 className="text-2xl pt-1 text-gray-200">Email Address</h3>
                                </div>
                                <a
                                    href="mailto:istescmanit@gmail.com"
                                    className="text-lg text-gray-400 hover:text-[#f06f2b] transition-colors border-b border-transparent hover:border-[#f06f2b] pb-1 font-sans mt-2 text-center"
                                >
                                    <p className="text-[#f06f2b] font-bold">istescmanit@gmail.com</p>
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Social Links & Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="border-t border-white/10 pt-4 flex flex-col items-center space-y-4"
                >
                    <div className="flex gap-6">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#f06f2b] hover:text-white transition-colors border border-white/10 hover:border-[#f06f2b]"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>

                    <div className="text-center text-sm md:text-base font-sans text-gray-500">
                        <span className="text-[#BD9090]">Copyright © 2025 by </span>
                        <a href="https://www.istemanit.in/" target="_blank" rel="noopener noreferrer" className="text-[#f06f2b] mb-0 hover:text-white transition-colors font-bold">ISTE-SC MANIT. </a>
                        <span className="text-[#BD9090]">All rights reserved</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;