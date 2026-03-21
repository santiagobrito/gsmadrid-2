import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[16px] border border-[#E2E8F0] bg-white p-6',
        'transition-all duration-300',
        hover && 'hover:-translate-y-[6px] hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
