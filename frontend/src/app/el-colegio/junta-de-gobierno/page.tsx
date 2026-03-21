import { Metadata } from 'next';
import { ArrowRight, Shield } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Junta de Gobierno',
  description:
    'Conoce a los miembros de la Junta de Gobierno del Colegio Oficial de Graduados Sociales de Madrid. Mandato 2025–2029.',
  path: '/el-colegio/junta-de-gobierno',
});

interface BoardMember {
  name: string;
  role: string;
  initials: string;
  description?: string;
  featured?: boolean;
}

interface Vocal {
  name: string;
  initials: string;
}

const equipo: BoardMember[] = [
  {
    name: 'Teresa Silleras Martinez',
    role: 'Presidenta',
    initials: 'TS',
    description:
      'Graduada Social colegiada desde 2006. Fundadora de Silleras Asesores Juridicos (51 empleados). Docente de Derecho del Trabajo.',
    featured: true,
  },
  {
    name: 'Manuel Rodriguez Noguera',
    role: 'Vicepresidente 1.o',
    initials: 'MR',
    description:
      'Graduado social en activo con larga trayectoria en el sector laboral madrileno.',
  },
  {
    name: 'Amaya Segovia Mahillo',
    role: 'Secretaria General',
    initials: 'AS',
    description:
      'Responsable de gestion documental, actas y coordinacion interna del Colegio.',
  },
  {
    name: 'Monica Esteban Amate',
    role: 'Vicesecretaria',
    initials: 'ME',
    description:
      'Apoyo a la Secretaria General en gestion institucional y coordinacion.',
  },
  {
    name: 'Ana Maria Cerezo Rodriguez',
    role: 'Tesorera',
    initials: 'AC',
    description:
      'Responsable de la gestion economica y presupuestaria del Colegio.',
  },
  {
    name: 'Jose Luis Perea Prieto',
    role: 'Vicetesorero',
    initials: 'JP',
    description:
      'Supervision de cuentas y control financiero del Colegio.',
  },
];

const vocalesEjercientes: Vocal[] = [
  { name: 'Raul Bachot Ruiz', initials: 'RB' },
  { name: 'Jose Antonio Juarez Rodriguez', initials: 'JJ' },
  { name: 'Juan Jose Carmelo Santana', initials: 'JC' },
  { name: 'M.a Luisa Martin Bardera', initials: 'LM' },
  { name: 'Elena Tolbanos Cobo', initials: 'ET' },
];

const vocalesNoEjercientes: Vocal[] = [
  { name: 'Jose Carlos Astudillo Agudo', initials: 'JA' },
  { name: 'Alvaro Rueda Sanchez', initials: 'AR' },
  { name: 'Francisco Javier Cerrajero Mendez', initials: 'FC' },
];

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <Card hover={false} className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#2563EB]/10">
        <span className="text-xl font-bold text-[#2563EB]">
          {member.initials}
        </span>
      </div>
      <h3 className="text-lg font-bold text-[#0F172A]">{member.name}</h3>
      <div className="mt-2">
        <Badge color="colegio">{member.role}</Badge>
      </div>
      {member.description && (
        <p className="mt-3 text-sm text-[#475569]">{member.description}</p>
      )}
    </Card>
  );
}

function VocalCard({ vocal }: { vocal: Vocal }) {
  return (
    <Card hover={false} className="flex items-center gap-4 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1565C0]/10">
        <span className="text-sm font-bold text-[#1565C0]">
          {vocal.initials}
        </span>
      </div>
      <p className="text-sm font-semibold text-[#0F172A]">{vocal.name}</p>
    </Card>
  );
}

export default function JuntaDeGobiernoPage() {
  const presidenta = equipo.find((m) => m.featured);
  const directivos = equipo.filter((m) => !m.featured);

  return (
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'El Colegio', href: '/el-colegio' },
            { label: 'Junta de Gobierno', href: '/el-colegio/junta-de-gobierno' },
          ]}
        />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4">
            <Badge color="institutional">
              Organo de Gobierno · Mandato 2025–2029
            </Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            Junta de Gobierno
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            El organo de gobierno del Colegio fue elegido en julio de 2025. Sus
            miembros trabajan de forma colegiada para modernizar la institucion,
            mejorar los servicios a los colegiados y garantizar la transparencia
            en la gestion.
          </p>
        </div>

        {/* Presidenta — featured */}
        {presidenta && (
          <Card
            hover={false}
            className="mb-10 flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start"
          >
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10">
              <span className="text-3xl font-bold text-[#2563EB]">
                {presidenta.initials}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <Badge color="colegio">{presidenta.role}</Badge>
              <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
                {presidenta.name}
              </h2>
              <p className="mt-2 text-[#475569] leading-relaxed">
                {presidenta.description}
              </p>
              <Button
                href="/el-colegio/carta-presidenta"
                variant="outline"
                className="mt-4"
              >
                Leer su carta
                <ArrowRight size={14} strokeWidth={2} />
              </Button>
            </div>
          </Card>
        )}

        {/* Equipo directivo */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {directivos.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>

        {/* Vocales Ejercientes */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Vocales Ejercientes
          </h2>
          <p className="mt-2 mb-6 text-[#475569]">
            Representan a los colegiados en ejercicio activo de la profesion.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vocalesEjercientes.map((vocal) => (
              <VocalCard key={vocal.name} vocal={vocal} />
            ))}
          </div>
        </div>

        {/* Vocales No Ejercientes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Vocales No Ejercientes
          </h2>
          <p className="mt-2 mb-6 text-[#475569]">
            Representan a los colegiados que no ejercen activamente la profesion.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vocalesNoEjercientes.map((vocal) => (
              <VocalCard key={vocal.name} vocal={vocal} />
            ))}
          </div>
        </div>

        {/* Transparency note */}
        <div className="mt-16 rounded-2xl bg-[#F7F8FA] p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
            <Shield size={24} strokeWidth={1.5} className="text-[#2563EB]" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
            Comprometidos con la transparencia
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#475569]">
            Las actas de la Junta de Gobierno, las memorias anuales y los
            presupuestos aprobados estan disponibles en nuestra seccion de
            transparencia.
          </p>
          <div className="mt-6">
            <Button href="/el-colegio/transparencia" variant="outline">
              Ver transparencia
              <ArrowRight size={14} strokeWidth={2} />
            </Button>
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
  );
}
