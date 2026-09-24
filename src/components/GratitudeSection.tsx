import React from 'react';
import { CalendarCheck, MapPin } from 'lucide-react';
import { weddingConfig, weddingData } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

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
  const t = (weddingConfig as any).thankYou || {};

  const brideName = t.brideName || weddingConfig.couple.bride;
  const groomName = t.groomName || weddingConfig.couple.groom;
  const ampersand = t.ampersand || '&';
  const eyebrow = t.eyebrow || 'With Love & Gratitude';
  const subtitle = t.subtitle || 'Thank You For Blessing Us';
  const closingLine = t.closingLine || '“We cannot imagine our celebration without you.”';
  const coupleIllustration = t.coupleIllustration || '/client-images/couple-chibi-transparent.png';
  const coupleIllustrationAlt =
    t.coupleIllustrationAlt ||
    `Illustration of ${brideName} and ${groomName} greeting guests with folded hands`;
  const dateLine = t.dateLine || 'Sunday, November 22, 2026 · 10:54 AM';
  const venueLine = t.venueLine || weddingConfig.venue.name;
  const venueCity = weddingConfig.venue.city;
  const familyNote = t.familyNote || `With love, the families of ${brideName} & ${groomName}`;

  const mapsSearchUrl =
    weddingConfig.venue.mapsSearchUrl ||
    'https://maps.app.goo.gl/nurVigToR7DMZYpE7';

  // Responsive font scaling for couple names (adapts dynamically whether names are short or long)
  const totalLength = (brideName + groomName).length;
  const nameSizeClass =
    totalLength > 32
      ? 'text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl'
      : totalLength > 20
      ? 'text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl'
      : 'text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl';

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:py-16">
      <RevealOnScroll className="relative mx-auto max-w-2xl">
        {/* ── Refined Invitation Paper Card ── */}
        <div className="relative overflow-hidden rounded-2xl border border-gold/45 bg-[#FAF7F0] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl shadow-black/5">
          
          {/* ── 1. Top Corners: Ornate Golden Floral Bouquets (from media_1790169055376) ── */}
          <img
            src="/client-images/floral-bouquet.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -top-4 -left-4 w-28 sm:w-40 opacity-80 select-none"
          />
          <img
            src="/client-images/floral-bouquet.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -top-4 -right-4 w-28 sm:w-40 -scale-x-100 opacity-80 select-none"
          />

          {/* ── 2. Bottom Corners: Golden Lily Branches (from media_1790169055332) ── */}
          <img
            src="/client-images/floral-corner-lily.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -bottom-3 -left-3 w-32 sm:w-48 -scale-x-100 opacity-85 select-none"
          />
          <img
            src="/client-images/floral-corner-lily.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -bottom-3 -right-3 w-32 sm:w-48 opacity-85 select-none"
          />

          {/* Inner Golden Border Frame */}
          <span className="pointer-events-none absolute inset-3 sm:inset-4 border border-gold/30 rounded-xl" />

          <div className="relative z-10">
            {/* Top Lotus Blossom with subtle horizontal line wings */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-10 sm:w-16 bg-gold/40" />
              <LotusIcon className="size-6 text-gold" />
              <span className="h-[1px] w-10 sm:w-16 bg-gold/40" />
            </div>

            {/* Eyebrow */}
            <p className="mt-3 font-title text-[0.68rem] sm:text-xs uppercase tracking-[0.28em] text-[#8C7A60] font-semibold">
              {eyebrow}
            </p>

            {/* Couple Names (Auto-responsive & naturally wrapping for any name length) */}
            <h2
              className={`mt-4 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 font-display ${nameSizeClass} text-[#8A6D3B] tracking-wide font-normal max-w-full px-2 leading-tight text-center`}
            >
              <span className="break-words">{brideName}</span>
              <span className="font-title text-xl sm:text-2xl lg:text-3xl text-maroon mx-0.5 align-baseline select-none">
                {ampersand}
              </span>
              <span className="break-words">{groomName}</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 font-title text-xs sm:text-sm uppercase tracking-[0.26em] text-maroon font-bold">
              {subtitle}
            </p>

            {/* Center Lotus Divider */}
            <div className="my-4 flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 sm:w-20 bg-gold/35" />
              <LotusIcon className="size-5 text-gold/90" />
              <span className="h-[1px] w-12 sm:w-20 bg-gold/35" />
            </div>

            {/* Heartfelt Closing Statement */}
            <div className="mx-auto max-w-xl my-4 sm:my-5 px-3">
              <p className="font-display italic text-xl sm:text-3xl text-maroon font-normal tracking-wide leading-relaxed drop-shadow-sm">
                {closingLine}
              </p>
            </div>

            {/* ── Centerpiece Couple (Cute Namaste) ── */}
            <div className="relative mx-auto my-5 sm:my-7 flex items-center justify-center">
              <img
                src={coupleIllustration}
                alt={coupleIllustrationAlt}
                loading="lazy"
                width={706}
                height={1024}
                className="relative z-10 w-44 sm:w-56 md:w-64 max-h-[380px] h-auto object-contain select-none drop-shadow-md transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Date, Time & Venue Block */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-center gap-2 mb-2 text-gold">
                <span className="h-[1px] w-8 bg-gold/40" />
                <span className="text-[0.65rem]">✦</span>
                <span className="h-[1px] w-8 bg-gold/40" />
              </div>

              <p className="font-title text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-maroon">
                {dateLine}
              </p>
              <p className="font-title text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8C7A60]">
                {venueLine}
              </p>
              <p className="text-[0.72rem] sm:text-xs text-[#7A7065] max-w-md mx-auto">
                {venueCity}
              </p>
            </div>

            {/* ── Action Buttons ── */}
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

            {/* ── Footer Family Line & Hashtags ── */}
            <div className="mt-8 pt-5 border-t border-gold/30 space-y-2">
              <p className="font-serif italic text-xs sm:text-sm text-[#7A6D5E]">
                {familyNote}
              </p>
              <div className="mt-3 flex flex-col items-center gap-1">
                <span className="font-title uppercase tracking-[0.26em] text-xs text-gold-deep font-semibold">
                  {weddingData.hashtag}
                </span>
                <span className="font-display italic text-xl sm:text-2xl text-maroon tracking-[0.18em] font-normal drop-shadow-sm">
                  {weddingData.secondaryHashtag || '#SREENI'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
