import Link from 'next/link';
import {
  Shield, BookOpen, Users, Award, GraduationCap, CheckCircle,
  Scale, Briefcase, FileText, ArrowRight, ChevronRight,
  Building2, Laptop, BadgeCheck, Handshake, BookMarked,
  CreditCard, Phone, Mail, MapPin,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Hazte Colegiado — Inscripcion de Colegiados',
  description:
    'Unete al Colegio Oficial de Graduados Sociales de Madrid. Accede a Lexnet, formacion especializada, bolsa de empleo, asesoramiento y la red de profesionales del ambito laboral.',
  path: '/hazte-colegiado',
});

// ============================================================
// Data
// ============================================================

const benefits = [
  {
    icon: Laptop,
    title: 'Lexnet y Firma Digital',
    description: 'Gestion de alta y soporte tecnico para el intercambio seguro de documentos judiciales. Exclusivo para ejercientes.',
    highlight: true,
  },
  {
    icon: Scale,
    title: 'Asesoria Juridico-Tecnica',
    description: 'Consultas especializadas en Seguridad Social, extranjeria y casos complejos del ambito laboral.',
  },
  {
    icon: FileText,
    title: 'Convenios AEAT y CCAA',
    description: 'Habilitacion para presentar tributos de terceros ante la Agencia Tributaria y la Comunidad de Madrid.',
  },
  {
    icon: BookOpen,
    title: 'Formacion Especializada',
    description: 'Cursos, jornadas y talleres con bonificaciones exclusivas no disponibles en el mercado abierto.',
  },
  {
    icon: Shield,
    title: 'Defensa y Respaldo Colegial',
    description: 'Seguro de responsabilidad civil, proteccion contra intrusismo y representacion institucional.',
  },
  {
    icon: Users,
    title: 'Directorio Oficial',
    description: 'Visibilidad en el directorio profesional para que ciudadanos y empresas te encuentren.',
  },
];

const alliances = [
  {
    icon: BookMarked,
    title: 'Lefebvre — Bases de Datos',
    description: 'Acceso a bases de datos juridicas con condiciones preferenciales.',
  },
  {
    icon: CreditCard,
    title: 'Banca Colectiva',
    description: 'Acuerdos con Sabadell y Santander: cuentas profesionales sin comisiones.',
  },
  {
    icon: Handshake,
    title: 'Aon / Sanitas',
    description: 'Seguro de RC colectivo y cobertura sanitaria con primas reducidas.',
  },
];

const dailyServices = [
  'Revista del colegiado y actualizaciones laborales',
  'Biblioteca y salas de reuniones en la sede',
  'Servicio de colocacion y bolsa de empleo',
  'Gestion del Turno de Oficio',
  'Material formativo y merchandising oficial',
  'Programa anual de honores y reconocimientos',
];

const academicDocs = [
  'Original y copia del titulo de Grado o Diplomatura',
  'Resguardo de pago de tasas de expedicion del titulo',
  'DNI, NIE o Pasaporte en vigor',
  'Dos fotografias tamano carnet',
];

const adminDocs = [
  'Formulario oficial de inscripcion cumplimentado',
  'Autorizacion bancaria SEPA',
  'Declaracion de no inhabilitacion profesional',
  'Consentimiento de tratamiento de datos',
  'Poliza de Responsabilidad Civil (solo ejercientes)',
];

const steps = [
  {
    num: '1',
    title: 'Descarga y completa',
    description: 'Accede al formulario oficial de inscripcion y selecciona tu modalidad de ejercicio (Ejerciente o No Ejerciente).',
  },
  {
    num: '2',
    title: 'Envia tu expediente',
    description: 'Remite la solicitud junto con la documentacion academica por email o presencialmente en la Secretaria del Colegio.',
  },
  {
    num: '3',
    title: 'Ratificacion y bienvenida',
    description: 'La Junta de Gobierno valida tu expediente y recibiras tu numero de colegiado, carnet profesional y acceso a Lexnet.',
  },
];

const faqs = [
  {
    q: '¿Es obligatorio colegiarse para ejercer?',
    a: 'Si. Para el ejercicio libre de la profesion de Graduado Social ante Juzgados y Tribunales es obligatorio estar colegiado. Es el requisito para acceder a Lexnet y actuar como profesional habilitado.',
  },
  {
    q: '¿Que diferencia hay entre ejerciente libre y ejerciente en empresa?',
    a: 'El ejerciente libre trabaja por cuenta propia ofreciendo servicios a clientes. El ejerciente en empresa ejerce por cuenta ajena dentro de una organizacion. Ambos tienen acceso a todos los servicios colegiales, aunque la poliza de RC es obligatoria solo para ejercientes libres.',
  },
  {
    q: '¿Cuanto tarda el proceso de alta?',
    a: 'Una vez presentada la documentacion completa, la Junta de Gobierno ratifica el alta en su siguiente reunion. El proceso habitual es de 2 a 4 semanas desde la entrega del expediente.',
  },
  {
    q: '¿Puedo colegiarme si tengo el titulo de otro pais?',
    a: 'Si, siempre que el titulo este homologado por el Ministerio de Educacion. Necesitaras la credencial de homologacion ademas de la documentacion habitual.',
  },
  {
    q: '¿Que incluye la cuota colegial?',
    a: 'La cuota cubre el acceso a todos los servicios: formacion bonificada, asesoria juridico-tecnica, bolsa de empleo, biblioteca, salas de reuniones, directorio profesional, convenios con entidades y representacion institucional.',
  },
  {
    q: '¿Puedo darme de baja y volver a colegiarme?',
    a: 'Si. Puedes solicitar la baja voluntaria en cualquier momento y reincorporarte cuando lo desees, presentando la documentacion actualizada.',
  },
];

const paths = [
  {
    icon: GraduationCap,
    title: 'Precolegiados',
    subtitle: 'Estudiantes de Grado o Master',
    href: '/hazte-colegiado/precolegiados',
    color: 'from-[#10B981]/20 to-[#059669]/20',
    textColor: 'text-[#059669]',
  },
  {
    icon: Briefcase,
    title: 'Ejercientes Libres',
    subtitle: 'Profesionales por cuenta propia',
    href: '/hazte-colegiado/ejercientes-libres',
    color: 'from-[#2563EB]/20 to-[#1D4ED8]/20',
    textColor: 'text-[#2563EB]',
    popular: true,
  },
  {
    icon: Building2,
    title: 'Ejercientes en Empresa',
    subtitle: 'Profesionales por cuenta ajena',
    href: '/hazte-colegiado/ejercientes-empresa',
    color: 'from-[#8B5CF6]/20 to-[#7C3AED]/20',
    textColor: 'text-[#7C3AED]',
  },
  {
    icon: Award,
    title: 'No Ejercientes',
    subtitle: 'Titulados sin ejercicio activo',
    href: '/hazte-colegiado/no-ejercientes',
    color: 'from-[#F59E0B]/20 to-[#D97706]/20',
    textColor: 'text-[#D97706]',
  },
];

// ============================================================
// Page
// ============================================================

export default function HazteColegiadoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Hazte Colegiado', href: '/hazte-colegiado' }]} />

      {/* ============================== */}
      {/* HERO */}
      {/* ============================== */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/[0.04]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-[#18B7B0]/[0.04]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge color="formacion">
              Colegiacion
            </Badge>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
              El valor de tu carrera empieza con tu colegiacion
            </h1>

            <p className="mt-6 text-lg font-light leading-relaxed text-[#475569]">
              Unete al Colegio Oficial de Graduados Sociales de Madrid.
              Asegura tu ejercicio profesional, accede a Lexnet y forma parte
              de la red de mas de 3.000 expertos en Justicia Social.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="gradient" href="#proceso" className="text-base px-8 py-3">
                Comenzar inscripcion <ArrowRight size={18} className="ml-1" />
              </Button>
              <Button variant="outline" href="#beneficios">
                Ver beneficios
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12">
              <div>
                <p className="text-3xl font-extrabold text-[#2563EB]">3.000+</p>
                <p className="text-xs text-[#6B7280]">Colegiados</p>
              </div>
              <div className="h-10 w-px bg-[#E2E8F0]" />
              <div>
                <p className="text-3xl font-extrabold text-[#2563EB]">50+</p>
                <p className="text-xs text-[#6B7280]">Anos de historia</p>
              </div>
              <div className="h-10 w-px bg-[#E2E8F0]" />
              <div>
                <p className="text-3xl font-extrabold text-[#2563EB]">100+</p>
                <p className="text-xs text-[#6B7280]">Formaciones/ano</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* TIPOS DE COLEGIACION */}
      {/* ============================== */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="colegio">Modalidades</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Elige tu via de colegiacion</h2>
            <p className="mt-2 text-[#475569]">Selecciona el perfil que mejor se adapta a tu situacion profesional</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <Link key={path.title} href={path.href} className="group relative block">
                  {path.popular && (
                    <span className="absolute -top-2.5 right-4 z-10 rounded-full bg-[#18B7B0] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Mas comun
                    </span>
                  )}
                  <Card className={`h-full text-center ${path.popular ? 'border-[#2563EB]/30 shadow-md' : ''}`}>
                    <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${path.color}`}>
                      <Icon size={28} strokeWidth={1.5} className={path.textColor} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{path.title}</h3>
                    <p className="mt-1 text-sm text-[#475569]">{path.subtitle}</p>
                    <div className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-[#2563EB] opacity-0 transition-opacity group-hover:opacity-100">
                      Ver requisitos <ChevronRight size={14} />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* BENEFICIOS */}
      {/* ============================== */}
      <section id="beneficios" className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="formacion">Ventajas</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Beneficios para colegiados</h2>
            <p className="mt-2 text-[#475569]">Todo lo que obtienes al formar parte del Colegio</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className={item.highlight ? 'border-[#2563EB]/20 bg-[#2563EB]/[0.02]' : ''}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{item.description}</p>
                  {item.highlight && (
                    <Badge color="activo" className="mt-3">Exclusivo ejercientes</Badge>
                  )}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* ALIANZAS */}
      {/* ============================== */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Alianzas</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Alianzas estrategicas</h2>
            <p className="mt-2 text-[#475569]">Acuerdos con entidades lideres para tu beneficio</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {alliances.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{item.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Daily services */}
          <div className="mt-12 rounded-2xl border border-[#E2E8F0] bg-white p-8">
            <h3 className="mb-6 text-xl font-bold text-[#0F172A]">Comprometidos con tu dia a dia</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dailyServices.map((s) => (
                <div key={s} className="flex items-start gap-3">
                  <CheckCircle size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                  <span className="text-sm text-[#475569]">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* PROCESO EN 3 PASOS */}
      {/* ============================== */}
      <section id="proceso" className="py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="colegio">Proceso</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Tu camino al Colegio en 3 pasos</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#18B7B0] text-2xl font-extrabold text-white">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#475569]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="gradient" href="/contacto" className="text-base px-8 py-3">
              Comenzar inscripcion <ArrowRight size={18} className="ml-1" />
            </Button>
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* DOCUMENTACION */}
      {/* ============================== */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Documentacion</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Documentacion para el alta colegial</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Academic */}
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  <GraduationCap size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Requisitos academicos</h3>
              </div>
              <ul className="space-y-3">
                {academicDocs.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <BadgeCheck size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[#2563EB]" />
                    <span className="text-sm text-[#475569]">{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Admin */}
            <Card hover={false}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#18B7B0]/10">
                  <FileText size={20} className="text-[#18B7B0]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">Requisitos administrativos</h3>
              </div>
              <ul className="space-y-3">
                {adminDocs.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <BadgeCheck size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* FAQ */}
      {/* ============================== */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <Badge color="formacion">FAQ</Badge>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Preguntas frecuentes</h2>
              <p className="mt-2 text-[#475569]">Todo lo que necesitas saber antes de dar el paso</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.q} hover={false}>
                  <h3 className="text-base font-bold text-[#0F172A]">{faq.q}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================== */}
      {/* CTA FINAL */}
      {/* ============================== */}
      <section className="bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
              ¿Listo para dar el paso?
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Contacta con nosotros y te guiaremos en todo el proceso de colegiacion.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="gradient" href="/contacto" className="text-base px-8 py-3">
                Solicitar colegiacion <ArrowRight size={18} className="ml-1" />
              </Button>
            </div>
            <div className="mt-8 flex flex-col items-center gap-4 text-sm text-[#6B7280] sm:flex-row sm:justify-center sm:gap-8">
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
          </div>
        </Container>
      </section>
    </>
  );
}
