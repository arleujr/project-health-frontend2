export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return Response.json({ message: 'BACKEND_URL não configurada.' }, { status: 500 });
  const response = await fetch(`${backendUrl}/v1/auth/request-otp`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: await request.text(), cache: 'no-store' });
  return new Response(response.body, { status: response.status, headers: { 'content-type': response.headers.get('content-type') ?? 'application/json' } });
}
