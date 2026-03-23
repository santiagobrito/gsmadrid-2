import {
  Handshake, Building2, Car, Wifi, BookOpen, Shield,
  ArrowRight, Phone, Mail, ShieldCheck, Tag,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Acuerdos y Convenios — Servicios para Colegiados',
  description:
    'Acuerdos y convenios con empresas y entidades que ofrecen condiciones especiales para graduados sociales colegiados en Madrid.',
  path: '/servicios-colegiado/acuerdos-convenios',
});

const categories = [
  {
    icon: Shield,
    title: 'Seguros',
    description: 'Seguros de responsabilidad civil, salud, vida y hogar con condiciones preferentes para colegiados.',
    color: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
  },
  {
    icon: Wifi,
    title: 'Tecnologia y software',
    description: 'Descuentos en herramientas de gestion laboral, nominas, contabilidad y firma electronica.',
    color: 'bg-[#8B5CF6]/10',
    iconColor: 'text-[#8B5CF6]',
  },
  {
    icon: BookOpen,
    title: 'Formacion',
    description: 'Tarifas reducidas en universidades, escuelas de negocio y centros de formacion especializados.',
    color: 'bg-[#10B981]/10',
    iconColor: 'text-[#059669]',
  },
  {
    icon: Building2,
    title: 'Servicios profesionales',
    description: 'Condiciones especiales en alquiler de oficinas, coworking, imprenta y servicios de courier.',
    color: 'bg-[#F59E0B]/10',
    iconColor: 'text-[#D97706]',
  },
  {
    icon: Car,
    title: 'Movilidad',
    description: 'Descuentos en renting de vehiculos, parking y transporte para profesionales.',
    color: 'bg-[#EF4444]/10',
    iconColor: 'text-[#EF4444]',
  },
  {
    icon: Tag,
    title: 'Ocio y bienestar',
    description: 'Ofertas en gimnasios, viajes, restauracion y actividades de ocio para colegiados y familias.',
    color: 'bg-[#1565C0]/10',
    iconColor: 'text-[#1565C0]',
  },
];

const highlights = [
  'Seguro de Responsabilidad Civil incluido en la cuota colegial',
  'Descuentos de hasta el 30% en software de gestion laboral',
  'Tarifas especiales en masteres y posgrados universitarios',
  'Condiciones preferentes en seguros de salud para colegiados y familia',
  'Acuerdos con coworkings en Madrid centro',
  'Convenios con editoriales juridicas y bases de datos legislativas',
];

export default function AcuerdosConveniosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          { label: 'Acuerdos y Convenios', href: '/servicios-colegiado/acuerdos-convenios' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="colegio">Ventajas exclusivas</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Acuerdos y Convenios
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Ser colegiado tiene ventajas. Hemos negociado condiciones especiales
                con empresas y entidades para que disfrutes de descuentos y beneficios exclusivos.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Desde seguros profesionales hasta herramientas de gestion, pasando por
                formacion y ocio. Todo por ser parte del Colegio.
              </p>

              <div className="mt-8">
                <Button variant="gradient" href="#convenios">
                  Ver convenios <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1565C0]/10 to-[#2563EB]/5">
                  <div className="text-center">
                    <Handshake size={64} strokeWidth={1} className="mx-auto text-[#1565C0]/30" />
                    <p className="mt-3 text-sm font-medium text-[#1565C0]/50">Acuerdos y Convenios</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">30+</p>
                    <p className="text-xs text-[#6B7280]">Entidades</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">6</p>
                    <p className="text-xs text-[#6B7280]">Categorias</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">30%</p>
                    <p className="text-xs text-[#6B7280]">Dto. medio</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">RC</p>
                    <p className="text-xs text-[#6B7280]">Incluido</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#1565C0]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section id="convenios" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="formacion">Categorias</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Areas con convenios activos</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.title}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}>
                    <Icon size={24} strokeWidth={1.5} className={cat.iconColor} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{cat.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{cat.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Badge color="colegio">Destacados</Badge>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Convenios destacados</h2>
              <p className="mt-4 text-lg font-light text-[#475569]">
                Algunos de los acuerdos mas relevantes que hemos conseguido para nuestros colegiados.
              </p>
              <p className="mt-4 text-sm text-[#6B7280]">
                El listado completo y actualizado esta disponible en el Area Privada de la web.
              </p>
            </div>
            <Card hover={false}>
              <ul className="space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              ¿Quieres acceder a los convenios?
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Accede al Area Privada para ver el listado completo con codigos de descuento y condiciones,
              o contacta con nosotros si tu empresa quiere firmar un convenio con el Colegio.
            </p>

            <div className="mt-8 flex flex-col items-center gap-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="/area-privada" className="text-base px-8 py-3">
                  Area Privada <ArrowRight size={18} className="ml-1" />
                </Button>
                <Button variant="outline" href="/contacto" className="text-base px-8 py-3">
                  Proponer convenio
                </Button>
              </div>

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
