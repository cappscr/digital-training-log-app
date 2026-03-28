export const TermsHeader = ({ effectiveDate }: { effectiveDate: string }) => {
  return (
    <div className="max-w-170 my-0 mx-auto pt-16 sm:pt-28 px-5 sm:px-8 pb-0 animate-fade-up">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">
        Legal
      </p>
      <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.12] tracking-tight mb-3">
        Terms of Use
      </h1>
      <p className="text-sm text-muted mb-7">Effective {effectiveDate}</p>
      <p className="text-base text-muted">
        Digital Training Log is a personal project operated by Christopher
        Capps, an individual. It is not a registered business. These terms are
        written in plain English. Please read them — they are short.
      </p>
    </div>
  );
};
