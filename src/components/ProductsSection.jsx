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
    uses: ['Food processing applications', 'Powder, cereals, and ingredient use', 'Cost-efficient option for large scale production']
  },
  {
    title: '5 Suta Makhana',
    size: 'Medium (14-18mm)',
    shape: 'Decent Roundness',
    category: 'Good / Commercial',
    color: 'White',
    price: 'Mid Ranged',
    uses: ['Bulk snack production', 'Private labelling and repackaging', 'Retail and foodservice sectors']
  },
  {
    title: '6 Suta Makhana',
    size: 'Big Sized (18-22mm)',
    shape: 'Round and Uniform',
    category: 'Premium',
    color: 'Bright White',
    price: 'High',
    uses: ['Large Sized, uniform makhanas', 'Flavored snacks and branded retail packs', 'Health and wellness brands']
  },
  {
    title: '7 Suta Makhana',
    size: 'Very Large (22-25mm)',
    shape: 'Almost Perfect Shape',
    category: 'Super Premium / Gourmet',
    color: 'Bright White',
    price: 'Premium',
    uses: ['Extra Large, premium quality', 'Luxury packaging and gifting', 'High-end retail markets']
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
              className="glass-panel product-card"
              style={{ 
                padding: '2rem 1.5rem', 
                backgroundColor: 'var(--navy-800)',
                border: '1px solid rgba(212, 168, 67, 0.2)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
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
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.uses.map((use, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--gray-400)' }}>
                      <CheckCircle2 size={14} color="var(--gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div class="glass-panel grade-overview" style={{ 
          padding: '3rem', 
          backgroundColor: 'var(--navy-800)', 
          border: '1px solid rgba(212, 168, 67, 0.25)', 
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 0 60px rgba(212, 168, 67, 0.15)',
          marginBottom: '3rem'
        }}>
          {/* Background Glow Aura */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '130%', 
            height: '130%', 
            background: 'radial-gradient(circle, rgba(212, 168, 67, 0.12) 0%, transparent 65%)', 
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <h3 style={{ fontSize: '2.2rem', color: 'var(--white)', marginBottom: '2.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>Grade Overview</h3>

          
          <div className="no-scrollbar" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px', position: 'relative', zIndex: 1 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--gold-500)', backgroundColor: 'rgba(212, 168, 67, 0.05)' }}>
                  <th style={{ padding: '1.2rem 1rem', color: 'var(--gold-400)', fontWeight: 600, borderRight: '1px solid rgba(212, 168, 67, 0.2)' }}>Grade</th>
                  <th style={{ padding: '1.2rem 1rem', color: 'var(--gold-400)', fontWeight: 600, borderRight: '1px solid rgba(212, 168, 67, 0.2)' }}>Size</th>
                  <th style={{ padding: '1.2rem 1rem', color: 'var(--gold-400)', fontWeight: 600, borderRight: '1px solid rgba(212, 168, 67, 0.2)' }}>Category</th>
                  <th style={{ padding: '1.2rem 1rem', color: 'var(--gold-400)', fontWeight: 600 }}>Best Applications</th>
                </tr>
              </thead>

              <tbody>
                <tr className="table-row" style={{ borderBottom: '1px solid rgba(212, 168, 67, 0.1)' }}>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--white)', borderRight: '1px solid rgba(212, 168, 67, 0.1)', fontWeight: 600 }}>4 Suta</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>12–15 mm</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>Industrial</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)' }}>Food processing</td>
                </tr>
                <tr className="table-row" style={{ borderBottom: '1px solid rgba(212, 168, 67, 0.1)' }}>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--white)', borderRight: '1px solid rgba(212, 168, 67, 0.1)', fontWeight: 600 }}>5 Suta</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>15–18 mm</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>Commercial</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)' }}>Bulk snacks</td>
                </tr>
                <tr className="table-row" style={{ borderBottom: '1px solid rgba(212, 168, 67, 0.1)' }}>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--white)', borderRight: '1px solid rgba(212, 168, 67, 0.1)', fontWeight: 600 }}>6 Suta</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>18–21 mm</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>Premium</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)' }}>Retail & flavoured</td>
                </tr>
                <tr className="table-row">
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--white)', borderRight: '1px solid rgba(212, 168, 67, 0.1)', fontWeight: 600 }}>7 Suta</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>21+ mm</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)', borderRight: '1px solid rgba(212, 168, 67, 0.1)' }}>Gourmet</td>
                  <td style={{ padding: '1.2rem 1rem', color: 'var(--gray-200)' }}>Luxury & gifting</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>


      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.5), 0 0 15px rgba(212, 168, 67, 0.2);
          border-color: var(--gold-500) !important;
        }
        .table-row {
          transition: all 0.3s ease;
        }
        .table-row:hover {
          background-color: rgba(212, 168, 67, 0.08);
          transform: scale(1.005);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        @media(max-width: 768px) {
          .grade-overview {
            padding: 2rem 1rem !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

      `}</style>
    </section>
  );
};

export default ProductsSection;
