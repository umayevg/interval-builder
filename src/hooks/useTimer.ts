import { useState, useEffect, useCallback } from 'react'
import { Exercise } from '../types/types'

export function useTimer(
	exercises: Exercise[],
	totalRounds: number,
	skipLastRest: boolean
) {
	const [currentExercise, setCurrentExercise] = useState(0)
	const [currentRound, setCurrentRound] = useState(1)
	const [currentExerciseRound, setCurrentExerciseRound] = useState(1)
	const [currentTime, setCurrentTime] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [isResting, setIsResting] = useState(false)
	const [isSoundEnabled, setIsSoundEnabled] = useState(true)

	const startTimer = useCallback(() => {
		setIsRunning(true)
		setIsPaused(false)
		setCurrentTime(exercises[0]?.workTime || 0)
	}, [exercises])

	const pauseTimer = useCallback(() => {
		setIsPaused(prev => !prev)
	}, [])

	const stopTimer = useCallback(() => {
		setIsRunning(false)
		setIsPaused(false)
		setCurrentExercise(0)
		setCurrentRound(1)
		setCurrentExerciseRound(1)
		setCurrentTime(exercises[0]?.workTime || 0)
		setIsResting(false)
	}, [exercises])

	// const resetTimer = useCallback(() => {
	// 	stopTimer()
	// }, [stopTimer])

	const toggleSound = useCallback(() => {
		setIsSoundEnabled(prev => !prev)
	}, [])

	const isLastExercise = currentExercise === exercises.length - 1
	const isLastExerciseRound =
		currentExerciseRound === exercises[currentExercise]?.rounds
	const isLastTotalRound = currentRound === totalRounds

	useEffect(() => {
		let interval: number

		if (isRunning && !isPaused) {
			interval = setInterval(() => {
				setCurrentTime(prevTime => {
					if (prevTime > 1) {
						return prevTime - 1
					}

					const currentEx = exercises[currentExercise]

					if (isResting) {
						// Check if it's the last rest that should be skipped
						if (
							skipLastRest &&
							isLastExercise &&
							isLastExerciseRound &&
							isLastTotalRound
						) {
							stopTimer()
							return 1
						}

						setIsResting(false)
						if (currentExerciseRound < currentEx.rounds) {
							setCurrentExerciseRound(prev => prev + 1)
							return currentEx.workTime
						} else {
							setCurrentExerciseRound(1)
							if (currentExercise < exercises.length - 1) {
								setCurrentExercise(prev => prev + 1)
								return exercises[currentExercise + 1].workTime
							} else {
								if (currentRound < totalRounds) {
									setCurrentRound(prev => prev + 1)
									setCurrentExercise(0)
									return exercises[0].workTime
								} else {
									stopTimer()
									return 1
								}
							}
						}
					} else {
						setIsResting(true)
						return currentEx.restTime
					}
				})
			}, 1000)
		}

		return () => clearInterval(interval)
	}, [
		isRunning,
		isPaused,
		currentTime,
		exercises,
		currentExercise,
		currentRound,
		currentExerciseRound,
		totalRounds,
		isResting,
		skipLastRest,
		stopTimer,
		isLastExercise,
		isLastExerciseRound,
		isLastTotalRound,
	])

	return {
		isRunning,
		isPaused,
		isSoundEnabled,
		currentTime,
		currentExercise,
		currentRound,
		currentExerciseRound,
		isResting,
		startTimer,
		pauseTimer,
		stopTimer,
		// resetTimer,
		toggleSound,
	}
}
