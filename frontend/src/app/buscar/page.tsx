import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { fetchGraphQL } from '@/lib/graphql/client';
import { createMetadata } from '@/lib/seo/metadata';

export const revalidate = 0; // Always fresh search results

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return createMetadata({
    title: q ? `Buscar: ${q}` : 'Buscar',
    description: 'Busca contenido en la web del Colegio Oficial de Graduados Sociales de Madrid.',
    path: '/buscar',
  });
}

const SEARCH_QUERY = `
query Search($search: String!) {
  posts(where: { search: $search }, first: 10) {
    nodes { slug title date excerpt }
  }
  formaciones(where: { search: $search }, first: 10) {
    nodes { slug title formacionFields { fechaInicio } }
  }
  eventos(where: { search: $search }, first: 10) {
    nodes { slug title eventoFields { fechaInicio } }
  }
}`;

interface SearchResponse {
  posts: { nodes: { slug: string; title: string; date: string; excerpt: string }[] };
  formaciones: { nodes: { slug: string; title: string; formacionFields: { fechaInicio: string | null } }[] };
  eventos: { nodes: { slug: string; title: string; eventoFields: { fechaInicio: string | null } }[] };
}

export default async function BuscarPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  let posts: SearchResponse['posts']['nodes'] = [];
  let formaciones: SearchResponse['formaciones']['nodes'] = [];
  let eventos: SearchResponse['eventos']['nodes'] = [];

  if (query) {
    try {
      const data = await fetchGraphQL<SearchResponse>(SEARCH_QUERY, { search: query });
      posts = data.posts?.nodes || [];
      formaciones = data.formaciones?.nodes || [];
      eventos = data.eventos?.nodes || [];
    } catch {
      // Search failed silently
    }
  }

  const totalResults = posts.length + formaciones.length + eventos.length;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Buscar', href: '/buscar' }]} />
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Search form */}
            <form action="/buscar" method="GET" className="mb-10">
              <div className="relative">
                <Search size={20} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Buscar noticias, formaciones, eventos..."
                  className="w-full rounded-[40px] border border-[#E2E8F0] bg-white py-3.5 pl-12 pr-4 text-sm text-[#0F172A] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  autoFocus
                />
              </div>
            </form>

            {/* Results */}
            {query && (
              <p className="mb-6 text-sm text-[#6B7280]">
                {totalResults === 0
                  ? `No se encontraron resultados para "${query}"`
                  : `${totalResults} resultado${totalResults === 1 ? '' : 's'} para "${query}"`}
              </p>
            )}

            <div className="space-y-4">
              {/* Posts */}
              {posts.map((p) => (
                <Link key={p.slug} href={`/actualidad/${p.slug}`} className="group block">
                  <Card className="flex items-start gap-4">
                    <Badge color="institutional">Noticia</Badge>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB]">{p.title}</h3>
                      {p.excerpt && (
                        <p className="mt-1 text-sm text-[#475569] line-clamp-2">{p.excerpt.replace(/<[^>]*>/g, '')}</p>
                      )}
                      <p className="mt-1 text-xs text-[#6B7280]">
                        {new Date(p.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#6B7280] group-hover:text-[#2563EB]" />
                  </Card>
                </Link>
              ))}

              {/* Formaciones */}
              {formaciones.map((f) => (
                <Link key={f.slug} href={`/formacion-eventos/${f.slug}`} className="group block">
                  <Card className="flex items-start gap-4">
                    <Badge color="formacion">Formacion</Badge>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB]">{f.title}</h3>
                      {f.formacionFields?.fechaInicio && (
                        <p className="mt-1 text-xs text-[#6B7280]">
                          {new Date(f.formacionFields.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#6B7280] group-hover:text-[#2563EB]" />
                  </Card>
                </Link>
              ))}

              {/* Eventos */}
              {eventos.map((e) => (
                <Link key={e.slug} href={`/eventos/${e.slug}`} className="group block">
                  <Card className="flex items-start gap-4">
                    <Badge color="colegio">Evento</Badge>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB]">{e.title}</h3>
                      {e.eventoFields?.fechaInicio && (
                        <p className="mt-1 text-xs text-[#6B7280]">
                          {new Date(e.eventoFields.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#6B7280] group-hover:text-[#2563EB]" />
                  </Card>
                </Link>
              ))}
            </div>

            {!query && (
              <div className="py-16 text-center">
                <Search size={48} strokeWidth={1} className="mx-auto text-[#E2E8F0]" />
                <p className="mt-4 text-sm text-[#6B7280]">Escribe para buscar noticias, formaciones y eventos</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
