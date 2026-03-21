import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';
import { Calendar, Clock, MapPin, ArrowRight, Lock } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Formacion y Eventos',
  description: 'Calendario de formacion, jornadas, seminarios y eventos del Colegio Oficial de Graduados Sociales de Madrid. Inscripcion abierta.',
  path: '/formacion-eventos',
});

export const revalidate = 60;

const formaciones = [
  {
    slug: 'jornada-actualizacion-laboral-2026',
    title: 'Jornada de Actualizacion Laboral 2026',
    date: '28 Mar 2026',
    time: '10:00 - 14:00',
    location: 'Sede del Colegio',
    modalidad: 'Presencial',
    estado: 'Abierta' as const,
    plazas: 8,
    esGratuito: false,
  },
  {
    slug: 'webinar-seguridad-social',
    title: 'Webinar: Novedades en Seguridad Social',
    date: '2 Abr 2026',
    time: '17:00 - 19:00',
    location: 'Online',
    modalidad: 'Online',
    estado: 'Abierta' as const,
    plazas: 200,
    esGratuito: true,
  },
  {
    slug: 'curso-mediacion-arbitraje',
    title: 'Curso de Mediacion y Arbitraje Laboral',
    date: '7 Abr 2026',
    time: '09:00 - 14:00',
    location: 'Sede del Colegio',
    modalidad: 'Presencial',
    estado: 'Abierta' as const,
    plazas: 30,
    esGratuito: false,
  },
  {
    slug: 'taller-inteligencia-artificial-laboral',
    title: 'Taller: IA Aplicada al Ambito Laboral',
    date: '15 Abr 2026',
    time: '16:00 - 20:00',
    location: 'Online',
    modalidad: 'Online',
    estado: 'Abierta' as const,
    plazas: 100,
    esGratuito: false,
  },
  {
    slug: 'jornada-prevencion-riesgos-2025',
    title: 'Jornada de Prevencion de Riesgos Laborales',
    date: '15 Dic 2025',
    time: '10:00 - 14:00',
    location: 'Sede del Colegio',
    modalidad: 'Presencial',
    estado: 'Finalizada' as const,
    plazas: 0,
    esGratuito: false,
  },
  {
    slug: 'seminario-reforma-laboral-2025',
    title: 'Seminario: Reforma Laboral — Balance 2025',
    date: '28 Nov 2025',
    time: '09:00 - 13:00',
    location: 'Sede del Colegio',
    modalidad: 'Presencial',
    estado: 'Finalizada' as const,
    plazas: 0,
    esGratuito: false,
  },
];

export default async function FormacionEventosPage() {
  const abiertas = formaciones.filter((f) => f.estado !== 'Finalizada');
  const pasadas = formaciones.filter((f) => f.estado === 'Finalizada');

  return (
    <>
      <Breadcrumbs items={[{ label: 'Formacion y Eventos', href: '/formacion-eventos' }]} />

      <section className="py-24">
        <Container>
          <SectionHeading
            badge="Formacion"
            title="Formacion y Eventos"
            subtitle="Jornadas, seminarios, cursos y eventos organizados por el Colegio. Inscripcion abierta para colegiados y publico general."
          />

          {/* Filter badges */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white">
              Todos
            </button>
            <button className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-text-secondary transition hover:border-primary hover:text-primary">
              Presencial
            </button>
            <button className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-text-secondary transition hover:border-primary hover:text-primary">
              Online
            </button>
            <button className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-text-secondary transition hover:border-primary hover:text-primary">
              Gratuito
            </button>
          </div>

          {/* Active formations */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {abiertas.map((f) => (
              <Link key={f.slug} href={`/formacion-eventos/${f.slug}`} className="group">
                <Card className="flex h-full flex-col">
                  {/* Image placeholder */}
                  <div className="-mx-7 -mt-7 mb-5 flex aspect-[3/2] items-center justify-center overflow-hidden rounded-t-2xl bg-bg-alt">
                    <p className="text-xs text-text-tertiary">Imagen de la formacion</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge color={f.modalidad === 'Online' ? 'eventos' : 'formacion'}>
                      {f.modalidad}
                    </Badge>
                    {f.esGratuito && <Badge color="activo">Gratuito</Badge>}
                    {f.plazas > 0 && f.plazas <= 10 && (
                      <Badge color="pendiente">Ultimas plazas</Badge>
                    )}
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
                    {f.title}
                  </h3>

                  <div className="mt-auto space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span>{f.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} strokeWidth={1.5} />
                      <span>{f.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} strokeWidth={1.5} />
                      <span>{f.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    Ver detalle e inscripcion <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Past formations */}
          {pasadas.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 text-center text-2xl font-bold text-text">Formaciones anteriores</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pasadas.map((f) => (
                  <Link key={f.slug} href={`/formacion-eventos/${f.slug}`} className="group">
                    <Card className="flex h-full flex-col opacity-70 transition-opacity hover:opacity-100">
                      <div className="mb-3 flex items-center gap-2">
                        <Lock size={14} className="text-text-tertiary" />
                        <Badge color="institutional">Finalizada</Badge>
                        <Badge color={f.modalidad === 'Online' ? 'eventos' : 'formacion'}>
                          {f.modalidad}
                        </Badge>
                      </div>
                      <h3 className="mb-2 text-base font-bold text-text-secondary transition-colors group-hover:text-text">
                        {f.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-2 text-sm text-text-tertiary">
                        <Calendar size={14} strokeWidth={1.5} />
                        <span>{f.date}</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
