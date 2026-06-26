import { getBackendUrl } from '@/config/backend';

export async function POST(request: Request) {
  const backendUrl = getBackendUrl();

  try {
    const response = await fetch(
      `${backendUrl}/v1/auth/request-otp`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: await request.text(),
        cache: 'no-store',
      },
    );

    return new Response(response.body, {
      status: response.status,
      headers: {
        'content-type':
          response.headers.get('content-type') ??
          'application/json',
      },
    });
  } catch (error) {
    console.error('Erro ao solicitar OTP:', error);

    return Response.json(
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