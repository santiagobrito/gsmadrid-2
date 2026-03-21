import { Mail, Phone, Globe, Linkedin, MapPin, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

// TODO: Replace with GraphQL query GET_PROFESIONAL_BY_SLUG
// TODO: Implement generateStaticParams with GET_PROFESIONAL_SLUGS

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const nombre = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${nombre} | Directorio`,
    description: `Perfil profesional de ${nombre}, Graduado Social colegiado en Madrid.`,
  };
}

export default async function ProfesionalDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const nombre = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const initials = nombre
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');

  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Directorio', href: '/directorio' },
            { label: nombre, href: `/directorio/${slug}` },
          ]}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar card */}
          <div className="lg:col-span-1">
            <Card hover={false} className="sticky top-[102px]">
              {/* Avatar */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#18B7B0] text-3xl font-bold text-white">
                {initials}
              </div>

              <div className="mt-4 text-center">
                <h1 className="text-xl font-bold text-[#0F172A]">{nombre}</h1>
                <p className="text-sm text-[#6B7280]">GS-1234</p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge color="activo">Ejerciente</Badge>
                <Badge color="formacion">Mediador</Badge>
              </div>

              {/* Contact info */}
              <div className="mt-6 space-y-3 border-t border-[#E2E8F0] pt-6">
                <div className="flex items-center gap-3 text-sm text-[#475569]">
                  <MapPin size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                  <span>C/ Ejemplo 10, 28001 Madrid</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#475569]">
                  <Phone size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                  <span>+34 91 123 45 67</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#475569]">
                  <Mail size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                  <span>contacto@ejemplo.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#475569]">
                  <Globe size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                  <span>www.ejemplo.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#475569]">
                  <Linkedin size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
                  <span>LinkedIn</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Sobre el profesional
            </h2>

            <div className="prose prose-slate mt-6 max-w-none">
              <p>
                Informacion profesional que se obtendra del backend de WordPress
                a traves de la API GraphQL. Incluira la biografia, areas de
                especializacion, experiencia y otros datos relevantes del
                colegiado.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#0F172A]">Despacho</h3>
              <p className="mt-2 text-sm text-[#475569]">
                Garcia & Asociados — Asesoria Laboral y de Seguridad Social
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#0F172A]">Idiomas</h3>
              <div className="mt-2 flex gap-2">
                <Badge color="eventos">Espanol</Badge>
                <Badge color="eventos">Ingles</Badge>
              </div>
            </div>

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
  );
}
