import Image from 'next/image';
import {
  Scale, Users, Briefcase, ShieldCheck, Phone, Mail, MapPin,
  ArrowRight, Clock, Building2, Handshake,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Clinica Juridica Gratuita — Servicios al Ciudadano',
  description:
    'Asesoramiento juridico laboral gratuito para personas en situacion de vulnerabilidad. Un servicio del Colegio de Graduados Sociales de Madrid en colaboracion con universidades.',
  path: '/servicios-ciudadano/clinica-juridica',
});

const targetGroups = [
  {
    icon: Users,
    title: 'Personas en situacion de vulnerabilidad',
    description: 'Trabajadores que enfrentan desigualdad, discriminacion laboral o dificultad para acceder a servicios publicos esenciales.',
  },
  {
    icon: ShieldCheck,
    title: 'Colectivos en riesgo de exclusion',
    description: 'Personas en riesgo de exclusion social que necesitan orientacion sobre sus derechos laborales, prestaciones y emprendimiento social.',
  },
  {
    icon: Briefcase,
    title: 'Ciudadanos sin acceso a asesoramiento',
    description: 'Cualquier persona que no pueda acceder a servicios profesionales privados por circunstancias economicas o sociales.',
  },
];

const areas = [
  {
    icon: Scale,
    title: 'Desigualdad y discriminacion laboral',
    description: 'Orientacion en casos de discriminacion salarial, acoso laboral, despidos improcedentes y proteccion de derechos fundamentales en el trabajo.',
  },
  {
    icon: Building2,
    title: 'Acceso a servicios publicos',
    description: 'Informacion sobre prestaciones de la Seguridad Social, servicios publicos de empleo y programas de cohesion social.',
  },
  {
    icon: Handshake,
    title: 'Emprendimiento responsable',
    description: 'Apoyo a proyectos de emprendimiento socialmente responsable, autoempleo y economia social.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Contacta con el Colegio',
    description: 'Llamanos al 91 523 08 88, escribenos a admon@graduadosocialmadrid.org o ven en persona. Explicanos brevemente tu situacion.',
  },
  {
    num: '02',
    title: 'Valoracion inicial',
    description: 'Un profesional colegiado evalua tu consulta y determina si encaja en el ambito de la Clinica. Confirmacion en un maximo de 48 horas habiles.',
  },
  {
    num: '03',
    title: 'Asesoramiento personalizado',
    description: 'Un equipo de graduados sociales colegiados y estudiantes universitarios te orienta de forma presencial sobre tu situacion laboral o de Seguridad Social.',
  },
  {
    num: '04',
    title: 'Seguimiento',
    description: 'Si es necesario, te derivamos a los servicios publicos correspondientes y te orientamos sobre los pasos a seguir.',
  },
];

const partners = [
  { name: 'Ayuntamiento de Madrid', logo: null },
  { name: 'Ayuntamiento de Colmenarejo', logo: null },
  { name: 'Mancomunidad de Servicios Sociales Sierra Norte', logo: '/partners/mancomunidad-sssn.jpg' },
  { name: 'Asociacion Espanola de Microfinanzas', logo: '/partners/aem.png' },
  { name: 'Trabajando en Positivo', logo: '/partners/trabajando-en-positivo.jpg' },
  { name: 'SEDOAC (Servicio Domestico Activo)', logo: '/partners/sedoac.jpg' },
];

export default function ClinicaJuridicaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Ciudadano', href: '/servicios-ciudadano' },
          { label: 'Clinica Juridica', href: '/servicios-ciudadano/clinica-juridica' },
        ]}
      />

      {/* Hero — split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Servicio gratuito</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Clinica Juridica Gratuita
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Asesoramiento juridico laboral gratuito para personas y colectivos
                en situacion de vulnerabilidad. Un programa del Colegio en colaboracion
                con la Universidad Carlos III de Madrid, formalizado en 2015.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="#solicitar">
                  Solicitar asesoramiento <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#como-funciona">
                  Como funciona
                </Button>
              </div>
            </div>

            {/* Right: key facts */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#18B7B0]/5">
                  <div className="text-center">
                    <Scale size={64} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-3 text-sm font-medium text-[#2563EB]/50">Foto: sesion de la Clinica</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">100%</p>
                    <p className="text-xs text-[#6B7280]">Gratuito</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">48h</p>
                    <p className="text-xs text-[#6B7280]">Respuesta max.</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">2015</p>
                    <p className="text-xs text-[#6B7280]">Desde</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">6+</p>
                    <p className="text-xs text-[#6B7280]">Entidades colaboradoras</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* A quien va dirigida */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Destinatarios</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿A quien va dirigida?</h2>
            <p className="mt-2 text-[#475569]">
              Derecho laboral al alcance de quien mas lo necesita
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {targetGroups.map((g) => {
              const Icon = g.icon;
              return (
                <Card key={g.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{g.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{g.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Materias */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Areas</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">En que materias podemos orientarte</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {areas.map((a) => {
              const Icon = a.icon;
              return (
                <Card key={a.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#18B7B0]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{a.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{a.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section id="como-funciona" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Proceso</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Como solicitar asesoramiento</h2>
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

          <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-[#D97706]/20 bg-[#D97706]/5 p-5">
            <p className="text-sm text-[#92400E]">
              <strong>Importante:</strong> La Clinica Juridica orienta y asesora, pero no sustituye
              la representacion procesal ante Juzgados y Tribunales.
            </p>
          </div>
        </Container>
      </section>

      {/* Colaboradores */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Red</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Con quien colaboramos</h2>
            <p className="mt-2 text-[#475569]">
              La Clinica opera a traves de una red de convenios con universidades, administraciones y entidades sociales.
              Forma parte de la Red de Clinicas Juridicas de Universidades Espanolas y de la
              European Network for Clinical Legal Education (ENCLE).
            </p>
          </div>

          <div className="mx-auto max-w-3xl grid grid-cols-2 gap-6 sm:grid-cols-3">
            {partners.map((p) => (
              <div key={p.name} className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center">
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={120}
                    height={60}
                    className="mb-3 h-[50px] w-auto object-contain grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
                  />
                ) : (
                  <div className="mb-3 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#2563EB]/10">
                    <Building2 size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                )}
                <span className="text-xs text-[#6B7280]">{p.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Contacto */}
      <section id="solicitar" className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              ¿Necesitas orientacion?
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Contacta con el Colegio y te indicaremos si tu caso puede ser atendido
              por la Clinica Juridica. El servicio es completamente gratuito.
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
                <span className="flex items-center gap-2">
                  <MapPin size={14} /> C/ Jose Abascal, 44 — Madrid
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <Clock size={12} />
                <span>L-J 8:00-17:00 | V 8:00-15:00</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
