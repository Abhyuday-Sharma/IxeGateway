import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CommitmentSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.commitment-content',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--white)', color: 'var(--navy-900)', borderBottom: '1px solid var(--gray-200)' }}>
      <div className="container commitment-content">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div>
            <h2 style={{ fontSize: '3rem', color: 'var(--navy-900)', marginBottom: '1.5rem' }}>
              Our <span style={{ color: 'var(--gold-500)' }}>Commitment</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--gray-800)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              At IXE Gateway Pvt Ltd, we are committed to delivering more than just products – we deliver reliable trade solutions. 
            </p>
            <p style={{ fontSize: '1.2rem', color: 'var(--gray-800)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
              From sourcing to shipment, our focus is on ensuring that every order is handled with precision, professionalism, and attention to detail.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px', padding: '1.5rem', backgroundColor: 'var(--off-white)', borderRadius: '12px', borderLeft: '4px solid var(--gold-500)' }}>
                <Target color="var(--gold-500)" size={28} style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.2rem', color: 'var(--navy-800)', marginBottom: '0.5rem' }}>Our Approach</h4>
                <p style={{ color: 'var(--gray-800)' }}>Building long term partnerships by understanding clients' requirements and consistently delivering value.</p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--navy-900)', padding: '3rem', borderRadius: '16px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05 }}>
              <Leaf size={250} />
            </div>
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
                 <path d="M3 21c3 0 7-1 7-8V5c0-1.25.75-2.5 2-3 1.25.5 2 1.75 2 3v8c0 7 4 8 7 8" />
              </svg>
              
              <h3 style={{ fontSize: '1.8rem', color: 'var(--gold-400)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: '1.5' }}>
                "We aim to be a dependable global sourcing partner, providing consistent quality and seamless trade solutions to businesses worldwide."
              </h3>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '2px' }}>IXE Gateway Pvt Ltd</span>
              </div>
            </div>
          </div>

        </div>

      </div>
      <style>{`
        @media(max-width: 992px) {
          .commitment-content > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CommitmentSection;
