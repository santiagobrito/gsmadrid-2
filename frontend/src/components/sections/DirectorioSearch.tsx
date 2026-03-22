'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
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

  const filtered = profesionales.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.despacho.toLowerCase().includes(search.toLowerCase()) ||
      p.localidad.toLowerCase().includes(search.toLowerCase()) ||
      p.numeroColegiado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
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
                {/* Avatar / Photo */}
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
              </div>

              <div className="mt-3 space-y-1">
                {profesional.despacho && (
                  <p className="text-sm text-[#475569]">{profesional.despacho}</p>
                )}
                {profesional.localidad && (
                  <p className="text-xs text-[#6B7280]">{profesional.localidad}</p>
                )}
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
  );
}
