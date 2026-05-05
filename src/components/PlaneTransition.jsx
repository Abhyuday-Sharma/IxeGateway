import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Cloud SVG Component for aesthetics
const Cloud = ({ width, top, left, opacity }) => (
  <svg 
    style={{ position: 'absolute', top, left, width, opacity, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }} 
    viewBox="0 0 24 24" 
    fill="rgba(255, 255, 255, 0.6)" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.5 19c-2.484 0-4.5-2.016-4.5-4.5 0-2.083 1.415-3.843 3.328-4.34a6.002 6.002 0 0 0-11.826 1.34C2.518 12.062 1 13.855 1 16c0 2.206 1.794 4 4 4h12.5c1.93 0 3.5-1.57 3.5-3.5S19.43 19 17.5 19z" />
  </svg>
);

const PlaneTransition = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const planeRef = useRef(null);
  const textRef = useRef(null);
  const cloudsRef = useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=70%", 
          scrub: isMobile ? 2 : 1, // Smoother on mobile touch
          pin: true,
        }
      });

      // Cloud Parallax
      tl.to(cloudsRef.current.children, { x: '10vw', duration: 0.8 }, 0);
      tl.to(cloudsRef.current.children, { y: '-40vh', opacity: 0, duration: 0.2, stagger: 0.05 }, 0.8);

      // Scroll cue fades out
      tl.to(scrollCueRef.current, { opacity: 0, y: 20, duration: 0.15 }, 0);

      // Plane Animation - Adjusted scale/path for mobile
      tl.fromTo(planeRef.current, 
        { 
          x: isMobile ? '-120vw' : '-100vw', 
          y: isMobile ? '40dvh' : '60dvh', 
          scale: isMobile ? 0.6 : 0.8 
        }, 
        { 
          x: isMobile ? '150vw' : '120vw', 
          y: isMobile ? '-30dvh' : '-50dvh', 
          scale: isMobile ? 1.1 : 1.5, 
          duration: 1, 
          ease: 'power1.inOut' 
        }, 
      0);

      // Text animations
      tl.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3 }, 0.1);
      tl.to(textRef.current, { opacity: 0, y: -80, duration: 0.2 }, 0.5);

      // Dissolve background (Color Change)
      tl.to(bgRef.current, { opacity: 0, duration: 0.4, ease: 'none' }, 0.3);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100dvh', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--white)' }}>
      
      {/* Dark Navy Base Layer - We fade its opacity to 0 instead of changing background-color to avoid muddy CSS RGB transitions */}
      <div ref={bgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--navy-900)', zIndex: 0 }} />

      {/* Animated Clouds Background */}
      <div ref={cloudsRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Cloud width="300px" top="15%" left="5%" opacity={0.3} />
        <Cloud width="450px" top="10%" left="65%" opacity={0.15} />
        <Cloud width="250px" top="55%" left="20%" opacity={0.35} />
        <Cloud width="350px" top="65%" left="75%" opacity={0.25} />
      </div>

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        
        <h2 ref={textRef} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', textAlign: 'center', maxWidth: '800px', opacity: 0 }}>
          From Source to <span className="text-gradient">Destination</span>
        </h2>

        {/* Plane Image Wrapper */}
        <div ref={planeRef} style={{ position: 'absolute', width: 'min(720px, 90vw)', zIndex: 5 }}>
          <img src="/planecargo.png" alt="Cargo Plane" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))' }} />
        </div>

        {/* Scroll Cue */}
        <div 
          ref={scrollCueRef}
          style={{ 
            position: 'absolute', 
            bottom: '5%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.4rem',
            zIndex: 20,
            pointerEvents: 'none',
            color: 'var(--gold-500)',
            transition: 'all 0.3s'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Keep Scrolling
          </span>
          <div style={{ width: '2px', height: '35px', background: 'linear-gradient(to bottom, var(--gold-500), transparent)', animation: 'scrollDownLinePlane 1.5s infinite ease-in-out' }} />
        </div>

      </div>

      <style>{`
        @keyframes scrollDownLinePlane {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PlaneTransition;
