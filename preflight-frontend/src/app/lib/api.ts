// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT ?? '';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export async function GET<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}

export async function POST<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function PUT<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function DEL<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });
  return res.json();
}
