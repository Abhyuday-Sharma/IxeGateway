import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TruckTransition = () => {
  const containerRef = useRef(null);
  const truckRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

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
          end: "+=150%", 
          scrub: isMobile ? 2 : 1,
          pin: true,
        }
      });

      // Background wipes from white to navy
      tl.to(bgRef.current, { backgroundColor: 'var(--navy-900)', duration: 1 }, 0);
      
      // Text color changes
      tl.to(textRef.current, { color: 'var(--white)', duration: 0.5 }, 0.2);

      // Truck drives across screen (-150% to 150%)
      tl.fromTo(truckRef.current, 
        { xPercent: -150 }, 
        { xPercent: 150, duration: 1 }, 
      0);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background */}
      <div ref={bgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--white)' }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        
        <h2 ref={textRef} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', zIndex: 5, color: 'var(--navy-900)', transition: 'color 0.3s', textAlign: 'center', maxWidth: '800px' }}>
          Delivering Excellence Worldwide
        </h2>

        {/* Road line */}
        <div style={{ width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)', position: 'absolute', bottom: '30%', opacity: 0.5 }} />

        {/* Truck SVG Wrapper */}
        <div ref={truckRef} style={{ position: 'absolute', bottom: 'calc(30% - 95px)', width: 'min(600px, 85vw)', zIndex: 10 }}>
          <img src="/cargotruckfinale.png" alt="Cargo Truck" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }} />
        </div>

      </div>
    </div>
  );
};

export default TruckTransition;
