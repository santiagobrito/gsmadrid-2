import { Camera, Calendar, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Galeria de Eventos — Actualidad',
  description:
    'Galeria fotografica de eventos, jornadas, actos institucionales y actividades del Colegio de Graduados Sociales de Madrid.',
  path: '/actualidad/galeria',
});

const albums = [
  {
    title: 'Acto de Jura de Nuevos Colegiados 2026',
    date: 'Marzo 2026',
    location: 'Sede del Colegio',
    count: 24,
  },
  {
    title: 'Jornada de Actualizacion Laboral',
    date: 'Febrero 2026',
    location: 'Salon de Actos',
    count: 18,
  },
  {
    title: 'Cena de Navidad 2025',
    date: 'Diciembre 2025',
    location: 'Hotel Palace, Madrid',
    count: 45,
  },
  {
    title: 'Dia del Graduado Social 2025',
    date: 'Noviembre 2025',
    location: 'Sede del Colegio',
    count: 32,
  },
  {
    title: 'Seminario de Seguridad Social',
    date: 'Octubre 2025',
    location: 'Salon de Actos',
    count: 15,
  },
  {
    title: 'Asamblea General Ordinaria 2025',
    date: 'Junio 2025',
    location: 'Sede del Colegio',
    count: 20,
  },
];

export default function GaleriaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Actualidad', href: '/actualidad' },
          { label: 'Galeria de Eventos', href: '/actualidad/galeria' },
        ]}
      />

      <section className="py-16">
        <Container>
          <SectionHeading
            badge="Fotos"
            title="Galeria de Eventos"
            subtitle="Imagenes de los actos, jornadas y eventos mas destacados del Colegio"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <div
                key={album.title}
                className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
              >
                {/* Placeholder image */}
                <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#2F5BEA]/10 to-[#2563EB]/10 transition-transform group-hover:scale-105">
                  <div className="text-center">
                    <Camera size={40} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-2 text-xs text-[#2563EB]/40">{album.count} fotos</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <Badge color="eventos">Album</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] transition-colors group-hover:text-[#2563EB]">
                    {album.title}
                  </h3>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span>{album.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <MapPin size={14} strokeWidth={1.5} />
                      <span>{album.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info note */}
          <div className="mt-12 mx-auto max-w-2xl rounded-2xl border border-[#E2E8F0] bg-[#F7F8FA] p-6 text-center">
            <Camera size={24} className="mx-auto text-[#2563EB]/40" />
            <p className="mt-3 text-sm text-[#475569]">
              Las fotografias de los eventos se publican progresivamente. Si participaste
              en un evento y quieres recibir las fotos, contacta con{' '}
              <a href="mailto:admon@graduadosocialmadrid.org" className="text-[#2563EB] hover:underline">
                admon@graduadosocialmadrid.org
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
