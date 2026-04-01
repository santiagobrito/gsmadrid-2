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
  especialidades: string[];
  localidades: string[];
}

export default async function DirectorioPage() {
  let profesionales: DirectorioProfesional[] = [];

  try {
    const data = await fetchGraphQL<ProfesionalesResponse>(GET_PROFESIONALES, { first: 100 });
    if (data.profesionales?.nodes?.length > 0) {
      profesionales = data.profesionales.nodes
        .filter((p) => p.profesionalFields.visibleDirectorio)
        .map((p) => ({
          slug: p.slug,
          nombre: [p.profesionalFields.nombreCompleto, p.profesionalFields.apellidos].filter(Boolean).join(' ') || p.title,
          numeroColegiado: p.profesionalFields.numeroColegiado,
          despacho: p.profesionalFields.despacho || '',
          localidad: p.profesionalFields.direccion || '',
          ejerciente: p.profesionalFields.ejerciente,
          mediador: p.profesionalFields.mediadorRegistrado,
          fotoUrl: getAcfImageUrl(p.profesionalFields.foto),
          especialidades: p.especialidades?.nodes?.map((e) => e.name) || [],
          localidades: p.localidades?.nodes?.map((l) => l.name) || [],
        }));
    }
  } catch {
    // Use fallback — empty array
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
