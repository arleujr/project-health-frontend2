import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/QueryProvider';
export const metadata: Metadata = { title: 'Projeto Health', description: 'Gestão integrada de saúde, nutrição e treinamento.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="min-h-screen bg-slate-50 antialiased"><Providers>{children}</Providers></body></html>;
}
