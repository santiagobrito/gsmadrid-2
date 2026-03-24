import {
  Briefcase, Search, FileText, Users, TrendingUp,
  ArrowRight, Phone, Mail, CheckCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Bolsa de Empleo — Servicios para Colegiados',
  description:
    'Accede a ofertas de empleo y oportunidades de colaboracion exclusivas para graduados sociales colegiados en Madrid.',
  path: '/servicios-colegiado/empleo',
});

const features = [
  {
    icon: Search,
    title: 'Ofertas exclusivas',
    description: 'Acceso a vacantes que empresas y despachos publican solo a traves del Colegio.',
  },
  {
    icon: FileText,
    title: 'Publica tu perfil',
    description: 'Crea tu perfil profesional visible para empleadores que buscan graduados sociales.',
  },
  {
    icon: Users,
    title: 'Colaboraciones',
    description: 'Conecta con otros colegiados para sustituciones, asociaciones o proyectos conjuntos.',
  },
  {
    icon: TrendingUp,
    title: 'Orientacion laboral',
    description: 'Asesoramiento sobre mercado laboral, CV y estrategias de busqueda de empleo.',
  },
];

const offerTypes = [
  'Despachos de graduados sociales',
  'Asesorias laborales y fiscales',
  'Departamentos de RRHH de empresas',
  'Administraciones publicas',
  'Mutuales y organizaciones sindicales',
  'Empresas de consultoria y outsourcing',
];

const steps = [
  {
    num: '01',
    title: 'Accede al Area Privada',
    description: 'Inicia sesion con tus credenciales de colegiado para ver las ofertas disponibles.',
  },
  {
    num: '02',
    title: 'Completa tu perfil profesional',
    description: 'Anade tu experiencia, especialidades y disponibilidad para que los empleadores puedan encontrarte.',
  },
  {
    num: '03',
    title: 'Explora y postula',
    description: 'Revisa las ofertas publicadas y envia tu candidatura directamente a traves de la plataforma.',
  },
  {
    num: '04',
    title: 'Recibe notificaciones',
    description: 'Configura alertas para recibir avisos cuando se publiquen ofertas que coincidan con tu perfil.',
  },
];

export default function EmpleoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          { label: 'Empleo', href: '/servicios-colegiado/empleo' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Exclusivo colegiados</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Bolsa de Empleo
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Ofertas de trabajo y oportunidades de colaboracion profesional
                exclusivas para graduados sociales colegiados en Madrid.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Empresas, despachos y administraciones publican sus vacantes
                directamente en nuestra bolsa. Accede con tu cuenta de colegiado.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="/area-privada">
                  Acceder a ofertas <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#como-funciona">
                  Como funciona
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#18B7B0]/5">
                  <div className="text-center">
                    <Briefcase size={64} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-3 text-sm font-medium text-[#2563EB]/50">Bolsa de Empleo</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">100+</p>
                    <p className="text-xs text-[#6B7280]">Ofertas anuales</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Gratis</p>
                    <p className="text-xs text-[#6B7280]">Para colegiados</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">24h</p>
                    <p className="text-xs text-[#6B7280]">Alertas email</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Madrid</p>
                    <p className="text-xs text-[#6B7280]">Comunidad</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Servicios</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Que incluye la Bolsa de Empleo?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{f.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{f.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tipos de ofertas */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Badge color="institutional">Sectores</Badge>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Quien publica ofertas?</h2>
              <p className="mt-4 text-lg font-light text-[#475569]">
                La bolsa de empleo recibe ofertas de distintos ambitos donde
                el graduado social es un profesional clave.
              </p>
            </div>
            <Card hover={false}>
              <ul className="space-y-3">
                {offerTypes.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <CheckCircle size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{t}</span>
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
      <section className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Encuentra tu proxima oportunidad
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Accede a la bolsa de empleo con tu cuenta de colegiado o contacta con nosotros para mas informacion.
            </p>

            <div className="mt-8 flex flex-col items-center gap-6">
              <Button variant="gradient" href="/area-privada" className="text-base px-8 py-3">
                Acceder al Area Privada <ArrowRight size={18} className="ml-1" />
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
