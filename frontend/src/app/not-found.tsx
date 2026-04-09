import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-16">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-6xl font-extrabold text-[#2563EB]">404</p>
          <h1 className="mt-4 text-2xl font-bold text-[#0F172A]">
            Pagina no encontrada
          </h1>
          <p className="mt-3 text-[#475569]">
            La pagina que buscas no existe o ha sido trasladada. Puedes volver
            al inicio o utilizar el buscador.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="gradient" href="/">
              Volver al inicio
            </Button>
            <Button variant="outline" href="/buscar">
              <Search size={16} className="mr-2" />
              Buscar
            </Button>
          </div>
          <p className="mt-8 text-sm text-[#94A3B8]">
            Si crees que esto es un error, puedes{' '}
            <Link href="/contacto" className="text-[#2563EB] hover:underline">
              contactarnos
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
