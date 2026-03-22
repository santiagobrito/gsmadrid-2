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

// Fallback posts in case GraphQL is unavailable
const fallbackPosts: DisplayPost[] = [
  {
    slug: 'nueva-normativa-laboral-2026',
    category: 'Normativa',
    title: 'Principales novedades de la reforma laboral 2026',
    excerpt:
      'Analizamos los cambios mas significativos de la nueva normativa laboral que entra en vigor este trimestre.',
    date: '18 de marzo de 2026',
  },
  {
    slug: 'convenio-universidad-complutense',
    category: 'Colegio',
    title: 'Nuevo convenio con la Universidad Complutense',
    excerpt:
      'El Colegio firma un acuerdo de colaboracion con la UCM para practicas y formacion continua de los colegiados.',
    date: '12 de marzo de 2026',
  },
  {
    slug: 'guia-cotizacion-2026',
    category: 'Formacion',
    title: 'Guia practica de cotizacion a la Seguridad Social 2026',
    excerpt:
      'Descarga la guia actualizada con las bases y tipos de cotizacion vigentes para este ejercicio.',
    date: '5 de marzo de 2026',
  },
];

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
  let posts: DisplayPost[] = fallbackPosts;
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
    // Use fallback posts
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
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
