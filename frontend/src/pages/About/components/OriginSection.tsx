import { SectionWrapper } from './SectionWrapper';
import { SectionTypography } from './SectionTypography';

export const OriginSection = () => {
  return (
    <SectionWrapper
      animationDelay="0.1s"
      label="Origin"
      heading="Why this exists"
    >
      <SectionTypography>
        I have kept a training log for years. For a long time that meant a paper
        journal — messy, portable, honest. I liked it. What I didn't like was
        losing it, or trying to look back across months to spot patterns, or
        having no good way to plan a training block on a calendar without
        rebuilding a spreadsheet from scratch every cycle.
      </SectionTypography>
      <SectionTypography>
        I train across multiple sports with multiple devices. I got tired of
        apps that work beautifully for a GPS-tracked road run and fall apart the
        moment you step on a track, into a weight room, or onto a bike without a
        computer. The best apps I tried were still GPS-centric at their core —
        everything else felt like an afterthought.
      </SectionTypography>
      <SectionTypography>
        I wanted something that felt like a paper journal but worked like
        software: flexible, fast, hardware-agnostic, and entirely mine. So I
        built Digital Training Log.
      </SectionTypography>
    </SectionWrapper>
  );
};
