const PAGE_TITLE_BASE = 'Digital Training Log App';

type PageTitleProps = {
  pageName?: string;
};

export function PageTitle({ pageName }: PageTitleProps) {
  const title = pageName ? `${pageName} | ${PAGE_TITLE_BASE}` : PAGE_TITLE_BASE;

  return <title>{title}</title>;
}
