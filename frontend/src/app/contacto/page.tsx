import { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Train,
  Wifi,
  Monitor,
  Users,
  Presentation,
  Video,
  Scale,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ContactForm } from '@/components/sections/ContactForm';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Contacto',
  description:
    'Contacta con el Colegio Oficial de Graduados Sociales de Madrid. Sede principal en Jose Abascal 44, Sala de Togas en Princesa 3. Telefono 91 523 08 88.',
  path: '/contacto',
});

const facilidades = [
  { icon: Building2, label: 'Despachos para colegiados' },
  { icon: Users, label: 'Salas de reuniones' },
  { icon: Presentation, label: 'Salas de formacion' },
  { icon: Video, label: 'Sala de medios' },
  { icon: Scale, label: 'Sala de simulacion de juicios' },
];

const serviciosSalaTogas = [
  { icon: Building2, label: 'Taquillas personales' },
  { icon: Users, label: 'Sala de espera' },
  { icon: Wifi, label: 'Wifi gratuito' },
  { icon: Monitor, label: 'Atencion personal' },
];

export default function ContactoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Contacto', href: '/contacto' }]} />
      <section className="py-16">
        <Container>
          {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4">
            <Badge color="institutional">Atencion al Colegiado</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            Estamos aqui para ayudarte
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            Tanto si eres colegiado como si quieres informarte sobre nuestros
            servicios, estamos a tu disposicion. Visitanos en nuestra nueva
            sede, llamanos o escribenos.
          </p>
        </div>

        {/* === NUEVA SEDE === */}
        <div className="rounded-2xl bg-[#F7F8FA] p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Nueva sede: un espacio pensado para los profesionales del siglo XXI
          </h2>
          <p className="mt-4 text-[#475569] leading-relaxed">
            Nuestra nueva sede reune todo lo que un graduado social necesita para
            su dia a dia profesional, en una ubicacion privilegiada y con
            instalaciones de ultima generacion.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#2563EB]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Direccion</p>
                  <p className="text-sm text-[#475569]">
                    Calle Jose Abascal, 44 — 5.a izquierda
                    <br />
                    28003 Madrid
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#2563EB]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Metro</p>
                  <p className="text-sm text-[#475569]">
                    Gregorio Maranon (lineas 7 y 10)
                    <br />
                    Alonso Carvajal (linea 5)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#2563EB]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Telefono</p>
                  <p className="text-sm text-[#475569]">91 523 08 88</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#2563EB]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Email</p>
                  <p className="text-sm text-[#475569]">
                    admon@graduadosocialmadrid.org
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6B7280]">
                Instalaciones
              </p>
              <div className="space-y-3">
                {facilidades.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E2E8F0]">
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="text-[#2563EB]"
                        />
                      </div>
                      <p className="text-sm text-[#0F172A]">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-8 flex aspect-[21/9] items-center justify-center rounded-xl border border-[#E2E8F0] bg-white">
            <p className="text-sm font-medium text-[#6B7280]">
              Mapa de ubicacion — Jose Abascal, 44
            </p>
          </div>
        </div>

        {/* === SALA DE TOGAS === */}
        <div className="mt-12 rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-10">
          <div className="mb-2">
            <Badge color="colegio">Acceso exclusivo colegiados</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Sala de Togas
          </h2>
          <p className="mt-4 text-[#475569] leading-relaxed">
            Espacio reservado para colegiados en ejercicio, situado en los
            Juzgados de lo Social de Madrid. Un punto de referencia para tu
            actividad procesal diaria.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#1565C0]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Direccion</p>
                  <p className="text-sm text-[#475569]">
                    Calle Princesa, 3 — 1.a planta
                    <br />
                    Madrid
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#1565C0]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Telefono</p>
                  <p className="text-sm text-[#475569]">915 530 002</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#1565C0]"
                />
                <div>
                  <p className="font-semibold text-[#0F172A]">Email</p>
                  <p className="text-sm text-[#475569]">
                    saladgraduados@graduadosocialmadrid.org
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#6B7280]">
                Servicios
              </p>
              <div className="space-y-3">
                {serviciosSalaTogas.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1565C0]/10">
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="text-[#1565C0]"
                        />
                      </div>
                      <p className="text-sm text-[#0F172A]">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* === HORARIOS === */}
        <div className="mt-12 rounded-2xl bg-[#F7F8FA] p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <Clock size={24} strokeWidth={1.5} className="text-[#2563EB]" />
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
              Horarios
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card hover={false}>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Horario general
              </h3>
              <div className="mt-4 space-y-2 text-sm text-[#475569]">
                <div className="flex justify-between">
                  <span>Lunes a jueves</span>
                  <span className="font-medium text-[#0F172A]">
                    8:00 – 17:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Viernes</span>
                  <span className="font-medium text-[#0F172A]">
                    8:00 – 15:00
                  </span>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Horario de verano
              </h3>
              <p className="mt-1 text-xs text-[#6B7280]">
                15 de junio – 15 de septiembre
              </p>
              <div className="mt-4 space-y-2 text-sm text-[#475569]">
                <div className="flex justify-between">
                  <span>Lunes a jueves</span>
                  <span className="font-medium text-[#0F172A]">
                    8:00 – 15:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Viernes</span>
                  <span className="font-medium text-[#0F172A]">
                    8:00 – 14:00
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* === CONTACT FORM === */}
        <div className="mt-12">
          <ContactForm />
        </div>

        {/* === SOCIAL MEDIA === */}
        <div className="mt-12 rounded-2xl bg-[#F7F8FA] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Siguenos en redes sociales
          </h2>
          <p className="mt-2 text-[#475569]">
            Mantente al dia con las novedades del Colegio y la profesion.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/company/colegio-graduados-sociales-madrid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[40px] border-2 border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            <a
              href="https://www.instagram.com/colegiograduadosocialmadrid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[40px] border-2 border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @colegiograduadosocialmadrid
            </a>

            <a
              href="https://twitter.com/GSocialesMadrid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-[40px] border-2 border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @GSocialesMadrid
            </a>
          </div>
        </div>
        </Container>
      </section>
    </>
  );
}
