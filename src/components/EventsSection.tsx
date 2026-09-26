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

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          y: 45,
          scale: 0.96,
          opacity: 0.9,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1.2,
          },
        }
      );
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
    const rotateX = (-y / (rect.height / 2)) * 2.5;
    const rotateY = (x / (rect.width / 2)) * 2.5;

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

      <div className="mx-auto max-w-4xl">
        <RevealOnScroll className="mx-auto max-w-md sm:max-w-lg">
          <div
            style={{ perspective: '1200px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* ── Wedding Ceremony Invitation Card ── */}
            <article
              ref={cardRef}
              className="relative overflow-hidden rounded-2xl border border-stone-200/90 bg-[#FAF7F0] px-6 py-9 sm:px-10 sm:py-12 shadow-xl text-center will-change-transform transition-all"
            >
              {/* Eyebrow */}
              <p className="font-title text-[0.72rem] sm:text-xs uppercase tracking-[0.32em] text-[#9E7A44] font-semibold">
                THE SACRED MUHURTHAM
              </p>

              {/* Title */}
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#4A1521] font-normal tracking-wide">
                Wedding Ceremony
              </h2>

              <div className="rule-gold mx-auto mt-4 sm:mt-5 w-24 opacity-60" />

              {/* Date Block */}
              <div className="mt-6 flex items-center justify-center gap-2.5 text-foreground">
                <Calendar className="size-6 text-[#9E7A44] stroke-[1.6]" />
                <span className="font-title text-xl sm:text-2xl text-foreground font-normal tracking-wide">
                  Sunday, November 22, 2026
                </span>
              </div>

              {/* Stacked Time Cards */}
              <div className="mt-6 space-y-3 sm:space-y-3.5">
                {/* Event Begins Pill */}
                <div className="rounded-2xl border border-[#EBE3D5] bg-[#F7F3EA]/70 p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 text-left transition-all hover:border-[#D8C7B0]">
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
                <div className="rounded-2xl border border-[#EBE3D5] bg-[#F7F3EA]/70 p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 text-left transition-all hover:border-[#D8C7B0]">
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

              <div className="rule-gold mx-auto mt-6 w-24 opacity-60" />

              {/* Descriptive Tagline */}
              <p className="mt-5 text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-[#7A6B58] font-medium">
                LUNCH &amp; CELEBRATIONS TO FOLLOW
              </p>

              {/* RSVP to Attend Button */}
              <div className="mt-6 flex items-center justify-center">
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
            </article>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
