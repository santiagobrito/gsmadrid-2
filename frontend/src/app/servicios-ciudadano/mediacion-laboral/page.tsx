import {
  Handshake, Scale, Clock, Shield,
  Phone, Mail, ArrowRight, CheckCircle, XCircle,
  Building2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Mediacion Laboral — Servicios al Ciudadano',
  description:
    'Servicio de mediacion, arbitraje y conciliacion laboral. Resolucion extrajudicial de conflictos entre trabajadores y empresas a traves del Colegio de Graduados Sociales de Madrid.',
  path: '/servicios-ciudadano/mediacion-laboral',
});

const benefits = [
  {
    icon: Clock,
    title: 'Rapidez',
    description: 'La mediacion resuelve conflictos en dias o semanas, frente a los meses o anos del procedimiento judicial.',
  },
  {
    icon: Handshake,
    title: 'Acuerdo voluntario',
    description: 'Las partes mantienen el control de la solucion. El acuerdo es consensuado, no impuesto por un tercero.',
  },
  {
    icon: Shield,
    title: 'Confidencialidad',
    description: 'Todo lo tratado en mediacion es confidencial. No puede utilizarse como prueba en un juicio posterior.',
  },
  {
    icon: Scale,
    title: 'Eficacia legal',
    description: 'El acuerdo alcanzado en mediacion tiene la misma fuerza ejecutiva que una sentencia judicial.',
  },
];

const canMediate = [
  'Despidos y reclamaciones de cantidad',
  'Modificaciones sustanciales de condiciones de trabajo',
  'Conflictos por clasificacion profesional',
  'Reclamaciones de vacaciones y permisos',
  'Conflictos colectivos (convenios, EREs, ERTEs)',
  'Reclamaciones por acoso laboral',
];

const cannotMediate = [
  'Prestaciones de la Seguridad Social (competencia del INSS)',
  'Asuntos que requieran sentencia penal',
  'Conflictos sin vinculacion laboral',
];

const steps = [
  {
    num: '01',
    title: 'Solicitud de mediacion',
    description: 'Cualquiera de las partes (trabajador o empresa) puede solicitar la mediacion. Tambien los juzgados pueden derivar asuntos susceptibles de acuerdo.',
  },
  {
    num: '02',
    title: 'Designacion del mediador',
    description: 'Se asigna un graduado social colegiado con formacion acreditada en mediacion. El mediador es neutral e imparcial.',
  },
  {
    num: '03',
    title: 'Sesiones de mediacion',
    description: 'El mediador facilita el dialogo entre las partes en sesiones presenciales. Cada parte expone su posicion y se trabaja para encontrar puntos de acuerdo.',
  },
  {
    num: '04',
    title: 'Acuerdo o cierre',
    description: 'Si las partes llegan a un acuerdo, se formaliza con valor ejecutivo. Si no es posible, cada parte mantiene su derecho a la via judicial.',
  },
];

export default function MediacionLaboralPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Ciudadano', href: '/servicios-ciudadano' },
          { label: 'Mediacion Laboral', href: '/servicios-ciudadano/mediacion-laboral' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="colegio">Resolucion extrajudicial</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Mediacion Laboral
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Resolucion de conflictos laborales sin pasar por el juzgado.
                Un graduado social mediador facilita el dialogo entre trabajador
                y empresa para alcanzar un acuerdo con plena validez legal.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Servicio vinculado al SMAC (Servicio de Mediacion, Arbitraje y Conciliacion)
                y a la Ley 1/2025 de Medios Adecuados de Resolucion de Controversias.
              </p>

              <div className="mt-8">
                <Button variant="gradient" href="#solicitar">
                  Solicitar mediacion <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Right: key stats */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1565C0]/10 to-[#2563EB]/5">
                  <div className="text-center">
                    <Handshake size={64} strokeWidth={1} className="mx-auto text-[#1565C0]/30" />
                    <p className="mt-3 text-sm font-medium text-[#1565C0]/50">Foto: sesion de mediacion</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">70%+</p>
                    <p className="text-xs text-[#6B7280]">Tasa de acuerdo</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">2-4</p>
                    <p className="text-xs text-[#6B7280]">Semanas max.</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">100%</p>
                    <p className="text-xs text-[#6B7280]">Confidencial</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Legal</p>
                    <p className="text-xs text-[#6B7280]">Acuerdo ejecutivo</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#1565C0]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Ventajas */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="formacion">Ventajas</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Por que mediar en vez de litigar?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
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

      {/* Que se puede y que no */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2BD4C7]/10">
                  <CheckCircle size={20} className="text-[#2BD4C7]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Asuntos mediables</h3>
              </div>
              <ul className="space-y-3">
                {canMediate.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#2BD4C7]" />
                    <span className="text-sm text-[#475569]">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EF4444]/10">
                  <XCircle size={20} className="text-[#EF4444]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">No mediable</h3>
              </div>
              <ul className="space-y-3">
                {cannotMediate.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <XCircle size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#CBD5E1]" />
                    <span className="text-sm text-[#475569]">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="colegio">Proceso</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Como funciona la mediacion</h2>
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

          {/* SMAC note */}
          <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <div className="flex items-start gap-4">
              <Building2 size={20} className="mt-0.5 shrink-0 text-[#2563EB]" />
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">¿Que es el SMAC?</p>
                <p className="mt-1 text-sm text-[#475569]">
                  El Servicio de Mediacion, Arbitraje y Conciliacion es el organismo publico
                  donde se celebran los actos de conciliacion previa a la via judicial laboral.
                  Los graduados sociales actuan como mediadores cualificados en este servicio,
                  facilitando acuerdos entre las partes antes de llegar al juzgado.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="solicitar" className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              ¿Necesitas resolver un conflicto laboral?
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Contacta con el Colegio para explorar si la mediacion es la via adecuada para tu caso.
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
