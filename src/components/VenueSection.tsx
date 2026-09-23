import React from 'react';
import { MapPin, Calendar, CalendarPlus } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig, weddingData } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

export const VenueSection: React.FC = () => {
  const query = `${weddingConfig.venue.name} ${weddingConfig.venue.city}`;
  const mapsSearchUrl =
    weddingConfig.venue.mapsSearchUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  const mapsEmbedUrl =
    weddingConfig.venue.mapsEmbedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const cityName = weddingConfig.venue.cityName || weddingConfig.venue.city;
  const locationUnderMap =
    weddingConfig.venue.locationUnderMap ||
    `${cityName} · ${weddingConfig.date.short || weddingData.dateShort}`;

  // Helper to construct Google Calendar URLs
  const createGoogleCalendarUrl = (
    title: string,
    start: string,
    end: string,
    description: string,
    location: string
  ) => {
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', `Sreeja & Nikhil — ${title}`);
    url.searchParams.set('dates', `${start}/${end}`);
    url.searchParams.set(
      'details',
      `${description}\n\nVenue: ${location}\n\nWarmly invited by the families of Sreeja & Nikhil.`
    );
    url.searchParams.set('location', location);
    return url.toString();
  };

  const weddingEvent = weddingConfig.events[0] || {
    name: 'Wedding Ceremony',
    startDate: '20261122T100000',
    endDate: '20261122T150000',
    note: 'The sacred wedding ceremony followed by celebrations',
  };

  const weddingGCalUrl = createGoogleCalendarUrl(
    weddingEvent?.name || 'Wedding Ceremony',
    weddingEvent?.startDate || '20261122T100000',
    weddingEvent?.endDate || '20261122T150000',
    weddingEvent?.note || 'The sacred wedding ceremony followed by celebrations',
    `${weddingConfig.venue.name}, ${weddingConfig.venue.city}`
  );

  // November 2026 calendar days:
  // Nov 1, 2026 is a Sunday (index 0). Total days: 30.
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section id="venue" className="relative overflow-hidden bg-maroon px-5 py-14 text-paper sm:py-20">
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 select-none">
        <img
          src={assets.mandalaMaroon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="animate-spin-soft h-full w-full object-contain opacity-15"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Intro Heading & Address */}
        <RevealOnScroll className="text-center max-w-2xl mx-auto">
          <p className="eyebrow text-gold">The way to the wedding</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Join us in {cityName}</h2>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-paper/80">
            {weddingConfig.venue.description ||
              `Follow the golden path to ${weddingData.venue}, where our families will be waiting to welcome you.`}
          </p>

          <div className="mt-6 inline-flex flex-col items-center border-y border-gold/30 py-4 px-6">
            <p className="font-title text-base sm:text-lg text-gold font-medium">{weddingData.venue}</p>
            <p className="mt-1 text-xs sm:text-sm text-paper/75">{weddingData.city}</p>
          </div>
        </RevealOnScroll>

        {/* ── Side by Side Cards (Desktop) & Stacked (Mobile) ── */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* ── 1. November 2026 Monthly Calendar Sheet (Wedding Day Highlighted) ── */}
          <RevealOnScroll delay={0.08} className="h-full">
            <div className="relative h-full min-h-[460px] flex flex-col justify-between rounded-xl border border-gold/40 bg-black/40 p-5 sm:p-7 pb-6 sm:pb-7 backdrop-blur-sm shadow-2xl">
              <div>
                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-gold/30">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-gold" />
                    <span className="font-title text-[0.68rem] uppercase tracking-[0.25em] text-gold font-semibold">
                      Save The Date
                    </span>
                  </div>
                  <span className="font-title text-[0.68rem] tracking-widest text-paper/70 uppercase">
                    Frisco, Texas
                  </span>
                </div>

                {/* Calendar Title */}
                <div className="text-center my-3">
                  <h3 className="font-display text-2xl sm:text-3xl text-gold tracking-wider">
                    NOVEMBER 2026
                  </h3>
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-paper/60 font-title mt-0.5">
                    Wedding Day
                  </p>
                </div>

                {/* Weekday Row */}
                <div className="grid grid-cols-7 gap-1 text-center py-2 border-y border-gold/20">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="font-title text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-wider text-gold/85"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* 30-Day Grid (Only Day 22 is Highlighted) */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-2.5 pb-2 text-center">
                  {daysInMonth.map((day) => {
                    const isWedding = day === 22;

                    if (isWedding) {
                      return (
                        <div
                          key={day}
                          className="relative flex flex-col items-center justify-center py-1 sm:py-1.5 rounded bg-gold text-maroon-dark font-bold shadow-[0_0_16px_rgba(218,165,32,0.7)] ring-2 ring-gold ring-offset-2 ring-offset-maroon z-10 scale-105"
                          title="Wedding Muhurtham · Sunday, 22 Nov 2026"
                        >
                          <span className="text-xs sm:text-sm font-black leading-none">{day}</span>
                          <span className="text-[0.52rem] uppercase font-bold tracking-tight mt-0.5 leading-none">
                            Wedding
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={day}
                        className="flex items-center justify-center py-1.5 sm:py-2 text-xs sm:text-sm text-paper/70 font-sans hover:text-paper hover:bg-white/5 rounded transition-colors"
                      >
                        {day}
                      </div>
                    );
                  })}
                  {/* Trailing 5 empty cells to complete 35-cell grid */}
                  {[1, 2, 3, 4, 5].map((trailingDay) => (
                    <div
                      key={`next-${trailingDay}`}
                      className="flex items-center justify-center py-1.5 text-xs text-paper/20 select-none font-sans"
                    >
                      {trailingDay}
                    </div>
                  ))}
                </div>

                {/* Single Event Schedule Legend: Wedding (Star icon removed) */}
                <div className="mt-3 border-t border-gold/20 pt-3">
                  <div className="flex items-center justify-between text-xs rounded bg-gold/15 px-3.5 py-2 border border-gold/40">
                    <div>
                      <span className="font-bold text-gold">22 Nov (Sun):</span>{' '}
                      <span className="text-paper font-medium">{weddingEvent?.name || 'Wedding Ceremony'}</span>
                    </div>
                    <span className="text-gold font-bold text-xs font-title">10:54 AM CST</span>
                  </div>
                </div>
              </div>

              {/* Add to Calendar Action Button (Full width matching calendar card square) */}
              <div className="mt-5 pt-3.5 border-t border-gold/20 space-y-2.5">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/70 font-title text-center">
                  Add wedding to your calendar
                </p>
                <div className="w-full">
                  <a
                    href={weddingGCalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gold bg-gold text-maroon-dark px-5 py-3 text-xs sm:text-sm font-title font-bold uppercase tracking-wider hover:bg-gold/90 transition-all shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <CalendarPlus className="size-4" />
                    <span>Add to Google Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── 2. Google Maps Card (No inner border, enlarged Open Maps button, no clipping) ── */}
          <RevealOnScroll delay={0.16} className="h-full flex flex-col">
            <div className="relative min-h-[460px] h-full overflow-hidden rounded-xl border border-gold/40 bg-paper/5 shadow-2xl flex flex-col">
              <iframe
                title={`Map to ${query}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[320px] sm:min-h-[360px]"
                style={{ border: 0 }}
                allowFullScreen
              />

              {/* Floating Open in Maps action bar with enlarged button */}
              <div className="relative z-10 bg-black/70 border-t border-gold/30 px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 backdrop-blur-md">
                <span className="text-[0.72rem] sm:text-xs uppercase tracking-[0.2em] text-paper/85 font-title font-medium truncate pr-2">
                  {locationUnderMap}
                </span>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold bg-gold/25 hover:bg-gold/40 text-gold font-title font-bold text-xs uppercase tracking-wider px-5 py-2.5 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <MapPin className="size-3.5 text-gold" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <img
        src={assets.lotusDivider}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none mx-auto mt-12 w-full max-w-xl opacity-80 sm:mt-14"
      />
    </section>
  );
};
