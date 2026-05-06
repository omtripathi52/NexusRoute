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

// Fix localhost WebSocket URLs to use current domain in production
export const fixWebSocketUrl = (url) => {
  if (!url) return url;
  
  // If in production and URL is localhost, replace with current domain
  if (import.meta.env.PROD && (url.includes('localhost') || url.includes('127.0.0.1'))) {
    const currentProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const currentHost = window.location.host;
    // Extract just the path part (e.g., '/api/v2/demo/ws')
    const pathMatch = url.match(/(\/[^:]*$)/);
    const path = pathMatch ? pathMatch[0] : '/api/v2/demo/ws';
    return `${currentProtocol}://${currentHost}${path}`;
  }
  
  return url;
};
