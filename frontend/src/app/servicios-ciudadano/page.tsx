import { Search, ShieldCheck, FileSearch, HelpCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Servicios para Ciudadanos',
  description:
    'Servicios del Colegio de Graduados Sociales de Madrid para ciudadanos: directorio de profesionales, verificacion de colegiados y atencion al publico.',
  path: '/servicios-ciudadano',
});

const services = [
  {
    icon: Search,
    title: 'Directorio de Profesionales',
    description:
      'Encuentra un Graduado Social colegiado cerca de ti. Busca por localidad, especialidad o nombre.',
    href: '/directorio',
  },
  {
    icon: ShieldCheck,
    title: 'Verificacion de Colegiados',
    description:
      'Comprueba que tu Graduado Social esta colegiado y habilitado para ejercer. Garantia de profesionalidad.',
  },
  {
    icon: FileSearch,
    title: 'Reclamaciones y Quejas',
    description:
      'Si tienes alguna queja sobre un servicio profesional, el Colegio gestiona tu reclamacion de forma imparcial.',
  },
  {
    icon: HelpCircle,
    title: 'Atencion al Ciudadano',
    description:
      'Resolvemos tus dudas sobre los servicios que puede prestarte un Graduado Social. Contactanos sin compromiso.',
  },
];

export default function ServiciosCiudadanoPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Servicios Ciudadano', href: '/servicios-ciudadano' },
        ]}
      />
      <section className="py-16">
        <Container>
          <SectionHeading
          badge="Ciudadanos"
          title="Servicios para Ciudadanos"
          subtitle="El Colegio esta a tu disposicion para garantizar la calidad de los servicios profesionales"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
    </>
  );
}
