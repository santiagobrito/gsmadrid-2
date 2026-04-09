'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';

const inputClass =
  'w-full rounded-xl border border-[#E2E8F0] bg-[#F7F8FA] px-4 py-3 text-sm text-[#0F172A] placeholder:text-[#6B7280] outline-none transition-colors focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20';

export function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [privacidad, setPrivacidad] = useState(false);

  const canSubmit = form.nombre && form.email && form.asunto && form.mensaje && privacidad && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${WP_API}/wp-json/gsmadrid/v1/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Error al enviar el mensaje.');
      }
    } catch {
      setError('Error de conexion. Intentalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-10">
        <div className="flex flex-col items-center text-center py-8">
          <CheckCircle size={48} className="text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-[#0F172A]">Mensaje enviado</h2>
          <p className="mt-3 text-[#475569] max-w-md">
            Hemos recibido tu consulta y te responderemos lo antes posible.
            Revisa tu bandeja de entrada para el email de confirmacion.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
            }}
            className="mt-6 text-sm font-semibold text-[#2563EB] hover:underline"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-10">
      <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
        Escribenos directamente
      </h2>
      <p className="mt-2 text-[#475569]">
        Rellena el formulario y te responderemos lo antes posible. Para
        consultas urgentes, te recomendamos llamar por telefono.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
              className={inputClass}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={inputClass}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Telefono{' '}
              <span className="text-xs font-normal text-[#6B7280]">(opcional)</span>
            </label>
            <input
              type="tel"
              id="telefono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className={inputClass}
              placeholder="600 000 000"
            />
          </div>

          <div>
            <label htmlFor="asunto" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
              Asunto <span className="text-red-500">*</span>
            </label>
            <select
              id="asunto"
              value={form.asunto}
              onChange={(e) => setForm({ ...form, asunto: e.target.value })}
              required
              className={inputClass}
            >
              <option value="">Selecciona un asunto</option>
              <option value="colegiacion">Colegiacion</option>
              <option value="formacion">Formacion</option>
              <option value="sala-togas">Sala de Togas</option>
              <option value="gestiones">Gestiones</option>
              <option value="otros">Otros</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
            Mensaje <span className="text-red-500">*</span>
          </label>
          <textarea
            id="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            required
            className={`${inputClass} resize-none`}
            placeholder="Escribe tu consulta..."
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="contact-privacidad"
            type="checkbox"
            checked={privacidad}
            onChange={(e) => setPrivacidad(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]/20"
          />
          <label htmlFor="contact-privacidad" className="text-xs text-[#6B7280]">
            He leido y acepto la{' '}
            <a href="/politica-privacidad" className="underline hover:text-[#2563EB]">
              Politica de Privacidad
            </a>
            . Mis datos seran tratados para atender mi consulta.
          </label>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <Button type="submit" variant="gradient" disabled={!canSubmit}>
            {submitting ? 'Enviando...' : 'Enviar mensaje'}
            {!submitting && <Send size={16} strokeWidth={2} />}
          </Button>
        </div>
      </form>
    </div>
  );
}
