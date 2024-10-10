import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button/Button'
import { Exercise } from '../../types/types'

interface ExerciseListProps {
	exercises: Exercise[]
	removeExercise: (index: number) => void
}

export default function ExerciseList({
	exercises,
	removeExercise,
}: ExerciseListProps) {
	if (exercises.length === 0) {
		return null
	}

	return (
		<div className='mt-6'>
			<h3 className='text-lg font-semibold mb-2 text-gray-300'>Exercises</h3>
			{exercises.map((exercise, index) => (
				<div
					key={index}
					className='flex items-center justify-between py-2 border-b border-gray-700'
				>
					<div className='text-gray-300'>
						<span className='font-medium'>{exercise.name}</span> -{' '}
						{exercise.workTime}s work, {exercise.restTime}s rest,{' '}
						{exercise.rounds} rounds
					</div>
					<Button
						variant='destructive'
						size='icon'
						onClick={() => removeExercise(index)}
						className='transition-colors duration-200'
					>
						<Trash2 className='h-4 w-4' />
					</Button>
				</div>
			))}
		</div>
	)
}
