import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, ArrowLeft, BookOpen, Award } from 'lucide-react';
import { PonentesGrid } from '@/components/sections/PonentesGrid';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { InscripcionForm } from '@/components/sections/InscripcionForm';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_FORMACION_BY_SLUG, GET_FORMACION_SLUGS } from '@/lib/graphql/queries/formacion';
import type { Formacion } from '@/lib/types';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

interface FormacionBySlugResponse {
  formacion: Formacion | null;
}

interface FormacionSlugsResponse {
  formaciones: { nodes: { slug: string }[] };
}

async function getFormacion(slug: string): Promise<Formacion | null> {
  try {
    const data = await fetchGraphQL<FormacionBySlugResponse>(GET_FORMACION_BY_SLUG, { slug });
    return data.formacion;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formacion = await getFormacion(slug);
  const title = formacion?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return createMetadata({
    title: `${title} | Formacion`,
    description: `Informacion e inscripcion para ${title} del Colegio Oficial de Graduados Sociales de Madrid.`,
    path: `/formacion-eventos/${slug}`,
  });
}

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL<FormacionSlugsResponse>(GET_FORMACION_SLUGS);
    return data.formaciones.nodes.map((f) => ({ slug: f.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;
export const dynamicParams = true;

function determineModalidad(lugar?: string | null): string {
  if (!lugar) return 'Presencial';
  const lower = lugar.toLowerCase();
  if (lower.includes('online') || lower.includes('webinar') || lower.includes('virtual')) return 'Online';
  return 'Presencial';
}

type FormacionEstado = 'Abierta' | 'Finalizada' | 'Completa' | 'Cancelada';

function determineEstado(estado?: string | null, fechaInicio?: string | null): FormacionEstado {
  if (estado) {
    const raw = Array.isArray(estado) ? estado[0] : estado;
    const lower = raw.toLowerCase();
    if (lower.includes('completa')) return 'Completa';
    if (lower.includes('cancelada')) return 'Cancelada';
    if (lower.includes('cerrada') || lower.includes('finalizada')) return 'Finalizada';
    if (lower.includes('abierta')) return 'Abierta';
  }
  if (fechaInicio && new Date(fechaInicio) < new Date()) return 'Finalizada';
  return 'Abierta';
}

function extractPrices(precios?: { tipo: string; importe: number; descripcion?: string }[] | null) {
  const defaults = { presencial: 0, online: 0 };
  if (!precios || precios.length === 0) return { colegiado: defaults, precolegiado: defaults, externo: defaults };

  const byTipo = (tipo: string) => {
    const p = precios.find((pr) => pr.tipo?.toLowerCase().includes(tipo));
    return p ? p.importe : 0;
  };

  return {
    colegiado: { presencial: byTipo('colegiado'), online: byTipo('colegiado') },
    precolegiado: { presencial: byTipo('precolegiado'), online: byTipo('precolegiado') },
    externo: { presencial: byTipo('externo') || byTipo('general'), online: byTipo('externo') || byTipo('general') },
  };
}

export default async function FormacionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const formacion = await getFormacion(slug);

  if (!formacion) notFound();

  const f = formacion.formacionFields;
  const modalidad = determineModalidad(f.lugar);
  const estado = determineEstado(f.estado, f.fechaInicio);
  const prices = extractPrices(f.precios);
  const isPast = estado === 'Finalizada' || estado === 'Completa' || estado === 'Cancelada';

  const fechaDisplay = f.fechaInicio
    ? new Date(f.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Formacion y Eventos', href: '/formacion-eventos' },
          { label: formacion.title, href: `/formacion-eventos/${slug}` },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main content — 2/3 */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge color="formacion">{modalidad}</Badge>
                <Badge color={isPast ? 'pendiente' : 'activo'}>
                  {estado}
                </Badge>
                {f.esGratuito && <Badge color="eventos">Gratuito</Badge>}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {formacion.title}
              </h1>

              {/* Info grid */}
              <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-bg-alt p-6 sm:grid-cols-2">
                {fechaDisplay && (
                  <div className="flex items-center gap-3">
                    <Calendar size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Fecha</p>
                      <p className="text-sm font-medium text-text">{fechaDisplay}</p>
                    </div>
                  </div>
                )}
                {f.horario && (
                  <div className="flex items-center gap-3">
                    <Clock size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Horario</p>
                      <p className="text-sm font-medium text-text">{f.horario}</p>
                    </div>
                  </div>
                )}
                {f.lugar && (
                  <div className="flex items-center gap-3">
                    <MapPin size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Lugar</p>
                      <p className="text-sm font-medium text-text">{f.lugar}</p>
                    </div>
                  </div>
                )}
                {f.plazas != null && f.plazas > 0 && (
                  <div className="flex items-center gap-3">
                    <Users size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Plazas</p>
                      <p className="text-sm font-medium text-text">{f.plazas} disponibles</p>
                    </div>
                  </div>
                )}
                {f.horasLectivas != null && f.horasLectivas > 0 && (
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Duracion</p>
                      <p className="text-sm font-medium text-text">{f.horasLectivas} horas lectivas</p>
                    </div>
                  </div>
                )}
                {f.diploma?.emiteDiploma && (
                  <div className="flex items-center gap-3">
                    <Award size={20} strokeWidth={1.5} className="text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Certificado</p>
                      <p className="text-sm font-medium text-text">
                        {f.diploma.entidadEmisora || 'Diploma del Colegio'}
                        {f.diploma.horasConvalidables ? ` (${f.diploma.horasConvalidables}h)` : ''}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured image */}
              {formacion.featuredImage ? (
                <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={formacion.featuredImage.node.sourceUrl}
                    alt={formacion.featuredImage.node.altText || formacion.title}
                    width={formacion.featuredImage.node.mediaDetails?.width || 800}
                    height={formacion.featuredImage.node.mediaDetails?.height || 450}
                    className="w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl bg-bg-alt border border-border">
                  <p className="text-sm text-text-tertiary">Imagen de la formacion</p>
                </div>
              )}

              {/* Content from WordPress editor */}
              {formacion.content && (
                <div
                  className="prose prose-slate mt-10 max-w-none"
                  dangerouslySetInnerHTML={{ __html: formacion.content }}
                />
              )}

              {/* Programa from ACF field */}
              {f.programa && (
                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold text-text">Programa</h2>
                  <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: f.programa }}
                  />
                </div>
              )}

              {/* Ponentes from ACF repeater */}
              {f.ponentes && f.ponentes.length > 0 && (
                <div className="mt-10">
                  <PonentesGrid ponentes={f.ponentes.map((p) => ({ ...p, cargo: p.cargo || '' }))} />
                </div>
              )}

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
                <InscripcionForm
                  formacionSlug={slug}
                  estado={estado}
                  plazas={f.plazas || 0}
                  fechaFin={f.fechaFin || f.fechaInicio}
                  precioColegiado={prices.colegiado}
                  precioPrecolegiado={prices.precolegiado}
                  precioExterno={prices.externo}
                  modalidadesDisponibles={modalidad === 'Online' ? ['online'] : ['presencial', 'online']}
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
