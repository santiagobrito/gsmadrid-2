'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

// Hardcoded fallback — used when WordPress menu is unavailable
export const FALLBACK_NAV = [
  { label: 'El Colegio', href: '/el-colegio' },
  { label: 'Hazte Colegiado', href: '/hazte-colegiado' },
  { label: 'Servicios', href: '/servicios-colegiado' },
  { label: 'Formacion', href: '/formacion-eventos' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Actualidad', href: '/actualidad' },
  { label: 'Directorio', href: '/directorio' },
];

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
}

export function Header({ navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = navItems && navItems.length > 0 ? navItems : FALLBACK_NAV;

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
            className="h-auto w-[160px] lg:w-[180px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:gap-3 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1 text-sm font-medium text-[#475569] transition-colors hover:text-[#2563EB]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button variant="institutional" href="/area-privada">
            Area Privada
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0F172A] lg:hidden"
          aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
        >
          {mobileOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-[86px] z-40 border-b border-[#E2E8F0] bg-white transition-all duration-300 lg:hidden',
          mobileOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 pointer-events-none opacity-0'
        )}
      >
        <Container className="py-6">
          <nav className="flex flex-col gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-[#475569] transition-colors hover:text-[#2563EB]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-[#E2E8F0] pt-4">
              <Button variant="institutional" href="/area-privada" className="w-full">
                Area Privada
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
