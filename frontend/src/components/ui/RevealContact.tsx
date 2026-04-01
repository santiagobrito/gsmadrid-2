'use client';

import { useState } from 'react';
import { Mail, Phone, Eye } from 'lucide-react';

interface RevealContactProps {
  type: 'email' | 'phone';
  /** Base64-encoded value — NEVER pass raw email/phone */
  encoded: string;
}

function decode(encoded: string): string {
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return '';
  }
}

export function RevealContact({ type, encoded }: RevealContactProps) {
  const [revealed, setRevealed] = useState(false);
  const Icon = type === 'email' ? Mail : Phone;
  const label = type === 'email' ? 'Ver email' : 'Ver telefono';

  if (revealed) {
    const value = decode(encoded);
    const href = type === 'email' ? `mailto:${value}` : `tel:${value}`;
    return (
      <div className="flex items-center gap-3 text-sm text-[#475569]">
        <Icon size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
        <a href={href} className="hover:text-[#2563EB] transition-colors">{value}</a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon size={16} strokeWidth={1.5} className="shrink-0 text-[#6B7280]" />
      <button
        onClick={() => setRevealed(true)}
        className="inline-flex items-center gap-1.5 text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
      >
        <Eye size={14} strokeWidth={1.5} />
        {label}
      </button>
    </div>
  );
}
