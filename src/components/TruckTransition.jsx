import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TruckTransition = () => {
  const containerRef = useRef(null);
  const truckRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
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
          end: "+=100%", 
          scrub: isMobile ? 2 : 1,
          pin: true,
        }
      });

      // Background wipes from white to navy
      tl.to(bgRef.current, { backgroundColor: 'var(--navy-900)', duration: 1 }, 0);

      // Scroll cue fades out
      tl.to(scrollCueRef.current, { opacity: 0, y: 20, duration: 0.15 }, 0);
      
      // Text color changes
      tl.to(textRef.current, { color: 'var(--white)', duration: 0.5 }, 0.2);

      // Text reveals behind the truck
      tl.fromTo(textRef.current, 
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }, 
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: "none" }, 
      0.15);

      // Truck drives across screen (-150% to 150%)
      tl.fromTo(truckRef.current, 
        { xPercent: -150 }, 
        { xPercent: 150, duration: 1, ease: "none" }, 
      0);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background */}
      <div ref={bgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--white)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        
        <h2 ref={textRef} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', zIndex: 5, color: 'var(--navy-900)', transition: 'color 0.3s', textAlign: 'center', maxWidth: '800px', clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
          Delivering Excellence Worldwide
        </h2>

        {/* Road line */}
        <div style={{ width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', position: 'absolute', bottom: '30%', opacity: 0.5 }} />

        {/* Truck SVG Wrapper */}
        <div 
          ref={truckRef} 
          className="truck-visual-wrapper"
          style={{ 
            position: 'absolute', 
            bottom: 'calc(30% - var(--truck-offset, 95px))', 
            width: 'min(600px, 85vw)', 
            zIndex: 10 
          }}
        >
          <img src="/cargotruckfinale.png" alt="Cargo Truck" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }} />
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
            color: '#1B3A68',
            transition: 'all 0.3s'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Keep Scrolling
          </span>
          <div style={{ width: '2px', height: '35px', background: 'linear-gradient(to bottom, var(--gold-500), transparent)', animation: 'scrollDownLine 1.5s infinite ease-in-out' }} />
        </div>

      </div>

      <style>{`
        @keyframes scrollDownLine {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        @media(max-width: 768px) {
          .truck-visual-wrapper {
            --truck-offset: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TruckTransition;
