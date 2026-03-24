import Image from 'next/image';
import {
  GraduationCap, Briefcase, Users, BookOpen, Bell, Tag,
  CheckCircle, ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ColegiacionForm } from '@/components/sections/ColegiacionForm';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Precolegiados — Estudiantes',
  description:
    'Hazte precolegiado del Colegio de Graduados Sociales de Madrid. Completamente gratis para estudiantes de Relaciones Laborales y RRHH. Bolsa de empleo, formacion y networking.',
  path: '/hazte-colegiado/precolegiados',
});

const benefits = [
  {
    icon: Briefcase,
    title: 'Bolsa de empleo',
    description: 'Acceso exclusivo a ofertas de empleo y practicas validadas por el Colegio.',
  },
  {
    icon: Users,
    title: 'Comunidad online',
    description: 'Networking en tiempo real con companeros y profesionales del sector.',
  },
  {
    icon: GraduationCap,
    title: 'Eventos y becas',
    description: 'Sesiones tecnicas gratuitas y becas para la Escuela de Practica Juridica.',
  },
  {
    icon: BookOpen,
    title: 'Biblioteca tecnica',
    description: 'Acceso completo a recursos especializados y bases de datos.',
  },
  {
    icon: Bell,
    title: 'Alertas juridicas',
    description: 'Novedades legislativas, convenios colectivos y actualizaciones del sector por email.',
  },
  {
    icon: Tag,
    title: 'Tarifas especiales',
    description: 'Descuentos exclusivos en formacion y servicios del Colegio.',
  },
];

const requirements = [
  'Estar cursando el Grado en Relaciones Laborales y RRHH o el Grado en Empleo',
  'Estar matriculado/a en una universidad de Madrid, Cuenca, Toledo o Guadalajara',
  'Disponer del resguardo de matricula vigente',
];

const steps = [
  {
    num: '1',
    title: 'Rellena el formulario',
    description: 'Completa tus datos en menos de 2 minutos.',
  },
  {
    num: '2',
    title: 'Validacion',
    description: 'Recibiras un email en 2 dias habiles. Adjunta tu resguardo de matricula.',
  },
  {
    num: '3',
    title: 'Acceso inmediato',
    description: 'Confirmacion y acceso a todos los servicios de precolegiado.',
  },
];

export default function PrecolegiadosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Hazte Colegiado', href: '/hazte-colegiado' },
          { label: 'Precolegiados', href: '/hazte-colegiado/precolegiados' },
        ]}
      />

      {/* Hero — split layout */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: copy */}
            <div>
              <Badge color="activo">Gratuito</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Empieza tu carrera con el respaldo del Colegio
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                La precolegiacion es completamente gratuita durante todo tu periodo de estudios.
                Sin cuotas, sin compromisos, con todos los beneficios.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#2BD4C7]/10 px-6 py-3">
                <CheckCircle size={20} className="text-[#2BD4C7]" />
                <span className="text-sm font-semibold text-[#2BD4C7]">
                  Sin cuota de alta — Sin cuota mensual — Sin costes ocultos
                </span>
              </div>

              <div className="mt-8">
                <Button variant="gradient" href="#formulario-precolegiado">
                  Solicitar precolegiacion <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Right: visual card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src="/images/precolegiados-hero.jpg"
                    alt="Estudiantes y futuros graduados sociales"
                    width={1200}
                    height={675}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="shrink-0 text-[#2BD4C7]" />
                    <span className="text-sm text-[#475569]">Bolsa de empleo y practicas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="shrink-0 text-[#2BD4C7]" />
                    <span className="text-sm text-[#475569]">Formacion con tarifa especial</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="shrink-0 text-[#2BD4C7]" />
                    <span className="text-sm text-[#475569]">Networking con profesionales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="shrink-0 text-[#2BD4C7]" />
                    <span className="text-sm text-[#475569]">Transicion preferente a colegiado</span>
                  </div>
                </div>
              </div>
              {/* Decorative teal glow */}
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2BD4C7]/[0.06]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">¿Que obtienes como precolegiado?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2BD4C7]/10 to-[#18B7B0]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#18B7B0]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Requirements + Steps */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Requirements */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-6">Requisitos</h2>
              <div className="space-y-4">
                {requirements.map((req) => (
                  <div key={req} className="flex items-start gap-3">
                    <CheckCircle size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[#2563EB]" />
                    <span className="text-sm text-[#475569]">{req}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F7F8FA] p-6">
                <h3 className="text-base font-bold text-[#0F172A] mb-2">¿Y cuando termine la carrera?</h3>
                <p className="text-sm text-[#475569]">
                  Al graduarte, puedes pasar a colegiado profesional con bonificaciones
                  preferenciales por haber sido precolegiado. Te acompanamos en la transicion.
                </p>
                <Button variant="outline" href="/hazte-colegiado/colegiados" className="mt-4">
                  Ver modalidades de colegiado <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F172A] mb-6">Proceso en 3 pasos</h2>
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#18B7B0] text-sm font-bold text-white">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">{step.title}</h3>
                      <p className="mt-1 text-sm text-[#475569]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section id="formulario-precolegiado" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ColegiacionForm tipo="precolegiado" showUniversidad />
          </div>
        </Container>
      </section>
    </>
  );
}
