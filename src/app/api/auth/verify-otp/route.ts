import { NextResponse } from 'next/server';

import { getBackendUrl } from '@/config/backend';

export async function POST(request: Request) {
  const backendUrl = getBackendUrl();

  try {
    const response = await fetch(
      `${backendUrl}/v1/auth/verify-otp`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: await request.text(),
        cache: 'no-store',
      },
    );

    const data = await response.json().catch(() => ({
      message: 'Resposta inválida do backend.',
    }));

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const nextResponse = NextResponse.json({
      user: data.user,
    });

    nextResponse.cookies.set(
      'ph_session',
      data.token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      },
    );

    return nextResponse;
  } catch (error) {
    console.error('Erro ao verificar OTP:', error);

    return NextResponse.json(
      {
        message:
          'Não foi possível conectar ao backend.',
      },
      {
        status: 502,
      },
    );
  }
}