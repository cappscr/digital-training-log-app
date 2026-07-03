import { PageTitle } from '@/components/PageTitle';

interface AuthFormPageLayoutProps {
  caption: string | React.ReactNode;
  pageName: string;
  title: string;
  children: React.ReactNode;
}

export const AuthFormPageLayout = ({
  caption,
  pageName,
  title,
  children,
}: AuthFormPageLayoutProps) => {
  return (
    <>
      <PageTitle pageName={pageName} />
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-display mb-1.5 text-3xl">{title}</h1>
            <p className="text-muted-foreground text-sm">{caption}</p>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </section>
    </>
  );
};
