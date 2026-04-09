import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Aviso Legal',
  description:
    'Aviso legal del sitio web del Colegio Oficial de Graduados Sociales de Madrid. Datos del responsable, condiciones de uso y propiedad intelectual.',
  path: '/aviso-legal',
});

export default function AvisoLegalPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Aviso Legal', href: '/aviso-legal' }]} />
      <section className="py-16">
        <Container>
          <div className="prose prose-slate mx-auto max-w-3xl">
            <h1>Aviso Legal</h1>
            <p className="lead">
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de
              la Sociedad de la Informacion y de Comercio Electronico (LSSI-CE),
              se informa de los siguientes datos:
            </p>

            <h2>1. Datos identificativos del titular</h2>
            <ul>
              <li>
                <strong>Denominacion:</strong> Excmo. Colegio Oficial de
                Graduados Sociales de Madrid
              </li>
              <li>
                <strong>CIF:</strong> Q-2867005-J
              </li>
              <li>
                <strong>Domicilio social:</strong> C/ Jose Abascal, 44 — 5.a
                izda., 28003 Madrid
              </li>
              <li>
                <strong>Telefono:</strong> 91 523 08 88
              </li>
              <li>
                <strong>Email:</strong> admon@graduadosocialmadrid.org
              </li>
              <li>
                <strong>Inscripcion registral:</strong> Colegio Profesional
                constituido al amparo de la Ley 2/1974, de 13 de febrero, sobre
                Colegios Profesionales
              </li>
            </ul>

            <h2>2. Objeto del sitio web</h2>
            <p>
              Este sitio web tiene por objeto facilitar informacion sobre los
              servicios, actividades y funciones del Colegio Oficial de Graduados
              Sociales de Madrid, asi como ofrecer servicios digitales a sus
              colegiados y precolegiados.
            </p>

            <h2>3. Condiciones de uso</h2>
            <p>
              El acceso y uso de este sitio web atribuye la condicion de usuario
              e implica la aceptacion de las presentes condiciones. El usuario se
              compromete a hacer un uso adecuado de los contenidos y servicios
              ofrecidos, absteniendose de:
            </p>
            <ul>
              <li>
                Utilizar los contenidos con fines ilicitos o contrarios a lo
                establecido en este aviso legal.
              </li>
              <li>
                Difundir contenidos de caracter racista, xenofobo,
                pornografico, de apologia del terrorismo o que atenten contra los
                derechos humanos.
              </li>
              <li>
                Provocar danos en los sistemas fisicos y logicos del Colegio o
                de terceros.
              </li>
              <li>
                Intentar acceder a areas restringidas de los sistemas
                informaticos del Colegio o de terceros.
              </li>
            </ul>

            <h2>4. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos de este sitio web (textos, fotografias,
              graficos, imagenes, iconos, tecnologia, software, asi como su
              diseno grafico y codigos fuente) son propiedad intelectual del
              Colegio Oficial de Graduados Sociales de Madrid o de terceros que
              han autorizado su uso, sin que puedan entenderse cedidos al usuario
              ninguno de los derechos de explotacion.
            </p>
            <p>
              Queda prohibida la reproduccion, distribucion, comunicacion
              publica, transformacion o cualquier otra actividad que se pueda
              realizar con los contenidos de este sitio web sin la autorizacion
              expresa del Colegio.
            </p>

            <h2>5. Exclusion de responsabilidad</h2>
            <p>
              El Colegio no se hace responsable de los danos y perjuicios que
              pudieran derivarse de:
            </p>
            <ul>
              <li>
                Interferencias, interrupciones, fallos, omisiones, averias
                telefonicas o desconexiones en el funcionamiento operativo del
                sistema electronico.
              </li>
              <li>
                Retrasos o bloqueos en el uso del sistema causados por
                deficiencias o sobrecargas de Internet o en otros sistemas
                electronicos.
              </li>
              <li>
                Actuaciones de terceros que vulneren los sistemas de seguridad.
              </li>
            </ul>

            <h2>6. Enlaces externos</h2>
            <p>
              Este sitio web puede contener enlaces a sitios web de terceros. El
              Colegio no asume responsabilidad alguna por el contenido, veracidad
              o funcionamiento de estos sitios web externos.
            </p>

            <h2>7. Legislacion aplicable y jurisdiccion</h2>
            <p>
              Las presentes condiciones se rigen por la legislacion espanola. Para
              la resolucion de cualquier controversia, las partes se someten a los
              Juzgados y Tribunales de Madrid.
            </p>

            <p className="text-sm text-[#6B7280] mt-12">
              Ultima actualizacion: abril 2026
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
