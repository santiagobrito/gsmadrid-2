'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import type { DirectorioProfesional } from '@/app/directorio/page';

const PAGE_SIZE = 12;

interface DirectorioSearchProps {
  profesionales: DirectorioProfesional[];
}

export function DirectorioSearch({ profesionales }: DirectorioSearchProps) {
  const [search, setSearch] = useState('');
  const [filterEspecialidad, setFilterEspecialidad] = useState('');
  const [filterLocalidad, setFilterLocalidad] = useState('');
  const [page, setPage] = useState(1);

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

  const filtered = useMemo(() => {
    return profesionales.filter((p) => {
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
  }, [profesionales, search, filterEspecialidad, filterLocalidad]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  const updateSearch = (v: string) => { setSearch(v); setPage(1); };
  const updateEspecialidad = (v: string) => { setFilterEspecialidad(v); setPage(1); };
  const updateLocalidad = (v: string) => { setFilterLocalidad(v); setPage(1); };

  const hasActiveFilters = !!filterEspecialidad || !!filterLocalidad;

  return (
    <Container>
      {/* Search + Filters bar */}
      <div className="mb-8 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6">
        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            strokeWidth={1.5}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, despacho, especialidad o numero de colegiado..."
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-3.5 pl-12 pr-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10"
          />
        </div>

        {/* Filter pills */}
        {(allEspecialidades.length > 0 || allLocalidades.length > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Filtrar:</span>

            {allEspecialidades.length > 0 && (
              <div className="relative">
                <Briefcase size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <select
                  value={filterEspecialidad}
                  onChange={(e) => updateEspecialidad(e.target.value)}
                  className={`appearance-none rounded-full py-2 pl-9 pr-8 text-sm transition ${
                    filterEspecialidad
                      ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB] border'
                      : 'border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]'
                  } focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20`}
                >
                  <option value="">Especialidad</option>
                  {allEspecialidades.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            )}

            {allLocalidades.length > 0 && (
              <div className="relative">
                <MapPin size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <select
                  value={filterLocalidad}
                  onChange={(e) => updateLocalidad(e.target.value)}
                  className={`appearance-none rounded-full py-2 pl-9 pr-8 text-sm transition ${
                    filterLocalidad
                      ? 'border-[#2BD4C7] bg-[#2BD4C7]/5 text-[#0D9488] border'
                      : 'border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]'
                  } focus:outline-none focus:ring-2 focus:ring-[#2BD4C7]/20`}
                >
                  <option value="">Localidad</option>
                  {allLocalidades.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            )}

            {hasActiveFilters && (
              <button
                onClick={() => { setFilterEspecialidad(''); setFilterLocalidad(''); setPage(1); }}
                className="inline-flex items-center gap-1 rounded-full border border-[#E2E8F0] px-3 py-2 text-xs text-[#6B7280] transition hover:border-red-300 hover:text-red-500"
              >
                <X size={12} /> Limpiar
              </button>
            )}

            <span className="ml-auto text-sm text-[#94A3B8]">
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
            </span>
          </div>
        )}
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((profesional) => (
          <Link
            key={profesional.slug}
            href={`/directorio/${profesional.slug}`}
            className="group block"
          >
            <div className="relative h-full rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:border-[#2563EB]/30 hover:shadow-lg hover:shadow-[#2563EB]/5">
              {/* Top row: avatar + name */}
              <div className="flex items-center gap-4">
                {profesional.fotoUrl ? (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E2E8F0] group-hover:ring-[#2563EB]/20">
                    <Image
                      src={profesional.fotoUrl}
                      alt={profesional.nombre}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#18B7B0] text-sm font-bold text-white ring-2 ring-[#E2E8F0] group-hover:ring-[#2563EB]/20">
                    {profesional.nombre
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-semibold text-[#0F172A] group-hover:text-[#2563EB]">
                    {profesional.nombre}
                  </h3>
                  <p className="text-xs font-medium text-[#94A3B8]">
                    {profesional.numeroColegiado}
                  </p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-[#CBD5E1] transition group-hover:translate-x-0.5 group-hover:text-[#2563EB]" />
              </div>

              {/* Despacho + location */}
              {(profesional.despacho || profesional.localidades.length > 0 || profesional.localidad) && (
                <div className="mt-3 space-y-1 border-t border-[#F1F5F9] pt-3">
                  {profesional.despacho && (
                    <p className="truncate text-sm text-[#475569]">{profesional.despacho}</p>
                  )}
                  {profesional.localidades.length > 0 ? (
                    <p className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <MapPin size={12} className="shrink-0" />
                      {profesional.localidades.join(', ')}
                    </p>
                  ) : profesional.localidad ? (
                    <p className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <MapPin size={12} className="shrink-0" />
                      {profesional.localidad}
                    </p>
                  ) : null}
                </div>
              )}

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profesional.ejerciente && (
                  <Badge color="activo">Ejerciente</Badge>
                )}
                {profesional.mediador && (
                  <Badge color="formacion">Mediador</Badge>
                )}
                {profesional.especialidades.slice(0, 2).map((e) => (
                  <Badge key={e} color="eventos">{e}</Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Search size={40} strokeWidth={1} className="text-[#CBD5E1]" />
          <p className="text-lg font-medium text-[#475569]">
            No se encontraron profesionales
          </p>
          <p className="text-sm text-[#94A3B8]">
            {search ? `No hay resultados para "${search}"` : 'Prueba con otros filtros'}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#475569] transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                p === page
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-[#F1F5F9]'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#475569] transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}
    </Container>
  );
}
