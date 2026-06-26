import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface AdminWidgetsProps {
  userName: string;
}

export function AdminWidgets({ userName }: AdminWidgetsProps) {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm mb-8 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-2 rounded-lg">
            Administração
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-1">
          Painel de Controle
        </h1>
        <p className="text-slate-400 text-sm">
          Bem-vindo, {userName}. Gerencie o sistema por aqui.
        </p>
      </div>
      <div className="h-16 w-16 bg-slate-800 rounded-2xl flex items-center justify-center">
        <ShieldAlert className="h-8 w-8 text-indigo-400" />
      </div>
    </div>
  );
}