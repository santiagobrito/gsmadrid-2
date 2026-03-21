import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-12', className)}>
      {badge && (
        <div className={cn('mb-4', centered && 'flex justify-center')}>
          <Badge color="formacion">{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[#475569]">{subtitle}</p>
      )}
    </div>
  );
}
