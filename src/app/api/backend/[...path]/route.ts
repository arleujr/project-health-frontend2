import { cookies } from 'next/headers';

async function handler(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return Response.json({ message: 'BACKEND_URL não configurada.' }, { status: 500 });
  const { path } = await context.params;
  const incoming = new URL(request.url);
  const target = `${backendUrl.replace(/\/$/, '')}/${path.join('/')}${incoming.search}`;
  const token = (await cookies()).get('ph_session')?.value;
  const headers = new Headers();
  headers.set('accept', 'application/json');
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  if (token) headers.set('authorization', `Bearer ${token}`);
  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
  const response = await fetch(target, { method: request.method, headers, body, cache: 'no-store' });
  const responseHeaders = new Headers();
  const responseType = response.headers.get('content-type');
  if (responseType) responseHeaders.set('content-type', responseType);
  return new Response(response.body, { status: response.status, headers: responseHeaders });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
