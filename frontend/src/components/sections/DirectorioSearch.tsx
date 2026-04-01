'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { DirectorioProfesional } from '@/app/directorio/page';

interface DirectorioSearchProps {
  profesionales: DirectorioProfesional[];
}

export function DirectorioSearch({ profesionales }: DirectorioSearchProps) {
  const [search, setSearch] = useState('');
  const [filterEspecialidad, setFilterEspecialidad] = useState('');
  const [filterLocalidad, setFilterLocalidad] = useState('');

  const allEspecialidades = useMemo(() => {
    const set = new Set<string>();
    profesionales.forEach((p) => p.especialidades.forEach((e) => set.add(e)));
    return Array.from(set).sort();
  }, [profesionales]);

  const allLocalidades = useMemo(() => {
    const set = new Set<string>();
    profesionales.forEach((p) => p.localidades.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [profesionales]);

  const filtered = profesionales.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.nombre.toLowerCase().includes(q) ||
      p.despacho.toLowerCase().includes(q) ||
      p.localidad.toLowerCase().includes(q) ||
      p.numeroColegiado.toLowerCase().includes(q) ||
      p.especialidades.some((e) => e.toLowerCase().includes(q));

    const matchesEspecialidad =
      !filterEspecialidad || p.especialidades.includes(filterEspecialidad);

    const matchesLocalidad =
      !filterLocalidad || p.localidades.includes(filterLocalidad);

    return matchesSearch && matchesEspecialidad && matchesLocalidad;
  });

  const selectClass =
    'appearance-none rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-3 pr-8 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20';

  const hasFilters = allEspecialidades.length > 0 || allLocalidades.length > 0;

  return (
    <Container>
      {/* Search bar */}
      <div className="mx-auto mb-6 max-w-xl">
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

      {/* Filters */}
      {hasFilters && (
        <div className="mx-auto mb-10 flex max-w-xl flex-wrap justify-center gap-3">
          {allEspecialidades.length > 0 && (
            <div className="relative">
              <select
                value={filterEspecialidad}
                onChange={(e) => setFilterEspecialidad(e.target.value)}
                className={selectClass}
              >
                <option value="">Todas las especialidades</option>
                {allEspecialidades.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />
            </div>
          )}
          {allLocalidades.length > 0 && (
            <div className="relative">
              <select
                value={filterLocalidad}
                onChange={(e) => setFilterLocalidad(e.target.value)}
                className={selectClass}
              >
                <option value="">Todas las localidades</option>
                {allLocalidades.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />
            </div>
          )}
          {(filterEspecialidad || filterLocalidad) && (
            <button
              onClick={() => {
                setFilterEspecialidad('');
                setFilterLocalidad('');
              }}
              className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#6B7280] transition hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="mb-6 text-center text-sm text-[#6B7280]">
        {filtered.length} {filtered.length === 1 ? 'profesional encontrado' : 'profesionales encontrados'}
      </p>

      {/* Results */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((profesional) => (
          <Link
            key={profesional.slug}
            href={`/directorio/${profesional.slug}`}
            className="block"
          >
            <Card className="h-full">
              <div className="flex items-start gap-4">
                {profesional.fotoUrl ? (
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={profesional.fotoUrl}
                      alt={profesional.nombre}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#18B7B0] text-lg font-bold text-white">
                    {profesional.nombre
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
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
                {profesional.especialidades.map((e) => (
                  <Badge key={e} color="eventos">
                    {e}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 space-y-1">
                {profesional.despacho && (
                  <p className="text-sm text-[#475569]">{profesional.despacho}</p>
                )}
                {profesional.localidades.length > 0 && (
                  <p className="text-xs text-[#6B7280]">{profesional.localidades.join(', ')}</p>
                )}
                {!profesional.localidades.length && profesional.localidad && (
                  <p className="text-xs text-[#6B7280]">{profesional.localidad}</p>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-[#6B7280]">
          No se han encontrado resultados{search ? ` para "${search}"` : ''}
        </p>
      )}
    </Container>
  );
}
