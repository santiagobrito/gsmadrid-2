'use client';

import { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';

const inputClass =
  'w-full rounded-xl border border-[#E2E8F0] bg-[#F7F8FA] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#6B7280] outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20';

interface ColegiacionFormProps {
  tipo: 'precolegiado' | 'ejerciente-libre' | 'ejerciente-empresa' | 'no-ejerciente';
  showTipoSelector?: boolean;
  showUniversidad?: boolean;
}

const tipoOptions = [
  { value: 'ejerciente-libre', label: 'Ejerciente Libre — por cuenta propia' },
  { value: 'ejerciente-empresa', label: 'Ejerciente en Empresa — por cuenta ajena' },
  { value: 'no-ejerciente', label: 'No Ejerciente — sin ejercicio activo' },
];

export function ColegiacionForm({ tipo: defaultTipo, showTipoSelector = false, showUniversidad = false }: ColegiacionFormProps) {
  const [form, setForm] = useState({
    tipo: defaultTipo,
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    universidad: '',
    titulacion: '',
    mensaje: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = form.nombre && form.apellidos && form.email && form.tipo && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${WP_API}/wp-json/gsmadrid/v1/colegiacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Error al enviar la solicitud.');
      }
    } catch {
      setError('Error de conexion. Intentalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-[#0F172A]">Solicitud enviada</h3>
        <p className="mt-3 text-sm text-[#475569] max-w-md mx-auto">
          Hemos recibido tu solicitud. Nuestro equipo se pondra en contacto contigo
          para indicarte los siguientes pasos y la documentacion necesaria.
        </p>
        <p className="mt-2 text-xs text-[#6B7280]">Revisa tu correo para el email de confirmacion.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8">
      <h3 className="text-xl font-bold text-[#0F172A] mb-2">Solicitar colegiacion</h3>
      <p className="text-sm text-[#475569] mb-6">
        Rellena el formulario y te contactaremos para guiarte en el proceso.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo selector (only on colegiados page) */}
        {showTipoSelector && (
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Modalidad de colegiacion <span className="text-red-500">*</span>
            </label>
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value as typeof defaultTipo })}
              required
              className={inputClass}
            >
              {tipoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
              className={inputClass}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Apellidos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.apellidos}
              onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
              required
              className={inputClass}
              placeholder="Tus apellidos"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={inputClass}
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Telefono <span className="text-xs font-normal text-[#6B7280]">(opcional)</span>
            </label>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className={inputClass}
              placeholder="600 000 000"
            />
          </div>
        </div>

        {/* Universidad (only for precolegiados) */}
        {showUniversidad && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
                Universidad
              </label>
              <input
                type="text"
                value={form.universidad}
                onChange={(e) => setForm({ ...form, universidad: e.target.value })}
                className={inputClass}
                placeholder="Ej: Universidad Complutense"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
                Titulacion
              </label>
              <input
                type="text"
                value={form.titulacion}
                onChange={(e) => setForm({ ...form, titulacion: e.target.value })}
                className={inputClass}
                placeholder="Ej: Grado en Relaciones Laborales"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
            Mensaje <span className="text-xs font-normal text-[#6B7280]">(opcional)</span>
          </label>
          <textarea
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="¿Alguna consulta o comentario?"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button type="submit" variant="gradient" className="w-full" disabled={!canSubmit}>
          {submitting ? 'Enviando...' : 'Enviar solicitud'}
          {!submitting && <Send size={16} className="ml-2" />}
        </Button>
      </form>
    </div>
  );
}
