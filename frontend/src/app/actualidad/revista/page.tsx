import { BookOpen, Download, Calendar, FileText } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Revista El Graduado — Actualidad',
  description:
    'Revista El Graduado, publicacion oficial del Colegio de Graduados Sociales de Madrid. Articulos, entrevistas y analisis del sector laboral.',
  path: '/actualidad/revista',
});

const issues = [
  {
    number: 89,
    title: 'Reforma laboral 2026: impacto en la profesion',
    date: 'Enero - Marzo 2026',
    highlights: ['Entrevista a la Presidenta', 'Analisis de la nueva normativa', 'Guia practica de cotizacion'],
  },
  {
    number: 88,
    title: 'Inteligencia artificial y relaciones laborales',
    date: 'Octubre - Diciembre 2025',
    highlights: ['IA en la gestion laboral', 'Jurisprudencia destacada', 'Dia del Graduado Social'],
  },
  {
    number: 87,
    title: 'El futuro de la Seguridad Social',
    date: 'Julio - Septiembre 2025',
    highlights: ['Reforma de pensiones', 'Especial RETA', 'Networking entre colegiados'],
  },
  {
    number: 86,
    title: 'Conciliacion y teletrabajo: balance',
    date: 'Abril - Junio 2025',
    highlights: ['Teletrabajo post-pandemia', 'Nuevos derechos digitales', 'Asamblea General'],
  },
  {
    number: 85,
    title: 'Mediacion laboral: la via alternativa',
    date: 'Enero - Marzo 2025',
    highlights: ['Ley MASC y mediacion', 'Casos de exito', 'Acto de Jura'],
  },
  {
    number: 84,
    title: 'Compliance laboral en la empresa',
    date: 'Octubre - Diciembre 2024',
    highlights: ['Compliance y RRHH', 'Canal de denuncias', 'Cena de Navidad'],
  },
];

export default function RevistaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Actualidad', href: '/actualidad' },
          { label: 'Revista El Graduado', href: '/actualidad/revista' },
        ]}
      />

      <section className="py-16">
        <Container>
          <SectionHeading
            badge="Publicacion oficial"
            title="Revista El Graduado"
            subtitle="La revista del Colegio de Graduados Sociales de Madrid. Publicacion trimestral con articulos, entrevistas y analisis del sector."
          />

          {/* Latest issue highlight */}
          <div className="mb-12 rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#F7F8FA] to-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#18B7B0]/5">
                <div className="text-center">
                  <BookOpen size={64} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                  <p className="mt-3 text-lg font-bold text-[#2563EB]/40">N.o {issues[0].number}</p>
                  <p className="text-sm text-[#2563EB]/30">Portada</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Badge color="colegio">Ultimo numero</Badge>
                <h2 className="mt-4 text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                  N.o {issues[0].number} — {issues[0].title}
                </h2>
                <p className="mt-2 text-sm text-[#6B7280]">{issues[0].date}</p>
                <ul className="mt-4 space-y-2">
                  {issues[0].highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-[#475569]">
                      <FileText size={14} className="shrink-0 text-[#18B7B0]" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="gradient" href="#" className="inline-flex">
                    <Download size={16} className="mr-2" /> Descargar PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Archive */}
          <div className="mb-8 text-center">
            <Badge color="formacion">Archivo</Badge>
            <h2 className="mt-4 text-2xl font-extrabold text-[#0F172A]">Numeros anteriores</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {issues.slice(1).map((issue) => (
              <Card key={issue.number}>
                <div className="-mx-7 -mt-7 mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#2F5BEA]/10 to-[#18B7B0]/10">
                  <div className="text-center">
                    <BookOpen size={32} strokeWidth={1} className="mx-auto text-[#2563EB]/30" />
                    <p className="mt-2 text-lg font-bold text-[#2563EB]/40">N.o {issue.number}</p>
                  </div>
                </div>

                <div className="mb-2">
                  <Badge color="institutional">Revista</Badge>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{issue.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#6B7280]">
                  <Calendar size={12} />
                  {issue.date}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {issue.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-[#475569]">
                      <FileText size={10} className="shrink-0 text-[#18B7B0]" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1565C0]">
                    <Download size={14} /> Descargar
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {/* Subscription CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#2563EB]/[0.06] to-[#18B7B0]/[0.06] p-8 text-center">
            <h3 className="text-xl font-extrabold text-[#0F172A]">
              ¿Quieres recibir la revista?
            </h3>
            <p className="mt-2 text-sm text-[#475569]">
              Todos los colegiados reciben la revista de forma gratuita. Si no la estas recibiendo,
              comprueba que tus datos estan actualizados en el Area Privada.
            </p>
            <div className="mt-4">
              <Button variant="outline" href="/area-privada">
                Actualizar mis datos
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
