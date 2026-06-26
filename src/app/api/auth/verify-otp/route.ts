import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return NextResponse.json({ message: 'BACKEND_URL não configurada.' }, { status: 500 });
  const response = await fetch(`${backendUrl}/v1/auth/verify-otp`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: await request.text(), cache: 'no-store' });
  const data = await response.json().catch(() => ({ message: 'Resposta inválida do backend.' }));
  if (!response.ok) return NextResponse.json(data, { status: response.status });
  const next = NextResponse.json({ user: data.user });
  next.cookies.set('ph_session', data.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return next;
}
