import { Metadata } from 'next';
import Link from 'next/link';
import { Scroll, Users, Eye, MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'El Colegio',
  description:
    'El Colegio Oficial de Graduados Sociales de Madrid es una corporacion de derecho publico que agrupa a los profesionales Graduados Sociales con ejercicio en la Comunidad de Madrid.',
  path: '/el-colegio',
});

const navCards = [
  {
    icon: Scroll,
    title: 'Carta de la Presidenta',
    description:
      'Mensaje de Teresa Silleras Martinez, presidenta del Colegio para el mandato 2025–2029.',
    href: '/el-colegio/carta-presidenta',
  },
  {
    icon: Users,
    title: 'Junta de Gobierno',
    description:
      'Conoce al equipo directivo y los vocales que conforman el organo de gobierno del Colegio.',
    href: '/el-colegio/junta-de-gobierno',
  },
  {
    icon: Eye,
    title: 'Transparencia',
    description:
      'Memorias, presupuestos, actas, estatutos y normativa. Nuestro compromiso con el buen gobierno.',
    href: '/el-colegio/transparencia',
  },
  {
    icon: MapPin,
    title: 'Contacto',
    description:
      'Sede principal, Sala de Togas, horarios y formulario de contacto.',
    href: '/contacto',
  },
];

export default function ElColegioPage() {
  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs items={[{ label: 'El Colegio', href: '/el-colegio' }]} />

        {/* Hero */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4">
            <Badge color="institutional">Institucion</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            El Colegio
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            Corporacion de derecho publico al servicio de los profesionales
            Graduados Sociales de la Comunidad de Madrid desde hace mas de
            cincuenta anos.
          </p>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href} className="group">
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-[#2563EB]"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[#475569]">
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors group-hover:text-[#1565C0]">
                    Ver mas
                    <ArrowRight
                      size={14}
                      strokeWidth={2}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Institutional text */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Nuestra mision
          </h2>
          <p className="mt-4 text-[#475569] leading-relaxed">
            El Colegio Oficial de Graduados Sociales de Madrid es una
            corporacion de derecho publico que agrupa a todos los profesionales
            Graduados Sociales con ejercicio en la Comunidad de Madrid. Fundado
            hace mas de cincuenta anos, nuestra mision es velar por la dignidad,
            deontologia y prestigio de la profesion, defender los derechos e
            intereses de los colegiados, y garantizar que la sociedad recibe un
            servicio profesional de maxima calidad.
          </p>
        </div>

        {/* Image placeholder */}
        <div className="mt-12 flex aspect-video items-center justify-center rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
          <p className="text-sm font-medium text-[#6B7280]">
            Imagen de la nueva sede
          </p>
        </div>
      </Container>
    </section>
  );
}
