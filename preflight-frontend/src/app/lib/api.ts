// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT ?? '';
const AUTH_TOKEN = process.env.NEXT_PUBLIC_JWT_SITE_TOKEN ?? '';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: AUTH_TOKEN,
};

function handleError(error: any): Error {
  const message = error?.message || 'Unknown error';
  console.error('API Error:', error);
  return new Error(message);
}

export async function GET<T = any>(path: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: defaultHeaders,
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
}

export async function GET_CACHE<T = any>(path: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: defaultHeaders,
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
}

export async function POST<T = any>(path: string, body: any): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
}

export async function POST_CACHE<T = any>(path: string, body: any): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
      // next: { revalidate: 3600 } // optional override ก็ได้
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
}

export async function PUT<T = any>(path: string, body: any): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
}

export async function DEL<T = any>(path: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: defaultHeaders,
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
}
