import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GlobeSVG = () => {
  const containerRef = useRef(null);
  const pathsRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate the whole globe slowly
      gsap.to('.globe-group', {
        rotation: 360,
        duration: 40,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center'
      });

      // Animate trade arrows / paths drawing in and out
      pathsRef.current.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2 + Math.random() * 2,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.5
        });
      });

      // Pulse destination dots
      dotsRef.current.forEach((dot, i) => {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.3,
          duration: 1 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
          transformOrigin: 'center'
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Simplified Abstract World SVG + Trade Routes
  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 20px rgba(212, 168, 67, 0.2))' }}>
        <g className="globe-group">
          {/* Base Sphere Glow */}
          <circle cx="200" cy="200" r="180" fill="rgba(15, 33, 64, 0.5)" stroke="var(--navy-600)" strokeWidth="1" />
          
          {/* Latitude Lines */}
          <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="180" ry="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* Longitude Lines */}
          <ellipse cx="200" cy="200" rx="60" ry="180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="120" ry="180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* Abstract landmass representation using dots (India as center point roughly at 240, 160) */}
          <circle cx="240" cy="160" r="4" fill="var(--gold-500)" style={{ filter: 'drop-shadow(0 0 5px var(--gold-500))' }} />
          
          {/* Trade Routes emitting from India (240, 160) to various points */}
          <path ref={el => pathsRef.current[0] = el} d="M240 160 Q 300 100 340 120" fill="none" stroke="var(--gold-400)" strokeWidth="2" strokeLinecap="round" />
          <path ref={el => pathsRef.current[1] = el} d="M240 160 Q 150 140 120 100" fill="none" stroke="var(--gold-400)" strokeWidth="2" strokeLinecap="round" />
          <path ref={el => pathsRef.current[2] = el} d="M240 160 Q 200 250 160 280" fill="none" stroke="var(--gold-400)" strokeWidth="2" strokeLinecap="round" />
          <path ref={el => pathsRef.current[3] = el} d="M240 160 Q 320 220 300 300" fill="none" stroke="var(--gold-400)" strokeWidth="2" strokeLinecap="round" />
          
          {/* Destination Nodes */}
          <circle ref={el => dotsRef.current[0] = el} cx="340" cy="120" r="3" fill="var(--white)" />
          <circle ref={el => dotsRef.current[1] = el} cx="120" cy="100" r="3" fill="var(--white)" />
          <circle ref={el => dotsRef.current[2] = el} cx="160" cy="280" r="3" fill="var(--white)" />
          <circle ref={el => dotsRef.current[3] = el} cx="300" cy="300" r="3" fill="var(--white)" />
        </g>
      </svg>
    </div>
  );
};

export default GlobeSVG;
