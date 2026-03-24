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


function determineModalidad(lugar: string | null): string {
  if (!lugar) return 'Presencial';
  const lower = lugar.toLowerCase();
  if (lower.includes('online') || lower.includes('webinar') || lower.includes('virtual')) return 'Online';
  return 'Presencial';
}

function determineEstado(estado: string | string[] | null, fechaInicio: string | null): 'Abierta' | 'Finalizada' {
  const raw = Array.isArray(estado) ? estado[0] : estado;
  if (raw) {
    const lower = raw.toLowerCase();
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
    estado: string | string[] | null;
  } | null;
}

interface FormacionesResponse {
  formaciones: { nodes: WpFormacionNode[] };
}

export default async function FormacionPage() {
  let formaciones: FormacionItem[] = [];

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
