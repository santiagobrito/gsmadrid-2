'use client';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center py-16">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-6xl font-extrabold text-[#DC2626]">Error</p>
          <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">
            Algo ha salido mal
          </h1>
          <p className="mt-3 text-[#475569]">
            Se ha producido un error inesperado. Puedes intentarlo de nuevo o
            volver a la pagina de inicio.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="gradient" onClick={() => reset()}>
              Intentar de nuevo
            </Button>
            <Button variant="outline" href="/">
              Volver al inicio
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
