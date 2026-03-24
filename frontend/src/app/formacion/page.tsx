import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FilteredFormaciones, FormacionItem } from '@/components/sections/FilteredFormaciones';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Formacion',
  description:
    'Jornadas, seminarios y talleres del Colegio Oficial de Graduados Sociales de Madrid. Inscripcion abierta para colegiados y publico general.',
  path: '/formacion',
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
    slug: 'taller-mediacion-arbitraje',
    title: 'Taller de Mediacion y Arbitraje Laboral',
    date: '7 Abr 2026',
    time: '09:00 - 14:00',
    location: 'Sede del Colegio',
    modalidad: 'Presencial',
    estado: 'Abierta',
    plazas: 30,
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

export default async function FormacionPage() {
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
      <Breadcrumbs items={[{ label: 'Formacion', href: '/formacion' }]} />
      <FilteredFormaciones
        formaciones={formaciones}
        title="Formacion"
        subtitle="Jornadas, seminarios y talleres organizados por el Colegio. Inscripcion abierta para colegiados y publico general."
        slugPrefix="/formacion"
      />
    </>
  );
}
