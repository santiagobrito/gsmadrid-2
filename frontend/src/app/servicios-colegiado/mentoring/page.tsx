import Image from 'next/image';
import {
  Users, Target, Lightbulb, Award, GraduationCap,
  ArrowRight, Phone, Mail, UserCheck,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Programa de Mentoring — Servicios para Colegiados',
  description:
    'Programa de mentoring profesional del Colegio de Graduados Sociales de Madrid. Acompanamiento de colegiados experimentados a nuevos profesionales.',
  path: '/servicios-colegiado/mentoring',
});

const benefits = [
  {
    icon: Target,
    title: 'Orientacion profesional',
    description: 'Define tu carrera con el apoyo de un mentor que ya ha recorrido el camino.',
  },
  {
    icon: Lightbulb,
    title: 'Conocimiento practico',
    description: 'Aprende lo que no esta en los libros: gestion de despacho, clientes y casos reales.',
  },
  {
    icon: Users,
    title: 'Red de contactos',
    description: 'Accede a la red profesional de tu mentor y amplia tus oportunidades.',
  },
  {
    icon: Award,
    title: 'Desarrollo continuo',
    description: 'Establece objetivos concretos y haz seguimiento de tu progreso profesional.',
  },
];

const forMentees = [
  'Colegiados en sus primeros 5 anos de ejercicio',
  'Precolegiados que se incorporan a la profesion',
  'Profesionales que cambian de area de especializacion',
  'Colegiados que abren su propio despacho',
];

const forMentors = [
  'Colegiados con mas de 10 anos de experiencia',
  'Profesionales con vocacion de ensena y compartir',
  'Disponibilidad para sesiones mensuales (1-2h)',
  'Compromiso minimo de 6 meses',
];

const steps = [
  {
    num: '01',
    title: 'Solicita participar',
    description: 'Inscribete como mentee o como mentor a traves del formulario. Indicanos tu perfil, experiencia y areas de interes.',
  },
  {
    num: '02',
    title: 'Emparejamiento',
    description: 'El Colegio asigna las parejas mentor-mentee segun afinidad profesional, especialidad y objetivos.',
  },
  {
    num: '03',
    title: 'Sesiones periodicas',
    description: 'Reuniones mensuales (presenciales u online) donde trabajais sobre objetivos concretos y situaciones reales.',
  },
  {
    num: '04',
    title: 'Evaluacion y seguimiento',
    description: 'Al final del programa, evaluais juntos el progreso. Muchas relaciones mentor-mentee continuan de forma autonoma.',
  },
];

export default function MentoringPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          { label: 'Mentoring', href: '/servicios-colegiado/mentoring' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Desarrollo profesional</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Programa de Mentoring
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Colegiados con experiencia acompanan a nuevos profesionales
                en sus primeros pasos. Aprende de quien ya ha estado donde tu quieres llegar.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Un programa gratuito del Colegio para fortalecer la profesion,
                transmitir conocimiento y crear vinculos entre generaciones de graduados sociales.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="#inscripcion">
                  Quiero participar <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#como-funciona">
                  Como funciona
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src="/images/mentoring.jpg"
                    alt="Programa de mentoring profesional del Colegio de Graduados Sociales de Madrid"
                    width={1200}
                    height={675}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">6</p>
                    <p className="text-xs text-[#6B7280]">Meses minimo</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">1:1</p>
                    <p className="text-xs text-[#6B7280]">Personalizado</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Gratis</p>
                    <p className="text-xs text-[#6B7280]">Para colegiados</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Mixto</p>
                    <p className="text-xs text-[#6B7280]">Online + presencial</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Ventajas</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Que te aporta el mentoring?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#2563EB]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{b.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{b.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Para quien */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Participantes</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Para quien es?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  <GraduationCap size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Mentees</h3>
              </div>
              <ul className="space-y-3">
                {forMentees.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <UserCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#2563EB]" />
                    <span className="text-sm text-[#475569]">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  <Award size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Mentores</h3>
              </div>
              <ul className="space-y-3">
                {forMentors.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <UserCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#2563EB]" />
                    <span className="text-sm text-[#475569]">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section id="como-funciona" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Proceso</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Como funciona</h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#18B7B0] text-sm font-extrabold text-white">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{step.title}</h3>
                  <p className="mt-1 text-sm text-[#475569]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="inscripcion" className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#2563EB]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              ¿Quieres participar?
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Tanto si buscas un mentor como si quieres serlo, contacta con nosotros para inscribirte en el programa.
            </p>

            <div className="mt-8 flex flex-col items-center gap-6">
              <Button variant="gradient" href="/contacto" className="text-base px-8 py-3">
                Solicitar inscripcion <ArrowRight size={18} className="ml-1" />
              </Button>

              <div className="flex flex-col items-center gap-4 text-sm text-[#6B7280] sm:flex-row sm:gap-8">
                <a href="tel:915230888" className="flex items-center gap-2 hover:text-[#2563EB]">
                  <Phone size={14} /> 91 523 08 88
                </a>
                <a href="mailto:admon@graduadosocialmadrid.org" className="flex items-center gap-2 hover:text-[#2563EB]">
                  <Mail size={14} /> admon@graduadosocialmadrid.org
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
