import { Calendar, Clock, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const events = [
  {
    title: 'Jornada de Actualizacion Laboral 2026',
    date: '28 de marzo de 2026',
    time: '10:00 - 14:00',
    location: 'Sede del Colegio, Madrid',
    type: 'Formacion' as const,
  },
  {
    title: 'Taller Practico: Nominas y Seguros Sociales',
    date: '5 de abril de 2026',
    time: '16:00 - 20:00',
    location: 'Online (Zoom)',
    type: 'Eventos' as const,
  },
  {
    title: 'Asamblea General Ordinaria',
    date: '15 de abril de 2026',
    time: '18:00 - 20:00',
    location: 'Salon de Actos, C/ Flora 1',
    type: 'Colegio' as const,
  },
];

const badgeColorMap = {
  Formacion: 'formacion' as const,
  Eventos: 'eventos' as const,
  Colegio: 'colegio' as const,
};

export function CalendarPreview() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          badge="Agenda"
          title="Proximos Eventos"
          subtitle="Formacion, jornadas y actividades del Colegio"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {events.map((event) => (
            <Card key={event.title}>
              <Badge color={badgeColorMap[event.type]}>{event.type}</Badge>
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
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" href="/formacion-eventos">
            Ver toda la agenda
          </Button>
        </div>
      </Container>
    </section>
  );
}
