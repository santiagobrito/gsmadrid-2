import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, ArrowLeft, FileText } from 'lucide-react';
import { PonentesGrid } from '@/components/sections/PonentesGrid';
import { ShareButtons } from '@/components/sections/ShareButtons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_EVENTO_BY_SLUG, GET_EVENTO_SLUGS } from '@/lib/graphql/queries/evento';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

interface EventoNode {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string | null;
  excerpt: string | null;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: { width: number; height: number } | null;
    };
  } | null;
  eventoFields: {
    fechaInicio: string | null;
    fechaFin: string | null;
    horario: string | null;
    lugar: string | null;
    tipoEvento: string | string[] | null;
    estado: string | string[] | null;
    plazas: number | null;
    requiereInscripcion: boolean | null;
    urlInscripcion: string | null;
    organizador: string | null;
    programa: string | null;
    documento: string | null;
    soloColegiados: boolean | null;
    ponentes?: {
      nombre: string;
      cargo?: string;
      bio?: string;
      foto?: { node: { sourceUrl: string } } | null;
      linkedin?: string;
    }[] | null;
  } | null;
}

interface EventoBySlugResponse {
  evento: EventoNode | null;
}

interface EventoSlugsResponse {
  eventos: { nodes: { slug: string }[] };
}

async function getEvento(slug: string): Promise<EventoNode | null> {
  try {
    const data = await fetchGraphQL<EventoBySlugResponse>(GET_EVENTO_BY_SLUG, { slug });
    return data.evento;
  } catch {
    return null;
  }
}

function extractSelectValue(val: string | string[] | null): string {
  if (!val) return '';
  return Array.isArray(val) ? val[0] : val;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const evento = await getEvento(slug);
  const title = evento?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return createMetadata({
    title: `${title} | Eventos`,
    description: `Informacion sobre el evento ${title} del Colegio Oficial de Graduados Sociales de Madrid.`,
    path: `/eventos/${slug}`,
  });
}

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL<EventoSlugsResponse>(GET_EVENTO_SLUGS);
    return data.eventos.nodes.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;
export const dynamicParams = true;

export default async function EventoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const evento = await getEvento(slug);

  if (!evento) notFound();

  const f = evento.eventoFields || {} as NonNullable<EventoNode['eventoFields']>;
  const tipo = extractSelectValue(f.tipoEvento) || 'institucional';
  const estadoRaw = extractSelectValue(f.estado) || 'programado';
  const tipoLabel = tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, ' ');

  const isPast = f.fechaInicio ? new Date(f.fechaInicio) < new Date() : false;
  const estadoDisplay = isPast ? 'Finalizado' : (estadoRaw === 'finalizado' || estadoRaw === 'cancelado') ? 'Finalizado' : 'Abierto';

  const fechaDisplay = f.fechaInicio
    ? new Date(f.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const soloColegiados = f.soloColegiados || false;
  const requiereInscripcion = f.requiereInscripcion || false;
  const organizador = f.organizador || 'Colegio Oficial de Graduados Sociales de Madrid';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Eventos', href: '/eventos' },
          { label: evento.title, href: `/eventos/${slug}` },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge color="colegio">{tipoLabel}</Badge>
                <Badge color={isPast ? 'institutional' : 'activo'}>
                  {estadoDisplay}
                </Badge>
                {soloColegiados && (
                  <Badge color="colegio">
                    <Users size={10} className="mr-1" /> Solo colegiados
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {evento.title}
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
                      <p className="text-xs font-semibold uppercase text-text-tertiary">Aforo</p>
                      <p className="text-sm font-medium text-text">{f.plazas} personas</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Featured image */}
              {evento.featuredImage ? (
                <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={evento.featuredImage.node.sourceUrl}
                    alt={evento.featuredImage.node.altText || evento.title}
                    width={evento.featuredImage.node.mediaDetails?.width || 800}
                    height={evento.featuredImage.node.mediaDetails?.height || 450}
                    className="w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl border border-border bg-bg-alt">
                  <p className="text-sm text-text-tertiary">Imagen del evento</p>
                </div>
              )}

              {/* Content from WordPress editor */}
              {evento.content && (
                <div
                  className="prose prose-slate mt-10 max-w-none"
                  dangerouslySetInnerHTML={{ __html: evento.content }}
                />
              )}

              {/* Programa from ACF */}
              {f.programa && (
                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold text-text">Programa</h2>
                  <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: f.programa }}
                  />
                </div>
              )}

              {/* Documento adjunto */}
              {f.documento && (
                <div className="mt-8">
                  <a
                    href={f.documento}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-primary transition hover:bg-bg-alt"
                  >
                    <FileText size={16} strokeWidth={1.5} />
                    Descargar documento adjunto
                  </a>
                </div>
              )}

              {/* Ponentes */}
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
                <Button variant="outline" href="/eventos">
                  <ArrowLeft size={16} strokeWidth={1.5} className="mr-1" />
                  Volver a eventos
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[102px] space-y-6">
                {/* Registration / Status */}
                <Card hover={false} className={isPast ? 'border-border bg-bg-alt' : 'border-primary/20 bg-primary/[0.02]'}>
                  {isPast ? (
                    <>
                      <div className="mb-3 flex items-center gap-2">
                        <Badge color="institutional">Evento finalizado</Badge>
                      </div>
                      <p className="text-sm font-light text-text-tertiary">
                        Este evento ya ha tenido lugar.
                      </p>
                    </>
                  ) : requiereInscripcion ? (
                    <>
                      <h3 className="mb-3 text-lg font-bold text-text">Inscripcion</h3>
                      <p className="mb-4 text-sm font-light text-text-secondary">
                        {soloColegiados
                          ? 'Evento exclusivo para colegiados del CGSM.'
                          : 'Abierto a colegiados y publico general.'}
                      </p>
                      {f.urlInscripcion ? (
                        <a href={f.urlInscripcion} target="_blank" rel="noopener noreferrer">
                          <Button variant="gradient" className="w-full">
                            Inscribirse al evento
                          </Button>
                        </a>
                      ) : (
                        <Button variant="gradient" className="w-full">
                          Inscribirse al evento
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <h3 className="mb-3 text-lg font-bold text-text">Evento abierto</h3>
                      <p className="text-sm font-light text-text-secondary">
                        No requiere inscripcion previa. Acceso libre hasta completar aforo.
                      </p>
                    </>
                  )}
                </Card>

                {/* Organizer */}
                <Card hover={false}>
                  <h4 className="mb-2 text-sm font-semibold text-text">Organizador</h4>
                  <p className="text-sm text-text-secondary">{organizador}</p>
                </Card>

                <ShareButtons title={evento.title} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
