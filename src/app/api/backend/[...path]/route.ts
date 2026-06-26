import { cookies } from 'next/headers';

import { getBackendUrl } from '@/config/backend';

interface RouteContext {
  params: Promise<{
    path: string[];
  }>;
}

async function handler(
  request: Request,
  context: RouteContext,
) {
  const backendUrl = getBackendUrl();

  const { path } = await context.params;

  const incomingUrl = new URL(request.url);

  const targetUrl =
    `${backendUrl}/${path.join('/')}${incomingUrl.search}`;

  const sessionCookie = (await cookies()).get(
    'ph_session',
  );

  const headers = new Headers();

  headers.set('accept', 'application/json');

  const contentType =
    request.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }

  if (sessionCookie?.value) {
    headers.set(
      'authorization',
      `Bearer ${sessionCookie.value}`,
    );
  }

  const hasBody = !['GET', 'HEAD'].includes(
    request.method,
  );

  const body = hasBody
    ? await request.arrayBuffer()
    : undefined;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
    });

    const responseHeaders = new Headers();

    const responseContentType =
      response.headers.get('content-type');

    if (responseContentType) {
      responseHeaders.set(
        'content-type',
        responseContentType,
      );
    }

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(
      `Erro ao chamar backend: ${targetUrl}`,
      error,
    );

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

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;