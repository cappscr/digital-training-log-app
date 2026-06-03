import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
  isTokenNearExpiry,
} from '@/lib/auth';
import { CURRENT_USER_KEY } from '@/hooks/useCurrentUser';
import { mutate } from 'swr';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS';

interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail?: string;
  errors?: Array<{
    pointer: string;
    detail: string;
  }>;
}

interface ApiError extends Error {
  status: number;
  data: ProblemDetail;
}

const BASE_URL = '/api/v1';

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken(): Promise<void> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = fetch('/api/v1/refresh', {
    method: 'POST',
    headers: buildHeaders(),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to refresh access token');
      }
      return res.json();
    })
    .then((data) => {
      setAccessToken(data.access_token as string);
    })
    .catch(() => {
      clearAccessToken();
      mutate(CURRENT_USER_KEY, null, false); // Invalidate user data
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

function buildHeaders(): Headers {
  const defaultHeaders = new Headers({
    'Content-Type': 'application/json',
  });

  const token = getAccessToken();
  if (token) {
    defaultHeaders.append('Authorization', `Bearer ${token}`);
  }

  return defaultHeaders;
}

async function apiClient<T = unknown>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  retried = false,
): Promise<T | undefined> {
  if (isTokenNearExpiry()) {
    await refreshAccessToken();
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && !retried) {
    await refreshAccessToken();
    return apiClient<T>(method, path, body, true);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw Object.assign(new Error(`HTTP ${response.status}`), {
      status: response.status,
      data: errorData,
    });
  }

  if (response.status === 204) {
    return undefined;
  }

  return response.json() as Promise<T>;
}

function isApiError(error: unknown): error is ApiError {
  return error instanceof Error && 'status' in error && 'data' in error;
}

const fetcher = (path: string) => apiClient('GET', path);

export { apiClient, fetcher, isApiError, type ApiError };
