import React from 'react';
import { assets } from '../data/assets';
import { weddingConfig } from '../wedding.config';
import { Ornament, SpinningMandala } from './Ornaments';
import { RevealOnScroll } from './RevealOnScroll';

export const GallerySection: React.FC = () => {
  const singleImage = weddingConfig.gallery[0]?.image || assets.gallery1;
  const singleAlt = weddingConfig.gallery[0]?.alt || "Sreeja and Nikhil - A cherished moment";

  return (
    <section id="gallery" className="relative overflow-hidden px-5 py-12 sm:py-16">
      <SpinningMandala reverse className="-right-20 top-1/4 w-48 sm:w-64" />
      <Ornament className="hidden sm:block -left-10 top-16 w-40 rotate-12 sm:w-56" />
      <Ornament variant="small" className="-right-6 bottom-10 w-28 -rotate-12 sm:w-40" />
      <Ornament variant="gold" className="right-4 top-6 w-24 rotate-6 sm:w-36" />

      <div className="relative mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow">A Sacred Bond</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl">A moment that begins forever</h2>
          <div className="rule-gold mx-auto mt-6 w-32" />
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
            A fleeting glance, an eternal promise — celebrating the love and togetherness that will guide our lives forward.
          </p>
        </RevealOnScroll>

        {/* ── Single Centerpiece Framed Portrait ── */}
        <RevealOnScroll delay={0.15} className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-md sm:max-w-xl">
            <div className="relative overflow-hidden border-2 border-gold/40 bg-paper/10 p-3 sm:p-4 shadow-2xl backdrop-blur-sm group">
              <figure className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={singleImage}
                  alt={singleAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                {/* Elegant Inner Frame Outline */}
                <span className="pointer-events-none absolute inset-3 sm:inset-4 border border-paper/35" />
              </figure>

              {/* Decorative Corner Accents */}
              <div className="pointer-events-none absolute left-1.5 top-1.5 size-3 border-l-2 border-t-2 border-gold" />
              <div className="pointer-events-none absolute right-1.5 top-1.5 size-3 border-r-2 border-t-2 border-gold" />
              <div className="pointer-events-none absolute bottom-1.5 left-1.5 size-3 border-b-2 border-l-2 border-gold" />
              <div className="pointer-events-none absolute bottom-1.5 right-1.5 size-3 border-b-2 border-r-2 border-gold" />
            </div>

            {/* Lotus Divider below portrait */}
            <img
              src={assets.lotusDivider}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none mx-auto mt-8 w-44 sm:w-60 opacity-80"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
