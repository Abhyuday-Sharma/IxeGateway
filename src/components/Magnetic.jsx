import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Magnetic - A wrapper that applies a smooth magnetic pull effect
 * when the cursor enters the element's proximity.
 *
 * Props:
 *   strength    - How many px the element moves at max pull (default: 30)
 *   threshold   - How close (px) the cursor must be to trigger (default: 80)
 *   children    - The element to magnetize
 */
const Magnetic = ({ children, strength = 30, threshold = 80 }) => {
  const ref = useRef(null);
  const isHovered = useRef(false);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDist = Math.max(rect.width, rect.height) / 2 + threshold;

    if (distance < maxDist) {
      const pull = 1 - distance / maxDist;
      gsap.to(el, {
        x: deltaX * pull * (strength / 30),
        y: deltaY * pull * (strength / 30),
        duration: 0.4,
        ease: 'power2.out',
      });
    } else {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    }
  }, [strength, threshold]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
