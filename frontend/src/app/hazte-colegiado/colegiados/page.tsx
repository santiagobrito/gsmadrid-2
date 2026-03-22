import {
  Briefcase, Building2, Award, CheckCircle, X as XIcon,
  FileText, ArrowRight, Phone, Mail, MapPin,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ColegiacionForm } from '@/components/sections/ColegiacionForm';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Colegiados — Modalidades de colegiacion',
  description:
    'Colegiate como Graduado Social en Madrid. Compara las modalidades: Ejerciente Libre, Ejerciente en Empresa y No Ejerciente. Acceso a Lexnet, formacion, asesoramiento y mas.',
  path: '/hazte-colegiado/colegiados',
});

// ============================================================
// Comparison data
// ============================================================

interface Feature {
  label: string;
  libre: boolean | string;
  empresa: boolean | string;
  noEjerciente: boolean | string;
}

const features: Feature[] = [
  { label: 'Formacion bonificada', libre: true, empresa: true, noEjerciente: true },
  { label: 'Bolsa de empleo', libre: true, empresa: true, noEjerciente: true },
  { label: 'Directorio profesional', libre: true, empresa: true, noEjerciente: false },
  { label: 'Asesoria juridico-tecnica', libre: true, empresa: true, noEjerciente: true },
  { label: 'Biblioteca y salas', libre: true, empresa: true, noEjerciente: true },
  { label: 'Convenios bancarios y seguros', libre: true, empresa: true, noEjerciente: true },
  { label: 'Acceso a Lexnet', libre: true, empresa: false, noEjerciente: false },
  { label: 'Convenios AEAT/CCAA', libre: true, empresa: false, noEjerciente: false },
  { label: 'Turno de Oficio', libre: true, empresa: false, noEjerciente: false },
  { label: 'Actuacion ante Juzgados', libre: true, empresa: false, noEjerciente: false },
  { label: 'Seguro RC obligatorio', libre: 'Obligatorio', empresa: 'No necesario', noEjerciente: 'No necesario' },
  { label: 'Colegiacion obligatoria', libre: 'Si', empresa: 'Voluntaria', noEjerciente: 'Voluntaria' },
];

const modalidades = [
  {
    icon: Briefcase,
    id: 'ejerciente-libre',
    title: 'Ejerciente Libre',
    subtitle: 'Profesionales por cuenta propia',
    description: 'Para quienes ejercen la profesion de forma autonoma, ofreciendo servicios a clientes y actuando ante Juzgados de lo Social. Obligatorio estar colegiado.',
    color: 'from-[#2563EB]/10 to-[#1D4ED8]/10',
    textColor: 'text-[#2563EB]',
    highlights: [
      'Acceso a Lexnet y firma digital',
      'Actuacion ante Juzgados y Tribunales',
      'Convenios AEAT para tributos de terceros',
      'Turno de Oficio',
      'Seguro de RC colectivo (Aon)',
    ],
    popular: true,
  },
  {
    icon: Building2,
    id: 'ejerciente-empresa',
    title: 'Ejerciente en Empresa',
    subtitle: 'Profesionales por cuenta ajena',
    description: 'Para quienes ejercen como Graduado Social dentro de una empresa u organizacion. Colegiacion voluntaria pero con acceso a todos los servicios de formacion y networking.',
    color: 'from-[#8B5CF6]/10 to-[#7C3AED]/10',
    textColor: 'text-[#7C3AED]',
    highlights: [
      'Formacion especializada bonificada',
      'Red profesional de 3.000+ colegiados',
      'Asesoria juridico-tecnica',
      'Bolsa de empleo y oportunidades',
      'Sin obligacion de seguro de RC',
    ],
  },
  {
    icon: Award,
    id: 'no-ejerciente',
    title: 'No Ejerciente',
    subtitle: 'Titulados sin ejercicio activo',
    description: 'Para titulados que no ejercen activamente pero quieren mantenerse conectados al sector, acceder a formacion y conservar su vinculo con el Colegio.',
    color: 'from-[#F59E0B]/10 to-[#D97706]/10',
    textColor: 'text-[#D97706]',
    highlights: [
      'Cuota reducida',
      'Formacion y eventos',
      'Networking profesional',
      'Reactivacion sencilla si vuelves a ejercer',
      'Biblioteca y recursos',
    ],
  },
];

const docs = [
  'Titulo de Grado o Diplomatura (original y copia)',
  'Resguardo de pago de tasas de expedicion',
  'DNI, NIE o Pasaporte en vigor',
  'Dos fotografias tamano carnet',
  'Formulario de inscripcion cumplimentado',
  'Autorizacion bancaria SEPA',
  'Declaracion de no inhabilitacion profesional',
  'Poliza de Responsabilidad Civil (solo ejercientes libres)',
];

// ============================================================
// Page
// ============================================================

export default function ColegiadosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Hazte Colegiado', href: '/hazte-colegiado' },
          { label: 'Colegiados', href: '/hazte-colegiado/colegiados' },
        ]}
      />

      {/* Hero — split layout */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: copy */}
            <div>
              <Badge color="formacion">Colegiacion profesional</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Elige la modalidad que se adapta a ti
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Tres formas de colegiarte segun tu situacion profesional.
                Todas incluyen formacion, networking y respaldo institucional.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="#formulario">
                  Solicitar colegiacion <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#comparativa">
                  Comparar modalidades
                </Button>
              </div>
            </div>

            {/* Right: visual — 3 mini cards */}
            <div className="relative">
              <div className="space-y-4">
                {modalidades.map((m) => {
                  const Icon = m.icon;
                  return (
                    <a key={m.id} href="#formulario" className="group flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all hover:border-[#2563EB]/30 hover:shadow-md">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${m.color}`}>
                        <Icon size={24} strokeWidth={1.5} className={m.textColor} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#0F172A]">{m.title}</h3>
                          {m.popular && (
                            <span className="rounded-full bg-[#2563EB] px-2 py-0.5 text-[9px] font-bold uppercase text-white">Obligatorio</span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B7280]">{m.subtitle}</p>
                      </div>
                      <ArrowRight size={16} className="text-[#CBD5E1] transition-colors group-hover:text-[#2563EB]" />
                    </a>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* 3 modalidades */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {modalidades.map((m) => {
              const Icon = m.icon;
              return (
                <Card key={m.id} hover={false} className={`relative flex flex-col ${m.popular ? 'border-[#2563EB]/30 shadow-lg' : ''}`}>
                  {m.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                      Obligatorio para ejercer
                    </span>
                  )}

                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color}`}>
                    <Icon size={28} strokeWidth={1.5} className={m.textColor} />
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A]">{m.title}</h3>
                  <p className="text-sm text-[#6B7280]">{m.subtitle}</p>
                  <p className="mt-3 text-sm text-[#475569]">{m.description}</p>

                  <div className="mt-6 space-y-2.5 flex-1">
                    {m.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2.5">
                        <CheckCircle size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                        <span className="text-sm text-[#475569]">{h}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#formulario" className="mt-6 block">
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/[0.04] py-2.5 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB]/[0.08]">
                      Solicitar como {m.title} <ArrowRight size={14} />
                    </div>
                  </a>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section id="comparativa" className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Comparativa de modalidades</h2>
            <p className="mt-2 text-[#475569]">Que incluye cada tipo de colegiacion</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E2E8F0]">
                  <th className="py-4 text-left text-sm font-semibold text-[#0F172A]">Servicio</th>
                  <th className="py-4 text-center text-sm font-semibold text-[#2563EB]">Ejerciente Libre</th>
                  <th className="py-4 text-center text-sm font-semibold text-[#7C3AED]">Ejerciente Empresa</th>
                  <th className="py-4 text-center text-sm font-semibold text-[#D97706]">No Ejerciente</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.label} className="border-b border-[#F1F5F9]">
                    <td className="py-3 text-sm text-[#475569]">{f.label}</td>
                    {[f.libre, f.empresa, f.noEjerciente].map((val, i) => (
                      <td key={i} className="py-3 text-center">
                        {val === true ? (
                          <CheckCircle size={16} className="mx-auto text-[#10B981]" />
                        ) : val === false ? (
                          <XIcon size={16} className="mx-auto text-[#CBD5E1]" />
                        ) : (
                          <span className="text-xs font-medium text-[#475569]">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Documentation */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-extrabold text-[#0F172A] mb-6 text-center">Documentacion necesaria</h2>
            <Card hover={false}>
              <div className="space-y-3">
                {docs.map((doc) => (
                  <div key={doc} className="flex items-start gap-3">
                    <FileText size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#2563EB]" />
                    <span className="text-sm text-[#475569]">{doc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Form */}
      <section id="formulario" className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ColegiacionForm tipo="ejerciente-libre" showTipoSelector />
          </div>
        </Container>
      </section>

      {/* Contact strip */}
      <section className="bg-[#F7F8FA] py-10">
        <Container>
          <div className="flex flex-col items-center gap-4 text-sm text-[#6B7280] sm:flex-row sm:justify-center sm:gap-8">
            <span className="font-medium text-[#0F172A]">¿Dudas?</span>
            <a href="tel:915230888" className="flex items-center gap-2 hover:text-[#2563EB]">
              <Phone size={14} /> 91 523 08 88
            </a>
            <a href="mailto:admon@graduadosocialmadrid.org" className="flex items-center gap-2 hover:text-[#2563EB]">
              <Mail size={14} /> admon@graduadosocialmadrid.org
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> C/ Jose Abascal, 44
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}
