import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, ArrowRight, Megaphone } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CalendarWidget } from '@/components/sections/CalendarWidget';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Formacion y Eventos — Agenda',
  description:
    'Calendario completo de formacion, jornadas, seminarios y eventos del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/formacion-eventos',
});

const AGENDA_QUERY = `{
  formaciones(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      slug
      title
      featuredImage { node { sourceUrl } }
      formacionFields {
        fechaInicio
        horario
        lugar
        plazas
        esGratuito
        estado
      }
    }
  }
  eventos(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      slug
      title
      featuredImage { node { sourceUrl } }
      eventoFields {
        fechaInicio
        horario
        lugar
        tipoEvento
        estado
        soloColegiados
      }
    }
  }
}`;

interface AgendaItem {
  slug: string;
  title: string;
  date: string;
  rawDate: string;
  time: string;
  location: string;
  type: 'formacion' | 'evento';
  estado: 'Abierta' | 'Finalizada';
  imageUrl?: string;
  extra?: string;
  href: string;
}

interface WpFormacionNode {
  slug: string;
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  formacionFields: {
    fechaInicio: string | null;
    horario: string | null;
    lugar: string | null;
    plazas: number | null;
    esGratuito: boolean | null;
    estado: string | null;
  } | null;
}

interface WpEventoNode {
  slug: string;
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  eventoFields: {
    fechaInicio: string | null;
    horario: string | null;
    lugar: string | null;
    tipoEvento: string | string[] | null;
    estado: string | string[] | null;
    soloColegiados: boolean | null;
  } | null;
}

interface AgendaResponse {
  formaciones: { nodes: WpFormacionNode[] };
  eventos: { nodes: WpEventoNode[] };
}

function parseEstado(estado: string | string[] | null, fechaInicio: string | null): 'Abierta' | 'Finalizada' {
  const str = Array.isArray(estado) ? estado[0] : estado;
  if (str) {
    const lower = str.toLowerCase();
    if (lower.includes('finalizada') || lower.includes('cerrada') || lower.includes('finalizado') || lower.includes('cancelado')) return 'Finalizada';
    if (lower.includes('abierta') || lower.includes('activa') || lower.includes('abierto') || lower.includes('programado')) return 'Abierta';
  }
  if (fechaInicio && new Date(fechaInicio) < new Date()) return 'Finalizada';
  return 'Abierta';
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function toCalendarDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toISOString().split('T')[0];
}

export default async function FormacionEventosPage() {
  const items: AgendaItem[] = [];
  const calendarEvents: { date: string; title: string; time: string; location: string; href: string; type?: 'formacion' | 'evento' }[] = [];

  try {
    const data = await fetchGraphQL<AgendaResponse>(AGENDA_QUERY);

    // Map formaciones
    if (data.formaciones?.nodes?.length > 0) {
      for (const f of data.formaciones.nodes) {
        const fields = f.formacionFields || {} as NonNullable<WpFormacionNode['formacionFields']>;
        const fechaInicio = fields.fechaInicio || null;
        const estado = parseEstado(fields.estado, fechaInicio);
        const item: AgendaItem = {
          slug: f.slug,
          title: f.title,
          date: formatDate(fechaInicio),
          rawDate: fechaInicio || '',
          time: fields.horario || '',
          location: fields.lugar || 'Sede del Colegio',
          type: 'formacion',
          estado,
          imageUrl: f.featuredImage?.node?.sourceUrl || undefined,
          extra: fields.esGratuito ? 'Gratuito' : fields.plazas ? `${fields.plazas} plazas` : undefined,
          href: `/formacion/${f.slug}`,
        };
        items.push(item);
        if (fechaInicio) {
          calendarEvents.push({ date: toCalendarDate(fechaInicio), title: f.title, time: fields.horario || '', location: fields.lugar || 'Sede del Colegio', href: `/formacion/${f.slug}`, type: 'formacion' });
        }
      }
    }

    // Map eventos
    if (data.eventos?.nodes?.length > 0) {
      for (const e of data.eventos.nodes) {
        const fields = e.eventoFields || {} as NonNullable<WpEventoNode['eventoFields']>;
        const fechaInicio = fields.fechaInicio || null;
        const estado = parseEstado(fields.estado, fechaInicio);
        const item: AgendaItem = {
          slug: e.slug,
          title: e.title,
          date: formatDate(fechaInicio),
          rawDate: fechaInicio || '',
          time: fields.horario || '',
          location: fields.lugar || 'Sede del Colegio',
          type: 'evento',
          estado,
          imageUrl: e.featuredImage?.node?.sourceUrl || undefined,
          extra: fields.soloColegiados ? 'Solo colegiados' : undefined,
          href: `/eventos/${e.slug}`,
        };
        items.push(item);
        if (fechaInicio) {
          calendarEvents.push({ date: toCalendarDate(fechaInicio), title: e.title, time: fields.horario || '', location: fields.lugar || 'Sede del Colegio', href: `/eventos/${e.slug}`, type: 'evento' });
        }
      }
    }
  } catch {
    // If GraphQL fails, show empty state
  }

  // Sort by date (upcoming first)
  items.sort((a, b) => {
    if (!a.rawDate) return 1;
    if (!b.rawDate) return -1;
    return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
  });

  const upcoming = items.filter((i) => i.estado === 'Abierta');
  const past = items.filter((i) => i.estado === 'Finalizada');

  return (
    <>
      <Breadcrumbs items={[{ label: 'Formacion y Eventos', href: '/formacion-eventos' }]} />

      {/* Hero */}
      <section className="py-16">
        <Container>
          <SectionHeading
            badge="Agenda"
            title="Formacion y Eventos"
            subtitle="Calendario completo de jornadas, seminarios, talleres y eventos del Colegio. Consulta las proximas actividades e inscribete."
          />

          {/* Quick links */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Button variant="outline" href="/formacion">
              <Calendar size={16} className="mr-2" /> Ver todas las formaciones
            </Button>
            <Button variant="outline" href="/eventos">
              <Megaphone size={16} className="mr-2" /> Ver todos los eventos
            </Button>
          </div>
        </Container>
      </section>

      {/* Calendar */}
      <section className="bg-bg-alt py-16">
        <Container>
          <SectionHeading title="Calendario" subtitle="Selecciona una fecha para ver las actividades programadas." centered={false} />
          <CalendarWidget events={calendarEvents} />
        </Container>
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading title="Proximas actividades" subtitle="Formaciones y eventos con inscripcion abierta." centered={false} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((item) => (
                <Link key={`${item.type}-${item.slug}`} href={item.href} className="group">
                  <Card className="flex h-full flex-col">
                    {/* Image */}
                    <div className="-mx-7 -mt-7 mb-5 overflow-hidden rounded-t-2xl">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          width={400}
                          height={267}
                          className="aspect-[3/2] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[3/2] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                          <Calendar size={32} strokeWidth={1} className="text-primary/40" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge color={item.type === 'evento' ? 'eventos' : 'formacion'}>
                        {item.type === 'evento' ? 'Evento' : 'Formacion'}
                      </Badge>
                      {item.extra && <Badge color="activo">{item.extra}</Badge>}
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>

                    <div className="mt-auto space-y-2 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} strokeWidth={1.5} />
                        <span>{item.date}</span>
                      </div>
                      {item.time && (
                        <div className="flex items-center gap-2">
                          <Clock size={14} strokeWidth={1.5} />
                          <span>{item.time}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin size={14} strokeWidth={1.5} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                      Ver detalle <ArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section className="bg-bg-alt py-16">
          <Container>
            <SectionHeading title="Actividades anteriores" centered={false} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {past.map((item) => (
                <Link key={`${item.type}-${item.slug}`} href={item.href} className="group">
                  <Card className="flex items-center gap-4 py-5 opacity-70 transition-opacity hover:opacity-100">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Badge color="institutional">Finalizada</Badge>
                        <Badge color={item.type === 'evento' ? 'eventos' : 'formacion'}>
                          {item.type === 'evento' ? 'Evento' : 'Formacion'}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-bold text-text-secondary transition-colors group-hover:text-text">
                        {item.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-xs text-text-tertiary">
                        <Calendar size={12} strokeWidth={1.5} />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Empty state */}
      {items.length === 0 && (
        <section className="py-20">
          <Container>
            <div className="text-center">
              <Calendar size={48} strokeWidth={1} className="mx-auto text-text-tertiary" />
              <p className="mt-4 text-text-secondary">No hay actividades programadas en este momento.</p>
              <p className="mt-2 text-sm text-text-tertiary">Vuelve pronto para consultar nuevas formaciones y eventos.</p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
