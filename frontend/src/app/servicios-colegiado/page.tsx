import {
  Briefcase, Users, Heart, Handshake, BookOpen, Monitor,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Servicios para Colegiados',
  description:
    'Servicios exclusivos para colegiados: empleo, mentoring, ayudas, convenios, recursos y tramitacion online.',
  path: '/servicios-colegiado',
});

const services = [
  {
    icon: Briefcase,
    title: 'Empleo',
    description:
      'Ofertas de trabajo y oportunidades de colaboracion exclusivas para graduados sociales colegiados.',
    href: '/servicios-colegiado/empleo',
  },
  {
    icon: Users,
    title: 'Mentoring',
    description:
      'Programa de acompanamiento profesional. Colegiados experimentados guian a los nuevos.',
    href: '/servicios-colegiado/mentoring',
  },
  {
    icon: Heart,
    title: 'Ayudas, Becas y Subvenciones',
    description:
      'Ayudas economicas, becas de formacion y prestaciones sociales para colegiados.',
    href: '/servicios-colegiado/ayudas-becas',
  },
  {
    icon: Handshake,
    title: 'Acuerdos y Convenios',
    description:
      'Descuentos y condiciones especiales con empresas y entidades colaboradoras.',
    href: '/servicios-colegiado/acuerdos-convenios',
  },
  {
    icon: BookOpen,
    title: 'Recursos y Herramientas',
    description:
      'Bases de datos, modelos, calculadoras y herramientas para tu ejercicio profesional.',
    href: '/servicios-colegiado/recursos',
  },
  {
    icon: Monitor,
    title: 'Servicios en Linea',
    description:
      'Certificados, pago de cuotas, tramites colegiales y firma electronica desde cualquier lugar.',
    href: '/servicios-colegiado/servicios-en-linea',
  },
];

export default function ServiciosColegiadoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
        ]}
      />
      <section className="py-16">
        <Container>
          <SectionHeading
          badge="Colegiados"
          title="Servicios para Colegiados"
          subtitle="Todo lo que necesitas para ejercer tu profesion con las mejores garantias"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href} className="group">
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#2563EB]/10">
                    <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] transition-colors group-hover:text-[#2563EB]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#475569]">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] transition-colors group-hover:text-[#1565C0]">
                      Ver mas <ArrowRight size={14} strokeWidth={1.5} />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        </Container>
      </section>
    </>
  );
}
