import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

// TODO: Replace with GraphQL query GET_POST_BY_SLUG
// TODO: Implement generateStaticParams with GET_POST_SLUGS

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} | Actualidad`,
    description: `Lee la noticia: ${title}. Colegio Oficial de Graduados Sociales de Madrid.`,
  };
}

const tocItems = [
  { id: 'introduccion', label: 'Introduccion' },
  { id: 'contexto', label: 'Contexto' },
  { id: 'analisis', label: 'Analisis' },
  { id: 'conclusion', label: 'Conclusion' },
];

const relatedPosts = [
  {
    slug: 'convenio-ucm',
    title: 'Convenio con la Universidad Complutense',
    date: '15 Mar 2026',
  },
  {
    slug: 'nueva-sede-colegio',
    title: 'Nueva sede del Colegio en C/ Flora 1',
    date: '20 Mar 2026',
  },
  {
    slug: 'reforma-laboral-2026',
    title: 'Claves de la reforma laboral 2026',
    date: '10 Mar 2026',
  },
];

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Actualidad', href: '/actualidad' },
          { label: title, href: `/actualidad/${slug}` },
        ]}
      />
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Table of Contents sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card hover={false} className="p-5">
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Tabla de contenidos
                </h4>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </Card>
            </div>
          </aside>

          {/* Article content */}
          <article className="lg:col-span-3">
            <div className="mb-4">
              <Badge color="institutional">Noticia</Badge>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 text-sm text-text-tertiary">
              Publicado el 18 de marzo de 2026
            </p>

            {/* Content placeholder */}
            <div className="prose prose-slate mt-10 max-w-none">
              <h2 id="introduccion">Introduccion</h2>
              <p>
                Este es un contenido de ejemplo que se sustituira por el contenido
                real del articulo proveniente del backend de WordPress a traves de
                la API GraphQL.
              </p>

              <h2 id="contexto">Contexto</h2>
              <p>
                Los articulos incluiran texto enriquecido, imagenes, enlaces y
                documentos adjuntos cuando se complete la integracion con el CMS.
              </p>

              <h2 id="analisis">Analisis</h2>
              <p>
                El Colegio Oficial de Graduados Sociales de Madrid publica
                regularmente noticias sobre normativa laboral, eventos del sector
                y novedades institucionales relevantes para los colegiados y la
                ciudadania.
              </p>

              <h2 id="conclusion">Conclusion</h2>
              <p>
                Mantente al dia con las ultimas novedades del sector a traves
                de nuestro portal de actualidad.
              </p>
            </div>

            <div className="mt-12">
              <Button variant="outline" href="/actualidad">
                <ArrowLeft size={16} strokeWidth={1.5} />
                Volver a Actualidad
              </Button>
            </div>

            {/* Related posts */}
            <div className="mt-20">
              <h2 className="mb-8 text-2xl font-bold text-text">Noticias relacionadas</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/actualidad/${post.slug}`} className="group">
                    <Card className="flex h-full flex-col p-5">
                      {/* Image placeholder */}
                      <div className="-mx-5 -mt-5 mb-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-t-[16px] bg-bg-alt border border-border">
                        <span className="text-xs text-text-tertiary">Imagen</span>
                      </div>

                      <h3 className="mb-2 text-sm font-bold text-text transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>

                      <div className="mt-auto flex items-center gap-1.5 text-xs text-text-tertiary">
                        <Calendar size={12} strokeWidth={1.5} />
                        <span>{post.date}</span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
        </Container>
      </section>
    </>
  );
}
