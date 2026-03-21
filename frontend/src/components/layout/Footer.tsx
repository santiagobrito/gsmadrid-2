import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

const columns = [
  {
    title: 'El Colegio',
    links: [
      { label: 'Sobre Nosotros', href: '/el-colegio' },
      { label: 'Junta de Gobierno', href: '/el-colegio#junta' },
      { label: 'Historia', href: '/el-colegio#historia' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Para Colegiados', href: '/servicios-colegiado' },
      { label: 'Para Ciudadanos', href: '/servicios-ciudadano' },
      { label: 'Formacion', href: '/formacion-eventos' },
      { label: 'Directorio', href: '/directorio' },
    ],
  },
  {
    title: 'Colegiacion',
    links: [
      { label: 'Hazte Colegiado', href: '/hazte-colegiado' },
      { label: 'Ventajas', href: '/hazte-colegiado#ventajas' },
      { label: 'Requisitos', href: '/hazte-colegiado#requisitos' },
      { label: 'Area Privada', href: '/area-privada' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso Legal', href: '/aviso-legal' },
      { label: 'Politica de Privacidad', href: '/politica-privacidad' },
      { label: 'Politica de Cookies', href: '/politica-cookies' },
      { label: 'Accesibilidad', href: '/accesibilidad' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0E111B] py-16 text-white">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo + Address */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Colegio Oficial de Graduados Sociales de Madrid"
              width={180}
              height={49}
              className="h-auto w-[180px] brightness-0 invert opacity-85"
            />
            <p className="mt-4 text-sm leading-relaxed text-[#6B7280]">
              Colegio Oficial de Graduados Sociales de Madrid
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-[#6B7280]">
              C/ Flora 1<br />
              28013 Madrid
            </address>
            {/* Social icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://twitter.com/GSMadrid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] transition-colors hover:text-[#2BD4C7]"
                aria-label="Twitter / X"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/colegio-graduados-sociales-madrid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B7280] transition-colors hover:text-[#2BD4C7]"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                  <path d="M8 11l0 5" />
                  <path d="M8 8l0 .01" />
                  <path d="M12 16l0 -5" />
                  <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#2BD4C7]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            &copy; {new Date().getFullYear()} Colegio Oficial de Graduados Sociales de Madrid.
            Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
