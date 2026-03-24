import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  BarChart3,
  ScrollText,
  BookOpen,
  Scale,
  Gavel,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Transparencia',
  description:
    'Memorias anuales, presupuestos, actas, estatutos, codigo deontologico y normativa del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/el-colegio/transparencia',
});

const areas = [
  {
    icon: FileText,
    title: 'Memorias Anuales',
    description:
      'Resumen de actividades, datos de colegiacion, formacion impartida y resultados del ejercicio.',
    note: 'Disponible para colegiados',
  },
  {
    icon: BarChart3,
    title: 'Presupuestos',
    description:
      'Presupuestos aprobados por la Asamblea General, con desglose de ingresos y gastos.',
    note: 'Disponible para colegiados',
  },
  {
    icon: ScrollText,
    title: 'Actas de la Junta',
    description:
      'Actas de las reuniones de la Junta de Gobierno, con los acuerdos adoptados en cada sesion.',
    note: 'Disponible para colegiados',
  },
  {
    icon: BookOpen,
    title: 'Estatutos',
    description:
      'Estatutos del Colegio y reglamento de regimen interior que rigen el funcionamiento de la institucion.',
    note: 'Acceso publico',
  },
  {
    icon: Scale,
    title: 'Codigo Deontologico',
    description:
      'Normas eticas y de conducta profesional que deben observar todos los graduados sociales colegiados.',
    note: 'Acceso publico',
  },
  {
    icon: Gavel,
    title: 'Normativa',
    description:
      'Legislacion estatal y autonomica relevante para el ejercicio profesional y la organizacion colegial.',
    note: 'Acceso publico',
  },
];

export default function TransparenciaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'El Colegio', href: '/el-colegio' },
          { label: 'Transparencia', href: '/el-colegio/transparencia' },
        ]}
      />
      <section className="py-16">
        <Container>
          {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4">
            <Badge color="colegio">Buen Gobierno</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            Transparencia
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            El Colegio Oficial de Graduados Sociales de Madrid mantiene un firme
            compromiso con la transparencia institucional. Ponemos a disposicion
            de nuestros colegiados y de la sociedad la informacion sobre nuestra
            gestion, organizacion y normativa.
          </p>
        </div>

        {/* Transparency cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <Link key={area.title} href="#" className="group">
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#2563EB]/10">
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-[#2563EB]"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {area.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[#475569]">
                    {area.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#6B7280]">
                      {area.note}
                    </span>
                    <ArrowRight
                      size={14}
                      strokeWidth={2}
                      className="text-[#2563EB] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Private area note */}
        <div className="mt-12 flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F7F8FA] p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10">
            <Lock size={20} strokeWidth={1.5} className="text-[#2563EB]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#0F172A]">
              Acceso para colegiados
            </h3>
            <p className="mt-1 text-sm text-[#475569]">
              Los documentos completos estan disponibles para colegiados en el
              Area Privada. Si eres colegiado y aun no tienes acceso, contacta
              con la secretaria del Colegio.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button href="/contacto" variant="gradient">
            Contacta con nosotros
            <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
        </Container>
      </section>
    </>
  );
}
