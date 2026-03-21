import { Calendar, Clock, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const revalidate = 60;

export const metadata = createMetadata({
  title: 'Formacion y Eventos',
  description:
    'Calendario de formacion, cursos, jornadas y eventos del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/formacion-eventos',
});

// TODO: Replace with GraphQL query GET_FORMACIONES
const placeholderEvents = [
  {
    slug: 'jornada-actualizacion-laboral-2026',
    title: 'Jornada de Actualizacion Laboral 2026',
    date: '28 de marzo de 2026',
    time: '10:00 - 14:00',
    location: 'Sede del Colegio, Madrid',
    type: 'Jornada',
    badge: 'formacion' as const,
  },
  {
    slug: 'taller-nominas-seguros-sociales',
    title: 'Taller Practico: Nominas y Seguros Sociales',
    date: '5 de abril de 2026',
    time: '16:00 - 20:00',
    location: 'Online (Zoom)',
    type: 'Taller',
    badge: 'eventos' as const,
  },
  {
    slug: 'curso-legislacion-laboral',
    title: 'Curso de Legislacion Laboral Actualizada',
    date: '12 de abril de 2026',
    time: '09:00 - 18:00',
    location: 'Sede del Colegio, Madrid',
    type: 'Curso',
    badge: 'formacion' as const,
  },
  {
    slug: 'seminario-prevencion-riesgos',
    title: 'Seminario de Prevencion de Riesgos Laborales',
    date: '20 de abril de 2026',
    time: '10:00 - 14:00',
    location: 'Online (Teams)',
    type: 'Seminario',
    badge: 'formacion' as const,
  },
  {
    slug: 'mesa-redonda-reforma-pensiones',
    title: 'Mesa Redonda: Reforma del Sistema de Pensiones',
    date: '28 de abril de 2026',
    time: '18:00 - 20:00',
    location: 'Salon de Actos, C/ Flora 1',
    type: 'Evento',
    badge: 'eventos' as const,
  },
  {
    slug: 'taller-mediacion-laboral',
    title: 'Taller de Mediacion Laboral',
    date: '5 de mayo de 2026',
    time: '16:00 - 20:00',
    location: 'Sede del Colegio, Madrid',
    type: 'Taller',
    badge: 'formacion' as const,
  },
];

const filterTypes = ['Todos', 'Jornada', 'Taller', 'Curso', 'Seminario', 'Evento'];

export default function FormacionEventosPage() {
  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[{ label: 'Formacion y Eventos', href: '/formacion-eventos' }]}
        />

        <SectionHeading
          badge="Agenda"
          title="Formacion y Eventos"
          subtitle="Cursos, jornadas, talleres y actividades del Colegio"
        />

        {/* Filter badges */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filterTypes.map((type) => (
            <Badge
              key={type}
              color={type === 'Todos' ? 'institutional' : 'formacion'}
              className="cursor-pointer"
            >
              {type}
            </Badge>
          ))}
        </div>

        {/* TODO: Integrate with GraphQL — replace placeholder data */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderEvents.map((event) => (
            <a
              key={event.slug}
              href={`/formacion-eventos/${event.slug}`}
              className="block"
            >
              <Card className="h-full">
                <Badge color={event.badge}>{event.type}</Badge>
                <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
                  {event.title}
                </h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#475569]">
                    <Calendar size={16} strokeWidth={1.5} className="text-[#6B7280]" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#475569]">
                    <Clock size={16} strokeWidth={1.5} className="text-[#6B7280]" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#475569]">
                    <MapPin size={16} strokeWidth={1.5} className="text-[#6B7280]" />
                    {event.location}
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
