import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'gradient' | 'outline' | 'institutional';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, string> = {
  gradient:
    'bg-gradient-to-r from-[#2F5BEA] to-[#18B7B0] text-white hover:opacity-90 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white',
  institutional:
    'bg-[#0E111B] text-white hover:bg-[#1a1f2e]',
};

export function Button({
  children,
  variant = 'gradient',
  href,
  onClick,
  className,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-[40px] px-7 py-3 text-sm font-semibold transition-all duration-200',
    variantStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
