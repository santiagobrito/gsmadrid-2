import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Actualidad',
  description:
    'Noticias, publicaciones y novedades del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/actualidad',
});

// TODO: Replace with GraphQL query GET_POSTS
const placeholderPosts = [
  {
    slug: 'nueva-normativa-laboral-2026',
    category: 'Normativa',
    badge: 'institutional' as const,
    title: 'Principales novedades de la reforma laboral 2026',
    excerpt:
      'Analizamos los cambios mas significativos de la nueva normativa laboral que entra en vigor este trimestre.',
    date: '18 de marzo de 2026',
  },
  {
    slug: 'convenio-universidad-complutense',
    category: 'Colegio',
    badge: 'colegio' as const,
    title: 'Nuevo convenio con la Universidad Complutense',
    excerpt:
      'El Colegio firma un acuerdo de colaboracion con la UCM para practicas y formacion continua de los colegiados.',
    date: '12 de marzo de 2026',
  },
  {
    slug: 'guia-cotizacion-2026',
    category: 'Formacion',
    badge: 'formacion' as const,
    title: 'Guia practica de cotizacion a la Seguridad Social 2026',
    excerpt:
      'Descarga la guia actualizada con las bases y tipos de cotizacion vigentes para este ejercicio.',
    date: '5 de marzo de 2026',
  },
  {
    slug: 'jornada-mediacion-laboral',
    category: 'Eventos',
    badge: 'eventos' as const,
    title: 'Exito de la Jornada de Mediacion Laboral',
    excerpt:
      'Mas de 200 profesionales asistieron a la jornada sobre mediacion laboral celebrada en la sede del Colegio.',
    date: '28 de febrero de 2026',
  },
  {
    slug: 'modificacion-estatutos-colegiales',
    category: 'Colegio',
    badge: 'colegio' as const,
    title: 'Aprobada la modificacion de los Estatutos Colegiales',
    excerpt:
      'La Asamblea General aprueba por unanimidad la actualizacion de los estatutos del Colegio.',
    date: '20 de febrero de 2026',
  },
  {
    slug: 'becas-formacion-2026',
    category: 'Formacion',
    badge: 'formacion' as const,
    title: 'Convocatoria de becas de formacion 2026',
    excerpt:
      'Abierto el plazo de solicitud de becas para cursos de especializacion dirigidos a colegiados.',
    date: '15 de febrero de 2026',
  },
];

export default function ActualidadPage() {
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
          {placeholderPosts.map((post) => (
            <Card key={post.slug}>
              <Badge color={post.badge}>{post.category}</Badge>
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
