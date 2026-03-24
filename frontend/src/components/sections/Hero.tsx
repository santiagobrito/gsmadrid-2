'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Megaphone, Pin } from 'lucide-react';

export interface HeroSlide {
  id: string;
  type: 'noticia' | 'evento' | 'destacado';
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  pinned?: boolean;
  image?: string;
}

// Placeholder slides — will be replaced with GraphQL data
const defaultSlides: HeroSlide[] = [
  {
    id: '1',
    type: 'destacado',
    title: 'Jornada de Actualizacion Laboral 2026',
    excerpt: 'Cambios clave en legislacion laboral y Seguridad Social para el ejercicio profesional.',
    href: '/formacion-eventos/jornada-actualizacion-laboral-2026',
    date: '28 Mar 2026',
    pinned: true,
    image: '/placeholder-news.svg',
  },
  {
    id: '2',
    type: 'noticia',
    title: 'Nueva sede del Colegio en C/ Flora 1',
    excerpt: 'El Colegio estrena nuevas instalaciones con sala de togas, biblioteca y espacios de coworking.',
    href: '/actualidad/nueva-sede-colegio',
    date: '20 Mar 2026',
    image: '/placeholder-news.svg',
  },
  {
    id: '3',
    type: 'evento',
    title: 'Webinar: Novedades en Seguridad Social',
    excerpt: 'Repaso completo a las ultimas reformas y su impacto en el ambito laboral.',
    href: '/formacion-eventos/webinar-seguridad-social',
    date: '2 Abr 2026',
    image: '/placeholder-news.svg',
  },
  {
    id: '4',
    type: 'noticia',
    title: 'Convenio con la Universidad Complutense',
    excerpt: 'Acuerdo de colaboracion para practicas y formacion continua de graduados sociales.',
    href: '/actualidad/convenio-ucm',
    date: '15 Mar 2026',
    image: '/placeholder-news.svg',
  },
];

const typeConfig = {
  noticia: { badge: 'institutional' as const, label: 'Noticia', icon: Megaphone },
  evento: { badge: 'formacion' as const, label: 'Evento', icon: Calendar },
  destacado: { badge: 'colegio' as const, label: 'Destacado', icon: Pin },
};

interface HeroProps {
  slides?: HeroSlide[];
}

export function Hero({ slides = defaultSlides }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Sort: pinned first, then by date
  const sortedSlides = [...slides].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % sortedSlides.length);
  }, [sortedSlides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + sortedSlides.length) % sortedSlides.length);
  }, [sortedSlides.length]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (paused || sortedSlides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next, sortedSlides.length]);

  // Drag/swipe support
  const dragRef = useRef<{ startX: number; isDragging: boolean }>({ startX: 0, isDragging: false });

  const handleDragStart = useCallback((clientX: number) => {
    dragRef.current = { startX: clientX, isDragging: true };
    setPaused(true);
  }, []);

  const handleDragEnd = useCallback((clientX: number) => {
    if (!dragRef.current.isDragging) return;
    const diff = dragRef.current.startX - clientX;
    dragRef.current.isDragging = false;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, [next, prev]);

  const onMouseDown = useCallback((e: React.MouseEvent) => handleDragStart(e.clientX), [handleDragStart]);
  const onMouseUp = useCallback((e: React.MouseEvent) => handleDragEnd(e.clientX), [handleDragEnd]);
  const onTouchStart = useCallback((e: React.TouchEvent) => handleDragStart(e.touches[0].clientX), [handleDragStart]);
  const onTouchEnd = useCallback((e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX), [handleDragEnd]);

  const slide = sortedSlides[current];
  const config = slide ? typeConfig[slide.type] : typeConfig.noticia;
  const Icon = config.icon;

  return (
    <section className="relative min-h-[88vh] overflow-hidden border-b border-border bg-gradient-to-br from-white to-[#F0F4F8]">
      {/* Decorative teal glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px]"
        style={{ background: 'radial-gradient(circle, rgba(43,212,199,0.05) 0%, transparent 70%)' }}
      />

      <Container className="relative flex min-h-[88vh] items-center py-20">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Static content */}
          <div>
            <Badge color="colegio" className="mb-6 bg-[rgba(37,99,235,0.08)] text-primary">
              Colegio Oficial
            </Badge>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-text sm:text-5xl md:text-6xl lg:text-[84px]">
              Graduados Sociales de Madrid
            </h1>

            <p className="mt-6 max-w-[520px] text-lg font-light text-text-secondary">
              Mas de 3.000 profesionales del ambito laboral confian en nosotros.
              Formacion, empleo, asesoramiento y comunidad para impulsar tu carrera.
            </p>

            {/* Social proof counter */}
            <div className="mt-6 flex items-center gap-6">
              <div>
                <p className="text-2xl font-extrabold text-primary">3.000+</p>
                <p className="text-xs text-text-tertiary">Colegiados activos</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-extrabold text-primary">50+</p>
                <p className="text-xs text-text-tertiary">Anos de historia</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-extrabold text-primary">100+</p>
                <p className="text-xs text-text-tertiary">Formaciones/ano</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button variant="gradient" href="/hazte-colegiado">
                Hazte Colegiado
              </Button>
              <Button variant="outline" href="/el-colegio">
                Conoce el Colegio
              </Button>
            </div>
          </div>

          {/* Right: Dynamic slider */}
          <div
            className="relative select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); dragRef.current.isDragging = false; }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ cursor: sortedSlides.length > 1 ? 'grab' : undefined }}
          >
            <div className="relative min-h-[340px]">
              {slide && (
                <Card hover={false} className="relative overflow-hidden border-border/60 p-0 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
                  {/* Pinned indicator */}
                  {slide.pinned && (
                    <div className="absolute right-4 top-4 z-10">
                      <Pin size={16} className="text-primary" fill="currentColor" />
                    </div>
                  )}

                  <div className="p-7">
                    {/* Image */}
                    {slide.image ? (
                      <div className="mb-4 aspect-[16/9] overflow-hidden rounded-xl">
                        <Image src={slide.image} alt={slide.title} width={600} height={340} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="mb-4 flex aspect-[16/9] items-center justify-center rounded-xl bg-bg-alt border border-border">
                        <span className="text-xs text-text-tertiary">Imagen destacada</span>
                      </div>
                    )}

                    {/* Type badge */}
                    <div className="mb-4 flex items-center gap-2">
                      <Badge color={config.badge}>
                        <Icon size={12} className="mr-1" />
                        {config.label}
                      </Badge>
                      {slide.date && (
                        <span className="text-xs text-text-tertiary">{slide.date}</span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mb-3 text-xl font-bold leading-tight text-text sm:text-2xl">
                      {slide.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-6 text-sm font-light leading-relaxed text-text-secondary sm:text-base">
                      {slide.excerpt}
                    </p>

                    {/* CTA */}
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                    >
                      Leer mas <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 w-full bg-border/50">
                    <div
                      className="h-full bg-gradient-to-r from-[#2F5BEA] to-[#18B7B0] transition-all duration-300"
                      style={{ width: `${((current + 1) / sortedSlides.length) * 100}%` }}
                    />
                  </div>
                </Card>
              )}
            </div>

            {/* Navigation */}
            {sortedSlides.length > 1 && (
              <div className="mt-4 flex items-center justify-between">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {sortedSlides.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current
                          ? 'w-6 bg-primary'
                          : 'w-2 bg-border hover:bg-text-tertiary'
                      }`}
                      aria-label={`Ir a slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-text-secondary transition-all hover:border-primary hover:text-primary"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-text-secondary transition-all hover:border-primary hover:text-primary"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
