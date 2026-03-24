import Image from 'next/image';
import {
  Briefcase, Heart, Globe, Phone, Mail, MapPin,
  ArrowRight, Clock, Building2, ShieldCheck,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Orientacion Juridica Gratuita — Servicios al Ciudadano',
  description:
    'Servicio gratuito de orientacion juridica en materia laboral, Seguridad Social y extranjeria. Con cita previa en la sede del Colegio de Graduados Sociales de Madrid.',
  path: '/servicios-ciudadano/orientacion-juridica',
});

const areasWorkers = [
  'Despidos y reclamaciones de cantidad',
  'Conflictos laborales y sanciones',
  'Conciliacion de la vida laboral y familiar',
  'Prestaciones por desempleo',
  'Derechos fundamentales en el trabajo',
];

const areasCompanies = [
  'Conflictos laborales con empleados',
  'Convenios colectivos aplicables',
  'Prevencion de riesgos laborales',
  'Tramites ante la Seguridad Social',
  'Alta de empresa y contratacion',
];

const areasImmigration = [
  'Relaciones laborales de trabajadores extranjeros',
  'Expedientes de residencia y trabajo',
  'Reagrupacion familiar',
  'Prestaciones por desempleo para retornados',
  'Cartas de invitacion y visados',
];

const areasSS = [
  'Prestaciones por desempleo',
  'Jubilacion y prejubilacion',
  'Viudedad, orfandad y prestaciones familiares',
  'Incapacidad temporal y permanente',
  'Solicitud de citas previas',
];

const steps = [
  {
    num: '01',
    title: 'Solicita cita previa',
    description: 'Llamanos al 91 523 08 88 o escribenos a admon@graduadosocialmadrid.org. Indicanos brevemente tu situacion.',
  },
  {
    num: '02',
    title: 'Consulta presencial',
    description: 'Un graduado social colegiado te atendera en la sede del Colegio. La consulta es completamente gratuita y confidencial.',
  },
  {
    num: '03',
    title: 'Orientacion y siguientes pasos',
    description: 'Recibiras orientacion sobre tus derechos y opciones. Si necesitas representacion procesal, podras contratar libremente al profesional que prefieras.',
  },
];

export default function OrientacionJuridicaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Ciudadano', href: '/servicios-ciudadano' },
          { label: 'Orientacion Juridica', href: '/servicios-ciudadano/orientacion-juridica' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Servicio gratuito</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Orientacion Juridica Gratuita
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Consulta gratuita con un graduado social colegiado sobre tus derechos
                laborales, prestaciones de la Seguridad Social o cuestiones de extranjeria.
                Con cita previa, en la sede del Colegio.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Este servicio es puramente orientativo. Una vez recibida la informacion,
                cada ciudadano decide libremente si desea contratar a un profesional
                para la gestion y defensa de sus intereses.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="#cita">
                  Pedir cita previa <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#materias">
                  Ver materias
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src="/images/orientacion-juridica.jpg"
                    alt="Servicio de orientacion juridica del Colegio"
                    width={1200}
                    height={675}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Horario de atencion</p>
                      <p className="text-xs text-[#6B7280]">L-J 8:00-17:00 | V 8:00-15:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Sedes</p>
                      <p className="text-xs text-[#6B7280]">C/ Jose Abascal, 44 — Madrid</p>
                      <p className="text-xs text-[#6B7280]">C/ Princesa, 3 (Juzgados de lo Social)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Cita previa</p>
                      <p className="text-xs text-[#6B7280]">91 523 08 88</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Materias */}
      <section id="materias" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="formacion">Areas</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Sobre que te podemos orientar?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Workers */}
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  <Briefcase size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Para trabajadores</h3>
              </div>
              <ul className="space-y-2.5">
                {areasWorkers.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{a}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Companies */}
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
                  <Building2 size={20} className="text-[#8B5CF6]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Para empresas</h3>
              </div>
              <ul className="space-y-2.5">
                {areasCompanies.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{a}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Immigration */}
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F59E0B]/10">
                  <Globe size={20} className="text-[#D97706]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Extranjeria</h3>
              </div>
              <ul className="space-y-2.5">
                {areasImmigration.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{a}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Seguridad Social */}
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2BD4C7]/10">
                  <Heart size={20} className="text-[#18B7B0]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Seguridad Social</h3>
              </div>
              <ul className="space-y-2.5">
                {areasSS.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{a}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="colegio">Proceso</Badge>
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

      {/* Sede Princesa — nota especial */}
      <section className="bg-[#F7F8FA] py-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#E2E8F0] bg-white p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10">
                <Building2 size={24} className="text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Tambien en los Juzgados de lo Social</h3>
                <p className="mt-2 text-sm text-[#475569]">
                  Gracias a un convenio con la Comunidad de Madrid, el Colegio cuenta con un
                  espacio en la sede judicial de la Calle Princesa 3. Alli nuestros colegiados
                  atienden consultas y ejercen su labor de intermediacion laboral, junto a la
                  Sala de Togas del Colegio.
                </p>
                <p className="mt-2 text-xs text-[#6B7280]">
                  Calle Princesa, 3 — 1.a planta — Madrid
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="cita" className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Pide tu cita gratuita
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Llamanos o escribenos para solicitar una consulta orientativa sin coste.
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

              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <Clock size={12} />
                <span>L-J 8:00-17:00 | V 8:00-15:00 | Verano: L-J 8:00-15:00, V 8:00-14:00</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
