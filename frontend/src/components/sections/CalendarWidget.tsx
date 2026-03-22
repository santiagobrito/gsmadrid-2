'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface CalendarEvent {
  date: string;
  title: string;
  time: string;
  location: string;
  href: string;
  type?: 'formacion' | 'evento';
}

// Placeholder events — used as fallback if no data from GraphQL
const fallbackEvents: CalendarEvent[] = [
  {
    date: '2026-03-28',
    title: 'Jornada de Actualizacion Laboral',
    time: '10:00-14:00',
    location: 'Sede del Colegio',
    href: '/formacion-eventos/jornada-actualizacion-laboral-2026',
  },
  {
    date: '2026-04-02',
    title: 'Webinar: Seguridad Social',
    time: '17:00-19:00',
    location: 'Online',
    href: '/formacion-eventos/webinar-seguridad-social',
  },
  {
    date: '2026-04-07',
    title: 'Curso Mediacion y Arbitraje',
    time: '09:00-14:00',
    location: 'Sede del Colegio',
    href: '/formacion-eventos/curso-mediacion-arbitraje',
  },
  {
    date: '2026-04-15',
    title: 'Taller IA Laboral',
    time: '16:00-20:00',
    location: 'Online',
    href: '/formacion-eventos/taller-inteligencia-artificial-laboral',
  },
];

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

interface CalendarWidgetProps {
  events?: CalendarEvent[];
}

export function CalendarWidget({ events: eventsProp }: CalendarWidgetProps) {
  const events = eventsProp && eventsProp.length > 0 ? eventsProp : fallbackEvents;
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const eventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.filter((e) => e.date === dateStr);
  };

  const hasEvents = (date: Date): boolean => eventsForDate(date).length > 0;

  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Calendar grid */}
      <div className="lg:col-span-3">
        <Card hover={false}>
          {/* Month header */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-text-secondary transition-all hover:border-primary hover:text-primary"
              aria-label="Mes anterior"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <h3 className="text-lg font-bold capitalize text-text">
              {format(currentMonth, 'MMMM yyyy', { locale: es })}
            </h3>
            <button
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-text-secondary transition-all hover:border-primary hover:text-primary"
              aria-label="Mes siguiente"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="mb-2 grid grid-cols-7 text-center">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-2 text-xs font-semibold text-text-tertiary">
                {day}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day) => {
              const inMonth = isSameMonth(day, currentMonth);
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
              const dayHasEvents = hasEvents(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`relative flex h-11 flex-col items-center justify-center rounded-xl text-sm transition-all ${
                    !inMonth
                      ? 'text-text-tertiary/40'
                      : isSelected
                        ? 'bg-primary font-semibold text-white'
                        : dayHasEvents
                          ? 'font-medium text-text hover:bg-bg-alt'
                          : 'text-text-secondary hover:bg-bg-alt'
                  }`}
                >
                  {format(day, 'd')}
                  {dayHasEvents && !isSelected && (
                    <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-teal" />
                  )}
                  {dayHasEvents && isSelected && (
                    <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Selected day info */}
      <div className="lg:col-span-2">
        <Card hover={false} className="h-full">
          {selectedDate && selectedEvents.length > 0 ? (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
              </p>
              <div className="mt-4 space-y-5">
                {selectedEvents.map((event) => (
                  <div key={event.href} className="space-y-3">
                    {event.type && (
                      <Badge color={event.type === 'formacion' ? 'formacion' : 'colegio'}>
                        {event.type === 'formacion' ? 'Formacion' : 'Evento'}
                      </Badge>
                    )}
                    <h4 className="text-base font-bold text-text">{event.title}</h4>
                    <div className="space-y-1.5 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Clock size={14} strokeWidth={1.5} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} strokeWidth={1.5} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Link
                      href={event.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                    >
                      Ver detalle <ArrowRight size={14} strokeWidth={1.5} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedDate ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-text-tertiary">
                Sin eventos para el {format(selectedDate, "d 'de' MMMM", { locale: es })}
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-text-tertiary">
                Selecciona un dia para ver los eventos
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
