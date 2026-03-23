'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { login, isAuthenticated, getStoredUser, logout } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';
import { User, Settings, Eye, LogOut, BookOpen, FileText, Lock, GraduationCap, ArrowRight } from 'lucide-react';

export default function AreaPrivadaPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser());
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const result = await login(loginForm.username, loginForm.password);
    setLoginLoading(false);
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      setLoginError(result.message || 'Error al iniciar sesion');
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-text-secondary">Cargando...</p>
      </section>
    );
  }

  // Logged in — Dashboard
  if (user) {
    const isProfesional = user.roles.includes('profesional');
    const isPrecolegiado = user.roles.includes('precolegiado');

    const roleLabel = isProfesional
      ? 'Profesional Colegiado'
      : isPrecolegiado
        ? 'Precolegiado'
        : 'Bienvenido al area privada';

    return (
      <>
        <Breadcrumbs items={[{ label: 'Area Privada', href: '/area-privada' }]} />
        <section className="py-16">
          <Container>
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-text">
                  Hola, {user.displayName}
                </h1>
                <p className="mt-1 text-text-secondary font-light">
                  {roleLabel}
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition hover:border-error hover:text-error"
              >
                <LogOut size={16} /> Cerrar sesion
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Profile card */}
              {isProfesional && (
                <Card className="flex flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                    <User size={24} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text">Mi Perfil Profesional</h3>
                  <p className="mb-4 flex-1 text-sm font-light text-text-secondary">
                    Edita tu informacion de contacto, despacho, especialidades y bio que aparecen en el directorio.
                  </p>
                  <Button variant="outline" href="/area-privada/perfil" className="self-start text-sm">
                    Editar perfil
                  </Button>
                </Card>
              )}

              {/* Directory visibility */}
              {isProfesional && (
                <Card className="flex flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/5">
                    <Eye size={24} className="text-teal" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text">Visibilidad en Directorio</h3>
                  <p className="mb-4 flex-1 text-sm font-light text-text-secondary">
                    Controla si tu perfil aparece en el directorio publico del Colegio.
                  </p>
                  <Badge color="activo">Configurable desde tu perfil</Badge>
                </Card>
              )}

              {/* Training */}
              <Card className="flex flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-logo-blue/5">
                  <BookOpen size={24} className="text-logo-blue" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-text">Mis Formaciones</h3>
                <p className="mb-4 flex-1 text-sm font-light text-text-secondary">
                  Consulta tus inscripciones, certificados y diplomas.
                </p>
                <Button variant="outline" href="/formacion-eventos" className="self-start text-sm">
                  Ver formaciones
                </Button>
              </Card>

              {/* Documents */}
              <Card className="flex flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-alt">
                  <FileText size={24} className="text-text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-text">Documentos</h3>
                <p className="mb-4 flex-1 text-sm font-light text-text-secondary">
                  Accede a actas, memorias, estatutos y documentacion del Colegio.
                </p>
                <Button variant="outline" href="/el-colegio/transparencia" className="self-start text-sm">
                  Ver documentos
                </Button>
              </Card>

              {/* Settings */}
              <Card className="flex flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-alt">
                  <Settings size={24} className="text-text-secondary" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-text">Configuracion</h3>
                <p className="mb-4 flex-1 text-sm font-light text-text-secondary">
                  Cambia tu contrasena, email y preferencias de comunicacion.
                </p>
                <Badge color="institutional">Proximamente</Badge>
              </Card>

              {/* CTA Colegiarse — solo precolegiados */}
              {isPrecolegiado && (
                <Card className="flex flex-col border-primary/20 bg-gradient-to-br from-primary/[0.03] to-teal/[0.03]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-teal/10">
                    <GraduationCap size={24} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-text">Hazte Colegiado</h3>
                  <p className="mb-4 flex-1 text-sm font-light text-text-secondary">
                    Da el paso y accede a todos los servicios: directorio profesional, mentoring, bolsa de empleo, convenios y mucho mas.
                  </p>
                  <Button variant="gradient" href="/hazte-colegiado/colegiados" className="self-start text-sm">
                    Quiero colegiarme <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Card>
              )}
            </div>
          </Container>
        </section>
      </>
    );
  }

  // Not logged in — Login form
  return (
    <>
      <Breadcrumbs items={[{ label: 'Area Privada', href: '/area-privada' }]} />
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <Container className="flex justify-center">
          <Card hover={false} className="w-full max-w-[440px]">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5">
                <Lock size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold text-text">Area Privada</h1>
              <p className="mt-2 text-sm font-light text-text-secondary">
                Accede con tus credenciales de colegiado
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="mb-1 block text-sm font-medium text-text">
                  Usuario o email
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tu usuario o email"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-text">
                  Contrasena
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tu contrasena"
                />
              </div>

              {loginError && (
                <p className="rounded-lg bg-error/5 px-3 py-2 text-sm text-error">
                  {loginError}
                </p>
              )}

              <Button type="submit" variant="gradient" className="w-full" disabled={loginLoading}>
                {loginLoading ? 'Accediendo...' : 'Acceder'}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-text-tertiary">
              Si no tienes cuenta, contacta con el Colegio en{' '}
              <a href="mailto:admon@graduadosocialmadrid.org" className="text-primary underline">
                admon@graduadosocialmadrid.org
              </a>{' '}
              o llama al 91 523 08 88.
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
}
