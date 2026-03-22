'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, ArrowRight, Pin, Users, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface UpcomingItem {
  slug: string;
  title: string;
  date: string;
  dateDisplay: string;
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

function EventCard({ item }: { item: UpcomingItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <Link href={item.href} className="group block">
      <Card className="relative flex h-full flex-col">
        {item.sticky && (
          <div className="absolute right-4 top-4 z-10">
            <Pin size={14} className="text-primary" fill="currentColor" />
          </div>
        )}

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

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge color={config.badge}>{config.label}</Badge>
          {item.tipoEvento && <Badge color="institutional">{item.tipoEvento}</Badge>}
          {item.soloColegiados && (
            <Badge color="colegio"><Users size={10} className="mr-1" /> Colegiados</Badge>
          )}
        </div>

        <h3 className="mb-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
          {item.title}
        </h3>

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
}

export function UpcomingEvents({ items }: UpcomingEventsProps) {
  const now = new Date();
  const upcoming = items
    .filter((item) => new Date(item.date) >= now)
    .sort((a, b) => {
      if (a.sticky && !b.sticky) return -1;
      if (!a.sticky && b.sticky) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .slice(0, 9);

  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(upcoming.length / perPage);
  const visible = upcoming.slice(page * perPage, page * perPage + perPage);

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  if (upcoming.length === 0) return null;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="Proximos"
          title="Proximas actividades"
          subtitle="Formaciones, eventos y actividades del Colegio. No te pierdas ninguna."
        />

        {/* Cards row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <EventCard key={item.href} item={item} />
          ))}
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#6B7280] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
              aria-label="Anteriores"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page ? 'w-6 bg-primary' : 'w-2 bg-[#E2E8F0] hover:bg-[#6B7280]'
                  }`}
                  aria-label={`Pagina ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#6B7280] transition-all hover:border-[#2563EB] hover:text-[#2563EB]"
              aria-label="Siguientes"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
