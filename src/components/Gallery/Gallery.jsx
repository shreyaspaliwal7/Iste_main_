import React, { useEffect, useRef, useMemo } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Gallery = () => {
  const pageRef = useRef(null);

  /* ===========================
     RESPONSIVE BREAKPOINTS
  ============================ */
  const isMobile = useMediaQuery('(max-width:640px)');
  const isTablet = useMediaQuery('(max-width:1024px)');

  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  /* ===========================
     LOAD IMAGES (VITE SAFE)
  ============================ */
  const eventImagesMap = useMemo(() => {
    const imagesMap = {};

    try {
      const flairImages = import.meta.glob(
        '../../assets/galleryImages/Flair-heaven/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}',
        { eager: true }
      );
      imagesMap['flair-heaven'] = Object.values(flairImages)
        .map(i => i.default || i)
        .filter(Boolean);
    } catch {
      imagesMap['flair-heaven'] = [];
    }

    try {
      const versionImages = import.meta.glob(
        '../../assets/galleryImages/Version-beta/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}',
        { eager: true }
      );
      imagesMap['version-beta'] = Object.values(versionImages)
        .map(i => i.default || i)
        .filter(Boolean);
    } catch {
      imagesMap['version-beta'] = [];
    }

    try {
      const megaImages = import.meta.glob(
        '../../assets/galleryImages/Megatrepouz/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}',
        { eager: true }
      );
      imagesMap['megatrepouz'] = Object.values(megaImages)
        .map(i => i.default || i)
        .filter(Boolean);
    } catch {
      imagesMap['megatrepouz'] = [];
    }

    try {
      const anubhutiImages = import.meta.glob(
        '../../assets/galleryImages/Anubhuti/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP}',
        { eager: true }
      );
      imagesMap['anubhuti'] = Object.values(anubhutiImages)
        .map(i => i.default || i)
        .filter(Boolean);
    } catch {
      imagesMap['anubhuti'] = [];
    }

    return imagesMap;
  }, []);

  /* ===========================
     EVENTS
  ============================ */
  const events = [
    { id: 'flair-heaven', name: 'Flair-Heaven', images: eventImagesMap['flair-heaven'] },
    { id: 'version-beta', name: 'Version-Beta', images: eventImagesMap['version-beta'] },
    { id: 'megatrepouz', name: 'Megatreopuz', images: eventImagesMap['megatrepouz'] },
    { id: 'anubhuti', name: 'Anubhuti', images: eventImagesMap['anubhuti'] },
  ];

  /* ===========================
     GSAP
  ============================ */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.gallery-masonry').forEach(section => {
      const items = section.querySelectorAll('.gallery-item');

      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  /* ===========================
     IMAGE CARD
  ============================ */
  const ImageCard = ({ src, alt }) => (
    <div className="gallery-item overflow-hidden rounded-xl">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-auto transition-transform duration-300 hover:scale-110"
      />
    </div>
  );

  /* ===========================
     RENDER
  ============================ */
  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-bold text-[#F06F2B] mt-12 mb-16">
          Memories
        </h1>

        <div className="space-y-20">
          {events.map(event => (
            <section
              key={event.id}
              className="bg-[#151515] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#F06F2B]/20"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F06F2B] mb-8">
                {event.name}
              </h2>

              <div className="gallery-masonry">
                {event.images.length ? (
                  <ImageList
                    variant="masonry"
                    cols={cols}
                    gap={10}
                  >
                    {event.images.map((img, i) => (
                      <ImageListItem key={i}>
                        <ImageCard src={img} alt={`${event.name} ${i + 1}`} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <p className="text-gray-400 text-center">
                    No images available
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
