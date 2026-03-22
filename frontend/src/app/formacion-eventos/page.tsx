import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FilteredFormaciones, FormacionItem } from '@/components/sections/FilteredFormaciones';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Formacion y Eventos',
  description:
    'Calendario de formacion, jornadas, seminarios y eventos del Colegio Oficial de Graduados Sociales de Madrid. Inscripcion abierta.',
  path: '/formacion-eventos',
});

const FORMACIONES_QUERY = `{
  formaciones(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      slug
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      formacionFields {
        fechaInicio
        fechaFin
        horario
        lugar
        plazas
        esGratuito
        estado
      }
    }
  }
}`;

// Fallback data if GraphQL is unavailable
const fallbackFormaciones: FormacionItem[] = [
  {
    slug: 'jornada-actualizacion-laboral-2026',
    title: 'Jornada de Actualizacion Laboral 2026',
    date: '28 Mar 2026',
    time: '10:00 - 14:00',
    location: 'Sede del Colegio',
    modalidad: 'Presencial',
    estado: 'Abierta',
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
    estado: 'Abierta',
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
    estado: 'Abierta',
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
    estado: 'Abierta',
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
    estado: 'Finalizada',
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
    estado: 'Finalizada',
    plazas: 0,
    esGratuito: false,
  },
];

function determineModalidad(lugar: string | null): string {
  if (!lugar) return 'Presencial';
  const lower = lugar.toLowerCase();
  if (lower.includes('online') || lower.includes('webinar') || lower.includes('virtual')) return 'Online';
  return 'Presencial';
}

function determineEstado(estado: string | null, fechaInicio: string | null): 'Abierta' | 'Finalizada' {
  if (estado) {
    const lower = estado.toLowerCase();
    if (lower.includes('finalizada') || lower.includes('cerrada') || lower.includes('pasada')) return 'Finalizada';
    if (lower.includes('abierta') || lower.includes('activa')) return 'Abierta';
  }
  // If no explicit estado, check date
  if (fechaInicio) {
    const startDate = new Date(fechaInicio);
    if (startDate < new Date()) return 'Finalizada';
  }
  return 'Abierta';
}

interface WpFormacionNode {
  slug: string;
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  formacionFields: {
    fechaInicio: string | null;
    fechaFin: string | null;
    horario: string | null;
    lugar: string | null;
    plazas: number | null;
    esGratuito: boolean | null;
    estado: string | null;
  } | null;
}

interface FormacionesResponse {
  formaciones: { nodes: WpFormacionNode[] };
}

export default async function FormacionEventosPage() {
  let formaciones: FormacionItem[] = fallbackFormaciones;

  try {
    const data = await fetchGraphQL<FormacionesResponse>(FORMACIONES_QUERY);
    if (data.formaciones?.nodes?.length > 0) {
      formaciones = data.formaciones.nodes.map((f) => {
        const fields = f.formacionFields || {} as NonNullable<WpFormacionNode['formacionFields']>;
        const fechaInicio = fields.fechaInicio || null;
        const lugar = fields.lugar || '';

        return {
          slug: f.slug,
          title: f.title,
          date: fechaInicio
            ? new Date(fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
            : '',
          time: fields.horario || '',
          location: lugar || 'Sede del Colegio',
          modalidad: determineModalidad(lugar),
          estado: determineEstado(fields.estado, fechaInicio),
          plazas: fields.plazas || 0,
          esGratuito: fields.esGratuito || false,
          imageUrl: f.featuredImage?.node?.sourceUrl || undefined,
        };
      });
    }
  } catch {
    // Use fallback data
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Formacion y Eventos', href: '/formacion-eventos' }]} />
      <FilteredFormaciones formaciones={formaciones} />
    </>
  );
}
