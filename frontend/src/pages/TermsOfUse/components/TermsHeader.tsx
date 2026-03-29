export const TermsHeader = ({ effectiveDate }: { effectiveDate: string }) => {
  return (
    <div className="animate-fade-up mx-auto my-0 max-w-170 px-5 pt-16 pb-0 sm:px-8 sm:pt-28">
      <p className="text-primary mb-6 text-xs font-semibold tracking-widest uppercase">
        Legal
      </p>
      <h1 className="font-display mb-3 text-[clamp(2rem,4.5vw,3rem)] leading-tight font-bold tracking-tight">
        Terms of Use
      </h1>
      <p className="text-muted-foreground mb-7 text-sm">
        Effective {effectiveDate}
      </p>
      <p className="text-muted-foreground text-base">
        Digital Training Log is a personal project operated by Christopher
        Capps, an individual. It is not a registered business. These terms are
        written in plain English. Please read them — they are short.
      </p>
    </div>
  );
};
