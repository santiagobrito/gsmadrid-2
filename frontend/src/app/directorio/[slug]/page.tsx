import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Mail, Phone, Globe, Linkedin, MapPin, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_PROFESIONAL_BY_SLUG, GET_PROFESIONAL_SLUGS } from '@/lib/graphql/queries/profesional';
import type { Profesional } from '@/lib/types';
import type { Metadata } from 'next';

// ACF image fields may return different structures depending on WPGraphQL for ACF version
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAcfImageUrl(field: any): string | undefined {
  if (!field) return undefined;
  // Connection pattern: { node: { sourceUrl } }
  if (field?.node?.sourceUrl) return field.node.sourceUrl;
  // Direct MediaItem: { sourceUrl }
  if (field?.sourceUrl) return field.sourceUrl;
  // URL string
  if (typeof field === 'string' && field.startsWith('http')) return field;
  return undefined;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

interface ProfesionalBySlugResponse {
  profesional: Profesional | null;
}

interface ProfesionalSlugsResponse {
  profesionales: { nodes: { slug: string }[] };
}

async function getProfesional(slug: string): Promise<Profesional | null> {
  try {
    const data = await fetchGraphQL<ProfesionalBySlugResponse>(GET_PROFESIONAL_BY_SLUG, { slug });
    return data.profesional;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profesional = await getProfesional(slug);
  const nombre = profesional?.profesionalFields?.nombreCompleto ||
    profesional?.title ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return createMetadata({
    title: `${nombre} | Directorio`,
    description: `Perfil profesional de ${nombre}, Graduado Social colegiado en Madrid.`,
    path: `/directorio/${slug}`,
  });
}

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL<ProfesionalSlugsResponse>(GET_PROFESIONAL_SLUGS);
    return data.profesionales.nodes.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;
export const dynamicParams = true;

function stripHtmlToText(html: string): string {
  return html
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<blockquote[^>]*>[\s\S]*?<\/blockquote>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function ProfesionalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const profesional = await getProfesional(slug);

  if (!profesional) notFound();

  const p = profesional.profesionalFields;
  const nombre = p.nombreCompleto || profesional.title;
  const initials = nombre
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');

  const idiomas: string[] = Array.isArray(p.idiomas) ? p.idiomas : [];
  const especialidades = profesional.especialidades?.nodes || [];
  const localidadesTax = profesional.localidades?.nodes || [];
  const bioClean = p.bio ? stripHtmlToText(p.bio) : '';
  const fotoUrl = getAcfImageUrl(p.foto);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nombre,
    jobTitle: 'Graduado Social',
    memberOf: {
      '@type': 'Organization',
      name: 'Colegio Oficial de Graduados Sociales de Madrid',
      url: 'https://graduadosocialmadrid.org',
    },
    ...(p.despacho && { worksFor: { '@type': 'Organization', name: p.despacho } }),
    ...(p.direccion && { address: { '@type': 'PostalAddress', streetAddress: p.direccion, ...(p.codigoPostal && { postalCode: p.codigoPostal }), addressLocality: 'Madrid', addressCountry: 'ES' } }),
    ...(p.telefono && { telephone: p.telefono }),
    ...(p.email && { email: p.email }),
    ...(p.web && { url: p.web }),
    ...(p.linkedin && { sameAs: [p.linkedin] }),
    ...(fotoUrl && { image: fotoUrl }),
    ...(bioClean && { description: bioClean.slice(0, 300) }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Directorio', href: '/directorio' },
          { label: nombre, href: `/directorio/${slug}` },
        ]}
      />
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Sidebar card */}
            <div className="lg:col-span-1">
              <Card hover={false} className="sticky top-[102px]">
                {/* Avatar / Photo */}
                {fotoUrl ? (
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={fotoUrl}
                      alt={nombre}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#18B7B0] text-3xl font-bold text-white">
                    {initials}
                  </div>
                )}

                <div className="mt-4 text-center">
                  <h1 className="text-xl font-bold text-[#0F172A]">{nombre}</h1>
                  <p className="text-sm text-[#6B7280]">{p.numeroColegiado}</p>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {p.ejerciente && <Badge color="activo">Ejerciente</Badge>}
                  {p.mediadorRegistrado && <Badge color="formacion">Mediador</Badge>}
                  {p.aceptaTurnoOficio && <Badge color="eventos">Turno de Oficio</Badge>}
                </div>

                {/* Contact info */}
                <div className="mt-6 space-y-3 border-t border-[#E2E8F0] pt-6">
                  {p.direccion && (
                    <div className="flex items-center gap-3 text-sm text-[#475569]">
                      <MapPin size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                      <span>{p.direccion}{p.codigoPostal ? `, ${p.codigoPostal}` : ''}</span>
                    </div>
                  )}
                  {p.telefono && (
                    <div className="flex items-center gap-3 text-sm text-[#475569]">
                      <Phone size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                      <a href={`tel:${p.telefono}`} className="hover:text-primary">{p.telefono}</a>
                    </div>
                  )}
                  {p.email && (
                    <div className="flex items-center gap-3 text-sm text-[#475569]">
                      <Mail size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                      <a href={`mailto:${p.email}`} className="hover:text-primary">{p.email}</a>
                    </div>
                  )}
                  {p.web && (
                    <div className="flex items-center gap-3 text-sm text-[#475569]">
                      <Globe size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                      <a href={p.web} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {p.web.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {p.linkedin && (
                    <div className="flex items-center gap-3 text-sm text-[#475569]">
                      <Linkedin size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                      <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-2">
              {bioClean && (
                <>
                  <h2 className="text-2xl font-bold text-[#0F172A]">Sobre el profesional</h2>
                  <div className="mt-6 text-[#475569] leading-relaxed whitespace-pre-line">
                    {bioClean}
                  </div>
                </>
              )}

              {p.despacho && (
                <div className={p.bio ? 'mt-10' : ''}>
                  <h3 className="text-lg font-bold text-[#0F172A]">Despacho</h3>
                  <p className="mt-2 text-sm text-[#475569]">{p.despacho}</p>
                </div>
              )}

              {especialidades.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-[#0F172A]">Especialidades</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {especialidades.map((e) => (
                      <Badge key={e.slug} color="activo">{e.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {localidadesTax.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-[#0F172A]">Localidades</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {localidadesTax.map((l) => (
                      <Badge key={l.slug} color="institutional">{l.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {idiomas.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-[#0F172A]">Idiomas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {idiomas.map((idioma) => (
                      <Badge key={idioma} color="eventos">{idioma}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12">
                <Button variant="outline" href="/directorio">
                  <ArrowLeft size={16} strokeWidth={1.5} />
                  Volver al Directorio
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
