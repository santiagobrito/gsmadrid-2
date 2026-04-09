import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Politica de Privacidad',
  description:
    'Politica de privacidad y proteccion de datos personales del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/politica-privacidad',
});

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Politica de Privacidad', href: '/politica-privacidad' },
        ]}
      />
      <section className="py-16">
        <Container>
          <div className="prose prose-slate mx-auto max-w-3xl">
            <h1>Politica de Privacidad</h1>
            <p className="lead">
              En cumplimiento del Reglamento (UE) 2016/679 General de Proteccion
              de Datos (RGPD) y la Ley Organica 3/2018, de 5 de diciembre, de
              Proteccion de Datos Personales y garantia de los derechos digitales
              (LOPDGDD), le informamos sobre el tratamiento de sus datos
              personales.
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <ul>
              <li>
                <strong>Identidad:</strong> Excmo. Colegio Oficial de Graduados
                Sociales de Madrid
              </li>
              <li>
                <strong>CIF:</strong> Q-2867005-J
              </li>
              <li>
                <strong>Direccion:</strong> C/ Jose Abascal, 44 — 5.a izda.,
                28003 Madrid
              </li>
              <li>
                <strong>Email:</strong> admon@graduadosocialmadrid.org
              </li>
              <li>
                <strong>Telefono:</strong> 91 523 08 88
              </li>
            </ul>

            <h2>2. Finalidades y base juridica del tratamiento</h2>
            <p>
              Tratamos sus datos personales para las siguientes finalidades:
            </p>

            <h3>a) Gestion colegial</h3>
            <p>
              <strong>Datos:</strong> nombre, apellidos, DNI/NIE, email,
              telefono, direccion, numero de colegiado, especialidades,
              despacho.
              <br />
              <strong>Finalidad:</strong> gestion de la colegiacion, prestacion
              de servicios colegiales, comunicaciones institucionales.
              <br />
              <strong>Base juridica:</strong> cumplimiento de obligacion legal
              (Ley 2/1974 de Colegios Profesionales) y ejecucion de contrato.
              <br />
              <strong>Conservacion:</strong> durante la vigencia de la
              colegiacion y los plazos legales aplicables.
            </p>

            <h3>b) Directorio profesional</h3>
            <p>
              <strong>Datos:</strong> nombre, numero de colegiado, despacho,
              localidad, especialidades, foto, datos de contacto profesional.
              <br />
              <strong>Finalidad:</strong> publicacion en el directorio publico
              de profesionales colegiados.
              <br />
              <strong>Base juridica:</strong> consentimiento del interesado
              (activacion voluntaria de visibilidad en el directorio desde el
              area privada).
              <br />
              <strong>Conservacion:</strong> mientras el profesional mantenga
              activada la visibilidad.
            </p>

            <h3>c) Formulario de contacto</h3>
            <p>
              <strong>Datos:</strong> nombre, email, telefono (opcional), asunto,
              mensaje.
              <br />
              <strong>Finalidad:</strong> atender su consulta o solicitud.
              <br />
              <strong>Base juridica:</strong> consentimiento del interesado.
              <br />
              <strong>Conservacion:</strong> el tiempo necesario para resolver la
              consulta y un maximo de 12 meses.
            </p>

            <h3>d) Solicitud de colegiacion</h3>
            <p>
              <strong>Datos:</strong> nombre, apellidos, email, telefono,
              universidad, titulacion.
              <br />
              <strong>Finalidad:</strong> tramitar la solicitud de colegiacion o
              precolegiacion.
              <br />
              <strong>Base juridica:</strong> ejecucion de medidas
              precontractuales.
              <br />
              <strong>Conservacion:</strong> hasta la resolucion de la solicitud
              y los plazos legales aplicables.
            </p>

            <h3>e) Inscripcion en formaciones y eventos</h3>
            <p>
              <strong>Datos:</strong> nombre, email, telefono, numero de
              colegiado, perfil, modalidad.
              <br />
              <strong>Finalidad:</strong> gestionar la inscripcion y, en su caso,
              el pago.
              <br />
              <strong>Base juridica:</strong> ejecucion de contrato.
              <br />
              <strong>Conservacion:</strong> durante la vigencia de la formacion
              y los plazos legales fiscales y contables.
            </p>

            <h2>3. Destinatarios de los datos</h2>
            <p>
              Sus datos personales no seran cedidos a terceros salvo obligacion
              legal. Los datos podran ser tratados por prestadores de servicios
              del Colegio (encargados de tratamiento) que operan bajo contrato y
              siguiendo nuestras instrucciones:
            </p>
            <ul>
              <li>Proveedor de alojamiento web (hosting)</li>
              <li>
                Proveedor de pasarela de pago (Stripe) para inscripciones de
                pago
              </li>
              <li>Proveedor de correo electronico</li>
            </ul>

            <h2>4. Derechos del interesado</h2>
            <p>Puede ejercer los siguientes derechos:</p>
            <ul>
              <li>
                <strong>Acceso:</strong> conocer que datos personales tratamos
                sobre usted.
              </li>
              <li>
                <strong>Rectificacion:</strong> solicitar la modificacion de
                datos inexactos. Los profesionales pueden editar directamente su
                perfil desde el area privada.
              </li>
              <li>
                <strong>Supresion:</strong> solicitar la eliminacion de sus datos
                cuando ya no sean necesarios.
              </li>
              <li>
                <strong>Oposicion:</strong> oponerse al tratamiento de sus datos.
              </li>
              <li>
                <strong>Limitacion:</strong> solicitar la limitacion del
                tratamiento en determinadas circunstancias.
              </li>
              <li>
                <strong>Portabilidad:</strong> recibir sus datos en un formato
                estructurado y de uso comun.
              </li>
            </ul>
            <p>
              Para ejercer estos derechos, envie un email a{' '}
              <strong>admon@graduadosocialmadrid.org</strong> indicando su
              nombre, derecho que desea ejercer y copia de su DNI/NIE.
            </p>
            <p>
              Asimismo, tiene derecho a presentar una reclamacion ante la
              Agencia Espanola de Proteccion de Datos (
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.aepd.es
              </a>
              ).
            </p>

            <h2>5. Medidas de seguridad</h2>
            <p>
              El Colegio ha adoptado las medidas tecnicas y organizativas
              necesarias para garantizar la seguridad de los datos personales y
              evitar su alteracion, perdida, tratamiento o acceso no autorizado,
              incluyendo:
            </p>
            <ul>
              <li>Comunicaciones cifradas (HTTPS/TLS)</li>
              <li>Acceso restringido al area de administracion</li>
              <li>Copias de seguridad periodicas</li>
              <li>Control de acceso basado en roles</li>
            </ul>

            <p className="text-sm text-[#6B7280] mt-12">
              Ultima actualizacion: abril 2026
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
