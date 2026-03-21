import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
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
    <section className="py-16">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'El Colegio', href: '/el-colegio' },
            { label: 'Carta de la Presidenta', href: '/el-colegio/carta-presidenta' },
          ]}
        />

        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-4">
            <Badge color="colegio">Mensaje Institucional</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl">
            Carta de la Presidenta
          </h1>
          <p className="mt-4 text-lg text-[#475569]">
            Teresa Silleras Martinez — Presidenta del Excmo. Colegio Oficial de
            Graduados Sociales de Madrid (2025–2029)
          </p>
        </div>

        {/* Two-column bio */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
          {/* LEFT column */}
          <div className="space-y-6">
            {/* Photo placeholder */}
            <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-[#2563EB]/10">
              <span className="text-5xl font-bold text-[#2563EB]/40">TS</span>
            </div>

            {/* Data card */}
            <Card hover={false} className="p-0 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {datosCargo.map((item, i) => (
                    <tr
                      key={item.label}
                      className={i % 2 === 0 ? 'bg-[#F7F8FA]' : 'bg-white'}
                    >
                      <td className="px-4 py-3 font-semibold text-[#0F172A] whitespace-nowrap">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 text-[#475569]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* RIGHT column — bio */}
          <div className="space-y-6 text-[#475569] leading-relaxed">
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
        </div>

        {/* Letter */}
        <div className="mx-auto mt-20 max-w-[720px] rounded-2xl bg-[#F7F8FA] p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Un Colegio a la altura de los tiempos
          </h2>
          <p className="mt-2 text-sm text-[#6B7280]">Madrid, marzo de 2026</p>

          <p className="mt-8 italic text-[#475569]">
            Estimados companeras y companeros:
          </p>

          <div className="mt-6 space-y-6 text-[#475569] leading-relaxed">
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
              <h3 className="mb-2 font-semibold text-[#0F172A]">
                Modernizacion digital del Colegio
              </h3>
              <p>
                El primer eje de nuestro mandato es la transformacion digital
                integral. Estamos rediseñando desde cero la experiencia digital
                del Colegio: una nueva web que no sea solo escaparate, sino una
                verdadera herramienta de trabajo. Area privada con tramitacion
                online, formacion en streaming, certificados digitales y una
                comunicacion agil que llegue donde cada colegiado la necesite.
                La tecnologia no es un fin, es el medio para que el Colegio este
                presente en tu dia a dia sin que tengas que desplazarte.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-[#0F172A]">
                Formacion continua: el pilar de nuestra competencia
              </h3>
              <p>
                El mercado laboral exige especializacion constante. Vamos a
                ampliar la oferta formativa con programas practicos, impartidos
                por profesionales en activo, en las materias que mas demandan
                nuestros colegiados: derecho digital del trabajo, compliance
                laboral, fiscalidad de expatriados, gestion de personas en
                entornos hibridos y mucho mas. La formacion sera presencial, en
                streaming y bajo demanda, para que puedas formarte cuando y
                donde mejor te convenga.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-[#0F172A]">
                Un Colegio para las nuevas generaciones
              </h3>
              <p>
                Uno de mis compromisos personales es tender puentes con los
                profesionales mas jovenes. Los graduados sociales que se
                incorporan hoy al ejercicio necesitan mentoria, orientacion y
                una comunidad que los acoja. Vamos a crear programas de
                acompanamiento, facilitar el acceso a la colegiacion y
                garantizar que la voz de las nuevas generaciones esta presente
                en las decisiones del Colegio. Nuestra profesion tiene futuro
                porque sus jovenes tienen talento — debemos demostrarselo con
                hechos.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-[#0F172A]">
                Nuevas instalaciones, nuevas posibilidades
              </h3>
              <p>
                Nuestra nueva sede en la calle Jose Abascal, 44 no es solo un
                cambio de direccion: es una declaracion de intenciones.
                Despachos para uso de colegiados, salas de reuniones equipadas,
                un aula de formacion con tecnologia de ultima generacion, sala
                de medios para grabacion de contenidos y, por primera vez, una
                sala de simulacion de juicios donde preparar vistas orales en
                condiciones reales. Queremos que la sede sea tu segundo
                despacho, un espacio al que vengas a trabajar, a formarte y a
                conectar con colegas.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-[#0F172A]">
                Transparencia y cercania
              </h3>
              <p>
                Por ultimo, este mandato sera el de la transparencia. Las
                cuentas del Colegio, las actas de la Junta de Gobierno, las
                memorias anuales y los presupuestos aprobados estaran a
                disposicion de todos los colegiados en el area de transparencia
                de nuestra web. Gobernar un colegio profesional en 2026 significa
                rendir cuentas con naturalidad y escuchar con atencion. Mi puerta
                esta abierta — literalmente y en sentido figurado.
              </p>
            </div>
          </div>

          <p className="mt-10 text-lg italic font-semibold text-[#2563EB]">
            Tu futuro, nuestro compromiso.
          </p>

          <div className="mt-8 border-t border-[#E2E8F0] pt-6">
            <p className="font-bold text-[#0F172A]">Teresa Silleras Martinez</p>
            <p className="text-sm text-[#475569]">Presidenta</p>
            <p className="text-sm text-[#6B7280]">
              Excmo. Colegio Oficial de Graduados Sociales de Madrid
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Button href="/el-colegio/junta-de-gobierno" variant="gradient">
            Conoce al equipo
            <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
