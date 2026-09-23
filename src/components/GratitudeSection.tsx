import React from 'react';
import { CalendarCheck, MapPin } from 'lucide-react';
import { weddingConfig } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

// Delicate botanical corner ornament matching the reference invitation card
const FloralCorner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none absolute size-16 sm:size-24 text-gold/60 ${className}`}
  >
    <path
      d="M10 90 C 15 60, 40 35, 90 10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M20 75 C 28 65, 38 68, 36 55 C 34 46, 22 52, 20 75 Z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M40 55 C 50 48, 60 52, 58 40 C 56 32, 44 38, 40 55 Z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M60 38 C 72 32, 80 38, 78 26 C 76 18, 64 24, 60 38 Z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M25 85 C 38 88, 50 80, 46 72 C 40 68, 30 75, 25 85 Z"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M75 25 C 88 28, 85 40, 78 38 C 70 34, 72 24, 75 25 Z"
      fill="currentColor"
      fillOpacity="0.18"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <circle cx="88" cy="12" r="2" fill="currentColor" fillOpacity="0.7" />
    <circle cx="12" cy="88" r="2" fill="currentColor" fillOpacity="0.7" />
  </svg>
);

// Side botanical branch flanking the couple
const LeafSprig: React.FC<{ className?: string; flip?: boolean }> = ({ className = '', flip = false }) => (
  <svg
    viewBox="0 0 45 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none absolute h-28 sm:h-44 text-gold/45 ${flip ? '-scale-x-100' : ''} ${className}`}
  >
    <path
      d="M22 125 C 22 85, 16 45, 30 8"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M21 98 C 10 90, 6 78, 12 74 C 18 70, 21 82, 21 98 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M23 80 C 34 72, 38 60, 31 56 C 24 52, 22 65, 23 80 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M19 58 C 8 50, 4 38, 11 34 C 18 30, 20 43, 19 58 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M25 42 C 35 34, 38 22, 32 18 C 26 14, 24 27, 25 42 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <circle cx="30" cy="8" r="2" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

// Lotus emblem motif
const LotusIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 60 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block size-6 text-gold ${className}`}
  >
    <path
      d="M30 3 C 24 12, 26 22, 30 27 C 34 22, 36 12, 30 3 Z"
      fill="currentColor"
      fillOpacity="0.35"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M30 27 C 22 25, 14 16, 16 8 C 22 14, 26 22, 30 27 Z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M30 27 C 38 25, 46 16, 44 8 C 38 14, 34 22, 30 27 Z"
      fill="currentColor"
      fillOpacity="0.22"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M26 27 C 18 26, 6 22, 8 16 C 14 18, 20 23, 26 27 Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M34 27 C 42 26, 54 22, 52 16 C 46 18, 40 23, 34 27 Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const GratitudeSection: React.FC = () => {
  const mapsSearchUrl =
    weddingConfig.venue.mapsSearchUrl ||
    'https://maps.app.goo.gl/nurVigToR7DMZYpE7';

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:py-16">
      <RevealOnScroll className="relative mx-auto max-w-2xl">
        {/* ── Refined Invitation Paper Card ── */}
        <div className="relative overflow-hidden rounded-xl border border-gold/45 bg-[#FAF7F0] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl shadow-black/5">
          {/* Outer Corner Floral Sprigs */}
          <FloralCorner className="left-2 top-2" />
          <FloralCorner className="right-2 top-2 -scale-x-100" />
          <FloralCorner className="left-2 bottom-2 -scale-y-100" />
          <FloralCorner className="right-2 bottom-2 -scale-x-100 -scale-y-100" />

          {/* Inner Golden Border Frame */}
          <span className="pointer-events-none absolute inset-3 sm:inset-4 border border-gold/30 rounded-lg" />

          <div className="relative z-10">
            {/* Top Lotus Blossom with subtle horizontal line wings */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-10 sm:w-16 bg-gold/40" />
              <LotusIcon className="size-6 text-gold" />
              <span className="h-[1px] w-10 sm:w-16 bg-gold/40" />
            </div>

            {/* Eyebrow */}
            <p className="mt-3 font-title text-[0.68rem] sm:text-xs uppercase tracking-[0.28em] text-[#8C7A60] font-semibold">
              With Love &amp; Gratitude
            </p>

            {/* Couple Names */}
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-[#8A6D3B] tracking-wide font-normal">
              {weddingConfig.couple.bride}{' '}
              <span className="font-title text-2xl sm:text-3xl text-maroon mx-1 align-baseline">&amp;</span>{' '}
              {weddingConfig.couple.groom}
            </h2>

            {/* Subtitle */}
            <p className="mt-3 font-title text-xs sm:text-sm uppercase tracking-[0.26em] text-maroon font-bold">
              Thank You For Blessing Us
            </p>

            {/* Center Lotus Divider */}
            <div className="my-4 flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 sm:w-20 bg-gold/35" />
              <LotusIcon className="size-5 text-gold/90" />
              <span className="h-[1px] w-12 sm:w-20 bg-gold/35" />
            </div>

            {/* Gratitude Paragraph */}
            <p className="mx-auto max-w-lg text-xs sm:text-sm sm:leading-relaxed text-[#5A524A] font-serif sm:font-sans">
              Your presence, prayers, and affection mean the world to us. We cannot imagine our celebration without you.
            </p>

            {/* ── Centerpiece Couple (Cute Chibi Namaste) with Side Floral Sprigs ── */}
            <div className="relative mx-auto my-6 sm:my-8 flex items-center justify-center">
              {/* Left Leaf Sprig */}
              <LeafSprig className="left-4 sm:left-14 top-1/2 -translate-y-1/2" />

              {/* Chibi Couple Illustration */}
              <img
                src="/client-images/couple-chibi-transparent.png"
                alt="Illustration of Sreeja and Nikhil greeting guests with folded hands"
                loading="lazy"
                width={430}
                height={480}
                className="relative z-10 w-48 sm:w-60 h-auto object-contain select-none drop-shadow-sm transition-transform duration-700 hover:scale-105"
              />

              {/* Right Leaf Sprig */}
              <LeafSprig className="right-4 sm:right-14 top-1/2 -translate-y-1/2" flip />
            </div>

            {/* Date, Time & Venue Block */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-center gap-2 mb-2 text-gold">
                <span className="h-[1px] w-8 bg-gold/40" />
                <span className="text-[0.65rem]">✦</span>
                <span className="h-[1px] w-8 bg-gold/40" />
              </div>

              <p className="font-title text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-maroon">
                Sunday, November 22, 2026 · 10:54 AM
              </p>
              <p className="font-title text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8C7A60]">
                {weddingConfig.venue.name}
              </p>
              <p className="text-[0.72rem] sm:text-xs text-[#7A7065] max-w-md mx-auto">
                {weddingConfig.venue.city}
              </p>
            </div>

            {/* ── Action Buttons matching reference ── */}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              {/* RSVP Button */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('rsvp');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold/75 bg-white/80 hover:bg-gold/15 px-6 py-2.5 text-xs font-title font-bold uppercase tracking-[0.18em] text-maroon shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <CalendarCheck className="size-4 text-gold-deep" />
                <span>RSVP</span>
              </button>

              {/* Get Directions Button */}
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold/75 bg-white/80 hover:bg-gold/15 px-6 py-2.5 text-xs font-title font-bold uppercase tracking-[0.18em] text-maroon shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <MapPin className="size-4 text-gold-deep" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* ── Footer Family Line with Lotus Divider ── */}
            <div className="mt-8 pt-5 border-t border-gold/30">
              <p className="font-serif italic text-xs sm:text-sm text-[#7A6D5E]">
                With love, the families of Sreeja &amp; Nikhil
              </p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
