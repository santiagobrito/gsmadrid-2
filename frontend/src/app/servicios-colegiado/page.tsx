import { Shield, BookOpen, Briefcase, Scale, Monitor, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Servicios para Colegiados',
  description:
    'Servicios exclusivos para colegiados: formacion, asesoramiento juridico, bolsa de empleo, certificados y mucho mas.',
  path: '/servicios-colegiado',
});

const services = [
  {
    icon: Shield,
    title: 'Seguro de Responsabilidad Civil',
    description:
      'Cobertura profesional completa para tu actividad como Graduado Social. Incluido en la cuota colegial.',
  },
  {
    icon: BookOpen,
    title: 'Formacion Especializada',
    description:
      'Cursos, jornadas y talleres con tarifas reducidas. Formacion continua obligatoria y voluntaria.',
  },
  {
    icon: Briefcase,
    title: 'Bolsa de Empleo',
    description:
      'Accede a ofertas de empleo y oportunidades de colaboracion exclusivas para colegiados.',
  },
  {
    icon: Scale,
    title: 'Asesoramiento Juridico',
    description:
      'Consultas juridicas gratuitas en materia laboral, fiscal y de Seguridad Social para tu ejercicio profesional.',
  },
  {
    icon: Monitor,
    title: 'Servicios Digitales',
    description:
      'Area privada, tramitacion online, certificados electronicos y herramientas digitales para tu despacho.',
  },
  {
    icon: HeartHandshake,
    title: 'Convenios y Descuentos',
    description:
      'Acuerdos con empresas y entidades que ofrecen condiciones especiales para nuestros colegiados.',
  },
];

export default function ServiciosColegiadoPage() {
  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Servicios Colegiado', href: '/servicios-colegiado' },
          ]}
        />

        <SectionHeading
          badge="Colegiados"
          title="Servicios para Colegiados"
          subtitle="Todo lo que necesitas para ejercer tu profesion con las mejores garantias"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                  <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-[#475569]">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
