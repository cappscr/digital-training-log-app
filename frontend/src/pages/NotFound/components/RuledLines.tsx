export const RuledLines = () => {
  return (
    <svg
      className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 opacity-[0.05]"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="rules"
          x="0"
          y="0"
          width="100%"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="27.5"
            x2="100%"
            y2="27.5"
            stroke="var(--color-foreground)"
            stroke-width="0.75"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rules)" />
    </svg>
  );
};
