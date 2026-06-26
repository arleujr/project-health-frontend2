# Projeto Health — Frontend

Next.js 16 com BFF seguro: o JWT fica em cookie HttpOnly na Vercel e o navegador acessa o backend por `/api/backend/*`.

## Desenvolvimento
1. Copie `.env.example` para `.env.local`.
2. Defina `BACKEND_URL=http://localhost:3333`.
3. Execute `npm ci && npm run dev`.

## Vercel
- Framework: Next.js.
- Configure `BACKEND_URL` com a URL HTTPS do Render, sem barra final.
- Não configure segredos com prefixo `NEXT_PUBLIC_`.
