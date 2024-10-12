import React, { useState } from 'react'
import { Button } from '../ui/button/Button'
import { Input } from '../ui/input/Input'
import { Label } from '../ui/label/Label'
import { Plus, Minus } from 'lucide-react'
import { Exercise } from '../../types/types'
import { formatTime } from '../../lib/utils'

interface ExerciseFormProps {
	onAdd: (exercise: Exercise) => void
	title: string
}

export default function ExerciseForm({ onAdd, title }: ExerciseFormProps) {
	const [newExercise, setNewExercise] = useState<Exercise>({
		name: '',
		workTime: 30,
		restTime: 10,
		rounds: 1,
	})

	const updateNewExercise = (field: keyof Exercise, value: string | number) => {
		setNewExercise(prev => ({ ...prev, [field]: value }))
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (newExercise.name) {
			onAdd(newExercise)
			setNewExercise({ name: '', workTime: 30, restTime: 10, rounds: 1 })
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4 mb-6 mt-12'>
			<div className='flex sm:flex-row gap-4'>
				<div className='flex-1'>
					<Label htmlFor='exerciseName' className='text-gray-300 mb-2 block'>
						Exercise Name
					</Label>
					<Input
						id='exerciseName'
						autoComplete='off'
						value={newExercise.name}
						onChange={e => updateNewExercise('name', e.target.value)}
						placeholder='e.g., Push-ups'
						className='bg-gray-800 border-gray-700 text-white placeholder-gray-500'
					/>
				</div>
				<div>
					<Label htmlFor='rounds' className='text-gray-300 mb-2 block'>
						Rounds
					</Label>
					<div className='flex items-center'>
						<Button
							type='button'
							disabled={newExercise.rounds <= 1}
							onClick={() => decrementValue('rounds')}
							className='bg-gray-700 hover:bg-gray-600 text-white'
						>
							<Minus className='h-4 w-4' />
						</Button>
						<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 w-[50px] text-center rounded-md justify-center'>
							<span>{newExercise.rounds}</span>
						</span>
						<Button
							type='button'
							onClick={() => incrementValue('rounds')}
							className='bg-gray-700 hover:bg-gray-600 text-white'
						>
							<Plus className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
			<div className='flex flex-col sm:flex-row gap-4'>
				<div className='flex-1'>
					<Label htmlFor='workTime' className='text-gray-300 block mb-2'>
						Work Time
					</Label>
					<div className='flex items-center'>
						<Button
							type='button'
							disabled={newExercise.workTime <= 10}
							onClick={() => decrementValue('workTime', 5, 10)}
							className='bg-gray-700 hover:bg-gray-600 text-white'
						>
							<Minus className='h-4 w-4' />
						</Button>
						<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 w-full text-center rounded-md justify-center'>
							<span>{formatTime(newExercise.workTime)}</span>
						</span>
						<Button
							type='button'
							onClick={() => incrementValue('workTime', 5)}
							className='bg-gray-700 hover:bg-gray-600 text-white'
						>
							<Plus className='h-4 w-4' />
						</Button>
					</div>
				</div>
				<div className='flex-1'>
					<Label htmlFor='restTime' className='text-gray-300 mb-2 block'>
						Rest Time
					</Label>
					<div className='flex items-center'>
						<Button
							type='button'
							disabled={newExercise.restTime < 1}
							onClick={() => decrementValue('restTime', 5, 0)}
							className='bg-gray-700 hover:bg-gray-600 text-white'
						>
							<Minus className='h-4 w-4' />
						</Button>
						<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 w-full text-center rounded-md justify-center'>
							<span>{formatTime(newExercise.restTime)}</span>
						</span>
						<Button
							type='button'
							onClick={() => incrementValue('restTime', 5)}
							className='bg-gray-700 hover:bg-gray-600 text-white'
						>
							<Plus className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
			<Button
				type='submit'
				disabled={newExercise.name.length === 0}
				className='w-full bg-blue-600 hover:bg-blue-700 text-white text-md py-2 px-4 rounded'
			>
				<Plus className='mr-2 h-4 w-4' /> {title}
			</Button>
		</form>
	)
}
