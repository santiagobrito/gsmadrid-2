import { cn } from '@/lib/utils/cn';

type BadgeColor =
  | 'institutional'
  | 'formacion'
  | 'eventos'
  | 'colegio'
  | 'activo'
  | 'pendiente';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  institutional: 'bg-[rgba(79,168,255,0.15)] text-[#4FA8FF]',
  formacion: 'bg-[rgba(43,212,199,0.15)] text-[#2BD4C7]',
  eventos: 'bg-[rgba(0,229,255,0.15)] text-[#00B8CC]',
  colegio: 'bg-[rgba(21,101,192,0.12)] text-[#1565C0]',
  activo: 'bg-[rgba(22,163,74,0.1)] text-[#16A34A]',
  pendiente: 'bg-[rgba(217,119,6,0.1)] text-[#D97706]',
};

export function Badge({
  children,
  color = 'institutional',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-[14px] py-[5px] text-[12px] font-semibold uppercase tracking-[0.08em]',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
}
