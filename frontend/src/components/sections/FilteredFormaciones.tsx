'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, MapPin, ArrowRight, Lock } from 'lucide-react';

export interface FormacionItem {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  modalidad: string;
  estado: 'Abierta' | 'Finalizada';
  plazas: number;
  esGratuito: boolean;
  imageUrl?: string;
}

type FilterType = 'todos' | 'presencial' | 'online' | 'gratuito';

const filterConfig: { key: FilterType; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'presencial', label: 'Presencial' },
  { key: 'online', label: 'Online' },
  { key: 'gratuito', label: 'Gratuito' },
];

interface FilteredFormacionesProps {
  formaciones: FormacionItem[];
}

export function FilteredFormaciones({ formaciones }: FilteredFormacionesProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  const abiertas = formaciones.filter((f) => f.estado !== 'Finalizada');
  const pasadas = formaciones.filter((f) => f.estado === 'Finalizada');

  const filteredAbiertas = abiertas.filter((f) => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'presencial') return f.modalidad === 'Presencial';
    if (activeFilter === 'online') return f.modalidad === 'Online';
    if (activeFilter === 'gratuito') return f.esGratuito === true;
    return true;
  });

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="Formacion"
          title="Formacion y Eventos"
          subtitle="Jornadas, seminarios, cursos y eventos organizados por el Colegio. Inscripcion abierta para colegiados y publico general."
        />

        {/* Filter badges */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filterConfig.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                activeFilter === filter.key
                  ? 'bg-primary text-white'
                  : 'border border-border bg-white text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Active formations */}
        {filteredAbiertas.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAbiertas.map((f) => (
              <Link key={f.slug} href={`/formacion-eventos/${f.slug}`} className="group">
                <Card className="flex h-full flex-col">
                  {/* Image */}
                  <div className="-mx-7 -mt-7 mb-5 overflow-hidden rounded-t-2xl">
                    {f.imageUrl ? (
                      <Image
                        src={f.imageUrl}
                        alt={f.title}
                        width={400}
                        height={267}
                        className="aspect-[3/2] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[3/2] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                        <div className="text-center">
                          <Calendar size={32} strokeWidth={1} className="mx-auto text-primary/40" />
                          <p className="mt-2 text-xs text-text-tertiary">Formacion</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge color={f.modalidad === 'Online' ? 'eventos' : 'formacion'}>
                      {f.modalidad}
                    </Badge>
                    {f.esGratuito && <Badge color="activo">Gratuito</Badge>}
                    {f.plazas > 0 && f.plazas <= 10 && (
                      <Badge color="pendiente">Ultimas plazas</Badge>
                    )}
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
                    {f.title}
                  </h3>

                  <div className="mt-auto space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span>{f.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} strokeWidth={1.5} />
                      <span>{f.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} strokeWidth={1.5} />
                      <span>{f.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    Ver detalle e inscripcion <ArrowRight size={14} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-text-tertiary">
              No hay formaciones que coincidan con el filtro seleccionado.
            </p>
          </div>
        )}

        {/* Past formations */}
        {pasadas.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-8 text-center text-2xl font-bold text-text">Formaciones anteriores</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pasadas.map((f) => (
                <Link key={f.slug} href={`/formacion-eventos/${f.slug}`} className="group">
                  <Card className="flex h-full flex-col opacity-70 transition-opacity hover:opacity-100">
                    <div className="mb-3 flex items-center gap-2">
                      <Lock size={14} className="text-text-tertiary" strokeWidth={1.5} />
                      <Badge color="institutional">Finalizada</Badge>
                      <Badge color={f.modalidad === 'Online' ? 'eventos' : 'formacion'}>
                        {f.modalidad}
                      </Badge>
                    </div>
                    <h3 className="mb-2 text-base font-bold text-text-secondary transition-colors group-hover:text-text">
                      {f.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 text-sm text-text-tertiary">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span>{f.date}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
