'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';

// TODO: Replace with GraphQL query GET_PROFESIONALES
const placeholderProfesionales = [
  {
    slug: 'maria-garcia-lopez',
    nombre: 'Maria Garcia Lopez',
    numeroColegiado: 'GS-1234',
    despacho: 'Garcia & Asociados',
    localidad: 'Madrid Centro',
    ejerciente: true,
    mediador: true,
  },
  {
    slug: 'carlos-martinez-ruiz',
    nombre: 'Carlos Martinez Ruiz',
    numeroColegiado: 'GS-2345',
    despacho: 'Asesoria Martinez',
    localidad: 'Alcobendas',
    ejerciente: true,
    mediador: false,
  },
  {
    slug: 'ana-fernandez-mora',
    nombre: 'Ana Fernandez Mora',
    numeroColegiado: 'GS-3456',
    despacho: 'Fernandez Consultores',
    localidad: 'Getafe',
    ejerciente: true,
    mediador: true,
  },
  {
    slug: 'jorge-sanchez-diaz',
    nombre: 'Jorge Sanchez Diaz',
    numeroColegiado: 'GS-4567',
    despacho: 'Laboral Sanchez',
    localidad: 'Majadahonda',
    ejerciente: true,
    mediador: false,
  },
  {
    slug: 'laura-torres-vega',
    nombre: 'Laura Torres Vega',
    numeroColegiado: 'GS-5678',
    despacho: 'Torres & Partners',
    localidad: 'Madrid Sur',
    ejerciente: true,
    mediador: false,
  },
  {
    slug: 'pedro-navarro-blanco',
    nombre: 'Pedro Navarro Blanco',
    numeroColegiado: 'GS-6789',
    despacho: 'Navarro Asesores Laborales',
    localidad: 'Las Rozas',
    ejerciente: true,
    mediador: true,
  },
];

export default function DirectorioPage() {
  const [search, setSearch] = useState('');

  const filtered = placeholderProfesionales.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.despacho.toLowerCase().includes(search.toLowerCase()) ||
      p.localidad.toLowerCase().includes(search.toLowerCase()) ||
      p.numeroColegiado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[{ label: 'Directorio', href: '/directorio' }]}
        />

        <SectionHeading
          badge="Profesionales"
          title="Directorio de Colegiados"
          subtitle="Encuentra un Graduado Social colegiado en la Comunidad de Madrid"
        />

        {/* Search bar */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative">
            <Search
              size={20}
              strokeWidth={1.5}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              type="text"
              placeholder="Buscar por nombre, despacho, localidad o numero de colegiado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[40px] border border-[#E2E8F0] bg-white py-3 pl-12 pr-4 text-sm text-[#0F172A] placeholder:text-[#6B7280] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((profesional) => (
            <Link
              key={profesional.slug}
              href={`/directorio/${profesional.slug}`}
              className="block"
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  {/* Avatar circle */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#18B7B0] text-lg font-bold text-white">
                    {profesional.nombre
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {profesional.nombre}
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      {profesional.numeroColegiado}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {profesional.ejerciente && (
                    <Badge color="activo">Ejerciente</Badge>
                  )}
                  {profesional.mediador && (
                    <Badge color="formacion">Mediador</Badge>
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm text-[#475569]">
                    {profesional.despacho}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {profesional.localidad}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-[#6B7280]">
            No se han encontrado resultados para &ldquo;{search}&rdquo;
          </p>
        )}
      </Container>
    </section>
  );
}
