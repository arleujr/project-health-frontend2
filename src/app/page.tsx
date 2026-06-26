import { redirect } from 'next/navigation';

export default function RootPage() {
  // Encaminha o médico direto para a rota interna correta
  redirect('/dashboard');
}