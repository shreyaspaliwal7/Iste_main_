import React from 'react';
import Hero from './Hero/Hero';
import AboutPage from './About Us/Aboutus';
import Events from './Events';
import Sponsors from './Sponsors';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="relative min-h-screen">

        {/* The Fixed Perspective Lines */}
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
        <div className="relative z-10">
          <AboutPage />
          <Events />
          <Sponsors />
        </div>
      </div>
    </div>
  );
};

export default Home;