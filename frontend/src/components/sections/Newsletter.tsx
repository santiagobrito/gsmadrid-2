'use client';

import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // For now, just show success. Backend integration pending.
    setSubmitted(true);
  }

  return (
    <section className="bg-gradient-to-r from-[#2563EB] to-[#18B7B0] py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle size={40} className="text-white" />
              <h3 className="text-xl font-bold text-white">Suscripcion confirmada</h3>
              <p className="text-sm text-white/80">Recibiras las novedades del sector en tu correo.</p>
            </div>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <Mail size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Mantente al dia con el sector laboral
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Recibe novedades legislativas, eventos y oportunidades directamente en tu correo.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full rounded-[40px] border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-sm focus:border-white/60 focus:ring-2 focus:ring-white/20 sm:w-auto sm:min-w-[280px]"
                />
                <Button type="submit" variant="institutional" className="whitespace-nowrap">
                  Suscribirme <ArrowRight size={16} className="ml-1" />
                </Button>
              </form>
              <p className="mt-3 text-xs text-white/50">
                Sin spam. Puedes darte de baja en cualquier momento.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
