// import * as React from 'react'

// interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
// 	value: number
// 	max?: number
// 	indicatorClassName?: string
// }

// const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
// 	({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
// 		const percentage = (value / max) * 100

// 		return (
// 			<div
// 				ref={ref}
// 				role='progressbar'
// 				aria-valuemin={0}
// 				aria-valuemax={max}
// 				aria-valuenow={value}
// 				className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
// 				{...props}
// 			>
// 				<div
// 					className={`h-full w-full flex-1 bg-primary transition-all ${indicatorClassName}`}
// 					style={{ transform: `translateX(-${100 - percentage}%)` }}
// 				/>
// 			</div>
// 		)
// 	}
// )

// Progress.displayName = 'Progress'

// export { Progress }
'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '../../../lib/utils'

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
			className
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className='h-full w-full flex-1 bg-primary transition-all'
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
