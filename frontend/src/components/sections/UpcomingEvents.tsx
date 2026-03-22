'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, ArrowRight, Pin, Users, Megaphone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface UpcomingItem {
  slug: string;
  title: string;
  date: string;        // raw ISO date for sorting
  dateDisplay: string;  // formatted display date
  time: string;
  location: string;
  type: 'formacion' | 'evento';
  href: string;
  sticky?: boolean;
  imageUrl?: string;
  soloColegiados?: boolean;
  tipoEvento?: string;
}

interface UpcomingEventsProps {
  items: UpcomingItem[];
}

const typeConfig = {
  formacion: { badge: 'formacion' as const, label: 'Formacion', icon: Calendar },
  evento: { badge: 'colegio' as const, label: 'Evento', icon: Megaphone },
};

export function UpcomingEvents({ items }: UpcomingEventsProps) {
  // Filter out past items and sort: sticky first, then by date ASC
  const now = new Date();
  const upcoming = items
    .filter((item) => new Date(item.date) >= now)
    .sort((a, b) => {
      if (a.sticky && !b.sticky) return -1;
      if (!a.sticky && b.sticky) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .slice(0, 6);

  if (upcoming.length === 0) return null;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="Proximos"
          title="Proximas actividades"
          subtitle="Formaciones, eventos y actividades del Colegio. No te pierdas ninguna."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;

            return (
              <Link key={item.href} href={item.href} className="group">
                <Card className="relative flex h-full flex-col">
                  {/* Sticky pin */}
                  {item.sticky && (
                    <div className="absolute right-4 top-4 z-10">
                      <Pin size={14} className="text-primary" fill="currentColor" />
                    </div>
                  )}

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
                          <Icon size={32} strokeWidth={1} className="mx-auto text-primary/40" />
                          <p className="mt-2 text-xs text-text-tertiary">{config.label}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge color={config.badge}>{config.label}</Badge>
                    {item.tipoEvento && (
                      <Badge color="institutional">{item.tipoEvento}</Badge>
                    )}
                    {item.soloColegiados && (
                      <Badge color="colegio">
                        <Users size={10} className="mr-1" /> Colegiados
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* Meta */}
                  <div className="mt-auto space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span>{item.dateDisplay}</span>
                    </div>
                    {item.time && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} strokeWidth={1.5} />
                        <span>{item.time}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} strokeWidth={1.5} />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    Ver detalle <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
