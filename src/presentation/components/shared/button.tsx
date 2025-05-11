import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isLoading?: boolean;
	variant?: 'primary' | 'secondary' | 'provider';
};

type TextProps = HTMLAttributes<HTMLSpanElement>;

function Button({
	children,
	className,
	isLoading = false,
	variant,
	...rest
}: ButtonProps) {
	return (
		<button
			disabled={isLoading}
			className={`
				flex justify-center gap-2 items-center h-10 max-h-10 py-3 rounded-xl w-full cursor-pointer
				${isLoading ? 'cursor-not-allowed opacity-50' : ''} 
				${variant === 'primary' ? 'bg-primary-blue text-neutral-base-100' : ''} 
				${variant === 'provider' ? 'bg-neutral-base-100 ring-2 ring-neutral-base-200 font-bold' : ''}
				${className} `}
			{...rest}
		>
			{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
		</button>
	);
}

function Title({ children, className }: TextProps) {
	return <span className={`font-bold ${className}`}>{children}</span>;
}

function Icon({ children, className }: TextProps) {
	return <span>{children}</span>;
}

Button.Title = Title;
Button.Icon = Icon;
export { Button };
