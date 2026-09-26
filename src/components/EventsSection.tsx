import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, CalendarCheck, Clock } from 'lucide-react';
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

        {/* ── Initial Wedding Card Template with Mandapam Image & 3D Parallax ── */}
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
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border-b-2 border-gold/35">
              <img
                ref={imgRef}
                src={event.image || '/client-images/wedding-mandapam.jpg'}
                alt="Sacred Wedding Mandapam decorated with flowers and bells"
                loading="lazy"
                width={1200}
                height={800}
                className="h-[120%] -top-[10%] w-full object-cover object-center will-change-transform relative"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
              <span className="pointer-events-none absolute inset-3 sm:inset-4 border border-paper/35 rounded-xl z-10" />

              {/* Floating Date Badge on Image */}
              <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/60 text-gold text-xs sm:text-sm font-title uppercase tracking-widest font-semibold z-10">
                Sunday, 22 November 2026
              </div>
            </div>

            {/* 2. Wedding Details Body (Updated with Reference Content) */}
            <div className="px-6 py-10 sm:px-16 sm:py-14 text-center">
              {/* Eyebrow */}
              <p className="font-title text-[0.72rem] sm:text-xs uppercase tracking-[0.32em] text-[#9E7A44] font-semibold">
                THE SACRED MUHURTHAM
              </p>

              {/* Title */}
              <h3 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl text-[#4A1521] font-normal tracking-wide">
                Wedding Ceremony
              </h3>

              <div className="rule-gold mx-auto mt-5 sm:mt-6 w-32 opacity-70" />

              {/* Date line with Calendar Icon */}
              <div className="mt-6 sm:mt-7 flex items-center justify-center gap-2.5 text-foreground">
                <Calendar className="size-5 sm:size-6 text-[#9E7A44] stroke-[1.6]" />
                <span className="font-title text-xl sm:text-2xl text-foreground font-normal tracking-wide">
                  Sunday, November 22, 2026
                </span>
              </div>

              {/* Dual Time Cards (Stacked) */}
              <div className="mt-6 max-w-md mx-auto space-y-3 sm:space-y-3.5">
                {/* Event Begins Pill */}
                <div className="rounded-2xl border border-[#EBE3D5] bg-[#F7F3EA]/80 p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 text-left transition-all hover:border-[#D8C7B0] shadow-sm">
                  <div className="size-11 sm:size-12 rounded-full bg-[#EFE7D8] flex items-center justify-center shrink-0 text-[#9E7A44]">
                    <Clock className="size-5 stroke-[1.75]" />
                  </div>
                  <div className="h-9 w-[1px] bg-[#E2D8C6] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-serif italic text-xs sm:text-sm text-[#7D7060]">
                      The event begins at
                    </span>
                    <span className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight leading-tight">
                      9:00 AM
                    </span>
                  </div>
                </div>

                {/* Muhurtham Pill */}
                <div className="rounded-2xl border border-[#EBE3D5] bg-[#F7F3EA]/80 p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 text-left transition-all hover:border-[#D8C7B0] shadow-sm">
                  <div className="size-11 sm:size-12 rounded-full bg-[#EFE7D8] flex items-center justify-center shrink-0 text-[#9E7A44]">
                    <Clock className="size-5 stroke-[1.75]" />
                  </div>
                  <div className="h-9 w-[1px] bg-[#E2D8C6] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-serif italic text-xs sm:text-sm text-[#7D7060]">
                      Muhurtham at
                    </span>
                    <span className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight leading-tight">
                      10:54 AM CST
                    </span>
                  </div>
                </div>
              </div>

              {/* Venue & City */}
              <div className="mt-7 sm:mt-8 space-y-1">
                <p className="font-title text-xl sm:text-2xl text-foreground font-semibold tracking-wide">
                  {weddingConfig.venue.name}
                </p>
                <p className="text-xs sm:text-sm text-[#756A5B] max-w-sm mx-auto leading-relaxed">
                  {weddingConfig.venue.city}
                </p>
              </div>

              <div className="rule-gold mx-auto mt-6 w-28 opacity-60" />

              {/* Descriptive Tagline */}
              <p className="mt-5 text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-[#7A6B58] font-medium">
                LUNCH &amp; CELEBRATIONS TO FOLLOW
              </p>

              {/* Action Button: RSVP to Attend */}
              <div className="mt-7 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('rsvp');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-maroon bg-white/70 hover:bg-maroon hover:text-white text-maroon px-8 py-3.5 text-xs font-title font-bold uppercase tracking-[0.2em] shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <CalendarCheck className="size-4" />
                  RSVP TO ATTEND
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
