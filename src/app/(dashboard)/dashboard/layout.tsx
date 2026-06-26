import React from 'react';

// 🌟 Esse 'export default' é obrigatório para o Next.js saber como renderizar a página
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full min-h-screen bg-slate-50">
      {/* O 'children' aqui vai carregar o conteúdo do seu page.tsx automaticamente */}
      {children}
    </div>
  );
}