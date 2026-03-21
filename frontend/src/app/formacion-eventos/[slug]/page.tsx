import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

// TODO: Replace with GraphQL query GET_FORMACION_BY_SLUG
// TODO: Implement generateStaticParams with GET_FORMACION_SLUGS

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Fetch actual formacion data
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} | Formacion`,
    description: `Informacion sobre ${title} del Colegio Oficial de Graduados Sociales de Madrid.`,
  };
}

export default async function FormacionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // TODO: Replace with actual GraphQL fetch
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Formacion y Eventos', href: '/formacion-eventos' },
            { label: title, href: `/formacion-eventos/${slug}` },
          ]}
        />

        <div className="mb-6">
          <Badge color="formacion">Formacion</Badge>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
          {title}
        </h1>

        {/* Info grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 rounded-[16px] border border-[#E2E8F0] bg-[#F7F8FA] p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} strokeWidth={1.5} className="text-[#2563EB]" />
            <div>
              <p className="text-xs font-semibold uppercase text-[#6B7280]">Fecha</p>
              <p className="text-sm font-medium text-[#0F172A]">28 de marzo de 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} strokeWidth={1.5} className="text-[#2563EB]" />
            <div>
              <p className="text-xs font-semibold uppercase text-[#6B7280]">Horario</p>
              <p className="text-sm font-medium text-[#0F172A]">10:00 - 14:00</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={20} strokeWidth={1.5} className="text-[#2563EB]" />
            <div>
              <p className="text-xs font-semibold uppercase text-[#6B7280]">Lugar</p>
              <p className="text-sm font-medium text-[#0F172A]">Sede del Colegio, Madrid</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users size={20} strokeWidth={1.5} className="text-[#2563EB]" />
            <div>
              <p className="text-xs font-semibold uppercase text-[#6B7280]">Plazas</p>
              <p className="text-sm font-medium text-[#0F172A]">50 disponibles</p>
            </div>
          </div>
        </div>

        {/* Content placeholder */}
        <div className="prose prose-slate mt-12 max-w-3xl">
          <p>
            Contenido del evento formativo. Esta seccion se rellenara
            automaticamente con los datos del backend de WordPress cuando se
            complete la integracion con GraphQL.
          </p>
          <p>
            Aqui se mostrara la descripcion completa, el programa, los
            ponentes y toda la informacion relevante sobre esta actividad
            formativa.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button variant="gradient" href="#">
            Inscribirse
          </Button>
          <Button variant="outline" href="/formacion-eventos">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Volver a la agenda
          </Button>
        </div>
      </Container>
    </section>
  );
}
