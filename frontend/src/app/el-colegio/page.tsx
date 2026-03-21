import { Building2, History, BookOpen, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'El Colegio',
  description:
    'Conoce el Colegio Oficial de Graduados Sociales de Madrid: nuestra historia, mision, junta de gobierno y sede.',
  path: '/el-colegio',
});

const infoCards = [
  {
    icon: Building2,
    title: 'Nuestra Sede',
    description:
      'Ubicados en el centro de Madrid, en C/ Flora 1 (28013). Un espacio abierto para todos los colegiados y ciudadanos.',
  },
  {
    icon: History,
    title: 'Historia',
    description:
      'Desde nuestra fundacion, el Colegio ha trabajado por la dignificacion y el reconocimiento de la profesion de Graduado Social.',
  },
  {
    icon: BookOpen,
    title: 'Mision y Valores',
    description:
      'Representar, defender y promover los intereses profesionales de los Graduados Sociales de la Comunidad de Madrid.',
  },
  {
    icon: Users,
    title: 'Junta de Gobierno',
    description:
      'Un equipo comprometido con la mejora continua de los servicios colegiales y la defensa de la profesion.',
  },
];

export default function ElColegioPage() {
  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs items={[{ label: 'El Colegio', href: '/el-colegio' }]} />

        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            El Colegio
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            El Colegio Oficial de Graduados Sociales de Madrid es la corporacion
            de derecho publico que representa a los profesionales del ambito
            laboral, de la Seguridad Social y del empleo en la Comunidad de Madrid.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                  <Icon size={24} strokeWidth={1.5} className="text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm text-[#475569]">{card.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="prose prose-slate mt-16 max-w-3xl">
          <h2>Nuestra labor</h2>
          <p>
            El Colegio Oficial de Graduados Sociales de Madrid lleva decadas
            al servicio de sus colegiados y de la sociedad. Nuestra labor se
            centra en la formacion continua, la defensa de los intereses
            profesionales y la garantia de calidad en los servicios que los
            Graduados Sociales prestan a empresas y ciudadanos.
          </p>
          <p>
            Trabajamos en estrecha colaboracion con las administraciones
            publicas, las universidades y otras instituciones para asegurar
            que la profesion de Graduado Social mantiene su relevancia y su
            compromiso con la excelencia.
          </p>
        </div>
      </Container>
    </section>
  );
}
