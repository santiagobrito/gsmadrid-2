import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gradient-to-b from-white to-[#F0F4F8]">
      {/* Decorative teal radial glow */}
      <div
        className="pointer-events-none absolute right-[-200px] top-[-100px] h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #2BD4C7 0%, transparent 70%)',
        }}
      />

      <Container className="relative flex min-h-[88vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-6xl md:text-7xl lg:text-[84px] lg:leading-[1.05]">
          Graduados Sociales de Madrid
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#475569] sm:text-xl">
          El Colegio Oficial que representa, defiende y potencia la profesion
          de Graduado Social en la Comunidad de Madrid.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button variant="gradient" href="/hazte-colegiado">
            Hazte Colegiado
          </Button>
          <Button variant="outline" href="/el-colegio">
            Conoce el Colegio
          </Button>
        </div>
      </Container>
    </section>
  );
}
