import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Single flip card digit with authentic 3D split-flap folding animation
const FlipDigit: React.FC<{ digit: string }> = ({ digit }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPreviousDigit(currentDigit);
      setCurrentDigit(digit);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div
      className="relative flex h-14 w-9 sm:h-20 sm:w-13 md:h-22 md:w-14 items-center justify-center rounded-lg bg-[#161313] shadow-lg shadow-black/40 border border-gold/30 select-none overflow-hidden"
      style={{ perspective: '450px' }}
    >
      {/* ── 1. STATIC BACKGROUND TOP HALF (Revealed as top flap flips down) ── */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#1a1515] border-b border-black/90">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center font-mono sm:font-display text-2xl sm:text-4xl md:text-5xl font-bold text-paper">
          {currentDigit}
        </div>
      </div>

      {/* ── 2. STATIC BACKGROUND BOTTOM HALF (Visible until bottom flap unfolds) ── */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#141010]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center font-mono sm:font-display text-2xl sm:text-4xl md:text-5xl font-bold text-paper">
          {isFlipping ? previousDigit : currentDigit}
        </div>
      </div>

      {/* ── 3. ANIMATED FLIPPING TOP FLAP (Folds forward and down) ── */}
      {isFlipping && (
        <div
          className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-[#1a1515] border-b border-black/90 z-20"
          style={{
            transformOrigin: 'bottom center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            animation: 'splitFlapTop 0.28s cubic-bezier(0.4, 0, 1, 1) forwards',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center font-mono sm:font-display text-2xl sm:text-4xl md:text-5xl font-bold text-paper">
            {previousDigit}
          </div>
        </div>
      )}

      {/* ── 4. ANIMATED FLIPPING BOTTOM FLAP (Unfolds downward) ── */}
      {isFlipping && (
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-[#141010] z-20"
          style={{
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            animation: 'splitFlapBottom 0.28s cubic-bezier(0, 0, 0.2, 1) 0.27s both',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center font-mono sm:font-display text-2xl sm:text-4xl md:text-5xl font-bold text-paper">
            {currentDigit}
          </div>
        </div>
      )}

      {/* ── CENTRAL SPLIT LINE (Crisp divider, no side notches) ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/90 z-30 pointer-events-none" />
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.06] z-30 pointer-events-none" />
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
      <div className="flex items-center gap-1.5 sm:gap-2">
        {digits.map((d, i) => (
          <FlipDigit key={i} digit={d} />
        ))}
      </div>
      <span className="mt-3 text-[0.62rem] sm:text-[0.72rem] font-title uppercase tracking-[0.26em] text-gold-deep font-semibold">
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
      {/* Split flap keyframes injection */}
      <style>{`
        @keyframes splitFlapTop {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }
        @keyframes splitFlapBottom {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>

      <RevealOnScroll className="mx-auto max-w-4xl text-center">
        {/* Title & Subtitle exactly matching screenshot */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-wide">
          Counting the days
        </h2>
        <p className="mt-2 sm:mt-3 text-[0.68rem] sm:text-xs uppercase tracking-[0.32em] text-gold-deep font-title font-medium">
          Until We Say Yes
        </p>

        {/* Flip Cards Container */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
          <FlipGroup value={timeLeft.days} label="Days" />
          <FlipGroup value={timeLeft.hours} label="Hours" />
          <FlipGroup value={timeLeft.minutes} label="Minutes" />
          <FlipGroup value={timeLeft.seconds} label="Seconds" />
        </div>
      </RevealOnScroll>
    </section>
  );
};
