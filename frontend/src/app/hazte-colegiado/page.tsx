import { Shield, BookOpen, Users, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Hazte Colegiado',
  description:
    'Descubre las ventajas de colegiarte como Graduado Social en Madrid. Formacion, asesoramiento, bolsa de empleo y mucho mas.',
  path: '/hazte-colegiado',
});

const advantages = [
  {
    icon: Shield,
    title: 'Proteccion Profesional',
    description:
      'Seguro de responsabilidad civil, defensa juridica y representacion ante las administraciones.',
  },
  {
    icon: BookOpen,
    title: 'Formacion Continua',
    description:
      'Acceso a cursos, jornadas y talleres especializados con tarifas exclusivas para colegiados.',
  },
  {
    icon: Users,
    title: 'Red Profesional',
    description:
      'Forma parte de una comunidad de profesionales del ambito laboral y de la Seguridad Social.',
  },
  {
    icon: Award,
    title: 'Prestigio y Confianza',
    description:
      'El visado colegial garantiza a tus clientes la calidad y fiabilidad de tu trabajo profesional.',
  },
  {
    icon: GraduationCap,
    title: 'Bolsa de Empleo',
    description:
      'Accede a ofertas de empleo exclusivas y oportunidades de colaboracion profesional.',
  },
  {
    icon: CheckCircle,
    title: 'Servicios Digitales',
    description:
      'Herramientas digitales, area privada, certificados electronicos y tramitacion online.',
  },
];

export default function HazteColegiadoPage() {
  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[{ label: 'Hazte Colegiado', href: '/hazte-colegiado' }]}
        />

        <SectionHeading
          badge="Colegiacion"
          title="Hazte Colegiado"
          subtitle="Descubre todas las ventajas de formar parte del Colegio Oficial de Graduados Sociales de Madrid"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                  <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#475569]">{item.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button variant="gradient" href="/contacto">
            Solicitar Colegiacion
          </Button>
        </div>
      </Container>
    </section>
  );
}
