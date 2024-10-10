// import React from 'react'

// interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function Card({ className, ...props }: CardProps) {
// 	return (
// 		<div
// 			className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
// 			{...props}
// 		/>
// 	)
// }

// interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function CardHeader({ className, ...props }: CardHeaderProps) {
// 	return (
// 		<div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
// 	)
// }

// interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

// export function CardTitle({ className, ...props }: CardTitleProps) {
// 	return (
// 		<h3
// 			className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
// 			{...props}
// 		/>
// 	)
// }

// interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function CardContent({ className, ...props }: CardContentProps) {
// 	return <div className={`p-6 pt-0 ${className}`} {...props} />
// }

import * as React from 'react'

import { cn } from '../../../lib/utils'

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'rounded-lg border bg-card text-card-foreground shadow-sm',
			className
		)}
		{...props}
	/>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col space-y-1.5 p-6', className)}
		{...props}
	/>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			'text-2xl font-semibold leading-none tracking-tight',
			className
		)}
		{...props}
	/>
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center p-6 pt-0', className)}
		{...props}
	/>
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
