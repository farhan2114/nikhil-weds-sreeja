import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Single flip card digit with realistic horizontal slit & notches
const FlipDigit: React.FC<{ digit: string }> = ({ digit }) => {
  return (
    <div className="relative flex h-11 w-8 sm:h-16 sm:w-11 items-center justify-center overflow-hidden rounded-md bg-[#181414] shadow-md border border-gold/25 select-none">
      {/* Top half shadow overlay */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
      {/* Bottom half dark shade */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/20 pointer-events-none" />

      {/* Central horizontal slit */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/80 border-b border-white/10 z-10" />

      {/* Flap side notches */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-background rounded-r-full z-20" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-background rounded-l-full z-20" />

      {/* The number */}
      <span className="font-mono text-xl sm:text-3xl font-bold tracking-tight text-paper transition-all duration-300">
        {digit}
      </span>
    </div>
  );
};

// Group of 2 digits (e.g. "08") with label
const FlipGroup: React.FC<{ value: number; label: string; padLength?: number }> = ({
  value,
  label,
  padLength = 2,
}) => {
  const formatted = String(Math.max(0, value)).padStart(padLength, '0');
  const digits = formatted.split('');

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 sm:gap-1.5">
        {digits.map((d, i) => (
          <FlipDigit key={i} digit={d} />
        ))}
      </div>
      <span className="mt-2.5 text-[0.62rem] sm:text-[0.68rem] font-title uppercase tracking-[0.24em] text-muted-foreground font-medium">
        {label}
      </span>
    </div>
  );
};

export const CountdownSection: React.FC = () => {
  const targetDateStr = weddingConfig.date.targetIso || '2026-11-22T10:54:00-06:00';

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 px-4">
      <RevealOnScroll className="mx-auto max-w-4xl text-center">
        {/* Title & Subtitle exactly matching screenshot */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-wide">
          Counting the days
        </h2>
        <p className="mt-2 sm:mt-3 text-[0.68rem] sm:text-xs uppercase tracking-[0.32em] text-gold-deep font-title font-medium">
          Until We Say Yes
        </p>

        {/* Flip Cards Container */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2.5 sm:gap-6 md:gap-8 flex-wrap">
          <FlipGroup value={timeLeft.days} label="Days" />
          <FlipGroup value={timeLeft.hours} label="Hours" />
          <FlipGroup value={timeLeft.minutes} label="Minutes" />
          <FlipGroup value={timeLeft.seconds} label="Seconds" />
        </div>
      </RevealOnScroll>
    </section>
  );
};
