import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Smooth downward rolling number transition
const RollingNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayVal, setDisplayVal] = useState(value);
  const [prevVal, setPrevVal] = useState<number | null>(null);

  useEffect(() => {
    if (value !== displayVal) {
      setPrevVal(displayVal);
      setDisplayVal(value);
      const timer = setTimeout(() => {
        setPrevVal(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [value, displayVal]);

  return (
    <div className="relative h-12 sm:h-18 md:h-20 w-full flex items-center justify-center overflow-hidden">
      {/* Previous outgoing number: slides downward and fades out */}
      {prevVal !== null && (
        <span
          className="absolute inset-0 flex items-center justify-center font-title text-4xl sm:text-6xl md:text-7xl text-[#2B2118] font-medium leading-none select-none pointer-events-none tracking-tight"
          style={{
            animation: 'timerSlideDownOut 0.32s cubic-bezier(0.4, 0, 1, 1) forwards',
          }}
        >
          {prevVal}
        </span>
      )}

      {/* Current incoming number: slides downward from top into exact center */}
      <span
        key={displayVal}
        className="absolute inset-0 flex items-center justify-center font-title text-4xl sm:text-6xl md:text-7xl text-[#2B2118] font-medium leading-none select-none tracking-tight"
        style={{
          animation:
            prevVal !== null
              ? 'timerSlideDownIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              : 'none',
        }}
      >
        {displayVal}
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
    <section className="relative overflow-hidden py-6 sm:py-10 px-4">
      {/* Downward slide keyframes for countdown ticking */}
      <style>{`
        @keyframes timerSlideDownOut {
          0% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(50%);
            opacity: 0;
          }
        }
        @keyframes timerSlideDownIn {
          0% {
            transform: translateY(-50%);
            opacity: 0;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      `}</style>

      <RevealOnScroll className="mx-auto max-w-4xl text-center">
        {/* Title & Subtitle */}
        <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-wide">
          Counting the days
        </h2>
        <p className="mt-1.5 sm:mt-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] text-gold-deep font-title font-medium">
          Until We Say Yes
        </p>

        {/* ── Recessed Soft-Shadow Pill Tray ── */}
        <div className="mt-6 sm:mt-8 mx-auto max-w-xs sm:max-w-xl md:max-w-2xl">
          <div
            className="rounded-[2rem] sm:rounded-[2.75rem] bg-[#F7F2EB] border border-[#E5DDD2] px-3 py-4 sm:px-10 sm:py-7"
            style={{
              boxShadow:
                'inset 4px 4px 10px rgba(0, 0, 0, 0.12), inset -4px -4px 10px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="grid grid-cols-4 items-center justify-center text-center">
              {/* 1. Days */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.days} />
                <span className="font-title text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] text-[#7A6C5D] font-bold mt-1 sm:mt-1.5">
                  DAYS
                </span>
              </div>

              {/* 2. Hours */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.hours} />
                <span className="font-title text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] text-[#7A6C5D] font-bold mt-1 sm:mt-1.5">
                  HOURS
                </span>
              </div>

              {/* 3. Minutes */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.minutes} />
                <span className="font-title text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] text-[#7A6C5D] font-bold mt-1 sm:mt-1.5">
                  MINUTES
                </span>
              </div>

              {/* 4. Seconds */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.seconds} />
                <span className="font-title text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] text-[#7A6C5D] font-bold mt-1 sm:mt-1.5">
                  SECONDS
                </span>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
