import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';
import { GET_POST_BY_SLUG, GET_POST_SLUGS, GET_POSTS } from '@/lib/graphql/queries/posts';
import type { Post } from '@/lib/types';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

interface PostBySlugResponse {
  post: Post | null;
}

interface PostSlugsResponse {
  posts: { nodes: { slug: string }[] };
}

interface PostsResponse {
  posts: { nodes: Post[] };
}

const badgeColorMap: Record<string, 'colegio' | 'formacion' | 'institutional' | 'eventos'> = {
  Normativa: 'institutional',
  Colegio: 'colegio',
  Formacion: 'formacion',
  Eventos: 'eventos',
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await fetchGraphQL<PostBySlugResponse>(GET_POST_BY_SLUG, { slug });
    return data.post;
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<Post[]> {
  try {
    const data = await fetchGraphQL<PostsResponse>(GET_POSTS, { first: 4 });
    return data.posts.nodes.filter((p) => p.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description = post?.excerpt?.replace(/<[^>]*>/g, '').trim() || `Lee la noticia: ${title}`;

  return createMetadata({
    title: `${title} | Actualidad`,
    description: `${description} — Colegio Oficial de Graduados Sociales de Madrid.`,
    path: `/actualidad/${slug}`,
  });
}

export async function generateStaticParams() {
  try {
    const data = await fetchGraphQL<PostSlugsResponse>(GET_POST_SLUGS);
    return data.posts.nodes.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPost(slug),
    getRelatedPosts(slug),
  ]);

  if (!post) notFound();

  const category = post.categories?.nodes?.[0]?.name || 'Noticia';
  const dateFormatted = new Date(post.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const authorName = post.author?.node?.name;
  const extra = post.postExtraFields;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Actualidad', href: '/actualidad' },
          { label: post.title, href: `/actualidad/${slug}` },
        ]}
      />
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Meta info */}
                <Card hover={false} className="p-5">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                    Informacion
                  </h4>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={1.5} className="text-text-tertiary" />
                      <span>{dateFormatted}</span>
                    </div>
                    {authorName && (
                      <div>
                        <span className="text-text-tertiary">Por </span>
                        <span className="font-medium text-text">{authorName}</span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Attached document */}
                {extra?.documentoAdjunto && (
                  <Card hover={false} className="p-5">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                      Documento adjunto
                    </h4>
                    <a
                      href={extra.documentoAdjunto.mediaItemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Download size={14} strokeWidth={1.5} />
                      {extra.documentoAdjunto.title || 'Descargar documento'}
                    </a>
                  </Card>
                )}

                {/* External source */}
                {extra?.fuenteExterna && (
                  <Card hover={false} className="p-5">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                      Fuente
                    </h4>
                    <a
                      href={extra.fuenteExterna}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink size={14} strokeWidth={1.5} />
                      Ver fuente original
                    </a>
                  </Card>
                )}
              </div>
            </aside>

            {/* Article content */}
            <article className="lg:col-span-3">
              <div className="mb-4">
                <Badge color={badgeColorMap[category] || 'institutional'}>{category}</Badge>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {post.title}
              </h1>

              {extra?.subtitulo && (
                <p className="mt-3 text-lg font-light text-text-secondary">
                  {extra.subtitulo}
                </p>
              )}

              <p className="mt-3 text-sm text-text-tertiary">
                Publicado el {dateFormatted}
                {authorName && ` por ${authorName}`}
              </p>

              {/* Featured image */}
              {post.featuredImage && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={post.featuredImage.node.mediaDetails?.width || 800}
                    height={post.featuredImage.node.mediaDetails?.height || 450}
                    className="w-full object-cover"
                  />
                </div>
              )}

              {/* Content from WordPress */}
              {post.content && (
                <div
                  className="prose prose-slate mt-10 max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}

              <div className="mt-12">
                <Button variant="outline" href="/actualidad">
                  <ArrowLeft size={16} strokeWidth={1.5} />
                  Volver a Actualidad
                </Button>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-20">
                  <h2 className="mb-8 text-2xl font-bold text-text">Noticias relacionadas</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/actualidad/${rp.slug}`} className="group">
                        <Card className="flex h-full flex-col p-5">
                          {rp.featuredImage ? (
                            <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-[16px]">
                              <Image
                                src={rp.featuredImage.node.sourceUrl}
                                alt={rp.featuredImage.node.altText || rp.title}
                                width={400}
                                height={225}
                                className="aspect-[16/9] w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="-mx-5 -mt-5 mb-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-t-[16px] bg-bg-alt border border-border">
                              <span className="text-xs text-text-tertiary">Imagen</span>
                            </div>
                          )}

                          <h3 className="mb-2 text-sm font-bold text-text transition-colors group-hover:text-primary">
                            {rp.title}
                          </h3>

                          <div className="mt-auto flex items-center gap-1.5 text-xs text-text-tertiary">
                            <Calendar size={12} strokeWidth={1.5} />
                            <span>
                              {new Date(rp.date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
