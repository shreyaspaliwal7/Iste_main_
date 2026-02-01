import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import teamData from '../../assets/TeamData2025';
import dummyImage from '../../assets/team_img/dummy.webp';
import anjaneyImg from '../../assets/team_img/Team__Download/anjaney.webp';
import anuragImg from '../../assets/team_img/Team__Download/anurag.webp';
import bharatImg from '../../assets/team_img/Team__Download/bharat.webp';
import gautumImg from '../../assets/team_img/Team__Download/gautum.webp';
import jatinImg from '../../assets/team_img/Team__Download/jatin.webp';
import mandeImg from '../../assets/team_img/Team__Download/mande.webp';
import pradhumanImg from '../../assets/team_img/Team__Download/pradhuman.webp';
import samyuktaImg from '../../assets/team_img/Team__Download/samyukta.webp';
import suyashImg from '../../assets/team_img/Team__Download/suyash.webp';
import vibhutiImg from '../../assets/team_img/Team__Download/vibhuti.webp';
import viditImg from '../../assets/team_img/Team__Download/vidit.webp';
import yuvrajImg from '../../assets/team_img/Team__Download/yuvraj.webp';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const TeamMemberCard = ({ member }) => {
    const [imgSrc, setImgSrc] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Map of names to local images
    const localImages = {
        "Anjaney": anjaneyImg,
        "Ananjey": anjaneyImg, // Handle typo if present in data
        "Anurag Singh": anuragImg,
        "Bharat": bharatImg,
        "Bharat Soni": bharatImg,
        "Gautum": gautumImg, // Adjust based on exact name if needed
        "Jatin Baiswar": jatinImg,
        "P Mande": mandeImg, // Mande
        "Pradhuman": pradhumanImg,
        "Pradhuman Tiwari": pradhumanImg,
        "Samyukta": samyuktaImg,
        "Samyukta Nema": samyuktaImg,
        "Suyash Bedarkar": suyashImg,
        "Suyash Bedarkar ": suyashImg,
        "Vibhuti": vibhutiImg,
        "Vibhuti Chandrakar": vibhutiImg,
        "Vidit": viditImg,
        "Vidit Jain": viditImg,
        "Yuvraj": yuvrajImg,
        "Yuvraj Singh": yuvrajImg
    };

    useEffect(() => {
        // Convert Google Drive links to thumbnail links
        let photoUrl = member.photo;

        // Check for local image first
        // Normalizing name for check
        const normalizedName = member.name.trim();
        if (localImages[normalizedName] || localImages[member.name]) {
            setImgSrc(localImages[normalizedName] || localImages[member.name]);
            return;
        }

        if (!photoUrl || photoUrl.trim() === "") {
            setImgSrc(dummyImage);
            return;
        }

        if (photoUrl.includes('drive.google.com')) {
            const idMatch = photoUrl.match(/id=([a-zA-Z0-9_-]+)/);
            if (idMatch) {
                photoUrl = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
            }
        }

        setImgSrc(photoUrl);
        setRetryCount(0);
    }, [member.photo]);

    // Custom styles for specific members whose images need adjustment
    const customStyles = {
        "Aditya Patidar": { objectPosition: "60% 25%" },
        "Jatin Baiswar": { objectPosition: "50% 25%" },
        "Vivek Kumar Taldi": { objectPosition: "50% 15%" },
        "Sarika": { objectPosition: "50% 1%" },
        "Deekshita Mathur": { transform: "rotate(-90deg)" },
        "Ayush Pratap Singh": { transform: "scale(1.2) translateX(-19px) translateY(-15px)" }
    };

    const handleImageError = () => {
        if (retryCount < 3 && imgSrc) {
            // Add a small delay before retrying
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                // Append retry param to bypass simple cache issues or just trigger reload
                const separator = imgSrc.includes('?') ? '&' : '?';
                // Remove previous retry param if exists to avoid infinite appending
                const cleanSrc = imgSrc.replace(/[?&]retry=\d+/, '');
                setImgSrc(`${cleanSrc}${separator}retry=${retryCount + 1}`);
            }, 1000);
        } else {
            setImgSrc(dummyImage);
        }
    };

    // Helper to render social link
    const renderSocial = (url, Icon, colorClass) => {
        const hasLink = url && url.trim() !== "";

        if (!hasLink) {
            return (
                <div className="text-gray-600 cursor-default">
                    <Icon size={20} />
                </div>
            );
        }

        let href = url;
        if (!href.startsWith('http')) href = `https://${href}`;
        return (
            <a
                href={href}
                className={`text-gray-400 hover:${colorClass} transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon size={20} />
            </a>
        );
    };

    return (
        <div className="team-card bg-white/5 rounded-3xl p-6 flex flex-col items-center text-white shadow-[0_20px_40px_rgba(0,0,0,0.45)] border border-white/10 hover:border-[#F06F2B] transition-all duration-300 hover:shadow-[0_0_25px_rgba(240,111,43,0.5)] hover:-translate-y-1 hover:scale-[1.02] w-full max-w-xs">
            <div className="flex flex-col items-center space-y-4 w-full">
                <div className="w-48 h-48 rounded-full overflow-hidden border-[3px] border-[#F06F2B] shadow-[0_12px_24px_rgba(0,0,0,0.35)] flex-shrink-0">
                    <img
                        src={imgSrc}
                        alt={member.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                        style={customStyles[member.name] || {}}
                        referrerPolicy="no-referrer"
                    />
                </div>

                <h3
                    className="text-lg text-center leading-tight truncate w-full px-2"
                    style={{ fontFamily: "'Paytone One', sans-serif" }}
                    title={member.name}
                >
                    {member.name}
                </h3>

                <p className="text-gray-200 text-xs text-center font-semibold leading-tight h-4">
                    {member.vertical}
                </p>

                <div className="flex gap-4 mt-1 text-white justify-center">
                    {renderSocial(member.instagramProfile, Instagram, "text-pink-400")}
                    {renderSocial(member.facebookProfile, Facebook, "text-blue-400")}
                    {renderSocial(member.xProfile, Twitter, "text-sky-400")}
                    {renderSocial(member.linkedinProfile, Linkedin, "text-blue-500")}
                </div>
            </div>
        </div>
    );
};

const NewTeam = () => {
    const containerRef = useRef();

    useGSAP(() => {
        const headings = gsap.utils.toArray('.year-heading');
        headings.forEach(heading => {
            gsap.fromTo(heading,
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Initial state for cards
        gsap.set(".team-card", {
            opacity: 0,
            scale: 0.9,
            y: 30
        });

        // Animate entire grid when it comes into view
        const grids = gsap.utils.toArray('.team-grid');
        grids.forEach(grid => {
            gsap.to(grid.querySelectorAll('.team-card'), {
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1, // Auto-play the cascade
                ease: "power3.out",
                overwrite: true,
                clearProps: "all" // Remove inline styles after animation so CSS hover works
            });
        });
    }, { scope: containerRef });
    // Priority definition as requested
    const priority = {
        President: 50,
        "Students' Chairperson": 49,
        'Vice-Chairperson': 48,
        "Students' Convenor": 47,
        "Students' Co-Convenor": 46,
        Treasurer: 45,
        'Core Team Member': 43,
        Secretary: 42,
        Finance: 41,
        'General Affairs': 40,
        'Sponsorship and Marketing': 39,
        Technical: 38,
        'Web Operations': 37,
        'Senior Web': 36,
        'Public Relations': 35,
        'Public Relation': 35,
        Logistics: 34,
        Media: 33,
        Design: 31,
        Creatives: 30,
        Content: 29,
        Quizzing: 28,
        'Team Manager': 27,
        'Team Management': 26,
        Executive: 10,
        'Executive and Content Writer': 10,
        'Web Developer': 4,
        'Web developer': 4,
        'Graphic Designer': 8,
        'Content Writer': 7,
        'Content writer': 7,
        'Video Editor': 6,
        'Video editor': 6,
        Photographer: 5,
    };

    // Process and sort data
    const sortedData = [...teamData].map(entry => {
        let entryPriority = -1;
        for (const post in priority) {
            if (entry.vertical && entry.vertical.indexOf(post) !== -1) {
                entryPriority = priority[post];
                break;
            }
        }
        return { ...entry, priority: entryPriority }; // specific priority for this render
    }).sort((a, b) => {
        if (a.priority < b.priority) return 1;
        else if (a.priority > b.priority) return -1;
        else {
            if (a.name > b.name) return 1;
            return -1;
        }
    });

    // Filter data by year from the sorted list
    const finalYear = sortedData.filter(member => member.year === "4th");
    const thirdYear = sortedData.filter(member => member.year === "3rd");
    const secondYear = sortedData.filter(member => member.year === "2nd");

    return (
        <div ref={containerRef} className="min-h-screen relative overflow-hidden">
            {/* Standard Background from Home.jsx */}
            <div className="bg-[#141414] fixed inset-0 -z-20 pointer-events-none overflow-hidden">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                >
                    <g stroke="#f97316" strokeWidth="1" strokeOpacity="0.4">
                        <line x1="250" y1="950" x2="-100" y2="0" />
                        <line x1="250" y1="950" x2="-100" y2="400" />
                        <line x1="250" y1="950" x2="-100" y2="700" />
                        <line x1="250" y1="950" x2="1100" y2="1050" />
                        <line x1="250" y1="950" x2="1100" y2="1200" />
                    </g>
                </svg>
            </div>

            <div className="relative max-w-6xl mx-auto pt-36 pb-24 px-4 sm:px-6 lg:px-8 z-10">


                {/* Final Year Section */}
                {finalYear.length > 0 && (
                    <div className="mb-20">
                        <h2 className="year-heading text-4xl font-paytone text-[#F06F2B] mb-16 text-center uppercase tracking-wider">
                            Final Year
                        </h2>
                        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-8 justify-items-center">
                            {finalYear.map((member, idx) => (
                                <TeamMemberCard key={`final-${idx}`} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Third Year Section */}
                {thirdYear.length > 0 && (
                    <div className="mb-20">
                        <h2 className="year-heading text-4xl font-paytone text-[#F06F2B] mb-16 text-center uppercase tracking-wider">
                            Third Year
                        </h2>
                        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-8 justify-items-center">
                            {thirdYear.map((member, idx) => (
                                <TeamMemberCard key={`third-${idx}`} member={member} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Second Year Section */}
                {secondYear.length > 0 && (
                    <div className="mb-20">
                        <h2 className="year-heading text-4xl font-paytone text-[#F06F2B] mb-16 text-center uppercase tracking-wider">
                            Second Year
                        </h2>
                        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-8 justify-items-center">
                            {secondYear.map((member, idx) => (
                                <TeamMemberCard key={`second-${idx}`} member={member} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewTeam;