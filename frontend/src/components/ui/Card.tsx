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
        'rounded-[16px] border border-[#E2E8F0] bg-white p-7 shadow-[0_1px_2px_rgba(14,17,27,0.04)]',
        'transition-all duration-[400ms]',
        hover && 'hover:-translate-y-[6px] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]',
        className
      )}
    >
      {children}
    </div>
  );
}
