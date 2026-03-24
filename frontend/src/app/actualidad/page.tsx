import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';
import { fetchGraphQL } from '@/lib/graphql/client';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Actualidad',
  description:
    'Noticias, publicaciones y novedades del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/actualidad',
});

const POSTS_QUERY = `{
  posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
    nodes { title slug date excerpt featuredImage { node { sourceUrl } } categories { nodes { name slug } } }
  }
}`;

const badgeColorMap: Record<string, 'colegio' | 'formacion' | 'institutional' | 'eventos'> = {
  Normativa: 'institutional',
  Colegio: 'colegio',
  Formacion: 'formacion',
  Eventos: 'eventos',
};

interface DisplayPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
}

interface WpPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  categories: { nodes: { name: string; slug: string }[] };
}

interface PostsResponse {
  posts: { nodes: WpPost[] };
}

export default async function ActualidadPage() {
  let posts: DisplayPost[] = [];
  try {
    const data = await fetchGraphQL<PostsResponse>(POSTS_QUERY);
    if (data.posts?.nodes?.length > 0) {
      posts = data.posts.nodes.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt?.replace(/<[^>]*>/g, '').trim() || '',
        date: new Date(p.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        category: p.categories?.nodes?.[0]?.name || 'Noticia',
        imageUrl: p.featuredImage?.node?.sourceUrl || undefined,
      }));
    }
  } catch {
    // GraphQL unavailable — posts remains empty
  }

  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Actualidad', href: '/actualidad' }]}
      />
      <section className="py-16">
        <Container>
          <SectionHeading
          badge="Blog"
          title="Actualidad"
          subtitle="Noticias, publicaciones y novedades del Colegio"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/actualidad/${post.slug}`} className="group">
              <Card className="flex h-full flex-col">
                {/* Image */}
                <div className="-mx-7 -mt-7 mb-5 overflow-hidden rounded-t-2xl">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="aspect-[16/9] w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#2563EB]/10">
                      <div className="text-center">
                        <FileText size={32} strokeWidth={1} className="mx-auto text-primary/40" />
                        <p className="mt-2 text-xs text-text-tertiary">Noticia</p>
                      </div>
                    </div>
                  )}
                </div>

                <div><Badge color={badgeColorMap[post.category] || 'institutional'}>{post.category}</Badge></div>
                <h3 className="mt-4 text-lg font-bold text-[#0F172A] transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">{post.excerpt}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors group-hover:text-[#1565C0]">
                    Leer <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        </Container>
      </section>
    </>
  );
}
