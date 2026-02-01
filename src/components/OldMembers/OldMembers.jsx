import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import team2022 from '../../assets/TeamData2022';
import team2023 from '../../assets/TeamData2023';
import team2024 from '../../assets/TeamData2024';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OldMembers = () => {
  const containerRef = useRef();
  const [showYear2022, setShowYear2022] = useState(false);
  const [showYear2023, setShowYear2023] = useState(false);
  const [showYear2024, setShowYear2024] = useState(false);

  // GSAP animations
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

  // Dummy image for fallback
  const dummyImg = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23333\'/%3E%3Ctext x=\'50\' y=\'50\' text-anchor=\'middle\' dy=\'0.3em\' fill=\'%23666\' font-family=\'Arial\' font-size=\'14\'%3ENo Photo%3C/text%3E%3C/svg%3E';

  const formatMemberData = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data
      .filter((member) => {
        const year = member.year?.toString().toLowerCase() || '';
        return year === '4' || year === '4th' || year.includes('4th');
      })
      .map((member, index) => {
        // Handle photo - could be string URL, require() object, or empty
        let photoSrc = dummyImg;
        if (member.photo) {
          if (typeof member.photo === 'string' && member.photo.trim() !== '') {
            photoSrc = member.photo;
          } else if (typeof member.photo === 'object' && member.photo.default) {
            photoSrc = member.photo.default;
          } else if (typeof member.photo === 'object') {
            photoSrc = member.photo;
          }
        }

        return {
          id: index + 1,
          name: member.name || 'Unknown',
          image: photoSrc,
          social: {
            linkedin: member.linkedinProfile || member.linkedInProfile || '',
            instagram: member.instagramProfile || '',
            facebook: member.facebookProfile || '',
            twitter: member.twitterProfile || member.xProfile || '',
          }
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const year2022Members = useMemo(() => formatMemberData(team2022), []);
  const year2023Members = useMemo(() => formatMemberData(team2023), []);
  const year2024Members = useMemo(() => formatMemberData(team2024), []);

  const ProfileCard = ({ member }) => {
    const [imgSrc, setImgSrc] = useState(dummyImg);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
      // Convert Google Drive links to thumbnail links
      let photoUrl = member.image;

      // If it's already the dummy image (from formatMemberData fallback), leave it
      if (photoUrl === dummyImg) {
        setImgSrc(dummyImg);
        return;
      }

      if (photoUrl && typeof photoUrl === 'string' && photoUrl.includes('drive.google.com')) {
        const idMatch = photoUrl.match(/id=([a-zA-Z0-9_-]+)/);
        if (idMatch) {
          photoUrl = `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
        }
      }

      setImgSrc(photoUrl);
      setRetryCount(0);
    }, [member.image]);

    const handleImageError = () => {
      if (retryCount < 3 && imgSrc && imgSrc !== dummyImg) {
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
        // Fallback to dummy image if retries exhausted
        setImgSrc(dummyImg);
      }
    };

    // Helper function to render social icons - always show, but make non-clickable when no link
    const renderSocial = (url, Icon, colorClass) => {
      const hasLink = url && typeof url === 'string' && url.trim() !== '' && url.toLowerCase() !== 'none';

      if (!hasLink) {
        return (
          <div className="text-gray-600 cursor-default">
            <Icon size={20} />
          </div>
        );
      }

      let href = url;
      if (!href.startsWith('http')) {
        if (href.includes('instagram.com')) {
          href = `https://${href.replace(/^https?:\/\//, '')}`;
        } else if (href.includes('twitter.com') || href.includes('x.com')) {
          href = `https://twitter.com/${href.replace('@', '').replace(/^twitter\.com\//, '').replace(/^x\.com\//, '')}`;
        } else if (href.includes('linkedin.com')) {
          href = `https://${href.replace(/^https?:\/\//, '')}`;
        } else if (href.includes('facebook.com')) {
          href = `https://${href.replace(/^https?:\/\//, '')}`;
        } else if (href.startsWith('@')) {
          // Instagram handle
          href = `https://instagram.com/${href.replace('@', '')}`;
        } else {
          href = `https://${href.replace(/^https?:\/\//, '')}`;
        }
      }

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
              className="w-full h-full object-cover"
              onError={handleImageError}
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

          <div className="flex gap-4 mt-1 text-white justify-center">
            {renderSocial(member.social.instagram, Instagram, "text-pink-400")}
            {renderSocial(member.social.facebook, Facebook, "text-blue-400")}
            {renderSocial(member.social.twitter, Twitter, "text-sky-400")}
            {renderSocial(member.social.linkedin, Linkedin, "text-blue-500")}
          </div>
        </div>
      </div>
    );
  };

  const CollapsibleSection = ({ year, isOpen, onToggle, members }) => {
    return (
      <div className="mb-14">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between bg-[#151515] border border-[#F06F2B]/50 rounded-2xl px-5 py-4 text-left hover:border-[#F06F2B] transition-colors"
        >
          <span
            className="text-2xl md:text-3xl text-white"
            style={{ fontFamily: "'Paytone One', sans-serif" }}
          >
            {year}
          </span>
          <span className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={28} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }}
              exit={{ opacity: 0, y: 18, filter: 'blur(8px)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
              className="mt-6 bg-[#0f0f0f] rounded-3xl p-6 md:p-8 border border-[#F06F2B]/60 shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
            >
              {members.length > 0 ? (
                <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 justify-items-center">
                  {members.map((member) => (
                    <ProfileCard key={member.id} member={member} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-8">No members found for this year.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white py-20 px-4 md:px-8 overflow-hidden">
      {/* Orange accent lines in background - fixed to remain during scroll */}
      <div className="pointer-events-none fixed inset-0 opacity-60 z-0">
        {Array.from({ length: 14 }).map((_, idx) => (
          <span
            key={idx}
            className="absolute left-1/2 top-1/2 h-[2px] w-[120%] origin-left bg-gradient-to-r from-[#F06F2B] via-transparent to-transparent"
            style={{ transform: `rotate(${idx * 12 - 45}deg)` }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="mt-8 mb-16">
          <h2 className="year-heading text-4xl font-paytone text-[#F06F2B] mb-16 text-center uppercase tracking-wider">
            Previous Years Batch
          </h2>
        </div>

        <div className="mb-14">
          <div className="mb-6"></div>
          <CollapsibleSection
            year="Batch - 2025"
            isOpen={showYear2024}
            onToggle={() => setShowYear2024((prev) => !prev)}
            members={year2024Members}
          />
          <div className="mb-6"></div>
        </div>

        <div className="mb-14">
          <div className="mb-6"></div>
          <CollapsibleSection
            year="Batch - 2024"
            isOpen={showYear2023}
            onToggle={() => setShowYear2023((prev) => !prev)}
            members={year2023Members}
          />
          <div className="mb-6"></div>
        </div>

        <div className="mb-14">
          <div className="mb-6"></div>
          <CollapsibleSection
            year="Batch - 2023"
            isOpen={showYear2022}
            onToggle={() => setShowYear2022((prev) => !prev)}
            members={year2022Members}
          />
          <div className="mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default OldMembers;