import { TermsHeader } from './components/TermsHeader';
import { TermsBody } from './components/TermsBody';
import { TermsFooter } from './components/TermsFooter';

const CONTACT_EMAIL = 'hello@digitaltraininglog.com';
const EFFECTIVE_DATE = 'March 24, 2026';

export const TermsOfUse = () => {
  return (
    <main className="bg-cream text-ink font-body text-base/[1.75] overflow-x-hidden">
      <TermsHeader effectiveDate={EFFECTIVE_DATE} />
      <div
        className="max-w-170 mt-14 mx-auto mb-0 h-px bg-rule"
        aria-hidden="true"
      />
      <TermsBody contactEmail={CONTACT_EMAIL} />
      <TermsFooter />
    </main>
  );
};
