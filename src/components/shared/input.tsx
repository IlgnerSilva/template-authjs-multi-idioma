import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, children, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn('outline-hidden px-3 py-3 w-full bg-transparent')}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

const InputGroup = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentProps<'div'>
>(({ className, children, ...props }, ref) => (
	<div
		className={cn(
			'flex items-center px-2 gap-2  rounded-xl border border-slate-200 bg-neutral-base-300  text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-within:ring-2',
			className,
		)}
	>
		{children}
	</div>
));
export { Input, InputGroup };
