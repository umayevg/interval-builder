import { useState } from 'react'
import { Plus, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button/Button'
import { Input } from '../ui/input/Input'
import { Label } from '../ui/label/Label'
import { Exercise } from '../../types/types'

interface ExerciseFormProps {
	addExercise: (exercise: Exercise) => void
}

export default function ExerciseForm({ addExercise }: ExerciseFormProps) {
	const [newExercise, setNewExercise] = useState<Exercise>({
		name: '',
		workTime: 30,
		restTime: 10,
		rounds: 1,
	})

	const updateNewExercise = (field: keyof Exercise, value: string | number) => {
		setNewExercise({ ...newExercise, [field]: value })
	}

	const incrementValue = (field: keyof Exercise) => {
		setNewExercise(prev => ({
			...prev,
			[field]:
				typeof prev[field] === 'number'
					? (prev[field] as number) + 1
					: prev[field],
		}))
	}

	const decrementValue = (field: keyof Exercise) => {
		setNewExercise(prev => ({
			...prev,
			[field]:
				typeof prev[field] === 'number'
					? Math.max((prev[field] as number) - 1, 1)
					: prev[field],
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (newExercise.name) {
			addExercise(newExercise)
			setNewExercise({
				name: '',
				workTime: 30,
				restTime: 10,
				rounds: 1,
			})
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<Label htmlFor='exerciseName' className='text-gray-300'>
					Exercise Name
				</Label>
				<Input
					id='exerciseName'
					value={newExercise.name}
					onChange={e => updateNewExercise('name', e.target.value)}
					placeholder='e.g., Push-ups'
					className='bg-gray-700 border-gray-600 text-white placeholder-gray-400'
				/>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<div>
					<Label htmlFor='workTime' className='text-gray-300'>
						Work Time (s)
					</Label>
					<div className='flex items-center'>
						<Button
							type='button'
							onClick={() => decrementValue('workTime')}
							className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
						>
							<ChevronDown className='h-4 w-4' />
						</Button>
						<Input
							id='workTime'
							type='number'
							value={newExercise.workTime}
							onChange={e =>
								updateNewExercise('workTime', parseInt(e.target.value))
							}
							min={10}
							className='bg-gray-700 border-gray-600 text-white mx-2'
						/>
						<Button
							type='button'
							onClick={() => incrementValue('workTime')}
							className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
						>
							<ChevronUp className='h-4 w-4' />
						</Button>
					</div>
				</div>
				<div>
					<Label htmlFor='restTime' className='text-gray-300'>
						Rest Time (s)
					</Label>
					<div className='flex items-center'>
						<Button
							type='button'
							onClick={() => decrementValue('restTime')}
							className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
						>
							<ChevronDown className='h-4 w-4' />
						</Button>
						<Input
							id='restTime'
							type='number'
							value={newExercise.restTime}
							onChange={e =>
								updateNewExercise('restTime', parseInt(e.target.value))
							}
							min={0}
							className='bg-gray-700 border-gray-600 text-white mx-2'
						/>
						<Button
							type='button'
							onClick={() => incrementValue('restTime')}
							className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
						>
							<ChevronUp className='h-4 w-4' />
						</Button>
					</div>
				</div>
				<div>
					<Label htmlFor='rounds' className='text-gray-300'>
						Rounds
					</Label>
					<div className='flex items-center'>
						<Button
							type='button'
							onClick={() => decrementValue('rounds')}
							className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
						>
							<ChevronDown className='h-4 w-4' />
						</Button>
						<Input
							id='rounds'
							type='number'
							value={newExercise.rounds}
							onChange={e =>
								updateNewExercise('rounds', parseInt(e.target.value))
							}
							min={1}
							className='bg-gray-700 border-gray-600 text-white mx-2'
						/>
						<Button
							type='button'
							onClick={() => incrementValue('rounds')}
							className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
						>
							<ChevronUp className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
			<Button
				type='submit'
				className='w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200'
			>
				<Plus className='mr-2 h-4 w-4' /> Add Exercise
			</Button>
		</form>
	)
}
