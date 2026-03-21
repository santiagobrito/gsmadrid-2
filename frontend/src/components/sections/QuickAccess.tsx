import { Users, Shield, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

const cards = [
  {
    icon: Users,
    title: 'Soy Colegiado',
    description:
      'Accede a todos los servicios exclusivos para colegiados: formacion, bolsa de empleo, asesoramiento y mas.',
    href: '/servicios-colegiado',
  },
  {
    icon: Shield,
    title: 'Soy Ciudadano',
    description:
      'Encuentra un profesional colegiado, verifica colegiaciones y conoce tus derechos como ciudadano.',
    href: '/servicios-ciudadano',
  },
  {
    icon: GraduationCap,
    title: 'Quiero Colegiarme',
    description:
      'Descubre las ventajas de colegiarte, los requisitos y el proceso de alta como Graduado Social.',
    href: '/hazte-colegiado',
  },
];

export function QuickAccess() {
  return (
    <section className="bg-[#F7F8FA] py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <a key={card.title} href={card.href} className="block">
                <Card className="h-full text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                    <Icon size={28} strokeWidth={1.5} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{card.description}</p>
                </Card>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
