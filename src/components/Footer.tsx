import React from 'react';
import { weddingConfig, weddingData } from '../wedding.config';

export const Footer: React.FC = () => {
  const query = `${weddingData.venue} ${weddingData.city}`;
  const mapsSearchUrl =
    weddingConfig.venue.mapsSearchUrl ||
    `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  return (
    <footer className="relative overflow-hidden bg-maroon px-5 py-16 text-center text-paper">
      <p className="flex flex-wrap items-center justify-center gap-x-2 font-display text-2xl min-[360px]:text-3xl sm:text-4xl text-gold-foil animate-foil break-words">
        <span>{weddingData.bride}</span>
        <span className="font-title text-base sm:text-2xl text-gold/90">&amp;</span>
        <span>{weddingData.groom}</span>
      </p>
      <div className="mt-4 flex flex-col items-center justify-center gap-1">
        <span className="font-title uppercase tracking-[0.26em] text-xs text-gold font-semibold">
          {weddingData.hashtag}
        </span>
        <span className="font-display italic text-2xl text-paper tracking-[0.18em] font-normal drop-shadow-sm">
          {weddingData.secondaryHashtag || '#SREENI'}
        </span>
      </div>
      <p className="mt-4 text-xs text-paper/75">
        {weddingData.dateLabel} · {weddingData.venue}, {weddingData.city}
      </p>
      <a
        className="mt-6 inline-block border border-gold/70 px-7 py-2.5 text-[0.7rem] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold/20 hover:text-paper"
        href={mapsSearchUrl}
        target="_blank"
        rel="noreferrer"
      >
        Open venue in maps
      </a>
    </footer>
  );
};
