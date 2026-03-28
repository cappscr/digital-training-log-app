import { SectionWrapper } from './SectionWrapper';
import { SectionTypography } from './SectionTypography';

export const BuilderSection = () => {
  return (
    <SectionWrapper
      animationDelay="0.3s"
      label="The Builder"
      heading="Built by Chris Capps"
    >
      <SectionTypography>
        I'm a professional software developer. Digital Training Log is not a
        registered business and I have no plans to make it one. This project
        exists at the intersection of two things I care about: building good
        software and training seriously.
      </SectionTypography>
      <SectionTypography>
        My background is in Exercise Science — I hold a BS and MS in the field,
        and spent time as a graduate assistant with the Appalachian State
        University distance program. I've run cross country and track since high
        school, briefly as a walk-on at UNC Charlotte, and have since toed the
        line at Boston three times along with two other World Marathon Majors.
        Chicago is on the calendar for fall 2026. I know this domain from both
        sides of the research.
      </SectionTypography>
      <SectionTypography>
        In many ways, this app is also a laboratory. I use it to experiment with
        technologies, architectures, and design patterns that interest me
        professionally — within a domain where I actually care about the
        outcome. The fact that it's useful is the point; the fact that it's mine
        makes the experimentation feel real.
      </SectionTypography>
      <SectionTypography>
        If you're an athlete or a coach who finds it useful, I'm genuinely glad.
        If you find something broken or missing, I want to know. This is not a
        side project I'm trying to monetize — it's a tool I use, maintained by
        someone who wants it to be good.
      </SectionTypography>
      <a
        href="https://christophercapps.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-accent font-semibold border-b border-accent-light pb-1 mt-7 transition-[border-color,opacity] duration-200 hover:opacity-75 hover:border-accent"
      >
        christophercapps.com
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </a>
    </SectionWrapper>
  );
};
