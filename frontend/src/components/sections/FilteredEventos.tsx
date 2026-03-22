'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin, ArrowRight, Lock, Users, Megaphone } from 'lucide-react';

export interface EventoItem {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  tipo: string;
  estado: 'Abierto' | 'Finalizado';
  soloColegiados: boolean;
  imageUrl?: string;
}

type FilterType = 'todos' | 'institucional' | 'networking' | 'asamblea';

const filterConfig: { key: FilterType; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'institucional', label: 'Institucional' },
  { key: 'networking', label: 'Networking' },
  { key: 'asamblea', label: 'Asamblea' },
];

const tipoBadge: Record<string, { color: 'institutional' | 'formacion' | 'eventos' | 'colegio'; label: string }> = {
  institucional: { color: 'colegio', label: 'Institucional' },
  asamblea: { color: 'institutional', label: 'Asamblea' },
  networking: { color: 'formacion', label: 'Networking' },
  conferencia: { color: 'eventos', label: 'Conferencia' },
  acto_social: { color: 'colegio', label: 'Acto Social' },
};

interface FilteredEventosProps {
  eventos: EventoItem[];
}

export function FilteredEventos({ eventos }: FilteredEventosProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  const activos = eventos.filter((e) => e.estado !== 'Finalizado');
  const pasados = eventos.filter((e) => e.estado === 'Finalizado');

  const filteredActivos = activos.filter((e) => {
    if (activeFilter === 'todos') return true;
    return e.tipo === activeFilter;
  });

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="Eventos"
          title="Eventos del Colegio"
          subtitle="Actos institucionales, asambleas, networking y actividades sociales."
        />

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filterConfig.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                activeFilter === f.key
                  ? 'bg-primary text-white'
                  : 'border border-border bg-white text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Active events */}
        {filteredActivos.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredActivos.map((e) => {
              const badge = tipoBadge[e.tipo] || tipoBadge.institucional;
              return (
                <Link key={e.slug} href={`/eventos/${e.slug}`} className="group">
                  <Card className="flex h-full flex-col">
                    <div className="-mx-7 -mt-7 mb-5 overflow-hidden rounded-t-2xl">
                      {e.imageUrl ? (
                        <Image
                          src={e.imageUrl}
                          alt={e.title}
                          width={400}
                          height={267}
                          className="aspect-[3/2] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[3/2] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                          <div className="text-center">
                            <Megaphone size={32} strokeWidth={1} className="mx-auto text-primary/40" />
                            <p className="mt-2 text-xs text-text-tertiary">Evento</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge color={badge.color}>{badge.label}</Badge>
                      {e.soloColegiados && (
                        <Badge color="colegio">
                          <Users size={10} className="mr-1" /> Solo colegiados
                        </Badge>
                      )}
                    </div>

                    <h3 className="mb-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
                      {e.title}
                    </h3>

                    <div className="mt-auto space-y-2 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} strokeWidth={1.5} />
                        <span>{e.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} strokeWidth={1.5} />
                        <span>{e.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} strokeWidth={1.5} />
                        <span>{e.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                      Ver detalle <ArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-text-tertiary">No hay eventos para este filtro.</p>
          </div>
        )}

        {/* Past events */}
        {pasados.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-center text-2xl font-bold text-text">Eventos anteriores</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pasados.map((e) => {
                const badge = tipoBadge[e.tipo] || tipoBadge.institucional;
                return (
                  <Link key={e.slug} href={`/eventos/${e.slug}`} className="group">
                    <Card className="flex h-full flex-col opacity-70 transition-opacity hover:opacity-100">
                      <div className="mb-3 flex items-center gap-2">
                        <Lock size={14} className="text-text-tertiary" strokeWidth={1.5} />
                        <Badge color="institutional">Finalizado</Badge>
                        <Badge color={badge.color}>{badge.label}</Badge>
                      </div>
                      <h3 className="mb-2 text-base font-bold text-text-secondary transition-colors group-hover:text-text">
                        {e.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-2 text-sm text-text-tertiary">
                        <Calendar size={14} strokeWidth={1.5} />
                        <span>{e.date}</span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
