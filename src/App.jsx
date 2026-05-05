import React from 'react';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TruckTransition from './components/TruckTransition';
import ProductsSection from './components/ProductsSection';
import PlaneTransition from './components/PlaneTransition';
import WhyUsSection from './components/WhyUsSection';
import SourcingSection from './components/SourcingSection';
import PackagingSection from './components/PackagingSection';
import CommitmentSection from './components/CommitmentSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CustomCursor from './components/CustomCursor';

function App() {
  React.useEffect(() => {
    const handlePlaceholderClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href') === '#') {
        e.preventDefault();
      }
    };
    window.addEventListener('click', handlePlaceholderClick);
    return () => window.removeEventListener('click', handlePlaceholderClick);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--navy-900)' }}>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TruckTransition />
      <ProductsSection />
      <PlaneTransition />
      <WhyUsSection />
      <SourcingSection />
      <PackagingSection />
      <CommitmentSection />
      <ContactSection />
      <Footer />
      <Chatbot />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
