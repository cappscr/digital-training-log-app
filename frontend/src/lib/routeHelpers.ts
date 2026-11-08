import type { UIMatch } from 'react-router';

export interface Breadcrumb {
  label: string;
  to?: string;
}

export interface RouteHandle {
  publicPath?: string;
  signedInPath?: string;
  breadcrumbs?: Breadcrumb[];
}

export function hasHandle(
  match: UIMatch,
): match is UIMatch<unknown, RouteHandle> {
  return typeof match.handle === 'object' && match.handle !== null;
}
