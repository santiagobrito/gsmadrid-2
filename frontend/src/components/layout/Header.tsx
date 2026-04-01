'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, LogIn, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { isAuthenticated, getStoredUser, login, logout } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth';

// ============================================================
// Menu structure
// ============================================================

interface MenuItem {
  label: string;
  href: string;
}

interface MenuGroup {
  label: string;
  href: string;
  children?: MenuItem[];
}

const MENU: MenuGroup[] = [
  {
    label: 'El Colegio',
    href: '/el-colegio',
    children: [
      { label: 'Carta de la Presidenta', href: '/el-colegio/carta-presidenta' },
      { label: 'Junta de Gobierno', href: '/el-colegio/junta-de-gobierno' },
      { label: 'Transparencia', href: '/el-colegio/transparencia' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    label: 'Hazte Colegiado',
    href: '/hazte-colegiado',
    children: [
      { label: 'Colegiados', href: '/hazte-colegiado/colegiados' },
      { label: 'Precolegiados', href: '/hazte-colegiado/precolegiados' },
    ],
  },
  {
    label: 'Servicios Colegiado',
    href: '/servicios-colegiado',
    children: [
      { label: 'Directorio Profesional', href: '/directorio' },
      { label: 'Mentoring', href: '/servicios-colegiado/mentoring' },
      { label: 'Ayuda, Becas y Subvenciones', href: '/servicios-colegiado/ayudas-becas' },
      { label: 'Acuerdos y Convenios', href: '/servicios-colegiado/acuerdos-convenios' },
      { label: 'Recursos y Herramientas', href: '/servicios-colegiado/recursos' },
      { label: 'Servicios en Linea', href: '/servicios-colegiado/servicios-en-linea' },
    ],
  },
  {
    label: 'Servicios Ciudadano',
    href: '/servicios-ciudadano',
    children: [
      { label: 'Buscar un Profesional', href: '/directorio' },
      { label: 'Orientacion Juridica Gratuita', href: '/servicios-ciudadano/orientacion-juridica' },
      { label: 'Mediacion Laboral', href: '/servicios-ciudadano/mediacion-laboral' },
      { label: 'Clinica Juridica Laboral', href: '/servicios-ciudadano/clinica-juridica' },
    ],
  },
  {
    label: 'Formacion y Eventos',
    href: '/formacion-eventos',
    children: [
      { label: 'Agenda', href: '/formacion-eventos' },
      { label: 'Formacion', href: '/formacion' },
      { label: 'Eventos', href: '/eventos' },
    ],
  },
  {
    label: 'Actualidad',
    href: '/actualidad',
    children: [
      { label: 'Blog del Colegiado', href: '/actualidad' },
      { label: 'Novedades Colegiales', href: '/actualidad' },
      { label: 'Revista El Graduado', href: '/actualidad/revista' },
    ],
  },
];

// ============================================================
// Desktop dropdown
// ============================================================

function DesktopDropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  function handleEnter() {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  if (!group.children) {
    return (
      <Link href={group.href} className="px-2 py-1 text-[13px] font-medium text-[#475569] transition-colors hover:text-[#2563EB]">
        {group.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={group.href}
        className={cn(
          'block px-2 py-1 text-[13px] font-medium transition-colors',
          open ? 'text-[#2563EB]' : 'text-[#475569] hover:text-[#2563EB]'
        )}
      >
        {group.label}
      </Link>

      <div
        className={cn(
          'absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-lg transition-all',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        )}
      >
        {group.children.map((child) => (
          <Link
            key={child.href + child.label}
            href={child.href}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-[#475569] transition-colors hover:bg-[#F7F8FA] hover:text-[#2563EB]"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Mobile accordion
// ============================================================

function MobileAccordion({ group, onClose }: { group: MenuGroup; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (!group.children) {
    return (
      <Link href={group.href} onClick={onClose} className="block text-base font-medium text-[#475569] transition-colors hover:text-[#2563EB]">
        {group.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-base font-medium text-[#475569] transition-colors hover:text-[#2563EB]"
      >
        {group.label}
        <ChevronDown size={16} strokeWidth={1.5} className={cn('transition-transform', expanded && 'rotate-180')} />
      </button>
      {expanded && (
        <div className="mt-2 ml-4 space-y-2 border-l-2 border-[#E2E8F0] pl-4">
          {group.children.map((child) => (
            <Link
              key={child.href + child.label}
              href={child.href}
              onClick={onClose}
              className="block text-sm text-[#6B7280] transition-colors hover:text-[#2563EB]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Login dropdown
// ============================================================

function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser());
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(form.username, form.password);
    setLoading(false);
    if (res.success && res.user) {
      setUser(res.user);
      setOpen(false);
    } else {
      setError(res.message || 'Credenciales incorrectas.');
    }
  }

  function handleLogout() {
    setUser(null);
    setOpen(false);
    logout();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 rounded-[40px] px-5 py-2.5 text-sm font-semibold transition-all',
          user
            ? 'border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] hover:bg-[#2563EB]/10'
            : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
        )}
      >
        {user ? (
          <>
            <User size={16} strokeWidth={1.5} />
            {user.displayName.split(' ')[0]}
          </>
        ) : (
          <>
            <LogIn size={16} strokeWidth={1.5} />
            Area Privada
          </>
        )}
        <ChevronDown size={14} strokeWidth={1.5} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      <div
        className={cn(
          'absolute right-0 top-full z-50 mt-2 w-[300px] rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg transition-all',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        )}
      >
        {user ? (
          <div>
            <div className="mb-4 border-b border-[#E2E8F0] pb-4">
              <p className="text-sm font-bold text-[#0F172A]">{user.displayName}</p>
              <p className="text-xs text-[#6B7280]">{user.email}</p>
            </div>
            <div className="space-y-1">
              <Link
                href="/area-privada"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F7F8FA] hover:text-[#2563EB]"
              >
                <User size={14} strokeWidth={1.5} />
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={14} strokeWidth={1.5} />
                Cerrar sesion
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <p className="mb-4 text-sm font-bold text-[#0F172A]">Acceso colegiados</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Usuario o email"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F8FA] px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#6B7280] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                required
              />
              <input
                type="password"
                placeholder="Contrasena"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F7F8FA] px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#6B7280] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                required
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Iniciar sesion'}
              </Button>
            </div>
            <div className="mt-3 text-center">
              <Link href="/area-privada" onClick={() => setOpen(false)} className="text-xs text-[#2563EB] hover:underline">
                Mas opciones
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Mobile Login
// ============================================================

function MobileLogin({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser());
    }
  }, []);

  if (user) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg bg-[#F7F8FA] p-3">
          <p className="text-sm font-bold text-[#0F172A]">{user.displayName}</p>
          <p className="text-xs text-[#6B7280]">{user.email}</p>
        </div>
        <Link href="/area-privada" onClick={onClose}>
          <Button variant="outline" className="w-full">Mi Perfil</Button>
        </Link>
        <button
          onClick={() => { logout(); setUser(null); }}
          className="w-full text-center text-sm text-red-500 hover:underline"
        >
          Cerrar sesion
        </button>
      </div>
    );
  }

  return (
    <Link href="/area-privada" onClick={onClose}>
      <Button variant="institutional" className="w-full flex items-center justify-center gap-2">
        <LogIn size={16} strokeWidth={1.5} />
        Area Privada
      </Button>
    </Link>
  );
}

// ============================================================
// Header
// ============================================================

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[86px] border-b border-[#E2E8F0] bg-white/95 backdrop-blur-sm">
      <Container className="flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Colegio Oficial de Graduados Sociales de Madrid"
            width={180}
            height={49}
            className="h-auto w-[160px] lg:w-[180px] xl:w-[200px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex">
          {MENU.map((group) => (
            <DesktopDropdown key={group.label} group={group} />
          ))}
        </nav>

        {/* Desktop Area Privada */}
        <div className="hidden lg:block">
          <LoginDropdown />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0F172A] lg:hidden"
          aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-[86px] z-40 max-h-[calc(100vh-86px)] overflow-y-auto border-b border-[#E2E8F0] bg-white transition-all duration-300 lg:hidden',
          mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'
        )}
      >
        <Container className="py-6">
          <nav className="flex flex-col gap-4">
            {MENU.map((group) => (
              <MobileAccordion key={group.label} group={group} onClose={() => setMobileOpen(false)} />
            ))}
            <div className="mt-4 border-t border-[#E2E8F0] pt-4">
              <MobileLogin onClose={() => setMobileOpen(false)} />
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
