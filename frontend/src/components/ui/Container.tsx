import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}

export function Container({ children, narrow = false, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-[800px]' : 'max-w-[1200px]',
        className
      )}
    >
      {children}
    </div>
  );
}
