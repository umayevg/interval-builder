import { Exercise } from '../types/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// export const calculateTotalTime = (
// 	exercises: Exercise[],
// 	totalRounds: number
// ): number => {
// 	return (
// 		exercises.reduce((total, exercise) => {
// 			return total + (exercise.workTime + exercise.restTime) * exercise.rounds
// 		}, 0) * totalRounds
// 	)
// }

export const calculateTotalTime = (
	exercises: Exercise[],
	totalRounds: number,
	skipLastRest: boolean
): number => {
	return exercises.reduce((total, exercise, index) => {
		const isLastExercise = index === exercises.length - 1
		const totalExerciseTime =
			(exercise.workTime + exercise.restTime) * exercise.rounds

		if (isLastExercise && skipLastRest) {
			const lastRoundRestTime = exercise.restTime
			return (total + totalExerciseTime) * totalRounds - lastRoundRestTime
		}

		return (total + totalExerciseTime) * totalRounds
	}, 0)
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
