import {
  Monitor, FileCheck, CreditCard, ClipboardList, KeyRound,
  ArrowRight, Phone, Mail, ShieldCheck, Lock, Globe,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Servicios en Linea — Servicios para Colegiados',
  description:
    'Tramitacion online, certificados electronicos, pago de cuotas y gestion de tu colegiacion desde cualquier dispositivo.',
  path: '/servicios-colegiado/servicios-en-linea',
});

const services = [
  {
    icon: FileCheck,
    title: 'Certificados y acreditaciones',
    description: 'Solicita certificados de colegiacion, buena conducta profesional y estar al corriente de cuotas.',
    color: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
  },
  {
    icon: CreditCard,
    title: 'Pago de cuotas',
    description: 'Consulta tu estado de cuotas, realiza pagos pendientes y descarga tus recibos.',
    color: 'bg-[#8B5CF6]/10',
    iconColor: 'text-[#8B5CF6]',
  },
  {
    icon: ClipboardList,
    title: 'Tramites colegiales',
    description: 'Altas, bajas, cambios de datos, solicitud de carnet profesional y otras gestiones.',
    color: 'bg-[#2BD4C7]/10',
    iconColor: 'text-[#18B7B0]',
  },
  {
    icon: KeyRound,
    title: 'Firma electronica',
    description: 'Acceso al servicio de firma electronica reconocida para actuaciones profesionales.',
    color: 'bg-[#F59E0B]/10',
    iconColor: 'text-[#D97706]',
  },
  {
    icon: Globe,
    title: 'Registro de actuaciones',
    description: 'Registra tus actuaciones profesionales, conciliaciones y mediaciones de forma telematica.',
    color: 'bg-[#EF4444]/10',
    iconColor: 'text-[#EF4444]',
  },
  {
    icon: Monitor,
    title: 'Area Privada',
    description: 'Tu espacio personal: perfil profesional, directorio, formacion, empleo y comunicaciones.',
    color: 'bg-[#1565C0]/10',
    iconColor: 'text-[#1565C0]',
  },
];

const onlineFeatures = [
  'Disponible 24/7 desde cualquier dispositivo',
  'Certificados con firma electronica del Colegio',
  'Pago seguro por tarjeta o domiciliacion',
  'Historial completo de tramites y solicitudes',
  'Notificaciones por email del estado de tus gestiones',
  'Compatible con certificado digital y Cl@ve',
];

const steps = [
  {
    num: '01',
    title: 'Accede al Area Privada',
    description: 'Inicia sesion con tu usuario y contrasena de colegiado. Si es tu primera vez, solicita tus credenciales.',
  },
  {
    num: '02',
    title: 'Selecciona el servicio',
    description: 'Elige el tramite o servicio que necesitas en el menu de la plataforma.',
  },
  {
    num: '03',
    title: 'Completa y envia',
    description: 'Cumplimenta los datos necesarios, adjunta la documentacion requerida y envia tu solicitud.',
  },
  {
    num: '04',
    title: 'Seguimiento',
    description: 'Recibe confirmacion por email y consulta el estado de tu tramite en cualquier momento.',
  },
];

export default function ServiciosEnLineaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          { label: 'Servicios en Linea', href: '/servicios-colegiado/servicios-en-linea' },
        ]}
      />

      {/* Hero split */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge color="institutional">Digital</Badge>

              <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                Servicios en Linea
              </h1>

              <p className="mt-6 text-lg font-light text-[#475569]">
                Gestiona tu colegiacion, solicita certificados, paga cuotas y realiza
                tramites desde cualquier lugar, en cualquier momento.
              </p>

              <p className="mt-4 text-sm text-[#6B7280]">
                Tu oficina del Colegio, siempre abierta. Todos los servicios digitales
                que necesitas como colegiado, en un solo lugar.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button variant="gradient" href="/area-privada">
                  Acceder ahora <ArrowRight size={16} className="ml-1" />
                </Button>
                <Button variant="outline" href="#servicios">
                  Ver servicios
                </Button>
              </div>
            </div>

            {/* Right: info card */}
            <div className="relative">
              <div className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
                <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#18B7B0]/5">
                  <div className="text-center">
                    <Monitor size={64} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-3 text-sm font-medium text-[#2563EB]/50">Servicios Digitales</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">24/7</p>
                    <p className="text-xs text-[#6B7280]">Disponible</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <div className="flex items-center justify-center">
                      <Lock size={20} className="text-[#2563EB]" />
                    </div>
                    <p className="text-xs text-[#6B7280]">Seguro</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">6</p>
                    <p className="text-xs text-[#6B7280]">Servicios</p>
                  </div>
                  <div className="rounded-xl bg-[#F7F8FA] p-4 text-center">
                    <p className="text-2xl font-extrabold text-[#2563EB]">App</p>
                    <p className="text-xs text-[#6B7280]">Responsive</p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-[200px] w-[200px] rounded-full bg-[#2563EB]/[0.04]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Services grid */}
      <section id="servicios" className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Plataforma</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Que puedes hacer online?</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.title}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                    <Icon size={24} strokeWidth={1.5} className={s.iconColor} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A]">{s.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{s.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features list */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Badge color="institutional">Ventajas</Badge>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">¿Por que usar los servicios online?</h2>
              <p className="mt-4 text-lg font-light text-[#475569]">
                Ahorra tiempo y desplazamientos. Gestiona todo lo relacionado con tu colegiacion
                desde tu ordenador o movil.
              </p>
            </div>
            <Card hover={false}>
              <ul className="space-y-3">
                {onlineFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <ShieldCheck size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#18B7B0]" />
                    <span className="text-sm text-[#475569]">{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-[#F7F8FA] py-20">
        <Container>
          <div className="mb-12 text-center">
            <Badge color="institutional">Proceso</Badge>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">Como realizar un tramite online</h2>
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
              Empieza a gestionar online
            </h2>
            <p className="mt-4 text-lg font-light text-[#475569]">
              Accede al Area Privada para realizar tus tramites. Si aun no tienes credenciales, contacta con nosotros.
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
