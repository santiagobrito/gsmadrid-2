import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
  imageUrl?: string;
}

const badgeColorMap: Record<string, 'colegio' | 'formacion' | 'institutional'> = {
  Normativa: 'institutional',
  Colegio: 'colegio',
  Formacion: 'formacion',
};

interface NewsGridProps {
  posts?: NewsPost[];
}

export function NewsGrid({ posts }: NewsGridProps) {
  const news = posts || [];
  return (
    <section className="bg-[#F7F8FA] py-20">
      <Container>
        <SectionHeading
          badge="Actualidad"
          title="Noticias y Publicaciones"
          subtitle="Mantente al dia con la ultima informacion del sector"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {news.map((item) => (
            <Link key={item.slug} href={`/actualidad/${item.slug}`} className="group">
              <Card className="flex h-full flex-col">
                {/* Image */}
                <div className="-mx-7 -mt-7 mb-5 overflow-hidden rounded-t-2xl">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={225}
                      className="aspect-[16/9] w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                      <div className="text-center">
                        <FileText size={28} strokeWidth={1} className="mx-auto text-primary/40" />
                        <p className="mt-1 text-xs text-text-tertiary">Noticia</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Badge color={badgeColorMap[item.category || ''] || 'institutional'}>
                    {item.category || 'Noticia'}
                  </Badge>
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0F172A] transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">{item.excerpt}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">{item.date}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors group-hover:text-[#1565C0]">
                    Leer <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </Card>
            </Link>
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
