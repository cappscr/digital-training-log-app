import { getErrorMessage, type FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router';
import { Button } from './ui/button';

const isDev = import.meta.env.DEV;

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="bg-background flex min-h-[40vh] items-start justify-center px-16 py-6"
      role="alert"
    >
      <div className="w-full max-w-144">
        <span className="text-primary block text-xs font-semibold uppercase">
          Something went wrong
        </span>
        <h1 className="font-display text-foreground mb-4 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-medium">
          This page ran into a problem.
        </h1>
        <p className="text-muted-foreground mb-8">
          The rest of the app is still working, You can try refreshing this
          section, or head back to the dashboard.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline" onClick={resetErrorBoundary}>
            Try Again
          </Button>
          <Link
            className="text-muted-foreground hover:text-foreground text-sm font-medium underline"
            to="/dashboard"
          >
            Go to dashboard
          </Link>
        </div>

        {isDev && (
          <details className="border-muted mt-10 border-t pt-6">
            <summary className="text-muted-foreground mb-4 cursor-pointer text-sm font-medium">
              Error details
            </summary>
            <pre className="text-xs">{getErrorMessage(error)}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
