'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { isAuthenticated, getStoredUser, fetchMe, updateProfile } from '@/lib/auth';
import type { AuthUser, ProfesionalProfile } from '@/lib/auth';
import { Save, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Partial<ProfesionalProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/area-privada');
      return;
    }

    setUser(getStoredUser());

    fetchMe().then((data) => {
      if (data) {
        setUser(data.user);
        if (data.profile) {
          setProfile(data.profile);
        }
      } else {
        router.push('/area-privada');
      }
      setLoading(false);
    });
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const result = await updateProfile(profile);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Error al guardar los cambios.');
    }

    setSaving(false);
  };

  const updateField = (field: string, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-text-secondary">Cargando perfil...</p>
      </section>
    );
  }

  if (!user) return null;

  const inputClass = 'w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
  const labelClass = 'mb-1 block text-sm font-medium text-text';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Area Privada', href: '/area-privada' },
          { label: 'Mi Perfil', href: '/area-privada/perfil' },
        ]}
      />

      <section className="py-16">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-text">Mi Perfil Profesional</h1>
              <p className="mt-1 text-text-secondary font-light">
                Edita tu informacion. Los cambios se reflejan en el directorio publico.
              </p>
            </div>
            <Button variant="outline" href="/area-privada" className="text-sm">
              <ArrowLeft size={16} className="mr-1" /> Volver
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Datos basicos (read-only) */}
              <Card hover={false}>
                <h2 className="mb-4 text-lg font-bold text-text">Datos de colegiacion</h2>
                <p className="mb-4 text-xs text-text-tertiary">
                  Estos datos son gestionados por el Colegio y no pueden editarse aqui.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Numero de colegiado</label>
                    <input
                      type="text"
                      value={profile.numero_colegiado || ''}
                      disabled
                      className={`${inputClass} bg-bg-alt text-text-tertiary`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Nombre completo</label>
                    <input
                      type="text"
                      value={profile.nombre_completo || user.displayName}
                      disabled
                      className={`${inputClass} bg-bg-alt text-text-tertiary`}
                    />
                  </div>
                </div>
              </Card>

              {/* Datos editables */}
              <Card hover={false}>
                <h2 className="mb-4 text-lg font-bold text-text">Datos de contacto</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Despacho</label>
                    <input
                      type="text"
                      value={profile.despacho || ''}
                      onChange={(e) => updateField('despacho', e.target.value)}
                      className={inputClass}
                      placeholder="Nombre del despacho"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Telefono</label>
                    <input
                      type="tel"
                      value={profile.telefono || ''}
                      onChange={(e) => updateField('telefono', e.target.value)}
                      className={inputClass}
                      placeholder="91 000 00 00"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={inputClass}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Web</label>
                    <input
                      type="url"
                      value={profile.web || ''}
                      onChange={(e) => updateField('web', e.target.value)}
                      className={inputClass}
                      placeholder="https://tudespacho.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>LinkedIn</label>
                    <input
                      type="url"
                      value={profile.linkedin || ''}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                      className={inputClass}
                      placeholder="https://linkedin.com/in/tuperfil"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Idiomas</label>
                    <input
                      type="text"
                      value={profile.idiomas || ''}
                      onChange={(e) => updateField('idiomas', e.target.value)}
                      className={inputClass}
                      placeholder="Espanol, Ingles, Frances..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>Direccion</label>
                  <input
                    type="text"
                    value={profile.direccion || ''}
                    onChange={(e) => updateField('direccion', e.target.value)}
                    className={inputClass}
                    placeholder="Direccion del despacho"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Codigo postal</label>
                    <input
                      type="text"
                      value={profile.codigo_postal || ''}
                      onChange={(e) => updateField('codigo_postal', e.target.value)}
                      className={inputClass}
                      placeholder="28001"
                    />
                  </div>
                </div>
              </Card>

              {/* Bio */}
              <Card hover={false}>
                <h2 className="mb-4 text-lg font-bold text-text">Presentacion profesional</h2>
                <div>
                  <label className={labelClass}>Bio / Descripcion</label>
                  <textarea
                    value={profile.bio || ''}
                    onChange={(e) => updateField('bio', e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-y`}
                    placeholder="Describe tu trayectoria, especialidades y servicios..."
                  />
                  <p className="mt-1 text-xs text-text-tertiary">
                    Esta descripcion aparecera en tu perfil del directorio publico.
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Visibility toggle */}
              <Card hover={false} className="border-primary/20">
                <h3 className="mb-3 text-base font-bold text-text">Visibilidad en directorio</h3>
                <p className="mb-4 text-sm font-light text-text-secondary">
                  Controla si tu perfil aparece en el directorio publico del Colegio.
                </p>
                <button
                  onClick={() => updateField('visible_directorio', !profile.visible_directorio)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
                    profile.visible_directorio
                      ? 'border-success/30 bg-success/5 text-success'
                      : 'border-border bg-bg-alt text-text-tertiary'
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {profile.visible_directorio ? (
                      <><Eye size={18} /> Visible en directorio</>
                    ) : (
                      <><EyeOff size={18} /> Oculto en directorio</>
                    )}
                  </span>
                  <div
                    className={`h-6 w-11 rounded-full p-0.5 transition ${
                      profile.visible_directorio ? 'bg-success' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        profile.visible_directorio ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              </Card>

              {/* Status badges */}
              <Card hover={false}>
                <h3 className="mb-3 text-base font-bold text-text">Estado</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Ejerciente</span>
                    <Badge color={profile.ejerciente ? 'activo' : 'institutional'}>
                      {profile.ejerciente ? 'Si' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Turno de oficio</span>
                    <Badge color={profile.acepta_turno_oficio ? 'activo' : 'institutional'}>
                      {profile.acepta_turno_oficio ? 'Si' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Mediador registrado</span>
                    <Badge color={profile.mediador_registrado ? 'activo' : 'institutional'}>
                      {profile.mediador_registrado ? 'Si' : 'No'}
                    </Badge>
                  </div>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  Para cambiar estos datos, contacta con el Colegio.
                </p>
              </Card>

              {/* Save button */}
              <div className="space-y-3">
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    'Guardando...'
                  ) : saved ? (
                    <><CheckCircle size={18} className="mr-1" /> Guardado</>
                  ) : (
                    <><Save size={18} className="mr-1" /> Guardar cambios</>
                  )}
                </Button>

                {error && (
                  <p className="rounded-lg bg-error/5 px-3 py-2 text-center text-sm text-error">
                    {error}
                  </p>
                )}

                {saved && (
                  <p className="rounded-lg bg-success/5 px-3 py-2 text-center text-sm text-success">
                    Perfil actualizado correctamente.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
