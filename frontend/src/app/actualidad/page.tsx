import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
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
    nodes { title slug date excerpt categories { nodes { name slug } } }
  }
}`;

const badgeColorMap: Record<string, 'colegio' | 'formacion' | 'institutional' | 'eventos'> = {
  Normativa: 'institutional',
  Colegio: 'colegio',
  Formacion: 'formacion',
  Eventos: 'eventos',
};

// Fallback posts in case GraphQL is unavailable
const fallbackPosts = [
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
  categories: { nodes: { name: string; slug: string }[] };
}

interface PostsResponse {
  posts: { nodes: WpPost[] };
}

export default async function ActualidadPage() {
  let posts = fallbackPosts;
  try {
    const data = await fetchGraphQL<PostsResponse>(POSTS_QUERY);
    if (data.posts?.nodes?.length > 0) {
      posts = data.posts.nodes.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt?.replace(/<[^>]*>/g, '').trim() || '',
        date: new Date(p.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        category: p.categories?.nodes?.[0]?.name || 'Noticia',
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
            <Card key={post.slug}>
              <Badge color={badgeColorMap[post.category] || 'institutional'}>{post.category}</Badge>
              <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-[#475569]">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">{post.date}</span>
                <Link
                  href={`/actualidad/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1565C0]"
                >
                  Leer
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
        </Container>
      </section>
    </>
  );
}
