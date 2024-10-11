import { Exercise } from '../types/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const calculateTotalTime = (
	exercises: Exercise[],
	totalRounds: number,
	skipLastRest: boolean
): number => {
	if (exercises.length === 0) return 0

	const singleRoundTime = exercises.reduce((total, exercise, index) => {
		const isLastExercise = index === exercises.length - 1
		const exerciseTime = exercise.workTime * exercise.rounds
		const restTime =
			exercise.restTime *
			(exercise.rounds - (isLastExercise && skipLastRest ? 1 : 0))

		return total + exerciseTime + restTime
	}, 0)

	const totalTime = singleRoundTime * totalRounds

	if (totalRounds > 1 && skipLastRest) {
		const lastExercise = exercises[exercises.length - 1]
		const lastRestTime = lastExercise.restTime
		return totalTime + lastRestTime * (totalRounds - 1)
	}

	return totalTime
}

export const calculateTotalWorkTime = (
	exercises: Exercise[],
	totalRounds: number
): number => {
	return (
		exercises.reduce((total, exercise) => {
			return total + exercise.workTime * exercise.rounds
		}, 0) * totalRounds
	)
}

export const formatTime = (time: number): string => {
	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
