import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs/Tabs'
import ExerciseList from './exercise-list/ExerciseList'
import ExerciseForm from './exercise-form/ExerciseForm'
import TotalTime from './totaltime/TotalTime'
import SkipLastRestToggle from './skiplastrest/SkipLastRestToggle'
import TimerDisplay from './display/TimerDisplay'
import Controls from './controls/TimerControls'
import { Exercise, Set } from '../types/types'
import { useTimer } from '../hooks/useTimer'
import TotalRounds from './totalrounds/TotalRounds'

export default function TimerConstructor() {
	const [sets, setSets] = useState<Set[]>(() => {
		const savedSets = localStorage.getItem('sets')
		return savedSets
			? JSON.parse(savedSets)
			: [
					{ exercises: [], totalRounds: 1, skipLastRest: false },
					{ exercises: [], totalRounds: 1, skipLastRest: false },
					{ exercises: [], totalRounds: 1, skipLastRest: false },
			  ]
	})
	const [activeSet, setActiveSet] = useState(0)
	const [isReady, setIsReady] = useState(false)
	const [readyCountdown, setReadyCountdown] = useState(5)

	const shortBeepRef1 = useRef<HTMLAudioElement | null>(null)
	const shortBeepRef2 = useRef<HTMLAudioElement | null>(null)
	const shortBeepRef3 = useRef<HTMLAudioElement | null>(null)
	const shortBeepRef4 = useRef<HTMLAudioElement | null>(null)

	const longBeepRef = useRef<HTMLAudioElement | null>(null)

	const [audioInitialized, setAudioInitialized] = useState(false)

	const {
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
		toggleSound,
	} = useTimer(
		sets[activeSet].exercises,
		sets[activeSet].totalRounds,
		sets[activeSet].skipLastRest
	)

	useEffect(() => {
		localStorage.setItem('sets', JSON.stringify(sets))
	}, [sets])

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null
		if (isReady && readyCountdown > 0) {
			interval = setInterval(() => {
				setReadyCountdown(prev => prev - 1)
			}, 1000)
		} else if (isReady && readyCountdown === 0) {
			setIsReady(false)
			startTimer()
		}
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isReady, readyCountdown, startTimer])

	const addExercise = (exercise: Exercise) => {
		setSets(prevSets => {
			const newSets = [...prevSets]
			newSets[activeSet] = {
				...newSets[activeSet],
				exercises: [...newSets[activeSet].exercises, exercise],
			}
			return newSets
		})
	}

	const removeExercise = (index: number) => {
		setSets(prevSets => {
			const newSets = [...prevSets]
			const exercises = newSets[activeSet].exercises.filter(
				(_, i) => i !== index
			)
			newSets[activeSet] = {
				...newSets[activeSet],
				totalRounds: exercises.length < 2 ? 1 : newSets[activeSet].totalRounds,
				exercises: exercises,
			}
			return newSets
		})
	}

	const updateTotalRounds = (value: number) => {
		setSets(prevSets => {
			const newSets = [...prevSets]
			newSets[activeSet] = {
				...newSets[activeSet],
				totalRounds: Math.max(1, value),
			}
			return newSets
		})
	}

	const toggleSkipLastRest = () => {
		setSets(prevSets => {
			const newSets = [...prevSets]
			newSets[activeSet] = {
				...newSets[activeSet],
				skipLastRest: !newSets[activeSet].skipLastRest,
			}
			return newSets
		})
	}

	const resetPreset = () => {
		setSets(prevSets => {
			const newSets = [...prevSets]
			newSets[activeSet] = {
				exercises: [],
				totalRounds: 1,
				skipLastRest: false,
			}
			return newSets
		})
	}

	useEffect(() => {
		if (isSoundEnabled && isRunning && !isPaused && audioInitialized) {
			if (currentTime === 5) {
				shortBeepRef4.current
					?.play()
					.catch(error => console.error('Error playing short beep:', error))
			} else if (currentTime === 4) {
				shortBeepRef3.current
					?.play()
					.catch(error => console.error('Error playing short beep:', error))
			} else if (currentTime === 3) {
				shortBeepRef2.current
					?.play()
					.catch(error => console.error('Error playing short beep:', error))
			} else if (currentTime === 2) {
				shortBeepRef1.current
					?.play()
					.catch(error => console.error('Error playing short beep:', error))
			} else if (currentTime === 1) {
				longBeepRef.current
					?.play()
					.catch(error => console.error('Error playing long beep:', error))
			}
		}
	}, [currentTime, isSoundEnabled, isRunning, isPaused, audioInitialized])

	const initializeAudio = () => {
		setAudioInitialized(true)
		// shortBeepRef.current?.load()
		shortBeepRef1.current?.load()
		shortBeepRef2.current?.load()
		shortBeepRef3.current?.load()
		shortBeepRef4.current?.load()
		longBeepRef.current?.load()
	}

	const handleStart = () => {
		initializeAudio()
		setIsReady(true)
		setReadyCountdown(5)
	}

	return (
		<Card className='w-full max-w-3xl mx-auto bg-gray-900 text-white'>
			<CardHeader className='border-b border-gray-800'>
				<CardTitle className='text-2xl font-bold text-gray-300'>
					Interval Builder
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<Tabs
					value={`set-${activeSet}`}
					onValueChange={value => setActiveSet(Number(value.split('-')[1]))}
				>
					{!isRunning && !isReady && (
						<TabsList className='grid w-full grid-cols-3 mb-4 bg-slate-800'>
							<TabsTrigger value='set-0'>Set 1</TabsTrigger>
							<TabsTrigger value='set-1'>Set 2</TabsTrigger>
							<TabsTrigger value='set-2'>Set 3</TabsTrigger>
						</TabsList>
					)}
					{[0, 1, 2].map(setIndex => (
						<TabsContent key={setIndex} value={`set-${setIndex}`}>
							{!isRunning && !isReady && (
								<>
									<ExerciseForm
										onAdd={addExercise}
										title={
											sets[setIndex].exercises.length > 0
												? 'Add more exercises'
												: 'Add'
										}
									/>
									<ExerciseList
										exercises={sets[setIndex].exercises}
										onRemove={removeExercise}
									/>
									{sets[setIndex].exercises.length > 1 && (
										<TotalRounds
											totalRounds={sets[setIndex].totalRounds}
											onUpdate={updateTotalRounds}
										/>
									)}
									<div className='flex justify-between'>
										<TotalTime
											exercises={sets[setIndex].exercises}
											totalRounds={sets[setIndex].totalRounds}
											skipLastRest={sets[setIndex].skipLastRest}
										/>
										<SkipLastRestToggle
											checked={sets[setIndex].skipLastRest}
											onToggle={toggleSkipLastRest}
										/>
									</div>
								</>
							)}
						</TabsContent>
					))}
				</Tabs>
				{(isRunning || isReady) && (
					<TimerDisplay
						isReady={isReady}
						readyCountdown={readyCountdown}
						isResting={isResting}
						currentExercise={sets[activeSet].exercises[currentExercise]}
						currentExerciseRound={currentExerciseRound}
						currentRound={currentRound}
						totalRounds={sets[activeSet].totalRounds}
						currentTime={currentTime}
					/>
				)}
				<Controls
					exercises={sets[activeSet].exercises}
					isRunning={isRunning}
					isPaused={isPaused}
					isReady={isReady}
					isSoundEnabled={isSoundEnabled}
					onStart={handleStart}
					onPause={pauseTimer}
					onStop={stopTimer}
					onReset={resetPreset}
					onToggleSound={toggleSound}
					onAudioInit={initializeAudio}
				/>
				<audio ref={shortBeepRef1} preload='auto'>
					<source src='/sounds/short-beep.mp3' type='audio/mpeg' />
					<source src='/sounds/short-beep.ogg' type='audio/ogg' />
				</audio>
				<audio ref={shortBeepRef2} preload='auto'>
					<source src='/sounds/short-beep.mp3' type='audio/mpeg' />
					<source src='/sounds/short-beep.ogg' type='audio/ogg' />
				</audio>
				<audio ref={shortBeepRef3} preload='auto'>
					<source src='/sounds/short-beep.mp3' type='audio/mpeg' />
					<source src='/sounds/short-beep.ogg' type='audio/ogg' />
				</audio>
				<audio ref={shortBeepRef4} preload='auto'>
					<source src='/sounds/short-beep.mp3' type='audio/mpeg' />
					<source src='/sounds/short-beep.ogg' type='audio/ogg' />
				</audio>
				<audio ref={longBeepRef} preload='auto'>
					<source src='/sounds/long-beep.mp3' type='audio/mpeg' />
					<source src='/sounds/long-beep.ogg' type='audio/ogg' />
				</audio>
			</CardContent>
		</Card>
	)
}
