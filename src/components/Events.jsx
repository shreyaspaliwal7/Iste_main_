import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anubhuti from '../assets/logoLight/anubhuti.webp';
import chimerax from '../assets/logoLight/chimerax.webp';
import codathon from '../assets/logoLight/codathon.webp';
import flairHaven from '../assets/logoLight/flairHaven.webp';
import megatrep from '../assets/logoLight/megatrep.webp';
import versionBeta from '../assets/logoLight/versionBeta.webp';
import varnith from '../assets/logoLight/varnith.webp';

const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            id: 0,
            name: 'Version Beta',
            heading: 'Version Beta',
            title: 'IDE for your code !',
            img: versionBeta,
            description: "The second iteration of Central India's Largest Hackathon - Version Beta saw new heights this year. Out of the 120+ teams that applied, 31 teams from all over the country were shortlisted to be called on-site for the 36-hour long hackathon. The participating teams had to come up with an innovative solution for the given problem statements. The 5 problem statements were closely related to real-life scenarios. The hackathon was mentored and judged by experts like Mr. Sabyasachi Mukhopadhyay, Mrinal Jain, Abhishek Yagnik, and Sameer Khan from Facebook Developer Circle of Kolkata, Indore, and Bhopal. After an intense competition, the team from MANIT, Bhopal bagged the first prize.",
            date: 'October 2025',
            link: 'https://versionbeta.istemanit.in/',
            isLarge: true
        },
        {
            id: 2,
            name: 'Flair Haven',
            heading: 'Flair Haven',
            title: 'A series of immersive Workshops',
            img: flairHaven,
            description: "With competition skyrocketing, it's more substantial now than ever to be acquainted with the growing needs of the industry. And when it comes to learning in-demand skills and putting them to practical use, nothing is more promising than workshops. To provide learning opportunities with hands-on experience, we at ISTE SC MANIT organize intensive project-based workshops under Flair Haven, which are professionally curated by industry experts. These workshops are a great way to expose yourself to new skills and sharpen the existing ones. We always try to provide incredible learning opportunities to all the participants through our workshops and the incredulous response we receive each year proves just that. At the end of the day, the workshop is an unforgettable experience for both the mentors and the students.",
            date: 'October 2025',
            link: 'https://flairhaven.istemanit.in/',
            isLarge: true
        },
        {
            id: 3,
            name: 'Codathon',
            heading: 'Codathon',
            title: 'Coding Contest',
            img: codathon,
            description: "Codathon '20 can be marked as the beginning of our Annual student conclave - Chimera. It broke all its previous records by completing over 6,500 registrations for the Inter NIT coding contest. The event is designed in a way for everyone to participate. The seven-day coding event consisted of questions to test the problem-solving ability of the participants. Cash prizes totaling up to Rs 32,000, Internship at HackerEarth, and many other goodies like t-shirts, badges, bags, and books from Coding Blocks and HackerEarth were awarded to deserving candidates. The winner of Codathon '20 was Aryaman Arora from NIT Allahabad and the best female coder was bagged by Ritika Mor.",
            date: 'January 2025',
            link: ' https://www.codechef.com/ISTETEST',
            isCodathon: true
        },
        {
            id: 5,
            name: 'Megatreopuz',
            heading: 'Megatreopuz',
            title: 'Online Cryptic Hunt!!!',
            img: megatrep,
            description: 'As ISTE proudly claims Megatreopuz as its one of a kind event each year, this year was no different. A battle of wits in the form of cunning puzzles, coded messages, and mind-boggling questions is what characterizes this hunt. Participants rack their brains for solutions for over 7 days with difficulty increases with every level. Megatreopuz has witnessed participation from all around the globe since its inception and is touted as one of the most intriguing cryptic challenges ever since. The winner this year was Gaurav Loothra, Alumnus of Amity University.',
            date: 'October 2025',
            link: 'https://megatreopuz.istemanit.in/',
            isLarge: true
        },
        {
            id: 6,
            name: 'ChimeraX',
            heading: 'CHIMERA-X',
            title: 'Quizzing Contest',
            img: chimerax,
            description: "Chimera-X is central India's largest and ISTE SC MANIT's flagship-quizzing event under Chimera – ISTE's annual student conclave. The 18th edition of Chimera-X was a huge success and it garnered students from across the country. The prelims were held across 10 cities and received overwhelming participation and extremely positive feedback from everywhere. The quiz consisted of three rounds - written, audio-visual round, and a grand finale. One team from each city was selected for the final round. The grand finale was held at MANIT, Bhopal on 16th February 2020 and was hosted by Quiz Master Mahendra Mohan Das. With over 2000 teams participating, a team from MANIT stood first followed by the team from CBIT, Hyderabad.",
            date: 'March 2025',
            link: 'https://chimerax.istemanit.in/',
            isChimeraX: true,
            isLarge: true
        },
        {
            id: 8,
            name: 'Anubhuti',
            heading: 'ANUBHUTI',
            title: 'Unfloding Hidden Stories!',
            img: anubhuti,
            description: "Anubhuti, an annual talk show is conducted by ISTE each year wherein esteemed guests from different backgrounds and tons of experience are invited. It serves as a medium for students to learn and get inspired. This year it was no different, the two speakers were exemplary individuals filled with success stories. The first was Dharamveer Singh Chauhan, the CEO, and Co-founder of Zostel, a treat for all the curious budding entrepreneurs out there. While a firm believer in the ideology of not giving up, he not only motivated students not to give up but also to never stop innovating. The second speaker – Aaditya Mishra, MANIT's very own visiting his alma mater to share his journey into becoming an IPS. It motivated various students who dream to take UPSC in the next phase of their lives.",
            date: 'March 2025',
            link: '',
        },
        {
            id: 9,
            name: 'Varnith',
            heading: 'VARNITH',
            title: 'Podcast',
            img: varnith,
            description: "VARNITH – A Series of Podcasts brings you an inspiring episode featuring Vivek Gupta, Co-founder of AlgoZenith, ICPC World Finalist, and a dedicated DSA & CP mentor. Join us as he shares his journey from competitive programming to building a thriving ed-tech platform. Discover powerful insights on problem-solving, persistence, and the winning mindset that drives success in the tech world. Presented by the ISTE Student Chapter, MANIT, this podcast aims to enlighten and empower young minds through stories of real achievers. Stay tuned and get inspired.",
            date: 'November 2025',
            link: 'https://www.youtube.com/watch?v=ILycCLDDNIs',
        },
    ];

    const openModal = (event) => {
        setSelectedEvent(event);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedEvent(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className=" w-full py-16 relative overflow-hidden" id='events'>
            <div className="w-full lg:container mx-auto px-12 md:px-12 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-[#f06f2b] font-paytone text-4xl tracking-wide uppercase">
                        OUR EVENTS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'tween', duration: 1 }}
                            viewport={{ once: true }}
                            className="w-full h-full"
                        >
                            <div
                                className="bg-[#4d4d4da4] rounded-2xl flex flex-col items-center p-6 md:p-8 min-h-[240px] md:min-h-[280px] h-full transition-all duration-300 hover:scale-105 border border-[#f06f2b]/30 w-full hover:border-[#f06f2b] hover:shadow-[0_0_25px_rgba(188,144,64,0.4),0_20px_30px_rgba(0,0,0,0.5)] group"
                                style={{
                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 20px'
                                }}
                            >
                                <div className="w-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: index % 2 === 0 ? '-50%' : '50%', opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ type: 'spring', damping: 20 }}
                                        viewport={{ once: true }}
                                    >
                                        <img
                                            src={event.img}
                                            alt={event.name}
                                            loading="lazy"
                                            className={`object-contain rounded-[10%] z-20 mb-3 h-[150px] lg:h-[180px]
                                            ${event.isCodathon ? 'w-[70%] mx-auto' : 'w-full'} 
                                            ${(event.name === 'Megatreopuz' || event.isChimeraX) ? 'scale-150' : ''}`}
                                        />
                                    </motion.div>
                                </div>

                                <div className="w-full flex justify-evenly items-center mt-1">
                                    <a
                                        href={event.link}

                                        className="text-[#f06f2b] text-[18px] text-center w-full py-[8px] no-underline hover:text-[#f06f2b] transition-colors cursor-pointer"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Visit Website
                                    </a>
                                    <button
                                        onClick={() => openModal(event)}
                                        className="text-[#f06f2b] text-[18px] text-center w-full py-[8px] bg-transparent border-none hover:text-[#f06f2b] transition-colors cursor-pointer"
                                    >
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={closeModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >

                        <motion.div
                            className="bg-[#1A1A1A] border border-white/10 rounded-2xl w-full max-w-2xl lg:max-w-3xl p-6 md:p-8 relative shadow-2xl flex flex-col items-center max-h-[95vh] overflow-y-auto md:overflow-y-visible"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl md:text-3xl font-paytone text-[#f06f2b] text-center mb-1 uppercase tracking-wide">{selectedEvent.heading}</h2>
                            <h3 className="text-lg font-medium text-white text-center mb-2">{selectedEvent.title}</h3>
                            <div className="h-0.5 w-16 bg-[#BD9090] mb-4"></div>
                            <h4 className="text-sm text-gray-400 mb-6 uppercase tracking-widest">{selectedEvent.date}</h4>

                            <p className="text-center text-gray-300 mb-6 px-4 md:px-8 leading-normal text-sm md:text-base">
                                {selectedEvent.description}
                            </p>

                            <div className="flex w-full space-x-4 md:px-12">
                                <a
                                    href={selectedEvent.link}
                                    target="__blank"
                                    className="flex-1 py-3 text-center bg-[#f06f2b] text-black font-bold rounded-lg hover:bg-[#c98a69] transition-colors"
                                >
                                    Visit Website
                                </a>
                                <button
                                    onClick={closeModal}
                                    className="flex-1 py-3 text-center border border-gray-600 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Events;
