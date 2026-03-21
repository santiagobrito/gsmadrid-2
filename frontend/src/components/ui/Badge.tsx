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
  institutional: 'bg-[#0E111B] text-white',
  formacion: 'bg-[#2563EB]/10 text-[#2563EB]',
  eventos: 'bg-[#2BD4C7]/10 text-[#0E111B]',
  colegio: 'bg-[#1565C0]/10 text-[#1565C0]',
  activo: 'bg-[#16A34A]/10 text-[#16A34A]',
  pendiente: 'bg-[#D97706]/10 text-[#D97706]',
};

export function Badge({
  children,
  color = 'institutional',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wider',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
}
