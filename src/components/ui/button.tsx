
import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-sm',
  {
    variants: {
      variant: {
        primary: 'bg-games-blue text-white hover:bg-games-blue/90 focus:ring-2 focus:ring-games-blue/20',
        secondary: 'bg-games-slate text-games-navy hover:bg-games-silver focus:ring-2 focus:ring-games-navy/10',
        outline: 'border border-games-silver bg-transparent text-games-navy hover:bg-games-slate focus:ring-2 focus:ring-games-navy/10',
        ghost: 'bg-transparent text-games-navy hover:bg-games-slate focus:ring-2 focus:ring-games-navy/10',
        link: 'bg-transparent text-games-blue hover:underline p-0 h-auto shadow-none',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          variant !== 'link' && 'shadow-sm',
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span
          className={cn(
            "flex items-center gap-2",
            isLoading && 'opacity-0'
          )}
        >
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
