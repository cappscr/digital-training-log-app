let accessToken: string | null = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string) => {
  accessToken = token;
};
export const clearAccessToken = () => {
  accessToken = null;
};

export const getTokenExpiry = (): Date | null => {
  if (!accessToken) return null;

  const payload = accessToken.split('.')[1];
  if (!payload) return null;

  try {
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
  } catch (e) {
    console.error('Failed to decode access token:', e);
  }

  return null;
};
