import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor - A premium gold-ring cursor that replaces the default browser cursor.
 *
 * States:
 *   default  - Hollow gold ring, small
 *   hover    - Expanded, filled, blend-mode difference
 *   click    - Brief scale pulse
 */
const CustomCursor = () => {
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.style.cursor = 'none';

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.1);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.1);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterInteractive = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.add('cursor-hover');
      }
    };

    const onMouseLeaveInteractive = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.remove('cursor-hover');
      }
    };

    const onMouseDown = () => {
      if (cursorRingRef.current) cursorRingRef.current.classList.add('cursor-click');
    };
    const onMouseUp = () => {
      if (cursorRingRef.current) cursorRingRef.current.classList.remove('cursor-click');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Attach hover detection to all interactive elements
    const interactiveSelectors = 'a, button, .product-card, .table-row, [data-magnetic]';
    const attachHover = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    attachHover();

    // Re-attach when DOM changes (basic MutationObserver)
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold-500)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />

      {/* Ring — follows with Lerp lag */}
      <div
        ref={cursorRingRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid var(--gold-500)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
        }}
      />

      <style>{`
        * { cursor: none !important; }

        .custom-cursor-ring.cursor-hover {
          width: 64px !important;
          height: 64px !important;
          background-color: rgba(212, 168, 67, 0.12) !important;
          border-color: var(--gold-400) !important;
          margin-left: -12px;
          margin-top: -12px;
        }

        .custom-cursor-ring.cursor-click {
          transform: scale(0.8) !important;
          background-color: rgba(212, 168, 67, 0.25) !important;
        }

        @media (hover: none) {
          * { cursor: auto !important; }
          .custom-cursor-ring, .custom-cursor-dot { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
