export const ContactLink = ({ contactEmail }: { contactEmail: string }) => {
  return (
    <a
      href={`mailto:${contactEmail}`}
      className="text-emphasis underline underline-offset-2 hover:opacity-75"
    >
      {contactEmail}
    </a>
  );
};
