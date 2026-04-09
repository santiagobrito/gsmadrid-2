'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'gsmadrid_cookies_consent';

type ConsentValue = 'all' | 'necessary' | null;

function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CONSENT_KEY) as ConsentValue;
}

function setConsent(value: 'all' | 'necessary') {
  localStorage.setItem(CONSENT_KEY, value);
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function accept(value: 'all' | 'necessary') {
    setConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl sm:flex sm:items-center sm:gap-6">
        <div className="flex-1">
          <p className="text-sm text-[#475569]">
            Utilizamos cookies propias y analiticas para mejorar nuestros
            servicios. Puedes aceptar todas o solo las necesarias.{' '}
            <Link
              href="/politica-cookies"
              className="font-medium text-[#2563EB] hover:underline"
            >
              Mas informacion
            </Link>
          </p>
        </div>
        <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
          <button
            onClick={() => accept('necessary')}
            className="rounded-full border border-[#E2E8F0] px-5 py-2 text-sm font-medium text-[#475569] transition hover:border-[#94A3B8] hover:text-[#0F172A]"
          >
            Solo necesarias
          </button>
          <button
            onClick={() => accept('all')}
            className="rounded-full bg-gradient-to-r from-[#2F5BEA] to-[#18B7B0] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
