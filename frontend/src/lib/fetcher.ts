import { getAccessToken } from '@/lib/auth';

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
): Promise<T | undefined> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

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
