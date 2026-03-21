import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FilteredEventos, EventoItem } from '@/components/sections/FilteredEventos';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Eventos',
  description:
    'Actos institucionales, asambleas, networking y actividades sociales del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/eventos',
});

const EVENTOS_QUERY = `{
  eventos(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      slug
      title
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

// Fallback data if GraphQL is unavailable
const fallbackEventos: EventoItem[] = [
  {
    slug: 'asamblea-general-ordinaria-2026',
    title: 'Asamblea General Ordinaria 2026',
    date: '15 Abr 2026',
    time: '18:00 - 20:00',
    location: 'Salon de Actos, C/ Jose Abascal 44',
    tipo: 'asamblea',
    estado: 'Abierto',
    soloColegiados: true,
  },
  {
    slug: 'networking-jovenes-graduados',
    title: 'Networking: Jovenes Graduados Sociales',
    date: '22 Abr 2026',
    time: '19:00 - 21:00',
    location: 'Sede del Colegio',
    tipo: 'networking',
    estado: 'Abierto',
    soloColegiados: false,
  },
  {
    slug: 'acto-dia-graduado-social',
    title: 'Dia del Graduado Social 2026',
    date: '3 May 2026',
    time: '12:00 - 14:00',
    location: 'Salon de Actos, C/ Jose Abascal 44',
    tipo: 'institucional',
    estado: 'Abierto',
    soloColegiados: false,
  },
  {
    slug: 'cena-navidad-2025',
    title: 'Cena de Navidad del Colegio 2025',
    date: '20 Dic 2025',
    time: '21:00',
    location: 'Hotel Palace, Madrid',
    tipo: 'institucional',
    estado: 'Finalizado',
    soloColegiados: true,
  },
];

function determineEstado(estado: string | null, fechaInicio: string | null): 'Abierto' | 'Finalizado' {
  if (estado) {
    const lower = estado.toLowerCase();
    if (lower.includes('finalizado') || lower.includes('cancelado')) return 'Finalizado';
    if (lower.includes('abierto') || lower.includes('programado') || lower.includes('completo')) return 'Abierto';
  }
  if (fechaInicio) {
    const startDate = new Date(fechaInicio);
    if (startDate < new Date()) return 'Finalizado';
  }
  return 'Abierto';
}

interface WpEventoNode {
  slug: string;
  title: string;
  eventoFields: {
    fechaInicio: string | null;
    horario: string | null;
    lugar: string | null;
    tipoEvento: string | string[] | null;
    estado: string | null;
    soloColegiados: boolean | null;
  } | null;
}

interface EventosResponse {
  eventos: { nodes: WpEventoNode[] };
}

export default async function EventosPage() {
  let eventos: EventoItem[] = fallbackEventos;

  try {
    const data = await fetchGraphQL<EventosResponse>(EVENTOS_QUERY);
    if (data.eventos?.nodes?.length > 0) {
      eventos = data.eventos.nodes.map((e) => {
        const fields = e.eventoFields || {} as NonNullable<WpEventoNode['eventoFields']>;
        const fechaInicio = fields.fechaInicio || null;
        // tipoEvento comes as array like ["institucional", "Institucional"] from ACF select
        const tipoRaw = fields.tipoEvento;
        const tipo = Array.isArray(tipoRaw) ? tipoRaw[0] : (tipoRaw || 'institucional');

        return {
          slug: e.slug,
          title: e.title,
          date: fechaInicio
            ? new Date(fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
            : '',
          time: fields.horario || '',
          location: fields.lugar || 'Sede del Colegio',
          tipo,
          estado: determineEstado(fields.estado, fechaInicio),
          soloColegiados: fields.soloColegiados || false,
        };
      });
    }
  } catch {
    // Use fallback data
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Eventos', href: '/eventos' }]} />
      <FilteredEventos eventos={eventos} />
    </>
  );
}
