

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { createPortal } from 'react-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'HOME', href: '/', type: 'link' },
    { name: 'ABOUT', href: '#about', type: 'hash' },
    { name: 'EVENTS', href: '#events', type: 'hash' },
    { name: 'SPONSORS', href: '#sponsors', type: 'hash' },
    location.pathname === '/new-team'
      ? { name: 'OLD TEAM', href: '/old-members', type: 'link' }
      : { name: 'OUR TEAM', href: '/new-team', type: 'link' },
    { name: 'MEMORIES', href: '/gallery', type: 'link' },
    { name: 'CONTACT US', href: '/contact-positions', type: 'link' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.type === 'link') {
      navigate(link.href);
      window.scrollTo(0, 0);
    } else {
      // Handle Hash Links
      if (location.pathname !== '/') {
        // If not on home, go to home then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(link.href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Already on home, just scroll
        const element = document.getElementById(link.href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Portal Content for Drawer
  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 w-64 z-[70] bg-black/95 border-r border-white/10 shadow-2xl pt-8 px-6 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-end mb-8">
              <button onClick={toggleMenu} className="text-white hover:text-[#f06f2b] transition-colors">
                <X size={28} />
              </button>
            </div>

            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
              className="flex flex-col items-start gap-6"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: -20, opacity: 0 }
                  }}
                  whileHover={{ scale: 1.1, originX: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-white text-xl font-bold font-paytone tracking-wider hover:text-[#f06f2b] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[85%] max-w-7xl z-50">
        <div className="bg-black/70 backdrop-blur-md rounded-full px-4 md:px-8 py-[0.1rem] flex items-center justify-between border border-white/10 shadow-2xl relative">


          <img
            className='w-[5.5rem] md:w-[5.5rem] py-1'
            src="/Images/Logo.svg"
            alt="ISTE Logo"
          />


          <ul className="hidden lg:flex items-center gap-8 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-white text-sm font-semibold hover:text-orange-400 transition-colors duration-300 tracking-wide cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>


          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Render Drawer via Portal to escape parent transforms */}
      {createPortal(drawerContent, document.body)}
    </>
  );
};

export default Navbar;
