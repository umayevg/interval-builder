// import { LabelHTMLAttributes } from 'react'

// interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
// 	htmlFor: string
// }

// export function Label({ htmlFor, children, className, ...props }: LabelProps) {
// 	return (
// 		<label
// 			htmlFor={htmlFor}
// 			className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
// 			{...props}
// 		>
// 			{children}
// 		</label>
// 	)
// }

'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../../lib/utils'

const labelVariants = cva(
	'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
