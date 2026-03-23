import {
  Heart, GraduationCap, Baby, Stethoscope, Landmark,
  ArrowRight, Phone, Mail, ShieldCheck, FileText,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Ayudas, Becas y Subvenciones — Servicios para Colegiados',
  description:
    'Ayudas economicas, becas de formacion y subvenciones disponibles para graduados sociales colegiados en Madrid.',
  path: '/servicios-colegiado/ayudas-becas',
});

const aidTypes = [
  {
    icon: GraduationCap,
    title: 'Becas de formacion',
    description: 'Ayudas para cursos, masteres y programas de especializacion profesional.',
    color: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
  },
  {
    icon: Baby,
    title: 'Ayudas por natalidad',
    description: 'Prestacion economica por nacimiento o adopcion de hijos de colegiados.',
    color: 'bg-[#8B5CF6]/10',
    iconColor: 'text-[#8B5CF6]',
  },
  {
    icon: Stethoscope,
    title: 'Ayudas por enfermedad',
    description: 'Prestaciones para colegiados en situacion de enfermedad grave o incapacidad.',
    color: 'bg-[#10B981]/10',
    iconColor: 'text-[#059669]',
  },
  {
    icon: Heart,
    title: 'Ayudas sociales',
    description: 'Apoyo economico en situaciones de especial necesidad o vulnerabilidad.',
    color: 'bg-[#F59E0B]/10',
    iconColor: 'text-[#D97706]',
  },
  {
    icon: Landmark,
    title: 'Subvenciones publicas',
    description: 'Informacion sobre ayudas de la Comunidad de Madrid, SEPE y otros organismos.',
    color: 'bg-[#EF4444]/10',
    iconColor: 'text-[#EF4444]',
  },
  {
    icon: FileText,
    title: 'Ayuda a nuevos colegiados',
    description: 'Bonificaciones en la cuota colegial y ayudas para el inicio de la actividad profesional.',
    color: 'bg-[#1565C0]/10',
    iconColor: 'text-[#1565C0]',
  },
];

const requirements = [
  'Estar al corriente de pago de la cuota colegial',
  'Presentar la solicitud dentro del plazo establecido',
  'Aportar la documentacion justificativa requerida',
  'No haber recibido la misma ayuda en los 12 meses anteriores (salvo excepciones)',
  'Para becas de formacion: matricula en el curso o programa',
];

const steps = [
  {
    num: '01',
    title: 'Consulta las convocatorias',
    description: 'Revisa las ayudas disponibles en la web del Colegio o contacta con la secretaria para conocer las convocatorias abiertas.',
  },
  {
    num: '02',
    title: 'Prepara la documentacion',
    description: 'Reune la documentacion necesaria: justificantes, certificados y formulario de solicitud cumplimentado.',
  },
  {
    num: '03',
    title: 'Presenta tu solicitud',
    description: 'Entrega la solicitud en la sede del Colegio o a traves del registro electronico.',
  },
  {
    num: '04',
    title: 'Resolucion',
    description: 'La Junta de Gobierno resuelve las solicitudes. Recibiras notificacion del resultado por email.',
  },
];

export default function AyudasBecasPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          { label: 'Ayudas, Becas y Subvenciones', href: '/servicios-colegiado/ayudas-becas' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Apoyo al colegiado</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Ayudas, Becas y Subvenciones
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                El Colegio destina parte de su presupuesto a apoyar a sus colegiados
                con ayudas economicas, becas de formacion y prestaciones sociales.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Ademas, te informamos sobre subvenciones publicas y ayudas externas
                que pueden ser de tu interes como profesional.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="#solicitar">
                  Solicitar ayuda <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#tipos">
                  Ver tipos de ayuda
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#18B7B0]/5">
                  <div className="text-center">
                    <Heart size={64} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-3 text-sm font-medium text-[#2563EB]/50">Ayudas y Becas</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">6</p>
                    <p className="text-xs text-[#6B7280]">Tipos de ayuda</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Anual</p>
                    <p className="text-xs text-[#6B7280]">Convocatorias</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">100%</p>
                    <p className="text-xs text-[#6B7280]">Colegiados</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Junta</p>
                    <p className="text-xs text-[#6B7280]">Resolucion</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Tipos de ayuda */}
      <section id="tipos" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="formacion">Catalogo</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Tipos de ayuda disponibles</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aidTypes.map((aid) => {
              const Icon = aid.icon;
              return (
                <Card key={aid.title}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${aid.color}`}>
                    <Icon size={24} strokeWidth={1.5} className={aid.iconColor} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{aid.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{aid.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Requisitos */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <Badge color="institutional">Requisitos</Badge>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Requisitos generales</h2>
            </div>

            <Card hover={false}>
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{req}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#6B7280]">
                Cada tipo de ayuda puede tener requisitos especificos adicionales. Consulta las bases de cada convocatoria.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="colegio">Proceso</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Como solicitar una ayuda</h2>
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
      <section id="solicitar" className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              ¿Necesitas informacion sobre ayudas?
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Contacta con la secretaria del Colegio para conocer las convocatorias abiertas y los requisitos.
            </p>

            <div className="mt-8 flex flex-col items-center gap-6">
              <Button variant="gradient" href="/contacto" className="text-base px-8 py-3">
                Contactar con el Colegio <ArrowRight size={18} className="ml-1" />
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
