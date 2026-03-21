import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Carta de la Presidenta',
  description:
    'Mensaje de Teresa Silleras Martinez, presidenta del Colegio Oficial de Graduados Sociales de Madrid. Mandato 2025–2029.',
  path: '/el-colegio/carta-presidenta',
});

const datosCargo = [
  { label: 'Cargo', value: 'Presidenta del CGSM' },
  { label: 'Mandato', value: 'Julio 2025 – Julio 2029' },
  { label: 'Colegiada desde', value: '2006' },
  { label: 'Formacion', value: 'Universidad Carlos III de Madrid' },
  { label: 'Despacho', value: 'Silleras Asesores Juridicos (51 empleados)' },
  { label: 'Docencia', value: 'Derecho del Trabajo' },
];

export default function CartaPresidentaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'El Colegio', href: '/el-colegio' },
          { label: 'Carta de la Presidenta', href: '/el-colegio/carta-presidenta' },
        ]}
      />

      <section className="py-12">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <Badge color="colegio" className="mb-4">Mensaje Institucional</Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
              Carta de la Presidenta
            </h1>
            <p className="mt-3 text-lg text-text-secondary">
              Teresa Silleras Martinez — Presidenta del Excmo. Colegio Oficial de
              Graduados Sociales de Madrid (2025–2029)
            </p>
          </div>

          {/* Two-column: sidebar left + content right */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
            {/* LEFT — Photo + data card (sticky) */}
            <div className="lg:sticky lg:top-[102px] lg:self-start space-y-4">
              <Image
                src="/teresa-silleras.jpg"
                alt="Teresa Silleras Martinez, presidenta del Colegio Oficial de Graduados Sociales de Madrid"
                width={280}
                height={373}
                className="w-full rounded-2xl object-cover"
                priority
              />

              <Card hover={false} className="p-0 overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {datosCargo.map((item, i) => (
                      <tr
                        key={item.label}
                        className={i % 2 === 0 ? 'bg-bg-alt' : 'bg-white'}
                      >
                        <td className="px-3 py-2.5 font-semibold text-text whitespace-nowrap text-xs">
                          {item.label}
                        </td>
                        <td className="px-3 py-2.5 text-text-secondary text-xs">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            {/* RIGHT — Bio + Letter (continuous flow) */}
            <div>
              {/* Bio */}
              <div className="space-y-4 text-text-secondary font-light leading-relaxed">
                <p>
                  Teresa Silleras Martinez es Graduada Social colegiada desde 2006,
                  titulada por la Universidad Carlos III de Madrid. A lo largo de mas
                  de dos decadas de trayectoria, ha construido uno de los despachos
                  especializados en materia laboral mas reconocidos del sector
                  audiovisual en Espana: Silleras Asesores Juridicos, con sede en
                  Madrid y un equipo de 51 profesionales, 17 de los cuales son
                  graduados sociales.
                </p>
                <p>
                  Docente universitaria de Derecho del Trabajo en varias
                  universidades publicas y escuelas de cine, Teresa combina la
                  practica profesional con la formacion de las proximas generaciones
                  de expertos laboralistas — una doble vocacion que define tambien su
                  vision como presidenta.
                </p>
                <p>
                  El 8 de julio de 2025, Teresa Silleras fue elegida presidenta del
                  Excmo. Colegio Oficial de Graduados Sociales de Madrid, tomando
                  posesion del cargo el 18 de septiembre de 2025 en el Salon de
                  Actos del Tribunal Superior de Justicia de Madrid.
                </p>
              </div>

              {/* Letter — flows naturally after bio */}
              <div className="mt-10 rounded-2xl bg-bg-alt p-8 sm:p-10">
                <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                  Un Colegio a la altura de los tiempos
                </h2>
                <p className="mt-2 text-sm text-text-tertiary">Madrid, marzo de 2026</p>

                <p className="mt-6 italic text-text-secondary">
                  Estimados companeras y companeros:
                </p>

                <div className="mt-6 space-y-6 text-text-secondary font-light leading-relaxed">
                  <p>
                    Asumir la presidencia del Excmo. Colegio Oficial de Graduados
                    Sociales de Madrid es un honor y, sobre todo, una responsabilidad
                    que abrazo con la determinacion de quien ha dedicado su carrera a
                    esta profesion. He llegado a este cargo con una conviccion clara:
                    nuestro Colegio debe ser una institucion moderna, util y cercana,
                    que acompane a cada colegiado y colegiada en los retos de un
                    entorno laboral que cambia a una velocidad sin precedentes.
                  </p>

                  <div>
                    <h3 className="mb-2 font-semibold text-text">
                      Modernizacion digital del Colegio
                    </h3>
                    <p>
                      El primer eje de nuestro mandato es la transformacion digital
                      integral. Estamos redisenando desde cero la experiencia digital
                      del Colegio: una nueva web que no sea solo escaparate, sino una
                      verdadera herramienta de trabajo. Area privada con tramitacion
                      online, formacion en streaming, certificados digitales y una
                      comunicacion agil que llegue donde cada colegiado la necesite.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text">
                      Formacion continua: el pilar de nuestra competencia
                    </h3>
                    <p>
                      El mercado laboral exige especializacion constante. Vamos a
                      ampliar la oferta formativa con programas practicos, impartidos
                      por profesionales en activo, en las materias que mas demandan
                      nuestros colegiados: derecho digital del trabajo, compliance
                      laboral, fiscalidad de expatriados, gestion de personas en
                      entornos hibridos y mucho mas.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text">
                      Un Colegio para las nuevas generaciones
                    </h3>
                    <p>
                      Uno de mis compromisos personales es tender puentes con los
                      profesionales mas jovenes. Vamos a crear programas de
                      acompanamiento, facilitar el acceso a la colegiacion y
                      garantizar que la voz de las nuevas generaciones esta presente
                      en las decisiones del Colegio.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text">
                      Nuevas instalaciones, nuevas posibilidades
                    </h3>
                    <p>
                      Nuestra nueva sede en la calle Jose Abascal, 44 no es solo un
                      cambio de direccion: es una declaracion de intenciones.
                      Despachos, salas de reuniones, aula de formacion, sala de medios
                      y una sala de simulacion de juicios donde preparar vistas orales
                      en condiciones reales.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text">
                      Transparencia y cercania
                    </h3>
                    <p>
                      Este mandato sera el de la transparencia. Las cuentas del
                      Colegio, las actas de la Junta de Gobierno y los presupuestos
                      aprobados estaran a disposicion de todos los colegiados. Mi
                      puerta esta abierta — literalmente y en sentido figurado.
                    </p>
                  </div>
                </div>

                <p className="mt-10 text-lg italic font-semibold text-primary">
                  Tu futuro, nuestro compromiso.
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="font-bold text-text">Teresa Silleras Martinez</p>
                  <p className="text-sm text-text-secondary">Presidenta</p>
                  <p className="text-sm text-text-tertiary">
                    Excmo. Colegio Oficial de Graduados Sociales de Madrid
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Button href="/el-colegio/junta-de-gobierno" variant="gradient">
                  Conoce al equipo
                  <ArrowRight size={16} strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
