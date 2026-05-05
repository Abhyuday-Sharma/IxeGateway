import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, X, Send, Bot, ExternalLink } from 'lucide-react';

const KNOWLEDGE_BASE = {
  makhana: "We specialize in premium Fox Nuts (Makhana) from India. We offer four grades: 4 Suta (Industrial), 5 Suta (Commercial), 6 Suta (Premium Retail), and 7 Suta (Gourmet Luxury). Which variety are you interested in?",
  grades: "Our Makhana grades are determined by size (Suta). 7 Suta is the largest and most premium, while 4 Suta is smaller and ideal for food processing.",
  quote: "To get a competitive quote, please use our 'Request a Quote' form on the website or provide your email/WhatsApp number here, and our team will assist you.",
  contact: "You can reach us at +91 9315346713 or email us at info@ixegateway.com. We are also available on WhatsApp!",
  about: "IXE Gateway Pvt. Ltd. is a premium global sourcing partner specializing in agricultural exports, particularly Makhana. We ensure quality control, streamlined logistics, and reliable supply chains.",
  export: "We export globally, managing everything from sourcing at origin to international logistics. Our primary focus is currently on high-quality Makhana exports.",
  greeting: "Hello! How can I assist you with your global sourcing or Makhana requirements today?"
};

const SUGGESTIONS = [
  { label: "About Makhana", trigger: "makhana" },
  { label: "Makhana Grades", trigger: "grades" },
  { label: "Request a Quote", trigger: "quote" },
  { label: "Contact Info", trigger: "contact" }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: KNOWLEDGE_BASE.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('makhana') || text.includes('fox nut')) return KNOWLEDGE_BASE.makhana;
    if (text.includes('grade') || text.includes('suta') || text.includes('size')) return KNOWLEDGE_BASE.grades;
    if (text.includes('quote') || text.includes('price') || text.includes('cost')) return KNOWLEDGE_BASE.quote;
    if (text.includes('contact') || text.includes('phone') || text.includes('call') || text.includes('whatsapp') || text.includes('email')) return KNOWLEDGE_BASE.contact;
    if (text.includes('about') || text.includes('who are you') || text.includes('company')) return KNOWLEDGE_BASE.about;
    if (text.includes('export') || text.includes('shipping') || text.includes('logistics')) return KNOWLEDGE_BASE.export;
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) return KNOWLEDGE_BASE.greeting;
    
    return "I'm not sure I understand. Would you like to know about our Makhana varieties, request a quote, or get our contact details?";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate thinking time
    setTimeout(() => {
      const response = getBotResponse(text);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion.label);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: window.innerWidth <= 768 ? '50px' : '60px',
          height: window.innerWidth <= 768 ? '50px' : '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold-500)',
          color: 'var(--navy-900)',
          border: 'none',
          boxShadow: '0 10px 25px rgba(212, 168, 67, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
        onMouseEnter={(e) => { if(!isOpen) e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { if(!isOpen) e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {isOpen ? <X size={window.innerWidth <= 768 ? 24 : 28} /> : <MessageSquareText size={window.innerWidth <= 768 ? 24 : 28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div id="chatbot-window" style={{
          position: 'fixed',
          bottom: window.innerWidth <= 768 ? '90px' : '100px',
          right: window.innerWidth <= 768 ? '15px' : '30px',
          width: window.innerWidth <= 768 ? 'calc(100vw - 30px)' : '380px',
          height: window.innerWidth <= 768 ? 'calc(100dvh - 120px)' : '600px',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)',
          animation: 'chatFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          
          {/* Chat Header */}
          <div style={{
            backgroundColor: 'var(--navy-900)',
            color: 'white',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, var(--navy-900) 0%, #1a2a44 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '45px',
                height: '45px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(212,168,67,0.3)'
              }}>
                <Bot color="var(--gold-500)" size={24} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--gold-400)', fontWeight: 600 }}>IXE Support Bot</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Online | Global Trade</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.6 }}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            backgroundColor: '#f8f9fc',
            backgroundImage: 'radial-gradient(var(--gray-200) 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '1rem 1.2rem',
                  borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  backgroundColor: msg.sender === 'user' ? 'var(--navy-900)' : 'white',
                  color: msg.sender === 'user' ? 'white' : 'var(--navy-900)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  position: 'relative',
                  border: msg.sender === 'bot' ? '1px solid rgba(0,0,0,0.03)' : 'none'
                }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--gray-400)', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {msg.sender === 'user' ? 'You' : 'IXE Bot'}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '18px 18px 18px 2px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--gold-500)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></div>
                  <div className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--gold-500)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></div>
                  <div className="dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--gold-500)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div style={{
            padding: '0.8rem 1rem',
            backgroundColor: '#f8f9fc',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            borderTop: '1px solid rgba(0,0,0,0.05)'
          }}>
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(sug)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  border: '1.5px solid var(--gold-500)',
                  backgroundColor: 'transparent',
                  color: 'var(--navy-900)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: 500
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--gold-500)';
                  e.currentTarget.style.color = 'var(--navy-900)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--navy-900)';
                }}
              >
                {sug.label}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            style={{
              padding: '1.2rem',
              backgroundColor: 'white',
              borderTop: '1px solid var(--gray-200)',
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'center'
            }}
          >
            <input 
              type="text" 
              placeholder="Ask anything about our exports..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.9rem 1.2rem',
                borderRadius: '50px',
                border: '1.5px solid var(--gray-200)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gold-500)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--gray-200)'}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: input.trim() && !isTyping ? 'var(--navy-900)' : 'var(--gray-200)',
                color: input.trim() && !isTyping ? 'var(--gold-500)' : 'var(--gray-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: input.trim() ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <Send size={20} style={{ marginLeft: '2px' }} />
            </button>
          </form>

        </div>
      )}

      <style>{`
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        @media(max-width: 480px) {
          #chatbot-window {
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100dvh !important;
            border-radius: 0 !important;
          }
          #chatbot-window > div:first-child {
            padding-top: 3rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
