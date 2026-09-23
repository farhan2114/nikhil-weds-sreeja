import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../wedding.config';
import { RevealOnScroll } from './RevealOnScroll';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Smooth vertical rolling number transition
const RollingNumber: React.FC<{ value: number }> = ({ value }) => {
  const [currentVal, setCurrentVal] = useState(value);
  const [prevVal, setPrevVal] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== currentVal) {
      setPrevVal(currentVal);
      setCurrentVal(value);
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 420);
      return () => clearTimeout(timer);
    }
  }, [value, currentVal]);

  return (
    <div className="relative h-12 sm:h-20 md:h-24 overflow-hidden flex items-center justify-center">
      {isAnimating ? (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            animation: 'timerRollUp 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <span className="h-12 sm:h-20 md:h-24 flex items-center justify-center font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#3E3832] font-normal leading-none select-none">
            {prevVal}
          </span>
          <span className="h-12 sm:h-20 md:h-24 flex items-center justify-center font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#3E3832] font-normal leading-none select-none">
            {currentVal}
          </span>
        </div>
      ) : (
        <span className="h-12 sm:h-20 md:h-24 flex items-center justify-center font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#3E3832] font-normal leading-none select-none">
          {currentVal}
        </span>
      )}
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
      {/* Keyframe for smooth vertical slide */}
      <style>{`
        @keyframes timerRollUp {
          0% {
            transform: translateY(0%);
            opacity: 0.95;
          }
          100% {
            transform: translateY(-50%);
            opacity: 1;
          }
        }
      `}</style>

      <RevealOnScroll className="mx-auto max-w-4xl text-center">
        {/* Title & Subtitle */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-wide">
          Counting the days
        </h2>
        <p className="mt-2 sm:mt-3 text-[0.68rem] sm:text-xs uppercase tracking-[0.32em] text-gold-deep font-title font-medium">
          Until We Say Yes
        </p>

        {/* ── Recessed Soft-Shadow Pill Tray (Matches media_1790167432685.png) ── */}
        <div className="mt-8 sm:mt-12 mx-auto max-w-xs sm:max-w-xl md:max-w-2xl">
          <div
            className="rounded-[2rem] sm:rounded-[2.75rem] bg-[#F7F2EB] border border-[#E5DDD2] px-4 py-5 sm:px-10 sm:py-8"
            style={{
              boxShadow:
                'inset 4px 4px 10px rgba(0, 0, 0, 0.12), inset -4px -4px 10px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div className="grid grid-cols-4 items-center justify-center text-center">
              {/* 1. Days */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.days} />
                <span className="font-serif text-xs sm:text-base md:text-lg text-[#8A8174] font-normal tracking-wide mt-1">
                  Days
                </span>
              </div>

              {/* 2. Hours */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.hours} />
                <span className="font-serif text-xs sm:text-base md:text-lg text-[#8A8174] font-normal tracking-wide mt-1">
                  HRS
                </span>
              </div>

              {/* 3. Minutes */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.minutes} />
                <span className="font-serif text-xs sm:text-base md:text-lg text-[#8A8174] font-normal tracking-wide mt-1">
                  MIN
                </span>
              </div>

              {/* 4. Seconds */}
              <div className="flex flex-col items-center">
                <RollingNumber value={timeLeft.seconds} />
                <span className="font-serif text-xs sm:text-base md:text-lg text-[#8A8174] font-normal tracking-wide mt-1">
                  SEC
                </span>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
