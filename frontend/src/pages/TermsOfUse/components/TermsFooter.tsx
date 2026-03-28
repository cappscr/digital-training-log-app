import { Link } from 'react-router';

export const TermsFooter = () => {
  return (
    <div className="max-w-170 my-0 mx-auto pt-0 px-5 sm:px-8 pb-24 sm:pb-32">
      <Link
        to="/about"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"
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
