import { TermsSection } from './TermsSection';
import { TermsTypography } from './TermsTypography';
import { ContactLink } from './ContactLink';

export const TermsBody = ({ contactEmail }: { contactEmail: string }) => {
  return (
    <div className="animate-fade-up mx-auto my-0 max-w-170 px-5 pt-0 pb-16 sm:px-8 sm:pb-20">
      <TermsSection title="1. What this service is">
        <TermsTypography>
          Digital Training Log is a web application for planning and logging
          athletic training. It is provided free of charge, as-is, by a single
          developer as a hobby project. There is no company, no support team,
          and no service level agreement.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="2. No warranty">
        <TermsTypography>
          This service is provided{' '}
          <strong className="text-foreground font-semibold">"as is"</strong>{' '}
          without any warranty of any kind — express or implied. That includes
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement. Use it at your own risk.
        </TermsTypography>
        <TermsTypography>
          In plain terms: the app may go down, lose data, or stop working. I
          will do my best to prevent that, but I cannot guarantee it won't
          happen.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="3. Your data">
        <TermsTypography>
          Your training data belongs to you. I do not sell it, share it with
          third parties, or use it for advertising.
        </TermsTypography>
        <TermsTypography>
          I collect only what is necessary to operate the service: your email
          address and the training data you choose to enter. I use standard
          security practices to protect it, but I cannot guarantee absolute
          security.
        </TermsTypography>
        <TermsTypography>
          You can request a full export of your data or deletion of your account
          at any time by emailing <ContactLink contactEmail={contactEmail} />.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="4. Acceptable use">
        <TermsTypography>
          You may use Digital Training Log for personal athletic training
          purposes. You may not use it to scrape data, attempt to compromise the
          service, or do anything illegal. That's the whole list.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="5. Intellectual property">
        <TermsTypography>
          The source code, design, and all other materials that make up Digital
          Training Log are the intellectual property of Christopher Capps. The
          service is not open source. Nothing in these terms grants you a
          license to the underlying software.
        </TermsTypography>
        <TermsTypography>
          Your training data is yours. My software is mine.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="6. Availability and discontinuation">
        <TermsTypography>
          I reserve the right to modify, suspend, or discontinue the service at
          any time. If I decide to shut it down permanently, I will give at
          least 30 days' notice via the app and by email so you have time to
          export your data.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="7. Limitiatation of liability">
        <TermsTypography>
          To the fullest extent permitted by law, Christopher Capps shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of your use of — or inability to use —
          this service.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="8. Changes to these terms">
        <TermsTypography>
          I may update these terms from time to time. When I do, I'll update the
          effective date at the top of this page. Continued use of the service
          after changes are posted constitutes your acceptance of the updated
          terms.
        </TermsTypography>
      </TermsSection>
      <TermsSection title="9. Contact">
        <TermsTypography>
          Questions about these terms? Email{' '}
          <ContactLink contactEmail={contactEmail} />.
        </TermsTypography>
      </TermsSection>
    </div>
  );
};
