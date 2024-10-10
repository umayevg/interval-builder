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
	// Calculate the total time for one round of all exercises
	const totalTimeForOneRound = exercises.reduce((total, exercise) => {
		return total + (exercise.workTime + exercise.restTime) * exercise.rounds
	}, 0)

	// Total time for all rounds
	let totalTime = totalTimeForOneRound * totalRounds

	// If skipping the last rest, subtract the rest time of the last exercise (only once)
	if (skipLastRest) {
		const lastExercise = exercises[exercises.length - 1]
		totalTime -= lastExercise.restTime // Only subtract rest time once
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
