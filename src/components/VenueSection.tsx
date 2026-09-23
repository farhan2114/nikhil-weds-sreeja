import React from 'react';
import { MapPin, Calendar, CalendarPlus, Download, ExternalLink } from 'lucide-react';
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
    url.searchParams.set('details', `${description}\n\nVenue: ${location}\n\nWarmly invited by the families of Sreeja & Nikhil.`);
    url.searchParams.set('location', location);
    return url.toString();
  };

  // Helper to generate and download universal .ics calendar file
  const downloadIcs = (title: string, startIso: string, endIso: string, desc: string, loc: string) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sreeja & Nikhil Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:Sreeja & Nikhil — ${title}`,
      `DESCRIPTION:${desc.replace(/\n/g, '\\n')}`,
      `LOCATION:${loc}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sangeetEvent = weddingConfig.events[0];
  const weddingEvent = weddingConfig.events[1] || weddingConfig.events[0];

  const sangeetGCalUrl = createGoogleCalendarUrl(
    sangeetEvent?.name || 'Sangeet & Cocktails',
    sangeetEvent?.startDate || '20261121T183000',
    sangeetEvent?.endDate || '20261121T233000',
    sangeetEvent?.note || 'Henna, cocktails, dinner and a night of dancing',
    `${weddingConfig.venue.name}, ${weddingConfig.venue.city}`
  );

  const weddingGCalUrl = createGoogleCalendarUrl(
    weddingEvent?.name || 'Wedding Ceremony',
    weddingEvent?.startDate || '20261122T100000',
    weddingEvent?.endDate || '20261122T150000',
    weddingEvent?.note || 'The sacred wedding ceremony followed by celebrations',
    `${weddingConfig.venue.name}, ${weddingConfig.venue.city}`
  );

  return (
    <section id="venue" className="relative overflow-hidden bg-maroon px-5 py-24 text-paper sm:py-32">
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
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* ── 1. Calendar Square Card ── */}
          <RevealOnScroll delay={0.08} className="h-full">
            <div className="relative aspect-square sm:aspect-auto sm:min-h-[460px] h-full flex flex-col justify-between border border-gold/35 bg-black/25 p-6 sm:p-9 backdrop-blur-sm shadow-xl">
              <span className="pointer-events-none absolute inset-3 border border-gold/25" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gold/30">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="size-5 text-gold" />
                    <span className="font-title text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                      Save The Dates
                    </span>
                  </div>
                  <span className="font-title text-xs tracking-widest text-paper/70 uppercase">
                    November 2026
                  </span>
                </div>

                {/* Event 1: Sangeet */}
                <div className="mt-6 rounded border border-gold/25 bg-paper/5 p-4 transition-all hover:border-gold/45">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-paper font-medium">
                        {sangeetEvent?.name || 'Sangeet & Cocktails'}
                      </p>
                      <p className="text-xs text-gold mt-0.5 font-title">
                        {sangeetEvent?.day || 'Saturday, 21 Nov'} · {sangeetEvent?.time || '6:30 PM CST'}
                      </p>
                      <p className="text-[0.68rem] text-paper/60 mt-1">
                        {sangeetEvent?.note || 'Henna, cocktails, dinner and dancing'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 pt-2 border-t border-gold/15">
                    <a
                      href={sangeetGCalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-[0.68rem] uppercase tracking-wider text-gold hover:bg-gold/25 transition-all"
                    >
                      <CalendarPlus className="size-3" />
                      Add to Google Calendar
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        downloadIcs(
                          sangeetEvent?.name || 'Sangeet & Cocktails',
                          sangeetEvent?.startDate || '20261121T183000',
                          sangeetEvent?.endDate || '20261121T233000',
                          sangeetEvent?.note || 'Sangeet & Cocktails celebration',
                          `${weddingConfig.venue.name}, ${weddingConfig.venue.city}`
                        )
                      }
                      title="Download Apple / Outlook iCal"
                      className="inline-flex items-center gap-1 rounded-full border border-paper/30 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-paper/80 hover:bg-paper/10 transition-all"
                    >
                      <Download className="size-2.5" />
                      .ics
                    </button>
                  </div>
                </div>

                {/* Event 2: Wedding */}
                <div className="mt-4 rounded border border-gold/25 bg-paper/5 p-4 transition-all hover:border-gold/45">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-paper font-medium">
                        {weddingEvent?.name || 'Wedding Ceremony'}
                      </p>
                      <p className="text-xs text-gold mt-0.5 font-title">
                        {weddingEvent?.day || 'Sunday, 22 Nov'} · {weddingEvent?.time || '10:54 AM CST'}
                      </p>
                      <p className="text-[0.68rem] text-paper/60 mt-1">
                        {weddingEvent?.note || 'Sacred muhurtham and wedding rituals'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 pt-2 border-t border-gold/15">
                    <a
                      href={weddingGCalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-[0.68rem] uppercase tracking-wider text-gold hover:bg-gold/25 transition-all"
                    >
                      <CalendarPlus className="size-3" />
                      Add to Google Calendar
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        downloadIcs(
                          weddingEvent?.name || 'Wedding Ceremony',
                          weddingEvent?.startDate || '20261122T100000',
                          weddingEvent?.endDate || '20261122T150000',
                          weddingEvent?.note || 'Wedding Ceremony and celebrations',
                          `${weddingConfig.venue.name}, ${weddingConfig.venue.city}`
                        )
                      }
                      title="Download Apple / Outlook iCal"
                      className="inline-flex items-center gap-1 rounded-full border border-paper/30 px-2.5 py-1 text-[0.65rem] uppercase tracking-wider text-paper/80 hover:bg-paper/10 transition-all"
                    >
                      <Download className="size-2.5" />
                      .ics
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-3 border-t border-gold/20 flex items-center justify-between text-[0.68rem] text-paper/60 uppercase tracking-widest font-title">
                <span>Frisco, Texas</span>
                <span className="text-gold">Add to Calendar</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── 2. Google Maps Square Card ── */}
          <RevealOnScroll delay={0.16} className="h-full flex flex-col">
            <div className="relative aspect-square sm:aspect-auto sm:min-h-[460px] h-full overflow-hidden border border-gold/35 bg-paper/5 shadow-xl flex flex-col">
              <iframe
                title={`Map to ${query}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[300px]"
                style={{ border: 0 }}
                allowFullScreen
              />
              <span className="pointer-events-none absolute inset-3 border border-gold/30" />

              {/* Floating Open in Maps action bar */}
              <div className="relative z-10 bg-black/40 border-t border-gold/30 p-3 sm:p-4 flex items-center justify-between backdrop-blur-md">
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-paper/80 font-title truncate pr-2">
                  {locationUnderMap}
                </span>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/70 bg-gold/15 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-wider text-gold hover:bg-gold/30 transition-all"
                >
                  <MapPin className="size-3" />
                  Open Maps
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
        className="pointer-events-none mx-auto mt-20 w-full max-w-xl opacity-80"
      />
    </section>
  );
};
