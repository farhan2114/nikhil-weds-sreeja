import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarCheck, CalendarPlus, Clock } from 'lucide-react';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';
import { SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

export const EventsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const event = weddingConfig.events[0] || {
    name: 'Wedding Ceremony',
    day: 'Sunday, 22 Nov',
    time: '10:54 AM CST',
    place: 'Frisco Hall Event Center',
    note: 'The sacred muhurtham ceremony followed by lunch & celebrations',
    image: '/client-images/wedding-mandapam.jpg',
  };

  const createGoogleCalendarUrl = () => {
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', `Sreeja & Nikhil — ${event.name}`);
    url.searchParams.set('dates', '20261122T100000/20261122T150000');
    url.searchParams.set(
      'details',
      `${event.note}\n\nVenue: ${weddingConfig.venue.name}, ${weddingConfig.venue.city}\n\nWarmly invited by the families of Sreeja & Nikhil.`
    );
    url.searchParams.set('location', `${weddingConfig.venue.name}, ${weddingConfig.venue.city}`);
    return url.toString();
  };

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const img = imgRef.current;
    if (!section || !card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // 1. 3D Unfold & Float Up Scroll Animation for the Wedding Card
      gsap.fromTo(
        card,
        {
          y: 60,
          scale: 0.94,
          rotateX: 8,
          opacity: 0.85,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        },
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          boxShadow: '0 25px 50px -12px rgba(218, 165, 32, 0.22), 0 15px 35px rgba(0, 0, 0, 0.1)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1.2,
          },
        }
      );

      // 2. Parallax Depth on Mandapam Image inside card
      if (img) {
        gsap.fromTo(
          img,
          {
            yPercent: -7,
            scale: 1.1,
          },
          {
            yPercent: 7,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Subtle interactive 3D tilt on mouse hover (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 3;
    const rotateY = (x / (rect.width / 2)) * 3;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1200,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} id="events" className="relative overflow-clip px-5 py-12 sm:py-16">
      <SpinningMandala className="-left-24 bottom-8 w-52 sm:w-72" />
      <img
        src={assets.mandalaGold}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-24 top-10 w-72 opacity-25 animate-float-slow"
      />

      <div className="mx-auto max-w-5xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">The Celebration</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">Wedding Ceremony</h2>
          <div className="rule-gold mx-auto mt-6 w-32" />
        </RevealOnScroll>

        {/* ── Single Large Wedding Card with 3D Scroll Perspective & Image Parallax ── */}
        <div
          className="mt-10 sm:mt-12"
          style={{ perspective: '1200px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <article
            ref={cardRef}
            className="paper-card relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-2 border-gold/45 bg-[#FAF7F0] p-0 shadow-2xl transition-colors duration-500 hover:border-gold/75 group will-change-transform"
          >
            {/* 1. Outdoor Wedding Mandapam Header Image with Parallax */}
            <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden border-b-2 border-gold/35">
              <img
                ref={imgRef}
                src={event.image || '/client-images/wedding-mandapam.jpg'}
                alt="Sacred Wedding Mandapam decorated with flowers and bells"
                loading="lazy"
                className="h-[120%] -top-[10%] w-full object-cover object-center will-change-transform relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
              <span className="pointer-events-none absolute inset-3 sm:inset-4 border border-paper/35 rounded-xl z-10" />

              {/* Floating Date Badge on Image */}
              <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/60 text-gold text-xs sm:text-sm font-title uppercase tracking-widest font-semibold z-10">
                Sunday, 22 November 2026
              </div>
            </div>

            {/* 2. Wedding Details Body */}
            <div className="px-6 py-10 sm:px-16 sm:py-14 text-center">
              <p className="eyebrow text-gold-deep">The Sacred Muhurtham</p>
              
              <h3 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-wide">
                {event.name}
              </h3>
              
              <div className="rule-gold mx-auto mt-6 w-32" />

              {/* Ceremony Time & Muhurtham pill */}
              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-gold/10 px-6 py-2 shadow-sm">
                <Clock className="size-4 text-gold-deep" />
                <span className="font-title text-base sm:text-lg font-bold text-gold-deep tracking-wider">
                  Muhurtham at 10:54 AM CST
                </span>
              </div>

              {/* Venue & City */}
              <div className="mt-6 space-y-1">
                <p className="font-title text-lg sm:text-xl text-foreground font-semibold">
                  {weddingConfig.venue.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  {weddingConfig.venue.city}
                </p>
              </div>

              {/* Descriptive Line */}
              <p className="mx-auto mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground uppercase tracking-[0.2em] font-medium">
                {event.note}
              </p>

              {/* Action Buttons: Add to Calendar, RSVP */}
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
                {/* Add to Calendar */}
                <a
                  href={createGoogleCalendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold bg-gold text-maroon-dark px-6 py-2.5 text-xs font-title font-bold uppercase tracking-wider hover:bg-gold/90 transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <CalendarPlus className="size-4" />
                  Add to Calendar
                </a>

                {/* RSVP to Attend */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('rsvp');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold/70 bg-white/70 hover:bg-gold/15 px-6 py-2.5 text-xs font-title font-bold uppercase tracking-wider text-maroon shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <CalendarCheck className="size-4 text-gold-deep" />
                  RSVP to Attend
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
