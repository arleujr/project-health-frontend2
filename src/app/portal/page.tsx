'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck, Activity } from 'lucide-react';

export default function LoginPage() {
  const { mode, isLoading, error, toggleMode, authenticate } = useAuth();

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* Lado Esquerdo: Branding Premium (Oculto em telas pequenas) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Efeito de brilho no fundo */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-rose-500 rounded-full opacity-20 blur-3xl"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">Health Core</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            A inteligência clínica por trás dos <span className="text-indigo-400">melhores resultados.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Nossa IA analisa milhares de variáveis metabólicas e biomecânicas em segundos para entregar estratégias à prova de erros.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-bold text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              Segurança Médica
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              IA Preditiva
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito: Formulário de Autenticação */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-slate-50">
        <div className="max-w-md w-full space-y-8">
          
          {/* Header Mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Health Core</span>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-slate-500 mt-2">
              {mode === 'login' 
                ? 'Insira suas credenciais para acessar sua área.' 
                : 'Junte-se à evolução do acompanhamento físico.'}
            </p>
          </div>

          <form onSubmit={authenticate} className="space-y-6 mt-8">
            
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none transition-all disabled:opacity-50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  placeholder="voce@exemplo.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                Senha
                {mode === 'login' && (
                  <a href="#" className="text-indigo-600 hover:text-indigo-700 text-xs font-bold">Esqueceu a senha?</a>
                )}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'login' ? 'Entrar no Sistema' : 'Criar Conta'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={toggleMode}
              disabled={isLoading}
              className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              {mode === 'login' 
                ? 'Não tem uma conta? Cadastre-se' 
                : 'Já tem uma conta? Faça login'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}