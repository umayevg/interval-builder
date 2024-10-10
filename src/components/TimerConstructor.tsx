'use client'

import { useState, useEffect, useRef } from 'react'
import {
	Volume2,
	VolumeX,
	Plus,
	Trash2,
	ChevronUp,
	ChevronDown,
	Play,
	Pause,
	StopCircle,
	// RotateCcw,
} from 'lucide-react'
import { Button } from './ui/button/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card/Card'
import { Input } from './ui/input/Input'
import { Label } from './ui/label/Label'
import { Switch } from './ui/switch/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs/Tabs'
import { Exercise } from '../types/types'
import { useTimer } from '../hooks/useTimer'
import { calculateTotalTime, formatTime } from '../lib/utils'

type Set = {
	exercises: Exercise[]
	totalRounds: number
	skipLastRest: boolean
}

export default function SportTimer() {
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
	const [newExercise, setNewExercise] = useState<Exercise>({
		name: '',
		workTime: 30,
		restTime: 10,
		rounds: 1,
	})
	const [isReady, setIsReady] = useState(false)
	const [readyCountdown, setReadyCountdown] = useState(5)

	const shortBeepRef = useRef<HTMLAudioElement | null>(null)
	const secondsShortBeepRef = useRef<HTMLAudioElement | null>(null)
	const longBeepRef = useRef<HTMLAudioElement | null>(null)

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
		// resetTimer,
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
		let interval: number
		if (isReady && readyCountdown > 0) {
			interval = setInterval(() => {
				setReadyCountdown(prev => prev - 1)
			}, 1000)
		} else if (isReady && readyCountdown === 0) {
			setIsReady(false)
			startTimer()
		}
		return () => clearInterval(interval)
	}, [isReady, readyCountdown, startTimer])

	useEffect(() => {
		if (isSoundEnabled && isRunning && !isPaused) {
			if (currentTime === 3) {
				shortBeepRef.current?.play()
			} else if (currentTime === 2) {
				secondsShortBeepRef.current?.play()
			} else if (currentTime === 1) {
				longBeepRef.current?.play()
			}
		}
	}, [currentTime, isSoundEnabled, isRunning, isPaused])

	const addExercise = () => {
		if (newExercise.name) {
			setSets(prevSets => {
				const newSets = [...prevSets]
				newSets[activeSet] = {
					...newSets[activeSet],
					exercises: [...newSets[activeSet].exercises, newExercise],
				}
				return newSets
			})
			setNewExercise({
				name: '',
				workTime: 30,
				restTime: 10,
				rounds: 1,
			})
		}
	}

	const removeExercise = (index: number) => {
		setSets(prevSets => {
			const newSets = [...prevSets]
			newSets[activeSet] = {
				...newSets[activeSet],
				exercises: newSets[activeSet].exercises.filter((_, i) => i !== index),
			}
			return newSets
		})
	}

	const updateNewExercise = (field: keyof Exercise, value: string | number) => {
		setNewExercise({ ...newExercise, [field]: value })
	}

	const incrementValue = (field: keyof Exercise, step: number = 1) => {
		setNewExercise(prev => ({
			...prev,
			[field]:
				typeof prev[field] === 'number'
					? (prev[field] as number) + step
					: prev[field],
		}))
	}

	const decrementValue = (
		field: keyof Exercise,
		step: number = 1,
		min: number = 1
	) => {
		setNewExercise(prev => ({
			...prev,
			[field]:
				typeof prev[field] === 'number'
					? Math.max((prev[field] as number) - step, min)
					: prev[field],
		}))
	}

	const handleStart = () => {
		setIsReady(true)
		setReadyCountdown(5)
	}

	const getBackgroundColor = () => {
		if (isReady) return 'bg-blue-600'
		if (isResting) return 'bg-red-600'
		return 'bg-green-600'
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

	return (
		<Card className='w-full max-w-3xl mx-auto bg-gray-900 text-white min-h-[600px]'>
			<CardHeader className='border-b border-gray-800'>
				<CardTitle className='text-3xl font-bold text-center text-white'>
					Interval Builder
				</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<Tabs
					value={`set-${activeSet}`}
					onValueChange={value => setActiveSet(Number(value.split('-')[1]))}
				>
					{!isRunning && !isReady && (
						<TabsList className='grid w-full grid-cols-3 mb-4'>
							<TabsTrigger value='set-0'>Set 1</TabsTrigger>
							<TabsTrigger value='set-1'>Set 2</TabsTrigger>
							<TabsTrigger value='set-2'>Set 3</TabsTrigger>
						</TabsList>
					)}
					{[0, 1, 2].map(setIndex => (
						<TabsContent key={setIndex} value={`set-${setIndex}`}>
							<div className='space-y-6'>
								{!isRunning && !isReady && (
									<>
										{sets[setIndex].exercises.length > 0 && (
											<div className='space-y-4'>
												<h3 className='text-lg font-semibold mb-2 text-gray-300'>
													Exercises
												</h3>
												<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
													{sets[setIndex].exercises.map((exercise, index) => (
														<Card
															key={index}
															className='bg-gray-800 border-gray-700'
														>
															<CardContent className='p-4'>
																<div className='flex justify-between items-center mb-2'>
																	<h4 className='font-medium text-lg text-white'>
																		{exercise.name}
																	</h4>
																	<span className='text-sm text-gray-400'>
																		x{exercise.rounds}
																	</span>
																</div>
																<div className='flex justify-between items-end text-sm text-gray-400'>
																	<div>
																		<p>Work: {exercise.workTime}s</p>
																		<p>Rest: {exercise.restTime}s</p>
																	</div>

																	<Button
																		variant='destructive'
																		className='p-0 w-8 h-8'
																		size='sm'
																		onClick={() => removeExercise(index)}
																	>
																		<Trash2 className='h-4 w-4' />
																	</Button>
																</div>
																{/* <Button
																	variant='destructive'
																	size='sm'
																	onClick={() => removeExercise(index)}
																	className='mt-2 w-full'
																>
																	<Trash2 className='h-4 w-4 mr-2' /> Remove
																</Button> */}
															</CardContent>
														</Card>
													))}
												</div>
											</div>
										)}
										<div className='space-y-4'>
											<div className='flex flex- sm:flex-row gap-4'>
												<div className='flex-1'>
													<Label
														htmlFor='exerciseName'
														className='text-gray-300'
													>
														Exercise Name
													</Label>
													<Input
														id='exerciseName'
														value={newExercise.name}
														onChange={e =>
															updateNewExercise('name', e.target.value)
														}
														placeholder='e.g., Push-ups'
														className='bg-gray-800 border-gray-700 text-white placeholder-gray-500'
													/>
												</div>
												<div>
													<Label htmlFor='rounds' className='text-gray-300'>
														Rounds
													</Label>
													<div className='flex items-center'>
														<Button
															disabled={newExercise.rounds <= 1}
															onClick={() => decrementValue('rounds')}
															className='bg-gray-700 hover:bg-gray-600'
														>
															<ChevronDown className='h-4 w-4' />
														</Button>
														<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 w-16 text-center rounded-md justify-center'>
															<span>{newExercise.rounds}</span>
														</span>
														<Button
															onClick={() => incrementValue('rounds')}
															className='bg-gray-700 hover:bg-gray-600'
														>
															<ChevronUp className='h-4 w-4' />
														</Button>
													</div>
												</div>
											</div>
											<div className='flex flex- sm:flex-row gap-4'>
												<div className='flex-1'>
													<Label htmlFor='workTime' className='text-gray-300'>
														Work Time
													</Label>
													<div className='flex items-center'>
														<Button
															disabled={newExercise.workTime <= 10}
															onClick={() => decrementValue('workTime', 5, 10)}
															className='bg-gray-700 hover:bg-gray-600'
														>
															<ChevronDown className='h-4 w-4' />
														</Button>
														<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 w-full text-center rounded-md justify-center'>
															<span>{newExercise.workTime}</span>
														</span>
														<Button
															onClick={() => incrementValue('workTime', 5)}
															className='bg-gray-700 hover:bg-gray-600'
														>
															<ChevronUp className='h-4 w-4' />
														</Button>
													</div>
												</div>
												<div className='flex-1'>
													<Label htmlFor='restTime' className='text-gray-300'>
														Rest Time
													</Label>
													<div className='flex items-center'>
														<Button
															disabled={newExercise.restTime < 1}
															onClick={() => decrementValue('restTime', 5, 0)}
															className='bg-gray-700 hover:bg-gray-600'
														>
															<ChevronDown className='h-4 w-4' />
														</Button>
														<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 w-full text-center rounded-md justify-center'>
															<span>{newExercise.restTime}</span>
														</span>
														<Button
															onClick={() => incrementValue('restTime', 5)}
															className='bg-gray-700 hover:bg-gray-600'
														>
															<ChevronUp className='h-4 w-4' />
														</Button>
													</div>
												</div>
											</div>
										</div>
										<Button
											onClick={addExercise}
											disabled={newExercise.name.length === 0}
											className='w-full bg-blue-600 hover:bg-blue-700'
										>
											<Plus className='mr-2 h-4 w-4' /> Add Exercise
										</Button>

										{sets[setIndex].exercises.length > 1 && (
											<div>
												<Label htmlFor='totalRounds' className='text-gray-300'>
													Total Rounds:
												</Label>
												<div className='flex items-center space-x-2'>
													<Button
														disabled={sets[setIndex].totalRounds === 1}
														onClick={() =>
															updateTotalRounds(sets[setIndex].totalRounds - 1)
														}
														className='bg-gray-700 hover:bg-gray-600'
													>
														<ChevronDown className='h-4 w-4' />
													</Button>
													<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 min-w-10 text-center rounded-md justify-center'>
														<span>{sets[setIndex].totalRounds}</span>
													</span>
													<Button
														onClick={() =>
															updateTotalRounds(sets[setIndex].totalRounds + 1)
														}
														className='bg-gray-700 hover:bg-gray-600'
													>
														<ChevronUp className='h-4 w-4' />
													</Button>
												</div>
											</div>
										)}
										<div>
											<h3 className='text-lg font-semibold text-gray-300'>
												Total Time
											</h3>
											<p className='text-2xl font-bold text-blue-400'>
												{formatTime(
													calculateTotalTime(
														sets[setIndex].exercises,
														sets[setIndex].totalRounds,
														sets[setIndex].skipLastRest
													)
												)}
											</p>
										</div>
										<div className='flex items-center space-x-2'>
											<Switch
												id='skip-last-rest'
												checked={sets[setIndex].skipLastRest}
												onCheckedChange={toggleSkipLastRest}
											/>
											<Label htmlFor='skip-last-rest' className='text-gray-300'>
												Skip last rest
											</Label>
										</div>
									</>
								)}
							</div>
						</TabsContent>
					))}
				</Tabs>

				{(isRunning || isReady) && (
					<div
						className={`text-center p-6 rounded-lg transition-colors duration-300 ${getBackgroundColor()} 
            min-h-[300px] flex flex-col justify-center`}
					>
						{isReady ? (
							<>
								<h2 className='text-3xl font-bold mb-4'>Get Ready!</h2>
								<p className='text-8xl font-bold mb-4'>{readyCountdown}</p>
							</>
						) : (
							<>
								{/* <h2 className='text-2xl font-bold mb-4'>
									{isResting ? 'Rest' : 'Work'}
								</h2>
								<p className='text-6xl font-bold mb-4'>
									{formatTime(currentTime)}
								</p>
								<p className='text-xl mb-2'>
									Exercise: {sets[activeSet].exercises[currentExercise]?.name}
								</p>
								<p className='text-xl mb-2'>
									Exercise Round: {currentExerciseRound}/
									{sets[activeSet].exercises[currentExercise]?.rounds}
								</p>
								<p className='text-xl mb-4'>
									Total Round: {currentRound}/{sets[activeSet].totalRounds}
								</p> */}

								<h2 className='text-3xl font-bold'>
									{isResting
										? 'Rest'
										: sets[activeSet].exercises[currentExercise]?.name}
								</h2>
								<p className='text-xl mb-4'>
									{currentExerciseRound}/
									{sets[activeSet].exercises[currentExercise]?.rounds}
								</p>
								<p className='text-8xl font-bold mb-4'>
									{formatTime(currentTime)}
								</p>

								<p className='text-xl mt-8'>
									Set: {currentRound}/{sets[activeSet].totalRounds}
								</p>
							</>
						)}
					</div>
				)}
				{/* Controls */}
				<div className='flex flex-wrap justify-center gap-2 mt-6'>
					{sets[activeSet].exercises.length > 0 && (
						<>
							{!isRunning && !isReady && (
								<Button
									onClick={handleStart}
									disabled={isRunning || sets[activeSet].exercises.length === 0}
									className='bg-green-600 hover:bg-green-700'
								>
									<Play className='mr-2 h-4 w-4' /> Start
								</Button>
							)}
							{isRunning && (
								<>
									<Button
										onClick={pauseTimer}
										disabled={!isRunning}
										className='bg-yellow-600 hover:bg-yellow-700'
									>
										{isPaused ? (
											<Play className='mr-2 h-4 w-4' />
										) : (
											<Pause className='mr-2 h-4 w-4' />
										)}
										{isPaused ? 'Resume' : 'Pause'}
									</Button>
									<Button
										onClick={stopTimer}
										disabled={!isRunning && !isPaused}
										className='bg-red-600 hover:bg-red-700'
									>
										<StopCircle className='mr-2 h-4 w-4' /> Stop
									</Button>
								</>
							)}

							{/* <Button
								onClick={resetTimer}
								className='bg-gray-600 hover:bg-gray-700'
							>
								<RotateCcw className='mr-2 h-4 w-4' /> Reset
							</Button> */}
						</>
					)}
					<Button
						onClick={toggleSound}
						className='bg-purple-600 hover:bg-purple-700'
					>
						{isSoundEnabled ? (
							<Volume2 className='h-4 w-4' />
						) : (
							<VolumeX className='h-4 w-4' />
						)}
					</Button>
				</div>
				{/* End Controls */}
				<audio ref={shortBeepRef} preload='auto'>
					<source src='/sounds/short-beep.mp3' type='audio/mpeg' />
				</audio>
				<audio ref={secondsShortBeepRef} preload='auto'>
					<source src='/sounds/short-beep.mp3' type='audio/mpeg' />
				</audio>
				<audio ref={longBeepRef} preload='auto'>
					<source src='/sounds/long-beep.mp3' type='audio/mpeg' />
				</audio>
			</CardContent>
		</Card>
	)
}
