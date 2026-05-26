/**
 * Cliente para el auth-service de Konfío.
 * Maneja autenticación JWT con refresh tokens.
 *
 * @see https://auth.konfio.mx/api/v1
 */

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const AUTH_URL = process.env.AUTH_SERVICE_URL;
const AUTH_API_KEY = process.env.AUTH_SERVICE_API_KEY;

function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-api-key': AUTH_API_KEY!,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function login(credentials: LoginRequest): Promise<AuthTokens> {
  const response = await fetch(`${AUTH_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Auth login failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<AuthTokens>;
}

export async function refreshToken(refresh_token: string): Promise<AuthTokens> {
  const response = await fetch(`${AUTH_URL}/auth/refresh`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ refresh_token }),
  });

  if (!response.ok) {
    throw new Error(`Auth refresh failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<AuthTokens>;
}

export async function logout(token: string): Promise<void> {
  const response = await fetch(`${AUTH_URL}/auth/logout`, {
    method: 'POST',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`Auth logout failed: ${response.status} ${response.statusText}`);
  }
}

export async function getMe(token: string): Promise<AuthUser> {
  const response = await fetch(`${AUTH_URL}/auth/me`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  if (!response.ok) {
    throw new Error(`Auth getMe failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<AuthUser>;
}
