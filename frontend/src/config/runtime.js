const rawApiBase = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

const stripTrailingSlash = (value) => value.replace(/\/$/, '');

const apiBase = stripTrailingSlash(rawApiBase);

const toWsBase = (value) => {
  if (!value) {
    return import.meta.env.PROD ? '' : 'ws://localhost:8000';
  }
  if (value.startsWith('https://')) return value.replace('https://', 'wss://');
  if (value.startsWith('http://')) return value.replace('http://', 'ws://');
  return value;
};

const wsBase = stripTrailingSlash(import.meta.env.VITE_WS_URL || toWsBase(apiBase));

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBase}${normalizedPath}`;
};

export const buildWsUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${wsBase}${normalizedPath}`;
};
