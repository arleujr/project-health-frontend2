'use client';

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  Phone,
  UserPlus,
  AlertTriangle,
  BadgeCheck,
} from 'lucide-react';

import {
  useCreatePatient,
  type CreatePatientInput,
} from '@/hooks/use-create-patient';

export default function NewPatientPage() {
  const router = useRouter();

  const {
    createPatient,
    isLoading,
    error,
    success,
    clearMessages,
  } = useCreatePatient();

  const [formData, setFormData] =
    useState<CreatePatientInput>({
      name: '',
      email: '',
      phone: '',
      cpf: '',
    });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    clearMessages();

    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const created =
      await createPatient(formData);

    if (created) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        cpf: '',
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto w-full max-w-xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <header className="bg-slate-900 px-8 py-9">
            <UserPlus className="mb-4 h-8 w-8 text-amber-400" />

            <h1 className="text-2xl font-extrabold text-white">
              Adicionar novo paciente
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Libere o acesso para que o paciente
              entre com código por e-mail e conclua
              o próprio perfil.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Nome do paciente
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={120}
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Nome completo"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
              >
                <Mail className="h-4 w-4 text-slate-400" />
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="paciente@email.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
              >
                <Phone className="h-4 w-4 text-slate-400" />
                Telefone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="31999999999"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
              />

              <p className="mt-1 text-xs text-slate-500">
                Campo opcional.
              </p>
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700"
              >
                <BadgeCheck className="h-4 w-4 text-slate-400" />
                CPF
              </label>

              <input
                id="cpf"
                name="cpf"
                type="text"
                inputMode="numeric"
                value={formData.cpf}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Somente números"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50"
              />

              <p className="mt-1 text-xs text-slate-500">
                Campo opcional.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />

                <p className="text-sm font-semibold text-rose-700">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    {success}
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    O paciente já pode solicitar o
                    código de acesso pela tela de login.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 font-bold text-white shadow-md transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Liberando acesso...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Liberar acesso do paciente
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

