import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_PROFESIONALES } from '@/lib/graphql/queries/profesional';
import type { Profesional } from '@/lib/types';
import { DirectorioSearch } from '@/components/sections/DirectorioSearch';
import { createMetadata } from '@/lib/seo/metadata';

// ACF image fields may return different structures depending on WPGraphQL for ACF version
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAcfImageUrl(field: any): string | null {
  if (!field) return null;
  if (field?.node?.sourceUrl) return field.node.sourceUrl;
  if (field?.sourceUrl) return field.sourceUrl;
  if (typeof field === 'string' && field.startsWith('http')) return field;
  return null;
}

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Directorio de Colegiados',
  description:
    'Encuentra un Graduado Social colegiado en la Comunidad de Madrid. Directorio profesional del Colegio Oficial.',
  path: '/directorio',
});

interface ProfesionalesResponse {
  profesionales: { nodes: Profesional[] };
}

export interface DirectorioProfesional {
  slug: string;
  nombre: string;
  numeroColegiado: string;
  despacho: string;
  localidad: string;
  ejerciente: boolean;
  mediador: boolean;
  fotoUrl: string | null;
}

// Fallback data if GraphQL is unavailable
const fallbackProfesionales: DirectorioProfesional[] = [
  { slug: 'maria-garcia-lopez', nombre: 'Maria Garcia Lopez', numeroColegiado: 'GS-1234', despacho: 'Garcia & Asociados', localidad: 'Madrid Centro', ejerciente: true, mediador: true, fotoUrl: null },
  { slug: 'carlos-martinez-ruiz', nombre: 'Carlos Martinez Ruiz', numeroColegiado: 'GS-2345', despacho: 'Asesoria Martinez', localidad: 'Alcobendas', ejerciente: true, mediador: false, fotoUrl: null },
  { slug: 'ana-fernandez-mora', nombre: 'Ana Fernandez Mora', numeroColegiado: 'GS-3456', despacho: 'Fernandez Consultores', localidad: 'Getafe', ejerciente: true, mediador: true, fotoUrl: null },
  { slug: 'jorge-sanchez-diaz', nombre: 'Jorge Sanchez Diaz', numeroColegiado: 'GS-4567', despacho: 'Laboral Sanchez', localidad: 'Majadahonda', ejerciente: true, mediador: false, fotoUrl: null },
  { slug: 'laura-torres-vega', nombre: 'Laura Torres Vega', numeroColegiado: 'GS-5678', despacho: 'Torres & Partners', localidad: 'Madrid Sur', ejerciente: true, mediador: false, fotoUrl: null },
  { slug: 'pedro-navarro-blanco', nombre: 'Pedro Navarro Blanco', numeroColegiado: 'GS-6789', despacho: 'Navarro Asesores Laborales', localidad: 'Las Rozas', ejerciente: true, mediador: true, fotoUrl: null },
];

export default async function DirectorioPage() {
  let profesionales: DirectorioProfesional[] = fallbackProfesionales;

  try {
    const data = await fetchGraphQL<ProfesionalesResponse>(GET_PROFESIONALES, { first: 100 });
    if (data.profesionales?.nodes?.length > 0) {
      profesionales = data.profesionales.nodes
        .filter((p) => p.profesionalFields.visibleDirectorio)
        .map((p) => ({
          slug: p.slug,
          nombre: p.profesionalFields.nombreCompleto || p.title,
          numeroColegiado: p.profesionalFields.numeroColegiado,
          despacho: p.profesionalFields.despacho || '',
          localidad: p.profesionalFields.direccion || '',
          ejerciente: p.profesionalFields.ejerciente,
          mediador: p.profesionalFields.mediadorRegistrado,
          fotoUrl: getAcfImageUrl(p.profesionalFields.foto),
        }));
    }
  } catch {
    // Use fallback data
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Directorio', href: '/directorio' }]} />
      <section className="py-16">
        <SectionHeading
          badge="Profesionales"
          title="Directorio de Colegiados"
          subtitle="Encuentra un Graduado Social colegiado en la Comunidad de Madrid"
        />
        <DirectorioSearch profesionales={profesionales} />
      </section>
    </>
  );
}
