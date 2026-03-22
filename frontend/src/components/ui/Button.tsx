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
    'bg-gradient-to-r from-[#2F5BEA] to-[#18B7B0] text-white shadow-[0_10px_25px_rgba(30,107,255,0.25)] hover:from-[#244FD1] hover:to-[#12A7A0] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]',
  outline:
    'border-[1.5px] border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white',
  institutional:
    'bg-[#1565C0] text-white hover:bg-[#0D47A1]',
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
    'inline-flex items-center justify-center gap-2 rounded-[40px] px-7 py-3 text-sm font-semibold transition-all duration-300',
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
