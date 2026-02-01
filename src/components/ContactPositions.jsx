import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Navbar from "./Navbar";
import { technicalHeads, creativeHeads, managementHeads } from '../assets/VerticalHeads';
import dummyImage from '../assets/team_img/dummy.webp';
import { useState, useEffect } from 'react';

const ProfileCard = ({ vertical, name, emailAddress, phoneNumber, linkedinProfile, instagramProfile, facebookProfile, xProfile, photo }) => {
    const [imgSrc, setImgSrc] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let imageSrc = photo;
        if (!imageSrc || imageSrc.trim() === "") {
            setImgSrc(dummyImage);
            return;
        }

        if (imageSrc.includes('drive.google.com')) {
            const idMatch = imageSrc.match(/id=([a-zA-Z0-9_-]+)/);
            if (idMatch) {
                imageSrc = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
            }
        }
        setImgSrc(imageSrc);
        setRetryCount(0);
    }, [photo]);

    // Custom styles for specific members whose images need adjustment
    // Custom styles for specific members whose images need adjustment
    const customStyles = {
        "Aditya Patidar": { objectPosition: "60% 25%" },
        "Vivek Kumar Taldi": { objectPosition: "50% 15%" },
        "Deekshita Mathur": { transform: "rotate(-90deg)" }
    };

    const handleImageError = () => {
        if (retryCount < 3 && imgSrc) {
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                const separator = imgSrc.includes('?') ? '&' : '?';
                const cleanSrc = imgSrc.replace(/[?&]retry=\d+/, '');
                setImgSrc(`${cleanSrc}${separator}retry=${retryCount + 1}`);
            }, 1000);
        } else {
            setImgSrc(dummyImage);
        }
    };

    // Helper for social links
    const SocialLink = ({ url, Icon, colorClass }) => {
        const hasLink = url && url.trim() !== "";

        if (!hasLink) {
            return (
                <div className="text-gray-600 cursor-default">
                    <Icon size={24} />
                </div>
            );
        }

        let href = url;
        if (!href.startsWith('http')) href = `https://${href}`;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:${colorClass} transition-colors`}>
                <Icon size={24} />
            </a>
        );
    };

    return (
        <div className="relative p-4 md:p-6 border border-gray-800 bg-white/5 rounded-3xl w-full max-w-xl mx-auto group hover:border-[#F06F2B] transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(240,111,43,0.3)]">

            <div className="flex flex-col md:flex-row items-center gap-6 md:pl-4">

                <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-[3px] border-[#F06F2B] group-hover:border-[#F06F2B] transition-colors shadow-lg flex-shrink-0">
                        <img
                            src={imgSrc}
                            alt={name}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                            style={customStyles[name] || {}}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>


                <div className="flex-1 space-y-4 text-center md:text-left w-full overflow-hidden">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                        <h3 className="text-white font-paytone text-lg uppercase tracking-wider">{vertical?.replace('Heads', 'Head')}</h3>
                    </div>

                    <div className="space-y-3 text-base font-sans text-gray-300">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <span className="font-bold text-[#F06F2B] flex-shrink-0">Name:</span>
                            <span className="break-words md:truncate">{name}</span>
                        </div>
                        {emailAddress && (
                            <div className="flex items-center justify-center md:justify-start gap-2 min-w-0">
                                <span className="font-bold text-[#F06F2B] flex-shrink-0">Email:</span>
                                <span className="break-all md:truncate block text-xs sm:text-sm md:text-base">{emailAddress}</span>
                            </div>
                        )}
                        {phoneNumber && (
                            <div className="flex items-center justify-center md:justify-start gap-2 min-w-0">
                                <span className="font-bold text-[#F06F2B] flex-shrink-0">Phone:</span>
                                <span className="break-words md:truncate block">{phoneNumber}</span>
                            </div>
                        )}
                    </div>


                    <div className="flex justify-center md:justify-start gap-4 mt-5 pt-2">
                        <SocialLink url={instagramProfile} Icon={Instagram} colorClass="text-pink-400" />
                        <SocialLink url={facebookProfile} Icon={Facebook} colorClass="text-blue-400" />
                        <SocialLink url={xProfile} Icon={Twitter} colorClass="text-sky-400" />
                        <SocialLink url={linkedinProfile} Icon={Linkedin} colorClass="text-blue-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DepartmentSection = ({ title, members }) => {
    if (!members || members.length === 0) return null;
    return (
        <div className="mb-16">
            <h2 className="text-3xl font-paytone text-[#F06F2B] mb-10 text-center uppercase tracking-wider">
                {title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
                {members.map((member, index) => (
                    <ProfileCard key={index} {...member} />
                ))}
            </div>
        </div>
    );
};

export default function ContactPositions() {
    // Priority definition (consistent with NewTeam.jsx)
    // Priority definition (matches screenshot hierarchy)
    const priority = {
        "Student's Jt.General Secretary": 100,
        "General Secretary": 100,
        "General Affairs": 90,
        "Finance": 89,
        "Public Relations": 88,
        "Sponsorship and Marketing": 87,
        "Media": 86,
        "Logistics": 85,
        "Team Management": 84,
        "Technical": 83,
        "Web Operations": 82,
        "Multimedia": 81,
        "Creative": 80,
        "Content": 79,
        "Quizzing": 78,
        "Design": 77
    };

    const sortMembers = (members) => {
        return [...members].map(entry => {
            let entryPriority = -1;
            for (const post in priority) {
                if (entry.vertical && entry.vertical.indexOf(post) !== -1) {
                    entryPriority = priority[post];
                    break;
                }
            }
            return { ...entry, priority: entryPriority };
        }).sort((a, b) => {
            if (a.priority < b.priority) return 1;
            else if (a.priority > b.priority) return -1;
            else {
                if (a.name > b.name) return 1;
                return -1;
            }
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 -z-20 pointer-events-none bg-[#141414]">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <g stroke="#f97316" strokeWidth="1" strokeOpacity="0.4">
                        <line x1="250" y1="950" x2="-100" y2="0" />
                        <line x1="250" y1="950" x2="-100" y2="400" />
                        <line x1="250" y1="950" x2="-100" y2="700" />
                        <line x1="250" y1="950" x2="1100" y2="1050" />
                        <line x1="250" y1="950" x2="1100" y2="1200" />
                    </g>
                </svg>
            </div>

            <Navbar />

            <div className="relative max-w-7xl mx-auto pt-36 pb-24 px-4 sm:px-6 lg:px-8 z-10">
                <DepartmentSection title="TECHNICAL DEPARTMENT" members={sortMembers(technicalHeads)} />
                <DepartmentSection title="CREATIVE DEPARTMENT" members={sortMembers(creativeHeads)} />
                <DepartmentSection title="MANAGEMENT DEPARTMENT" members={sortMembers(managementHeads)} />
            </div>
        </div>
    );
}