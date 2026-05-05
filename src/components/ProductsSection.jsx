import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const makhanaTypes = [
  {
    title: '4 Suta Makhana',
    size: 'Small (10-15mm)',
    shape: 'Not Perfectly Round',
    category: 'Regular',
    color: 'Off white',
    price: 'Most affordable',
    uses: ['Food processing applications', 'Powder, cereals, and ingredient use', 'Cost-efficient option for large scale production'],
    image: '/foursuta.png'
  },
  {
    title: '5 Suta Makhana',
    size: 'Medium (14-18mm)',
    shape: 'Decent Roundness',
    category: 'Good / Commercial',
    color: 'White',
    price: 'Mid Ranged',
    uses: ['Bulk snack production', 'Private labelling and repackaging', 'Retail and foodservice sectors'],
    image: '/fivesuta.png'
  },
  {
    title: '6 Suta Makhana',
    size: 'Big Sized (18-22mm)',
    shape: 'Round and Uniform',
    category: 'Premium',
    color: 'Bright White',
    price: 'High',
    uses: ['Large Sized, uniform makhanas', 'Flavored snacks and branded retail packs', 'Health and wellness brands'],
    image: '/sixsuta.png'
  },
  {
    title: '7 Suta Makhana',
    size: 'Very Large (22-25mm)',
    shape: 'Almost Perfect Shape',
    category: 'Super Premium / Gourmet',
    color: 'Bright White',
    price: 'Premium',
    uses: ['Extra Large, premium quality', 'Luxury packaging and gifting', 'High-end retail markets'],
    image: '/sevensuta.png'
  }
];

const ProductsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--navy-900)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '1rem' }}>
            Premium <span className="text-gradient">Makhana</span> Collection
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Sourced from the finest growing regions of Bihar, processed and graded to meet international quality standards.
          </p>
          <a href="/ixethree/index.html" className="btn-outline" style={{ gap: '0.8rem' }}>
            Know More <ChevronRight size={18} />
          </a>
        </div>

        {/* Product Cards */}
        <div className="grid-4" style={{ marginBottom: '5rem' }}>
          {makhanaTypes.map((item, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="product-card-container"
              style={{ perspective: '1500px', height: '100%' }}
            >
              <div 
                className="product-card-flipper"
                style={{ 
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.8s',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front Face */}
                <div 
                  className="product-card-front glass-panel"
                  style={{ 
                    padding: '2rem 1.5rem', 
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid rgba(212, 168, 67, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    backfaceVisibility: 'hidden',
                    height: '100%'
                  }}
                >
                  {/* Top Accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--gold-300), var(--gold-500))' }} />

                  <h3 style={{ fontSize: '1.5rem', color: 'var(--gold-400)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    {item.title}
                  </h3>

                  <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--gray-200)', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--gray-400)' }}>Size:</span> <span>{item.size}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--gray-400)' }}>Category:</span> <span>{item.category}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--gray-400)' }}>Color:</span> <span>{item.color}</span>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: '0.8rem' }}>Best For</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0, margin: 0, listStyle: 'none' }}>
                      {item.uses.map((use, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-400)' }}>
                          <CheckCircle2 size={14} color="var(--gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Back Face */}
                <div 
                  className="product-card-back glass-panel"
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(10, 25, 47, 0.95)',
                    border: '1px solid rgba(212, 168, 67, 0.35)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    boxShadow: '0 0 40px rgba(212, 168, 67, 0.22)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Top Accent */}
                  <div style={{ width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--gold-300), var(--gold-500))' }} />

                  {/* Image Header / Top half */}
                  <div style={{ position: 'relative', width: '100%', height: '52%', overflow: 'hidden', backgroundColor: '#000' }}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }} 
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '40%', 
                      background: 'linear-gradient(to top, rgba(10, 25, 47, 0.95), transparent)' 
                    }} />
                  </div>

                  {/* Info Panel / Bottom half */}
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    padding: '1.2rem 1.5rem', 
                    backgroundColor: 'rgba(10, 25, 47, 0.95)',
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--gold-300)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '2px', 
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.4rem'
                      }}>
                        Premium Export Quality
                      </span>
                      <h4 style={{ fontSize: '1.35rem', color: 'var(--white)', marginBottom: '0.6rem', fontWeight: 600 }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--gray-300)', lineHeight: '1.4', margin: 0 }}>
                        {item.size} • {item.category} Grade • {item.color}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--gray-400)', lineHeight: '1.4', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        Ideal for: {item.uses[0]} and more.
                      </p>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      borderTop: '1px solid rgba(255,255,255,0.08)', 
                      paddingTop: '0.8rem',
                      marginTop: '0.4rem'
                    }}>
                      <span style={{ color: 'var(--gold-400)', fontSize: '0.85rem', fontWeight: 600 }}>
                        {item.price}
                      </span>
                      <a href="/ixethree/index.html" style={{ 
                        color: 'var(--white)', 
                        fontSize: '0.8rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.3rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }} className="back-link-hover">
                        View Details <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .product-card-container:hover .product-card-flipper {
          transform: rotateY(180deg);
        }
        .product-card-container {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default ProductsSection;
