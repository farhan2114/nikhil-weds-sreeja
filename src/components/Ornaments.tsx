import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assets } from '../data/assets';

gsap.registerPlugin(ScrollTrigger);

interface OrnamentProps {
  className?: string;
  variant?: 'large' | 'small' | 'gold' | 'leaf';
}

const ornamentSrc: Record<string, string> = {
  large: assets.flowerLarge,
  small: assets.flowerSmall,
  gold: assets.goldLily,
  leaf: assets.leafLine,
};

export const Ornament: React.FC<OrnamentProps> = ({ className = '', variant = 'large' }) => {
  return (
    <img
      src={ornamentSrc[variant]}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute select-none opacity-45 ${className}`}
    />
  );
};

interface MandalaProps {
  className?: string;
  reverse?: boolean;
  parallax?: boolean;
}

export const SpinningMandala: React.FC<MandalaProps> = ({
  className = '',
  reverse = false,
  parallax = true,
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;
    const el = parallaxRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -40 },
        {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [parallax]);

  return (
    <div className={`pointer-events-none absolute select-none ${className}`}>
      <div ref={parallaxRef} className="h-full w-full will-change-transform">
        <img
          src={assets.mandalaOrange}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`h-full w-full object-contain opacity-25 mix-blend-multiply ${
            reverse ? 'animate-spin-soft-reverse' : 'animate-spin-soft'
          }`}
          style={{ transformOrigin: 'center center' }}
        />
      </div>
    </div>
  );
};

export const FloralSectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.floral-bloom'),
        { scale: 0.82, opacity: 0.3, y: 10 },
        {
          scale: 1,
          opacity: 0.95,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`relative py-3 sm:py-5 flex items-center justify-center overflow-hidden select-none pointer-events-none ${className}`}
    >
      <div className="floral-bloom flex items-center justify-center gap-3 w-full max-w-lg mx-auto px-6 will-change-transform">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
        <img
          src={assets.lotusDivider}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-24 sm:w-36 opacity-85 object-contain drop-shadow-sm"
        />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
      </div>
    </div>
  );
};

