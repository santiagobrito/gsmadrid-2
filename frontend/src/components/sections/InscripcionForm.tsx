'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Lock } from 'lucide-react';

interface InscripcionFormProps {
  formacionTitle?: string;
  estado: 'Abierta' | 'Completa' | 'Cancelada' | 'Finalizada';
  plazas?: number;
  esGratuito?: boolean;
  urlExterna?: string;
  fechaFin?: string;
}

export function InscripcionForm({
  estado,
  plazas,
  esGratuito,
  urlExterna,
  fechaFin,
}: InscripcionFormProps) {
  const [submitted, setSubmitted] = useState(false);

  // Check if event is in the past
  const isPast = fechaFin ? new Date(fechaFin) < new Date() : estado === 'Finalizada';
  const isClosed = isPast || estado === 'Completa' || estado === 'Cancelada' || estado === 'Finalizada';

  // If external URL, redirect there
  if (urlExterna && !isClosed) {
    return (
      <Card hover={false} className="border-primary/20 bg-primary/[0.02]">
        <h3 className="mb-3 text-lg font-bold text-text">Inscripcion</h3>
        <p className="mb-4 text-sm font-light text-text-secondary">
          La inscripcion para esta actividad se realiza a traves de una plataforma externa.
        </p>
        <Button variant="gradient" href={urlExterna} className="w-full">
          Ir a inscripcion externa
        </Button>
      </Card>
    );
  }

  // Closed/past event
  if (isClosed) {
    return (
      <Card hover={false} className="border-border bg-bg-alt">
        <div className="flex items-center gap-3 mb-3">
          <Lock size={20} className="text-text-tertiary" />
          <h3 className="text-lg font-bold text-text-tertiary">Inscripcion cerrada</h3>
        </div>
        <Badge color={estado === 'Cancelada' ? 'pendiente' : 'institutional'} className="mb-3">
          {isPast ? 'Evento finalizado' : estado}
        </Badge>
        <p className="text-sm font-light text-text-tertiary">
          {estado === 'Completa'
            ? 'Se han agotado las plazas disponibles para esta actividad.'
            : estado === 'Cancelada'
            ? 'Esta actividad ha sido cancelada.'
            : 'Esta actividad formativa ya ha tenido lugar. Consulta nuestra agenda para proximos eventos.'}
        </p>
        <Button variant="outline" href="/formacion-eventos" className="mt-4 w-full">
          Ver proximas formaciones
        </Button>
      </Card>
    );
  }

  // Success state
  if (submitted) {
    return (
      <Card hover={false} className="border-success/20 bg-success/[0.03]">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle size={20} className="text-success" />
          <h3 className="text-lg font-bold text-text">Solicitud enviada</h3>
        </div>
        <p className="text-sm font-light text-text-secondary">
          Tu solicitud de inscripcion ha sido registrada. Recibiras un correo de confirmacion
          en las proximas 24 horas habiles. Si tienes alguna duda, contacta con nosotros en{' '}
          <a href="mailto:admon@graduadosocialmadrid.org" className="text-primary underline">
            admon@graduadosocialmadrid.org
          </a>.
        </p>
      </Card>
    );
  }

  // Open inscription form
  return (
    <Card hover={false} className="border-primary/20 bg-primary/[0.02]">
      <h3 className="mb-1 text-lg font-bold text-text">Inscripcion</h3>
      {plazas && (
        <p className="mb-4 text-sm text-text-secondary">
          <Badge color={plazas <= 5 ? 'pendiente' : 'activo'} className="mr-2">
            {plazas <= 5 ? 'Ultimas plazas' : `${plazas} plazas`}
          </Badge>
          {esGratuito && <Badge color="formacion">Gratuito</Badge>}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          // TODO: Connect to WordPress / email / CRM
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="insc-nombre" className="mb-1 block text-sm font-medium text-text">
            Nombre completo *
          </label>
          <input
            id="insc-nombre"
            type="text"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Tu nombre y apellidos"
          />
        </div>

        <div>
          <label htmlFor="insc-email" className="mb-1 block text-sm font-medium text-text">
            Correo electronico *
          </label>
          <input
            id="insc-email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="email@ejemplo.com"
          />
        </div>

        <div>
          <label htmlFor="insc-telefono" className="mb-1 block text-sm font-medium text-text">
            Telefono
          </label>
          <input
            id="insc-telefono"
            type="tel"
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Opcional"
          />
        </div>

        <div>
          <label htmlFor="insc-colegiado" className="mb-1 block text-sm font-medium text-text">
            N.o de colegiado
          </label>
          <input
            id="insc-colegiado"
            type="text"
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Opcional — si eres colegiado"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            id="insc-privacidad"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
          />
          <label htmlFor="insc-privacidad" className="text-xs text-text-tertiary">
            Acepto la{' '}
            <a href="/politica-privacidad" className="underline hover:text-primary">
              Politica de Privacidad
            </a>
            . Mis datos seran tratados exclusivamente para gestionar esta inscripcion.
          </label>
        </div>

        <Button type="submit" variant="gradient" className="w-full">
          Solicitar inscripcion
        </Button>
      </form>
    </Card>
  );
}
