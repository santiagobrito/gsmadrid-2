import { Calendar, Clock, MapPin, Users, ArrowLeft, BookOpen, Award } from 'lucide-react';
import { PonentesGrid } from '@/components/sections/PonentesGrid';
import type { Ponente } from '@/components/sections/PonentesGrid';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { InscripcionForm } from '@/components/sections/InscripcionForm';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';
// import { fetchGraphQL } from '@/lib/graphql/client';
// import { GET_FORMACION_BY_SLUG, GET_FORMACION_SLUGS } from '@/lib/graphql/queries/formacion';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return createMetadata({
    title: `${title} | Formacion`,
    description: `Informacion e inscripcion para ${title} del Colegio Oficial de Graduados Sociales de Madrid.`,
    path: `/formacion-eventos/${slug}`,
  });
}

// export async function generateStaticParams() {
//   const data = await fetchGraphQL(GET_FORMACION_SLUGS);
//   return data.formaciones.nodes.map((f) => ({ slug: f.slug }));
// }

export const revalidate = 60;

export default async function FormacionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Replace with actual GraphQL fetch
  // const data = await fetchGraphQL(GET_FORMACION_BY_SLUG, { slug });
  // if (!data.formacion) notFound();

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Placeholder data — will come from WordPress
  const formacion = {
    estado: 'Abierta' as const,
    fechaInicio: '2026-03-28',
    fechaFin: '2026-03-28',
    horario: '10:00 - 14:00',
    lugar: 'Sede del Colegio, C/ Jose Abascal 44, Madrid',
    plazas: 50,
    horasLectivas: 4,
    esGratuito: false,
    modalidad: 'Presencial',
  };

  // Placeholder ponentes — will come from ACF repeater via GraphQL
  const ponentes: Ponente[] = [
    {
      nombre: 'Dr. Carlos Martinez Lopez',
      cargo: 'Magistrado del Tribunal Superior de Justicia de Madrid',
      bio: 'Especialista en derecho laboral con mas de 20 anos de experiencia en la jurisdiccion social.',
    },
    {
      nombre: 'Maria Garcia Fernandez',
      cargo: 'Inspectora de Trabajo y Seguridad Social',
      bio: 'Experta en prevencion de riesgos laborales y regulacion de condiciones de trabajo.',
    },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Formacion y Eventos', href: '/formacion-eventos' },
          { label: title, href: `/formacion-eventos/${slug}` },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main content — 2/3 */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge color="formacion">{formacion.modalidad}</Badge>
                <Badge color={formacion.estado === 'Abierta' ? 'activo' : 'pendiente'}>
                  {formacion.estado}
                </Badge>
                {formacion.esGratuito && <Badge color="eventos">Gratuito</Badge>}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {title}
              </h1>

              {/* Info grid */}
              <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-bg-alt p-6 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Fecha</p>
                    <p className="text-sm font-medium text-text">{formacion.fechaInicio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Horario</p>
                    <p className="text-sm font-medium text-text">{formacion.horario}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Lugar</p>
                    <p className="text-sm font-medium text-text">{formacion.lugar}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Plazas</p>
                    <p className="text-sm font-medium text-text">{formacion.plazas} disponibles</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Duracion</p>
                    <p className="text-sm font-medium text-text">{formacion.horasLectivas} horas lectivas</p>
                  </div>
                </div>
                {!formacion.esGratuito && (
                  <div className="flex items-center gap-3">
                    <Award size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Certificado</p>
                      <p className="text-sm font-medium text-text">Diploma del Colegio</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured image placeholder */}
              <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl bg-bg-alt border border-border">
                <p className="text-sm text-text-tertiary">Imagen de la formacion</p>
              </div>

              {/* Content */}
              <div className="prose prose-slate mt-10 max-w-none">
                <h2>Descripcion</h2>
                <p className="text-text-secondary font-light">
                  Contenido del evento formativo. Esta seccion se rellenara automaticamente con los datos
                  del backend de WordPress cuando se complete la integracion con GraphQL.
                </p>

                <h2>Programa</h2>
                <p className="text-text-secondary font-light">
                  El programa detallado se cargara desde WordPress. Incluira los temas, ponentes y
                  horarios de cada bloque.
                </p>
              </div>

              {/* Ponentes — loaded from ACF repeater via GraphQL */}
              <div className="mt-10">
                <PonentesGrid ponentes={ponentes} />
              </div>

              {/* Back button */}
              <div className="mt-10">
                <Button variant="outline" href="/formacion-eventos">
                  <ArrowLeft size={16} strokeWidth={1.5} className="mr-1" />
                  Volver a la agenda
                </Button>
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="lg:col-span-1">
              <div className="sticky top-[102px] space-y-6">
                {/* Inscription form with automatic past event blocking */}
                <InscripcionForm
                  estado={formacion.estado}
                  plazas={formacion.plazas}
                  fechaFin={formacion.fechaFin}
                  precioColegiado={{ presencial: 0, online: 0 }}
                  precioPrecolegiado={{ presencial: 0, online: 0 }}
                  precioExterno={{ presencial: 50, online: 40 }}
                  modalidadesDisponibles={['presencial', 'online']}
                />

                {/* Share */}
                <div className="rounded-2xl border border-border bg-white p-5">
                  <h4 className="mb-3 text-sm font-semibold text-text">Compartir</h4>
                  <div className="flex gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition hover:border-primary hover:text-primary">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition hover:border-primary hover:text-primary">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition hover:border-primary hover:text-primary">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
