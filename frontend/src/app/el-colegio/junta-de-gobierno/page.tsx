import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';
import { ArrowRight, Shield, Quote } from 'lucide-react';
import { fetchGraphQL } from '@/lib/graphql/client';

export const metadata: Metadata = createMetadata({
  title: 'Junta de Gobierno 2025–2029',
  description:
    'Conoce a los miembros de la Junta de Gobierno del Colegio Oficial de Graduados Sociales de Madrid, elegida en julio de 2025 bajo la presidencia de Teresa Silleras.',
  path: '/el-colegio/junta-de-gobierno',
});

export const revalidate = 60;

const MIEMBROS_QUERY = `{
  miembrosJunta(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      title
      featuredImage {
        node { sourceUrl }
      }
      miembroJuntaFields {
        cargo
        tipo
        orden
        destacado
        bio
        cita
        email
        linkedin
      }
    }
  }
}`;

interface Miembro {
  nombre: string;
  cargo: string;
  tipo: 'directivo' | 'vocal_ejerciente' | 'vocal_no_ejerciente';
  bio?: string;
  cita?: string;
  initials: string;
  destacado?: boolean;
  foto?: string;
  orden?: number;
  email?: string;
  linkedin?: string;
}

// Fallback data — used if GraphQL is unavailable
const fallbackMiembros: Miembro[] = [
  {
    nombre: 'Teresa Silleras Martinez',
    cargo: 'Presidenta',
    tipo: 'directivo',
    bio: 'Graduada Social colegiada desde 2006, Universidad Carlos III de Madrid. Fundadora y directora de Silleras Asesores Juridicos (51 empleados, 17 graduados sociales). Docente universitaria de Derecho del Trabajo.',
    cita: 'Tu futuro, nuestro compromiso.',
    initials: 'TS',
    destacado: true,
    foto: '/junta/TERESA_SILLERAS.jpg',
  },
  {
    nombre: 'Manuel Rodriguez Noguera',
    cargo: 'Vicepresidente 1.o',
    tipo: 'directivo',
    bio: 'Graduado social en activo con larga trayectoria en el sector laboral madrileno.',
    initials: 'MR',
    foto: '/junta/manuel_rodriguez_noguera1.jpg',
  },
  {
    nombre: 'Amaya Segovia Mahillo',
    cargo: 'Secretaria General',
    tipo: 'directivo',
    bio: 'Responsable de la gestion documental, las actas de la Junta y la coordinacion interna del Colegio.',
    initials: 'AS',
    foto: '/junta/amaya_segovia_mahillo1.jpg',
  },
  {
    nombre: 'Monica Esteban Amate',
    cargo: 'Vicesecretaria',
    tipo: 'directivo',
    bio: 'Apoyo a la Secretaria General en la gestion institucional y coordinacion con los organos de representacion.',
    initials: 'ME',
    foto: '/junta/MONICA_ESTEBAN1.jpg',
  },
  {
    nombre: 'Ana Maria Cerezo Rodriguez',
    cargo: 'Tesorera',
    tipo: 'directivo',
    bio: 'Responsable de la gestion economica y presupuestaria del Colegio.',
    initials: 'AC',
    foto: '/junta/ana_maria_cerezo_rodriguez1.jpg',
  },
  {
    nombre: 'Jose Luis Perea Prieto',
    cargo: 'Vicetesorero',
    tipo: 'directivo',
    bio: 'Supervision de cuentas y control financiero del Colegio.',
    initials: 'JP',
    foto: '/junta/jose_luis_perea_prieto1.jpg',
  },
  { nombre: 'Raul Bachot Ruiz', cargo: 'Vocal Ejerciente', tipo: 'vocal_ejerciente', initials: 'RB', foto: '/junta/raul_bachot_ruiz1.jpg' },
  { nombre: 'Jose Antonio Juarez Rodriguez', cargo: 'Vocal Ejerciente', tipo: 'vocal_ejerciente', initials: 'JJ', foto: '/junta/JOSE_ANTONIO_JUAREZ1.jpg' },
  { nombre: 'Juan Jose Carmelo Santana', cargo: 'Vocal Ejerciente', tipo: 'vocal_ejerciente', initials: 'JC', foto: '/junta/JUAN_JOSE_CARMELO1.jpg' },
  { nombre: 'M.a Luisa Martin Bardera', cargo: 'Vocal Ejerciente', tipo: 'vocal_ejerciente', initials: 'LM', foto: '/junta/M_LUISA_MARTIN_BARDERA1.jpg' },
  { nombre: 'Elena Tolbanos Cobo', cargo: 'Vocal Ejerciente', tipo: 'vocal_ejerciente', initials: 'ET', foto: '/junta/elena_tolbanos_cobo1.jpg' },
  { nombre: 'Jose Carlos Astudillo Agudo', cargo: 'Vocal No Ejerciente', tipo: 'vocal_no_ejerciente', initials: 'JA', foto: '/junta/JoseCarlosAstudillo1.jpg' },
  { nombre: 'Alvaro Rueda Sanchez', cargo: 'Vocal No Ejerciente', tipo: 'vocal_no_ejerciente', initials: 'AR', foto: '/junta/alvaro_rueda_sanchez1.jpg' },
  { nombre: 'Francisco Javier Cerrajero Mendez', cargo: 'Vocal No Ejerciente', tipo: 'vocal_no_ejerciente', initials: 'FC', foto: '/junta/F_JAVIER_CERRAJERO1.jpg' },
];

// Map from fallback name to fallback foto for matching WP members that lack featuredImage
const fallbackFotoMap: Record<string, string> = {};
for (const m of fallbackMiembros) {
  if (m.foto) fallbackFotoMap[m.nombre] = m.foto;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((part) => part.length > 0 && part[0] === part[0].toUpperCase() && !/^(de|del|la|las|los|y)$/i.test(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

interface WpMiembroNode {
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  miembroJuntaFields: {
    cargo: string | string[] | null;
    tipo: string | string[] | null;
    orden: number | null;
    destacado: boolean | null;
    bio: string | null;
    cita: string | null;
    email: string | null;
    linkedin: string | null;
  } | null;
}

interface MiembrosResponse {
  miembrosJunta: { nodes: WpMiembroNode[] };
}

function transformWpMiembro(node: WpMiembroNode): Miembro {
  const fields = node.miembroJuntaFields || {} as NonNullable<WpMiembroNode['miembroJuntaFields']>;
  const nombre = node.title || '';

  // cargo comes as array like ["presidenta", "Presidenta"] — use index [1] for display label
  const cargoRaw = fields.cargo;
  const cargo = Array.isArray(cargoRaw) ? (cargoRaw[1] || cargoRaw[0] || '') : (cargoRaw || '');

  // tipo comes as array like ["directivo", "Directivo"] — use index [0] for value
  const tipoRaw = fields.tipo;
  const tipo = (Array.isArray(tipoRaw) ? tipoRaw[0] : (tipoRaw || 'directivo')) as Miembro['tipo'];

  // Photo: prefer WP featuredImage, fallback to local /junta/ photos
  const wpFoto = node.featuredImage?.node?.sourceUrl || null;
  const localFoto = fallbackFotoMap[nombre] || null;

  return {
    nombre,
    cargo,
    tipo,
    bio: fields.bio || undefined,
    cita: fields.cita || undefined,
    initials: getInitials(nombre),
    destacado: fields.destacado || false,
    foto: wpFoto || localFoto || undefined,
    orden: fields.orden || 99,
    email: fields.email || undefined,
    linkedin: fields.linkedin || undefined,
  };
}

function AvatarPlaceholder({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-14 w-14 text-lg',
    md: 'h-20 w-20 text-2xl',
    lg: 'h-28 w-28 text-4xl',
  };
  return (
    <div className={`${sizes[size]} flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary`}>
      {initials}
    </div>
  );
}

export default async function JuntaDeGobiernoPage() {
  let miembros: Miembro[] = fallbackMiembros;

  try {
    const data = await fetchGraphQL<MiembrosResponse>(MIEMBROS_QUERY);
    if (data.miembrosJunta?.nodes?.length > 0) {
      miembros = data.miembrosJunta.nodes
        .map(transformWpMiembro)
        .sort((a, b) => (a.orden || 99) - (b.orden || 99));
    }
  } catch {
    // Use fallback data
  }

  const directivos = miembros.filter((m) => m.tipo === 'directivo');
  const presidenta = directivos.find((m) => m.destacado);
  const restoDirectivos = directivos.filter((m) => !m.destacado);
  const vocalesEjercientes = miembros.filter((m) => m.tipo === 'vocal_ejerciente');
  const vocalesNoEjercientes = miembros.filter((m) => m.tipo === 'vocal_no_ejerciente');

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'El Colegio', href: '/el-colegio' },
          { label: 'Junta de Gobierno', href: '/el-colegio/junta-de-gobierno' },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-[#F0F4F8] py-20">
        <Container>
          <Badge color="colegio" className="mb-4">Organo de Gobierno · Mandato 2025–2029</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Junta de Gobierno
          </h1>
          <p className="mt-4 max-w-[600px] text-lg font-light text-text-secondary">
            El equipo elegido en julio de 2025 para liderar el Colegio Oficial de Graduados Sociales
            de Madrid durante los proximos cuatro anos.
          </p>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-16">
        <Container narrow>
          <p className="text-text-secondary font-light leading-relaxed">
            La Junta de Gobierno es el organo colegiado que dirige y representa al Excmo. Colegio Oficial
            de Graduados Sociales de Madrid. Sus miembros fueron elegidos en la Asamblea General celebrada
            el 8 de julio de 2025 y tomaron posesion de sus cargos el 18 de septiembre en el Salon de Actos
            del Tribunal Superior de Justicia de Madrid.
          </p>
          <p className="mt-4 text-text-secondary font-light leading-relaxed">
            Su agenda para el mandato 2025–2029 se articula en torno a cinco ejes: modernizacion digital,
            plan de formacion de excelencia, captacion de nuevos colegiados, presencia en medios y mejora
            de las instalaciones.
          </p>
        </Container>
      </section>

      {/* Presidenta — Featured */}
      {presidenta && (
        <section className="bg-bg-alt py-16">
          <Container>
            <Card hover={false} className="overflow-hidden p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Photo */}
                <div className="flex items-center justify-center bg-primary/5 p-10 md:p-12">
                  {presidenta.foto ? (
                    <Image
                      src={presidenta.foto}
                      alt={presidenta.nombre}
                      width={200}
                      height={260}
                      className="rounded-2xl object-cover"
                    />
                  ) : (
                    <AvatarPlaceholder initials={presidenta.initials} size="lg" />
                  )}
                </div>

                {/* Content */}
                <div className="p-8 md:col-span-2 md:p-10">
                  <Badge color="colegio" className="mb-3">{presidenta.cargo}</Badge>
                  <h2 className="text-2xl font-bold text-text sm:text-3xl">{presidenta.nombre}</h2>
                  {presidenta.bio && (
                    <p className="mt-4 text-text-secondary font-light leading-relaxed">{presidenta.bio}</p>
                  )}
                  {presidenta.cita && (
                    <div className="mt-6 flex items-start gap-3 rounded-xl bg-bg-alt p-4">
                      <Quote size={20} className="mt-0.5 flex-shrink-0 text-primary" />
                      <p className="text-sm font-medium italic text-primary">{presidenta.cita}</p>
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button variant="outline" href="/el-colegio/carta-presidenta" className="text-sm">
                      Leer la Carta de la Presidenta <ArrowRight size={14} className="ml-1" />
                    </Button>
                    {(presidenta.linkedin || presidenta.email) && (
                      <div className="flex gap-2">
                        {presidenta.linkedin && (
                          <a href={presidenta.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-tertiary transition hover:border-primary hover:text-primary" aria-label={`LinkedIn de ${presidenta.nombre}`}>
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </a>
                        )}
                        {presidenta.email && (
                          <a href={`mailto:${presidenta.email}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-tertiary transition hover:border-primary hover:text-primary" aria-label={`Email de ${presidenta.nombre}`}>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      )}

      {/* Equipo Directivo */}
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Equipo Directivo"
            subtitle="Miembros con responsabilidades ejecutivas en la gestion del Colegio."
            centered={false}
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {restoDirectivos.map((m) => (
              <Card key={m.nombre} className="flex items-start gap-4">
                {m.foto ? (
                  <Image
                    src={m.foto}
                    alt={m.nombre}
                    width={80}
                    height={80}
                    className="h-20 w-20 flex-shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <AvatarPlaceholder initials={m.initials} size="md" />
                )}
                <div className="min-w-0">
                  <Badge color="colegio" className="mb-2 text-[10px]">{m.cargo}</Badge>
                  <h3 className="text-base font-bold text-text">{m.nombre}</h3>
                  {m.bio && (
                    <p className="mt-1.5 text-sm font-light text-text-secondary leading-relaxed">{m.bio}</p>
                  )}
                  {(m.linkedin || m.email) && (
                    <div className="mt-2 flex gap-2">
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-tertiary transition hover:border-primary hover:text-primary" aria-label={`LinkedIn de ${m.nombre}`}>
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      )}
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-tertiary transition hover:border-primary hover:text-primary" aria-label={`Email de ${m.nombre}`}>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Vocales Ejercientes */}
      <section className="bg-bg-alt py-16">
        <Container>
          <SectionHeading
            title="Vocales Ejercientes"
            subtitle="Representan a los graduados sociales que ejercen activamente la profesion en Madrid."
            centered={false}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vocalesEjercientes.map((m) => (
              <Card key={m.nombre} className="flex items-center gap-4 py-5">
                {m.foto ? (
                  <Image src={m.foto} alt={m.nombre} width={56} height={56} className="h-14 w-14 flex-shrink-0 rounded-full object-cover" />
                ) : (
                  <AvatarPlaceholder initials={m.initials} size="sm" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-text">{m.nombre}</h3>
                  <p className="text-xs text-text-tertiary">{m.cargo}</p>
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Vocales No Ejercientes */}
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Vocales No Ejercientes"
            subtitle="Aportan la perspectiva de colegiados en empresas, instituciones y sector publico."
            centered={false}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vocalesNoEjercientes.map((m) => (
              <Card key={m.nombre} className="flex items-center gap-4 py-5">
                {m.foto ? (
                  <Image src={m.foto} alt={m.nombre} width={56} height={56} className="h-14 w-14 flex-shrink-0 rounded-full object-cover" />
                ) : (
                  <AvatarPlaceholder initials={m.initials} size="sm" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-text">{m.nombre}</h3>
                  <p className="text-xs text-text-tertiary">{m.cargo}</p>
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Transparencia + CTA */}
      <section className="bg-bg-alt py-16">
        <Container narrow className="text-center">
          <Shield size={32} className="mx-auto mb-4 text-primary" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-text">Transparencia en la gestion</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-text-secondary font-light">
            Las actas de la Junta, memorias anuales y presupuestos estan disponibles para todos los colegiados
            en el Area Privada. Tu opinion y propuestas son parte fundamental de esta institucion.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="gradient" href="/contacto">
              Contacta con nosotros
            </Button>
            <Button variant="outline" href="/el-colegio">
              Volver a El Colegio
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
