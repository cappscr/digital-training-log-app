import { type ReactNode } from 'react';

const Typography = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-body-text mb-5 text-[1.025rem] last:mb-0">{children}</p>
  );
};
export const OriginSection = () => {
  return (
    <section className="py-14 px-5 sm:py-20 sm:px-8 max-w-225 my-0 mx-auto border-b border-rule animate-fade-up delay-[0.1s]">
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-12 items-start">
        <div className="pt-[0.35rem]">
          <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-muted block static sm:sticky top-[2rem]">
            Origin
          </span>
        </div>
        <div className="section-body">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.2] tracking-[-0.015em] mb-6">
            Why this exists
          </h2>
          <Typography>
            I have kept a training log for years. For a long time that meant a
            paper journal — messy, portable, honest. I liked it. What I didn't
            like was losing it, or trying to look back across months to spot
            patterns, or having no good way to plan a training block on a
            calendar without rebuilding a spreadsheet from scratch every cycle.
          </Typography>
          <Typography>
            I train across multiple sports with multiple devices. I got tired of
            apps that work beautifully for a GPS-tracked road run and fall apart
            the moment you step on a track, into a weight room, or onto a bike
            without a computer. The best apps I tried were still GPS-centric at
            their core — everything else felt like an afterthought.
          </Typography>
          <Typography>
            I wanted something that felt like a paper journal but worked like
            software: flexible, fast, hardware-agnostic, and entirely mine. So I
            built Digital Training Log.
          </Typography>
        </div>
      </div>
    </section>
  );
};
