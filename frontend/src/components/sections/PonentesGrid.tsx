import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Linkedin, Globe } from 'lucide-react';

export interface Ponente {
  nombre: string;
  cargo: string;
  bio?: string;
  foto?: string;
  linkedin?: string;
  web?: string;
}

interface PonentesGridProps {
  ponentes: Ponente[];
}

export function PonentesGrid({ ponentes }: PonentesGridProps) {
  if (!ponentes.length) return null;

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-text">Ponentes</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ponentes.map((p) => (
          <Card key={p.nombre} className="flex items-start gap-4">
            {/* Photo */}
            {p.foto ? (
              <Image
                src={p.foto}
                alt={p.nombre}
                width={80}
                height={80}
                className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
                {p.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
            )}

            {/* Info */}
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-text">{p.nombre}</h3>
              <p className="text-sm text-primary">{p.cargo}</p>
              {p.bio && (
                <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">{p.bio}</p>
              )}
              {/* Links */}
              {(p.linkedin || p.web) && (
                <div className="mt-2 flex gap-2">
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-tertiary transition hover:border-primary hover:text-primary"
                      aria-label={`LinkedIn de ${p.nombre}`}
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  {p.web && (
                    <a
                      href={p.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-text-tertiary transition hover:border-primary hover:text-primary"
                      aria-label={`Web de ${p.nombre}`}
                    >
                      <Globe size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
