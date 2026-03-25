import { CheckCircle, Mail, Calendar, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Inscripción Confirmada',
  description: 'Tu inscripción y pago han sido confirmados correctamente.',
  path: '/inscripcion-exitosa',
  noIndex: true,
});

export default function InscripcionExitosaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Formación', href: '/formacion' },
          { label: 'Inscripción confirmada', href: '/inscripcion-exitosa' },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            {/* Success icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#2F5BEA] to-[#18B7B0]">
              <CheckCircle size={40} strokeWidth={1.5} className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Inscripción confirmada
            </h1>
            <p className="mt-4 text-lg font-light text-text-secondary">
              Tu pago ha sido procesado correctamente y tu plaza está reservada.
            </p>

            {/* Info cards */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card hover={false} className="text-left">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">Email de confirmación</h3>
                    <p className="mt-1 text-sm font-light text-text-secondary">
                      Recibirás un correo con todos los detalles de tu inscripción y el comprobante de pago.
                    </p>
                  </div>
                </div>
              </Card>

              <Card hover={false} className="text-left">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Calendar size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">Próximos pasos</h3>
                    <p className="mt-1 text-sm font-light text-text-secondary">
                      Te enviaremos un recordatorio antes del evento con la información de acceso y materiales.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact note */}
            <div className="mt-8 rounded-2xl border border-border bg-bg-alt p-6">
              <p className="text-sm text-text-secondary">
                Si tienes alguna duda, contacta con nosotros en{' '}
                <a href="mailto:admon@graduadosocialmadrid.org" className="font-medium text-primary hover:underline">
                  admon@graduadosocialmadrid.org
                </a>{' '}
                o llama al{' '}
                <a href="tel:+34915230888" className="font-medium text-primary hover:underline">
                  91 523 08 88
                </a>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="gradient" href="/formacion">
                Ver más formaciones <ArrowRight size={16} className="ml-1" />
              </Button>
              <Button variant="outline" href="/">
                Volver al inicio
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
