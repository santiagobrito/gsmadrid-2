import Link from 'next/link';
import { Users, Shield, GraduationCap, Briefcase, BookOpen, Scale, ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// ============================================================
// Top row: 3 quick-access cards (keep existing)
// ============================================================

const quickCards = [
  {
    icon: Users,
    title: 'Soy Colegiado',
    description: 'Accede a servicios exclusivos: formacion, empleo, asesoramiento y mas.',
    href: '/servicios-colegiado',
  },
  {
    icon: Shield,
    title: 'Soy Ciudadano',
    description: 'Encuentra un profesional colegiado y conoce tus derechos.',
    href: '/servicios-ciudadano',
  },
  {
    icon: GraduationCap,
    title: 'Quiero Colegiarme',
    description: 'Descubre las ventajas, requisitos y proceso de alta.',
    href: '/hazte-colegiado',
  },
];

// ============================================================
// CTA benefits
// ============================================================

const benefits = [
  'Formacion continua gratuita o con descuento',
  'Bolsa de empleo exclusiva para colegiados',
  'Sala de Togas en Juzgados de lo Social',
  'Turno de Oficio y mediacion laboral',
  'Red profesional de mas de 3.000 colegiados',
  'Asesoramiento juridico y tecnico',
];

// ============================================================
// Colegiation paths
// ============================================================

const paths: { icon: typeof GraduationCap; title: string; subtitle: string; href: string; popular?: boolean }[] = [
  {
    icon: GraduationCap,
    title: 'Precolegiados',
    subtitle: 'Estudiantes de Grado o Master',
    href: '/hazte-colegiado/precolegiados',
  },
  {
    icon: Briefcase,
    title: 'Ejercientes Libres',
    subtitle: 'Profesionales por cuenta propia',
    href: '/hazte-colegiado/ejercientes-libres',
    popular: true,
  },
  {
    icon: BookOpen,
    title: 'Ejercientes en Empresa',
    subtitle: 'Profesionales por cuenta ajena',
    href: '/hazte-colegiado/ejercientes-empresa',
  },
  {
    icon: Scale,
    title: 'No Ejercientes',
    subtitle: 'Titulados sin ejercicio activo',
    href: '/hazte-colegiado/no-ejercientes',
  },
];

export function QuickAccess() {
  return (
    <>
      {/* Quick access cards */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {quickCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href} className="group block">
                  <Card className="h-full text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10 transition-transform group-hover:scale-110">
                      <Icon size={28} strokeWidth={1.5} className="text-[#2563EB]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{card.title}</h3>
                    <p className="mt-2 text-sm text-[#475569]">{card.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Hazte Colegiado */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/[0.07]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[#18B7B0]/[0.07]" />

        <Container className="relative py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: value proposition */}
            <div>
              <span className="mb-4 inline-block rounded-full bg-[#2563EB]/20 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-[#60A5FA] uppercase">
                Hazte Colegiado
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
                Impulsa tu carrera como Graduado Social
              </h2>

              <p className="mt-5 text-lg font-light leading-relaxed text-[#94A3B8]">
                Unete a la comunidad profesional mas grande de Graduados Sociales de Madrid.
                Mas de 3.000 profesionales confian en nosotros.
              </p>

              {/* Benefits */}
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#CBD5E1]">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button variant="gradient" href="/hazte-colegiado" className="text-base px-8 py-3">
                  Solicitar colegiacion
                  <ArrowRight size={18} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Right: 4 paths */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {paths.map((path) => {
                const Icon = path.icon;
                return (
                  <Link key={path.title} href={path.href} className="group">
                    <div className={`relative rounded-2xl border p-6 backdrop-blur-sm transition-all hover:bg-white/[0.08] ${path.popular ? 'border-[#2563EB]/40 bg-white/[0.06]' : 'border-white/10 bg-white/[0.04] hover:border-[#2563EB]/40'}`}>
                      {path.popular && (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-[#18B7B0] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                          Mas comun
                        </span>
                      )}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#18B7B0]/20">
                        <Icon size={24} strokeWidth={1.5} className="text-[#60A5FA]" />
                      </div>
                      <h3 className="text-base font-bold text-white">{path.title}</h3>
                      <p className="mt-1 text-sm text-[#94A3B8]">{path.subtitle}</p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#60A5FA] opacity-0 transition-opacity group-hover:opacity-100">
                        Ver requisitos <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
