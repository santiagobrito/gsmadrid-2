import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
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

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section className="py-16">
      <Container narrow>
        <Breadcrumbs
          items={[
            { label: 'Actualidad', href: '/actualidad' },
            { label: title, href: `/actualidad/${slug}` },
          ]}
        />

        <div className="mb-4">
          <Badge color="institutional">Noticia</Badge>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm text-[#6B7280]">
          Publicado el 18 de marzo de 2026
        </p>

        {/* Content placeholder */}
        <div className="prose prose-slate mt-10 max-w-none">
          <p>
            Este es un contenido de ejemplo que se sustituira por el contenido
            real del articulo proveniente del backend de WordPress a traves de
            la API GraphQL.
          </p>
          <p>
            Los articulos incluiran texto enriquecido, imagenes, enlaces y
            documentos adjuntos cuando se complete la integracion con el CMS.
          </p>
          <h2>Subtitulo de ejemplo</h2>
          <p>
            El Colegio Oficial de Graduados Sociales de Madrid publica
            regularmente noticias sobre normativa laboral, eventos del sector
            y novedades institucionales relevantes para los colegiados y la
            ciudadania.
          </p>
        </div>

        <div className="mt-12">
          <Button variant="outline" href="/actualidad">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Volver a Actualidad
          </Button>
        </div>
      </Container>
    </section>
  );
}
