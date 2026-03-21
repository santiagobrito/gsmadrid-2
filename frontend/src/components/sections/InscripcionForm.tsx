'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Lock, ChevronRight, ChevronLeft, CreditCard, User, MapPin } from 'lucide-react';

// ============================================================
// Types
// ============================================================

type PerfilType = 'colegiado' | 'precolegiado' | 'externo' | null;
type ModalidadType = 'presencial' | 'online' | 'hibrido' | null;

interface PrecioModalidad {
  presencial?: number;
  online?: number;
  hibrido?: number;
}

interface InscripcionFormProps {
  estado: 'Abierta' | 'Completa' | 'Cancelada' | 'Finalizada';
  plazas?: number;
  urlExterna?: string;
  fechaFin?: string;
  // Pricing config from ACF — prices per profile and modality
  precioColegiado?: PrecioModalidad;
  precioPrecolegiado?: PrecioModalidad;
  precioExterno?: PrecioModalidad;
  // Available modalities for this formacion
  modalidadesDisponibles?: ModalidadType[];
  // Whether online payment is enabled
  pagoOnline?: boolean;
}

// ============================================================
// Profile options
// ============================================================

const perfiles = [
  {
    id: 'colegiado' as const,
    title: 'Colegiado/a',
    subtitle: 'Miembro del CGSM',
    price: 'Gratuito',
  },
  {
    id: 'precolegiado' as const,
    title: 'Pre-Colegiado/a',
    subtitle: 'Estudiante Miembro',
    price: 'Gratuito',
  },
  {
    id: 'externo' as const,
    title: 'Externo',
    subtitle: 'NO perteneces al CGSM',
    price: '50 €',
  },
];

// ============================================================
// Component
// ============================================================

export function InscripcionForm({
  estado,
  plazas,
  urlExterna,
  fechaFin,
  precioColegiado,
  precioPrecolegiado,
  precioExterno,
  modalidadesDisponibles = ['presencial'],
  pagoOnline = false,
}: InscripcionFormProps) {
  const [step, setStep] = useState(1);
  const [perfil, setPerfil] = useState<PerfilType>(null);
  const [modalidad, setModalidad] = useState<ModalidadType>(null);
  const [numeroColegiado, setNumeroColegiado] = useState('');
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
  });
  const [privacidad, setPrivacidad] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Derived state
  const isPast = fechaFin ? new Date(fechaFin) < new Date() : estado === 'Finalizada';
  const isClosed = isPast || estado === 'Completa' || estado === 'Cancelada' || estado === 'Finalizada';
  const esColegiado = perfil === 'colegiado' || perfil === 'precolegiado';

  // Calculate price based on profile + modality
  function getPrice(): number {
    if (perfil === 'colegiado') {
      return precioColegiado?.[modalidad || 'presencial'] ?? 0;
    }
    if (perfil === 'precolegiado') {
      return precioPrecolegiado?.[modalidad || 'presencial'] ?? 0;
    }
    if (perfil === 'externo') {
      return precioExterno?.[modalidad || 'presencial'] ?? 50;
    }
    return 0;
  }

  function getPriceLabel(): string {
    const price = getPrice();
    return price === 0 ? 'Gratuito' : `${price} €`;
  }

  // Input styles
  const inputClass = 'w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
  const labelClass = 'mb-1 block text-sm font-medium text-text';

  // ============================
  // External URL redirect
  // ============================
  if (urlExterna && !isClosed) {
    return (
      <Card hover={false} className="border-primary/20 bg-primary/[0.02]">
        <h3 className="mb-3 text-lg font-bold text-text">Inscripcion</h3>
        <p className="mb-4 text-sm font-light text-text-secondary">
          La inscripcion se realiza a traves de una plataforma externa.
        </p>
        <Button variant="gradient" href={urlExterna} className="w-full">
          Ir a inscripcion externa
        </Button>
      </Card>
    );
  }

  // ============================
  // Closed / past event
  // ============================
  if (isClosed) {
    return (
      <Card hover={false} className="border-border bg-bg-alt">
        <div className="mb-3 flex items-center gap-3">
          <Lock size={20} className="text-text-tertiary" />
          <h3 className="text-lg font-bold text-text-tertiary">Inscripcion cerrada</h3>
        </div>
        <Badge color={estado === 'Cancelada' ? 'pendiente' : 'institutional'} className="mb-3">
          {isPast ? 'Evento finalizado' : estado}
        </Badge>
        <p className="text-sm font-light text-text-tertiary">
          {estado === 'Completa'
            ? 'Se han agotado las plazas disponibles.'
            : estado === 'Cancelada'
            ? 'Esta actividad ha sido cancelada.'
            : 'Esta actividad ya ha tenido lugar.'}
        </p>
        <Button variant="outline" href="/formacion-eventos" className="mt-4 w-full">
          Ver proximas formaciones
        </Button>
      </Card>
    );
  }

  // ============================
  // Success
  // ============================
  if (submitted) {
    return (
      <Card hover={false} className="border-success/20 bg-success/[0.03]">
        <div className="mb-3 flex items-center gap-3">
          <CheckCircle size={20} className="text-success" />
          <h3 className="text-lg font-bold text-text">Inscripcion confirmada</h3>
        </div>
        <p className="text-sm font-light text-text-secondary">
          Tu inscripcion ha sido registrada correctamente. Recibiras un correo de confirmacion
          en las proximas 24 horas habiles.
        </p>
        {getPrice() > 0 && (
          <div className="mt-3 rounded-lg bg-bg-alt p-3">
            <p className="text-sm font-medium text-text">
              Importe: <span className="text-primary">{getPriceLabel()}</span>
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              {pagoOnline ? 'Pago procesado online.' : 'Recibiras instrucciones de pago por email.'}
            </p>
          </div>
        )}
      </Card>
    );
  }

  // ============================
  // Step indicators
  // ============================
  const steps = [
    { num: 1, label: 'Perfil', icon: User },
    { num: 2, label: 'Datos', icon: CreditCard },
    { num: 3, label: 'Modalidad', icon: MapPin },
  ];

  return (
    <Card hover={false} className="border-primary/20 bg-primary/[0.02]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-text">Inscripcion</h3>
        {plazas !== undefined && plazas > 0 && (
          <Badge color={plazas <= 5 ? 'pendiente' : 'activo'}>
            {plazas <= 5 ? 'Ultimas plazas' : `${plazas} plazas`}
          </Badge>
        )}
      </div>

      {/* Step indicators */}
      <div className="mb-6 flex items-center justify-between">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              step >= s.num ? 'bg-primary text-white' : 'bg-border text-text-tertiary'
            }`}>
              {s.num}
            </div>
            <span className={`ml-1.5 hidden text-xs font-medium sm:inline ${
              step >= s.num ? 'text-text' : 'text-text-tertiary'
            }`}>
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="mx-2 text-border" />
            )}
          </div>
        ))}
      </div>

      {/* ================================ */}
      {/* STEP 1: Perfil */}
      {/* ================================ */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="mb-3 text-sm text-text-secondary">Selecciona tu perfil:</p>

          {perfiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setPerfil(p.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                perfil === p.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-white hover:border-primary/30'
              }`}
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${perfil === p.id ? 'bg-primary/10' : 'bg-bg-alt'}`}>
                <div className={`h-2.5 w-2.5 rounded-full ${perfil === p.id ? 'bg-primary' : 'bg-text-tertiary/30'}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-text">{p.title}</p>
                <p className="text-xs text-text-tertiary">{p.subtitle}</p>
              </div>
              <Badge color={p.id === 'externo' ? 'pendiente' : 'activo'} className="text-[10px]">
                {p.price}
              </Badge>
            </button>
          ))}

          {/* Numero de colegiado (visible for colegiado/precolegiado) */}
          {esColegiado && (
            <div className="mt-3">
              <label className={labelClass}>N.o de colegiado *</label>
              <input
                type="text"
                value={numeroColegiado}
                onChange={(e) => setNumeroColegiado(e.target.value)}
                className={inputClass}
                placeholder="Tu numero de colegiado"
                required
              />
            </div>
          )}

          <Button
            variant="gradient"
            className="mt-4 w-full"
            onClick={() => perfil && setStep(2)}
            disabled={!perfil || (esColegiado && !numeroColegiado)}
          >
            Siguiente <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      )}

      {/* ================================ */}
      {/* STEP 2: Datos personales */}
      {/* ================================ */}
      {step === 2 && (
        <div className="space-y-3">
          <p className="mb-3 text-sm text-text-secondary">Introduce tus datos:</p>

          <div>
            <label className={labelClass}>Nombre completo *</label>
            <input
              type="text"
              value={datos.nombre}
              onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
              className={inputClass}
              placeholder="Tu nombre y apellidos"
            />
          </div>

          <div>
            <label className={labelClass}>Correo electronico *</label>
            <input
              type="email"
              value={datos.email}
              onChange={(e) => setDatos({ ...datos, email: e.target.value })}
              className={inputClass}
              placeholder="email@ejemplo.com"
            />
          </div>

          <div>
            <label className={labelClass}>Telefono</label>
            <input
              type="tel"
              value={datos.telefono}
              onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
              className={inputClass}
              placeholder="Opcional"
            />
          </div>

          {perfil === 'externo' && (
            <div>
              <label className={labelClass}>Empresa / Organizacion</label>
              <input
                type="text"
                value={datos.empresa}
                onChange={(e) => setDatos({ ...datos, empresa: e.target.value })}
                className={inputClass}
                placeholder="Opcional"
              />
            </div>
          )}

          <div className="flex items-start gap-2 pt-1">
            <input
              id="insc-privacidad"
              type="checkbox"
              checked={privacidad}
              onChange={(e) => setPrivacidad(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
            />
            <label htmlFor="insc-privacidad" className="text-xs text-text-tertiary">
              Acepto la{' '}
              <a href="/politica-privacidad" className="underline hover:text-primary">
                Politica de Privacidad
              </a>
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
              <ChevronLeft size={16} className="mr-1" /> Atras
            </Button>
            <Button
              variant="gradient"
              className="flex-1"
              onClick={() => datos.nombre && datos.email && privacidad && setStep(3)}
              disabled={!datos.nombre || !datos.email || !privacidad}
            >
              Siguiente <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ================================ */}
      {/* STEP 3: Modalidad + Confirmacion */}
      {/* ================================ */}
      {step === 3 && (
        <div className="space-y-3">
          {modalidadesDisponibles.length > 1 ? (
            <>
              <p className="mb-3 text-sm text-text-secondary">Selecciona la modalidad:</p>
              {modalidadesDisponibles.filter(Boolean).map((m) => {
                const labels: Record<string, { title: string; desc: string }> = {
                  presencial: { title: 'Presencial', desc: 'Asistencia en la sede del Colegio' },
                  online: { title: 'Online (a distancia)', desc: 'Via plataforma de videoconferencia' },
                  hibrido: { title: 'Hibrido', desc: 'Presencial + retransmision online' },
                };
                const label = labels[m!] || { title: m, desc: '' };

                // Price for this modality
                let price = 0;
                if (perfil === 'colegiado') price = precioColegiado?.[m!] ?? 0;
                else if (perfil === 'precolegiado') price = precioPrecolegiado?.[m!] ?? 0;
                else price = precioExterno?.[m!] ?? 50;

                return (
                  <button
                    key={m}
                    onClick={() => setModalidad(m)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                      modalidad === m
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-white hover:border-primary/30'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-text">{label.title}</p>
                      <p className="text-xs text-text-tertiary">{label.desc}</p>
                    </div>
                    <Badge color={price === 0 ? 'activo' : 'pendiente'} className="text-[10px]">
                      {price === 0 ? 'Gratuito' : `${price} €`}
                    </Badge>
                  </button>
                );
              })}
            </>
          ) : (
            <div className="rounded-xl border border-border bg-white p-3">
              <p className="text-sm font-medium text-text">
                Modalidad: <span className="text-primary">
                  {modalidadesDisponibles[0] === 'online' ? 'Online' : modalidadesDisponibles[0] === 'hibrido' ? 'Hibrido' : 'Presencial'}
                </span>
              </p>
            </div>
          )}

          {/* Summary */}
          <div className="rounded-xl bg-bg-alt p-3 mt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Resumen</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Perfil</span>
                <span className="font-medium text-text">
                  {perfil === 'colegiado' ? 'Colegiado/a' : perfil === 'precolegiado' ? 'Pre-Colegiado/a' : 'Externo'}
                </span>
              </div>
              {esColegiado && (
                <div className="flex justify-between">
                  <span className="text-text-secondary">N.o colegiado</span>
                  <span className="font-medium text-text">{numeroColegiado}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">Nombre</span>
                <span className="font-medium text-text">{datos.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Email</span>
                <span className="font-medium text-text truncate ml-4">{datos.email}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="font-semibold text-text">Total</span>
                <span className="font-bold text-primary text-lg">{getPriceLabel()}</span>
              </div>
            </div>
          </div>

          {/* Payment note */}
          {getPrice() > 0 && (
            <div className="rounded-xl border border-warning/20 bg-warning/5 p-3">
              <p className="text-xs text-text-secondary">
                {pagoOnline
                  ? 'Al confirmar seras redirigido a la pasarela de pago segura.'
                  : 'Recibiras las instrucciones de pago por email tras confirmar la inscripcion.'}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
              <ChevronLeft size={16} className="mr-1" /> Atras
            </Button>
            <Button
              variant="gradient"
              className="flex-1"
              onClick={() => {
                if (modalidadesDisponibles.length === 1) {
                  setModalidad(modalidadesDisponibles[0]);
                }
                setSubmitted(true);
                // TODO: Send to WordPress REST API / payment gateway
              }}
              disabled={modalidadesDisponibles.length > 1 && !modalidad}
            >
              {getPrice() > 0 ? 'Confirmar y pagar' : 'Confirmar inscripcion'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
