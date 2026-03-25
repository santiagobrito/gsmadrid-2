import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, ArrowLeft, BookOpen, Award } from 'lucide-react';
import { PonentesGrid } from '@/components/sections/PonentesGrid';
import { ShareButtons } from '@/components/sections/ShareButtons';
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
    path: `/formacion/${slug}`,
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

function getModalidades(modalidadesNodes?: { name: string; slug: string }[] | null): string[] {
  if (!modalidadesNodes || modalidadesNodes.length === 0) return ['Presencial'];
  return modalidadesNodes.map((m) => m.name);
}

function getModalidadesDisponibles(modalidadesNodes?: { name: string; slug: string }[] | null): ModalidadType[] {
  if (!modalidadesNodes || modalidadesNodes.length === 0) return ['presencial'];
  return modalidadesNodes.map((m) => {
    const s = m.slug.toLowerCase();
    if (s.includes('online')) return 'online' as ModalidadType;
    if (s.includes('hibrid')) return 'hibrido' as ModalidadType;
    return 'presencial' as ModalidadType;
  });
}

type ModalidadType = 'presencial' | 'online' | 'hibrido';

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

function extractPrices(precios?: { concepto: string; importe: number; nota?: string }[] | null) {
  const defaults = { presencial: 0, online: 0 };
  if (!precios || precios.length === 0) return { colegiado: defaults, precolegiado: defaults, externo: defaults };

  const byConcepto = (concepto: string) => {
    const p = precios.find((pr) => pr.concepto?.toLowerCase().includes(concepto));
    return p ? p.importe : null;
  };

  const externoPrice = byConcepto('externo') ?? byConcepto('general') ?? 0;

  return {
    colegiado: { presencial: byConcepto('colegiado') ?? 0, online: byConcepto('colegiado') ?? 0 },
    precolegiado: { presencial: byConcepto('precolegiado') ?? byConcepto('pre-colegiado') ?? byConcepto('pre colegiado') ?? 0, online: byConcepto('precolegiado') ?? byConcepto('pre-colegiado') ?? byConcepto('pre colegiado') ?? 0 },
    externo: { presencial: externoPrice, online: externoPrice },
  };
}

export default async function FormacionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const formacion = await getFormacion(slug);

  if (!formacion) notFound();

  const f = formacion.formacionFields;
  const modalidadNames = getModalidades(f.modalidades?.nodes);
  const modalidadesDisponibles = getModalidadesDisponibles(f.modalidades?.nodes);
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
          { label: 'Formacion', href: '/formacion' },
          { label: formacion.title, href: `/formacion/${slug}` },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {modalidadNames.map((m) => (
                  <Badge key={m} color="formacion">{m}</Badge>
                ))}
                <Badge color={isPast ? 'pendiente' : 'activo'}>
                  {estado}
                </Badge>
                {f.esGratuito && <Badge color="eventos">Gratuito</Badge>}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {formacion.title}
              </h1>

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

              {formacion.content && (
                <div
                  className="prose prose-slate mt-10 max-w-none"
                  dangerouslySetInnerHTML={{ __html: formacion.content }}
                />
              )}

              {f.programa && (
                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold text-text">Programa</h2>
                  <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: f.programa }}
                  />
                </div>
              )}

              {f.ponentes && f.ponentes.length > 0 && (
                <div className="mt-10">
                  <PonentesGrid ponentes={f.ponentes.map((p) => ({
                    nombre: p.nombre,
                    cargo: p.cargo || '',
                    bio: p.bio,
                    foto: p.foto?.node?.sourceUrl,
                    linkedin: p.linkedin,
                  }))} />
                </div>
              )}

              <div className="mt-10">
                <Button variant="outline" href="/formacion">
                  <ArrowLeft size={16} strokeWidth={1.5} className="mr-1" />
                  Volver a formacion
                </Button>
              </div>
            </div>

            {/* Sidebar */}
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
                  modalidadesDisponibles={modalidadesDisponibles}
                />

                <ShareButtons title={formacion.title} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
