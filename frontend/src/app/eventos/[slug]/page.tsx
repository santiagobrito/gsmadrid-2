import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return createMetadata({
    title: `${title} | Eventos`,
    description: `Informacion sobre el evento ${title} del Colegio Oficial de Graduados Sociales de Madrid.`,
    path: `/eventos/${slug}`,
  });
}

export const revalidate = 60;

export default async function EventoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Placeholder — will come from GraphQL
  const evento = {
    estado: 'Abierto',
    fechaInicio: '2026-04-15',
    horario: '18:00 - 20:00',
    lugar: 'Salon de Actos, C/ Jose Abascal 44, Madrid',
    tipo: 'Institucional',
    plazas: 200,
    soloColegiados: false,
    requiereInscripcion: true,
    organizador: 'Colegio Oficial de Graduados Sociales de Madrid',
  };

  const isPast = new Date(evento.fechaInicio) < new Date();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Eventos', href: '/eventos' },
          { label: title, href: `/eventos/${slug}` },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge color="colegio">{evento.tipo}</Badge>
                <Badge color={isPast ? 'institutional' : 'activo'}>
                  {isPast ? 'Finalizado' : evento.estado}
                </Badge>
                {evento.soloColegiados && (
                  <Badge color="colegio">
                    <Users size={10} className="mr-1" /> Solo colegiados
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
                {title}
              </h1>

              {/* Info grid */}
              <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-bg-alt p-6 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Fecha</p>
                    <p className="text-sm font-medium text-text">{evento.fechaInicio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Horario</p>
                    <p className="text-sm font-medium text-text">{evento.horario}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Lugar</p>
                    <p className="text-sm font-medium text-text">{evento.lugar}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={20} strokeWidth={1.5} className="text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">Aforo</p>
                    <p className="text-sm font-medium text-text">{evento.plazas} personas</p>
                  </div>
                </div>
              </div>

              {/* Image placeholder */}
              <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl border border-border bg-bg-alt">
                <p className="text-sm text-text-tertiary">Imagen del evento</p>
              </div>

              {/* Content */}
              <div className="prose prose-slate mt-10 max-w-none">
                <h2>Sobre el evento</h2>
                <p className="font-light text-text-secondary">
                  Informacion del evento. Se cargara desde WordPress.
                </p>

                <h2>Programa</h2>
                <p className="font-light text-text-secondary">
                  El programa se cargara desde el campo ACF correspondiente.
                </p>
              </div>

              <div className="mt-10">
                <Button variant="outline" href="/eventos">
                  <ArrowLeft size={16} strokeWidth={1.5} className="mr-1" />
                  Volver a eventos
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[102px] space-y-6">
                {/* Registration / Status */}
                <Card hover={false} className={isPast ? 'border-border bg-bg-alt' : 'border-primary/20 bg-primary/[0.02]'}>
                  {isPast ? (
                    <>
                      <div className="mb-3 flex items-center gap-2">
                        <Badge color="institutional">Evento finalizado</Badge>
                      </div>
                      <p className="text-sm font-light text-text-tertiary">
                        Este evento ya ha tenido lugar.
                      </p>
                    </>
                  ) : evento.requiereInscripcion ? (
                    <>
                      <h3 className="mb-3 text-lg font-bold text-text">Inscripcion</h3>
                      <p className="mb-4 text-sm font-light text-text-secondary">
                        {evento.soloColegiados
                          ? 'Evento exclusivo para colegiados del CGSM.'
                          : 'Abierto a colegiados y publico general.'}
                      </p>
                      <Button variant="gradient" className="w-full">
                        Inscribirse al evento
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="mb-3 text-lg font-bold text-text">Evento abierto</h3>
                      <p className="text-sm font-light text-text-secondary">
                        No requiere inscripcion previa. Acceso libre hasta completar aforo.
                      </p>
                    </>
                  )}
                </Card>

                {/* Organizer */}
                <Card hover={false}>
                  <h4 className="mb-2 text-sm font-semibold text-text">Organizador</h4>
                  <p className="text-sm text-text-secondary">{evento.organizador}</p>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
