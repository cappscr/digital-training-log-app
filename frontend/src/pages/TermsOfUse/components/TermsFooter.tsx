import { Link } from 'react-router';

export const TermsFooter = () => {
  return (
    <div className="mx-auto my-0 max-w-170 px-5 pt-0 pb-24 sm:px-8 sm:pb-32">
      <Link
        to="/about"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-semibold"
      >
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
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        </svg>
        Back to About
      </Link>
    </div>
  );
};
