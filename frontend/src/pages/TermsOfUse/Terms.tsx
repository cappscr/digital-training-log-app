import { TermsHeader } from './components/TermsHeader';
import { TermsBody } from './components/TermsBody';
import { TermsFooter } from './components/TermsFooter';

const CONTACT_EMAIL = 'hello@digitaltraininglog.com';
const EFFECTIVE_DATE = 'March 24, 2026';

export const TermsOfUse = () => {
  return (
    <main className="bg-cream text-ink font-body overflow-x-hidden leading-relaxed">
      <TermsHeader effectiveDate={EFFECTIVE_DATE} />
      <div
        className="bg-border mx-auto mt-14 mb-0 h-px max-w-170"
        aria-hidden="true"
      />
      <TermsBody contactEmail={CONTACT_EMAIL} />
      <TermsFooter />
    </main>
  );
};
