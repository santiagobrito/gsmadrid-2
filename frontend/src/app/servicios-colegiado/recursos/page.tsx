import {
  BookOpen, Database, FileText, Calculator, Download,
  ArrowRight, Phone, Mail, ExternalLink, Laptop,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Recursos y Herramientas — Servicios para Colegiados',
  description:
    'Recursos profesionales, bases de datos, modelos, calculadoras y herramientas para el ejercicio diario del graduado social colegiado.',
  path: '/servicios-colegiado/recursos',
});

const resources = [
  {
    icon: Database,
    title: 'Bases de datos legislativas',
    description: 'Acceso a bases de datos juridicas con normativa laboral, fiscal y de Seguridad Social actualizada.',
    color: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
  },
  {
    icon: FileText,
    title: 'Modelos y formularios',
    description: 'Plantillas de contratos, escritos, recursos y formularios administrativos listos para usar.',
    color: 'bg-[#8B5CF6]/10',
    iconColor: 'text-[#8B5CF6]',
  },
  {
    icon: Calculator,
    title: 'Calculadoras profesionales',
    description: 'Herramientas de calculo de cotizaciones, indemnizaciones, IRPF y prestaciones.',
    color: 'bg-[#2BD4C7]/10',
    iconColor: 'text-[#18B7B0]',
  },
  {
    icon: BookOpen,
    title: 'Biblioteca profesional',
    description: 'Publicaciones, manuales y guias tecnicas sobre materias clave para el graduado social.',
    color: 'bg-[#F59E0B]/10',
    iconColor: 'text-[#D97706]',
  },
  {
    icon: Download,
    title: 'Circulares y boletines',
    description: 'Circulares del Colegio, boletines informativos y comunicados oficiales en formato descargable.',
    color: 'bg-[#EF4444]/10',
    iconColor: 'text-[#EF4444]',
  },
  {
    icon: Laptop,
    title: 'Herramientas digitales',
    description: 'Acceso a plataformas de firma electronica, certificados digitales y herramientas de gestion.',
    color: 'bg-[#1565C0]/10',
    iconColor: 'text-[#1565C0]',
  },
];

const externalLinks = [
  { name: 'Seguridad Social — RED', description: 'Sistema de remision electronica de datos' },
  { name: 'SEPE — Sede electronica', description: 'Servicio Publico de Empleo Estatal' },
  { name: 'Comunidad de Madrid — Empleo', description: 'Consejeria de Economia, Hacienda y Empleo' },
  { name: 'BOE — Legislacion laboral', description: 'Boletin Oficial del Estado' },
  { name: 'Ministerio de Trabajo', description: 'Informacion y tramites laborales' },
  { name: 'AEAT — Sede electronica', description: 'Agencia Estatal de Administracion Tributaria' },
];

export default function RecursosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          { label: 'Recursos y Herramientas', href: '/servicios-colegiado/recursos' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Herramientas profesionales</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Recursos y Herramientas
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Todo lo que necesitas para tu ejercicio profesional: bases de datos,
                modelos, calculadoras y herramientas digitales.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Recursos actualizados y curados por el Colegio para que trabajes
                con la informacion mas fiable y las herramientas mas eficientes.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="/area-privada">
                  Acceder a recursos <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#recursos">
                  Ver catalogo
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#18B7B0]/5">
                  <div className="text-center">
                    <BookOpen size={64} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-3 text-sm font-medium text-[#2563EB]/50">Recursos Profesionales</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">500+</p>
                    <p className="text-xs text-[#6B7280]">Modelos</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">24/7</p>
                    <p className="text-xs text-[#6B7280]">Disponible</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">PDF</p>
                    <p className="text-xs text-[#6B7280]">Descargable</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">Gratis</p>
                    <p className="text-xs text-[#6B7280]">Colegiados</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Resources grid */}
      <section id="recursos" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Catalogo</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Recursos disponibles</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => {
              const Icon = r.icon;
              return (
                <Card key={r.title}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${r.color}`}>
                    <Icon size={24} strokeWidth={1.5} className={r.iconColor} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{r.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{r.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* External links */}
      <section className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Enlaces utiles</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Organismos y plataformas</h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Accesos directos a las plataformas mas utilizadas por el graduado social.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {externalLinks.map((link) => (
                <div
                  key={link.name}
                  className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 transition-all hover:border-[#2563EB]/30 hover:shadow-sm"
                >
                  <ExternalLink size={16} className="mt-0.5 shrink-0 text-[#2563EB]" />
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{link.name}</p>
                    <p className="text-xs text-[#6B7280]">{link.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Accede a todos los recursos
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Inicia sesion en el Area Privada para descargar modelos, consultar bases de datos y acceder a todas las herramientas.
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
