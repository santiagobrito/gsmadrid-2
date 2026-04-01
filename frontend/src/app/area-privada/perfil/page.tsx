'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { isAuthenticated, getStoredUser, fetchMe, updateProfile, uploadProfilePhoto } from '@/lib/auth';
import type { AuthUser, ProfesionalProfile } from '@/lib/auth';
import Image from 'next/image';
import { Save, ArrowLeft, Eye, EyeOff, CheckCircle, Camera, Loader2 } from 'lucide-react';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Partial<ProfesionalProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [localidades, setLocalidades] = useState<string[]>([]);
  const [allEspecialidades, setAllEspecialidades] = useState<string[]>([]);
  const [allLocalidades, setAllLocalidades] = useState<string[]>([]);

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
          const foto = data.profile.foto;
          if (foto && typeof foto === 'object' && foto.url) {
            setPhotoUrl(foto.sizes?.medium || foto.url);
          }
        }
        setEspecialidades(data.especialidades || []);
        setLocalidades(data.localidades || []);
        setAllEspecialidades(data.allEspecialidades || []);
        setAllLocalidades(data.allLocalidades || []);
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
      const result = await updateProfile({ ...profile, especialidades, localidades });
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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no puede superar los 2 MB.');
      return;
    }

    setUploadingPhoto(true);
    setError('');
    try {
      const result = await uploadProfilePhoto(file);
      if (result.success && result.url) {
        setPhotoUrl(result.url);
      } else {
        setError(result.message || 'Error al subir la foto.');
      }
    } catch {
      setError('Error al subir la foto.');
    }
    setUploadingPhoto(false);
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
              {/* Photo */}
              <Card hover={false}>
                <h2 className="mb-4 text-lg font-bold text-text">Foto de perfil</h2>
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-bg-alt">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt="Foto de perfil"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Camera size={28} className="text-text-tertiary" strokeWidth={1.5} />
                      </div>
                    )}
                    {uploadingPhoto && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                        <Loader2 size={20} className="animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:border-primary hover:text-primary">
                      <Camera size={16} />
                      {photoUrl ? 'Cambiar foto' : 'Subir foto'}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={uploadingPhoto}
                      />
                    </label>
                    <p className="mt-2 text-xs text-text-tertiary">
                      JPG, PNG o WebP. Maximo 2 MB.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Datos basicos (read-only) */}
              <Card hover={false}>
                <h2 className="mb-4 text-lg font-bold text-text">Datos de colegiacion</h2>
                <p className="mb-4 text-xs text-text-tertiary">
                  Estos datos son gestionados por el Colegio y no pueden editarse aqui.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    <label className={labelClass}>Nombre(s)</label>
                    <input
                      type="text"
                      value={profile.nombre_completo || ''}
                      disabled
                      className={`${inputClass} bg-bg-alt text-text-tertiary`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Apellidos</label>
                    <input
                      type="text"
                      value={profile.apellidos || ''}
                      disabled
                      className={`${inputClass} bg-bg-alt text-text-tertiary`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>DNI / NIE</label>
                    <input
                      type="text"
                      value={profile.dni_nie || ''}
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

              {/* Especialidades y Localidades */}
              <Card hover={false}>
                <h2 className="mb-4 text-lg font-bold text-text">Especialidades y localidades</h2>
                <p className="mb-4 text-xs text-text-tertiary">
                  Selecciona hasta 3 especialidades y 3 localidades. Se mostraran en tu ficha del directorio.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Especialidades (max. 3)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {especialidades.map((e) => (
                        <span
                          key={e}
                          className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1 text-sm text-primary"
                        >
                          {e}
                          <button
                            type="button"
                            onClick={() => setEspecialidades((prev) => prev.filter((x) => x !== e))}
                            className="ml-1 text-primary/50 hover:text-primary"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                    {especialidades.length < 3 && (
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value && !especialidades.includes(e.target.value)) {
                            setEspecialidades((prev) => [...prev, e.target.value]);
                          }
                          e.target.value = '';
                        }}
                        className={inputClass}
                      >
                        <option value="">Anadir especialidad...</option>
                        {allEspecialidades
                          .filter((e) => !especialidades.includes(e))
                          .map((e) => (
                            <option key={e} value={e}>{e}</option>
                          ))}
                      </select>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Localidades (max. 3)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {localidades.map((l) => (
                        <span
                          key={l}
                          className="inline-flex items-center gap-1 rounded-full bg-teal/5 px-3 py-1 text-sm text-teal"
                        >
                          {l}
                          <button
                            type="button"
                            onClick={() => setLocalidades((prev) => prev.filter((x) => x !== l))}
                            className="ml-1 text-teal/50 hover:text-teal"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                    {localidades.length < 3 && (
                      <select
                        value=""
                        onChange={(e) => {
                          if (e.target.value && !localidades.includes(e.target.value)) {
                            setLocalidades((prev) => [...prev, e.target.value]);
                          }
                          e.target.value = '';
                        }}
                        className={inputClass}
                      >
                        <option value="">Anadir localidad...</option>
                        {allLocalidades
                          .filter((l) => !localidades.includes(l))
                          .map((l) => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                      </select>
                    )}
                  </div>
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
