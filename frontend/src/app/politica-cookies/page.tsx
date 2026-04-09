import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Politica de Cookies',
  description:
    'Politica de cookies del sitio web del Colegio Oficial de Graduados Sociales de Madrid.',
  path: '/politica-cookies',
});

export default function PoliticaCookiesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Politica de Cookies', href: '/politica-cookies' },
        ]}
      />
      <section className="py-16">
        <Container>
          <div className="prose prose-slate mx-auto max-w-3xl">
            <h1>Politica de Cookies</h1>
            <p className="lead">
              En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de
              la Sociedad de la Informacion y de Comercio Electronico (LSSI-CE)
              y la Directiva 2009/136/CE, le informamos sobre el uso de cookies
              en este sitio web.
            </p>

            <h2>1. Que son las cookies</h2>
            <p>
              Las cookies son pequenos archivos de texto que los sitios web
              almacenan en su dispositivo (ordenador, tablet o movil) cuando los
              visita. Permiten que el sitio web recuerde sus acciones y
              preferencias durante un periodo de tiempo.
            </p>

            <h2>2. Cookies que utilizamos</h2>

            <h3>Cookies estrictamente necesarias</h3>
            <p>
              Son imprescindibles para el funcionamiento del sitio web. No
              requieren consentimiento.
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Finalidad</th>
                    <th>Duracion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>gsmadrid_cookies_consent</td>
                    <td>Almacena su preferencia de cookies</td>
                    <td>12 meses</td>
                  </tr>
                  <tr>
                    <td>gsmadrid_auth_token *</td>
                    <td>Sesion de usuario en el area privada</td>
                    <td>7 dias</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#6B7280]">
              * Almacenado en localStorage, no como cookie HTTP, pero incluido
              por transparencia.
            </p>

            <h3>Cookies analiticas (requieren consentimiento)</h3>
            <p>
              Nos ayudan a entender como los visitantes interactuan con el sitio
              web, recopilando informacion de forma anonima.
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Proveedor</th>
                    <th>Finalidad</th>
                    <th>Duracion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>_ga, _ga_*</td>
                    <td>Google Analytics 4</td>
                    <td>Medicion de trafico y comportamiento de usuarios</td>
                    <td>2 anos</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#6B7280]">
              Las cookies analiticas solo se activan si usted acepta su uso a
              traves del banner de consentimiento.
            </p>

            <h2>3. Como gestionar las cookies</h2>
            <p>
              Puede configurar sus preferencias de cookies en cualquier momento
              haciendo clic en el enlace &ldquo;Configurar cookies&rdquo; del
              pie de pagina.
            </p>
            <p>
              Tambien puede configurar su navegador para bloquear o eliminar
              cookies:
            </p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              Tenga en cuenta que bloquear todas las cookies puede afectar al
              funcionamiento de algunos servicios del sitio web.
            </p>

            <h2>4. Actualizaciones de esta politica</h2>
            <p>
              Esta politica de cookies puede ser actualizada periodicamente. Le
              recomendamos revisarla con regularidad.
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
