import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
}

const fallbackNews: NewsPost[] = [
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
      'El Colegio firma un acuerdo de colaboracion con la UCM para practicas y formacion continua.',
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

const badgeColorMap: Record<string, 'colegio' | 'formacion' | 'institutional'> = {
  Normativa: 'institutional',
  Colegio: 'colegio',
  Formacion: 'formacion',
};

interface NewsGridProps {
  posts?: NewsPost[];
}

export function NewsGrid({ posts }: NewsGridProps) {
  const news = posts && posts.length > 0 ? posts : fallbackNews;
  return (
    <section className="bg-[#F7F8FA] py-20">
      <Container>
        <SectionHeading
          badge="Actualidad"
          title="Noticias y Publicaciones"
          subtitle="Mantente al dia con la ultima informacion del sector"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((item) => (
            <Card key={item.slug}>
              <Badge color={badgeColorMap[item.category || ''] || 'institutional'}>
                {item.category || 'Noticia'}
              </Badge>
              <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#475569]">{item.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">{item.date}</span>
                <Link
                  href={`/actualidad/${item.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1565C0]"
                >
                  Leer
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" href="/actualidad">
            Ver todas las noticias
          </Button>
        </div>
      </Container>
    </section>
  );
}
