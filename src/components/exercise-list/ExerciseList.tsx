import { Card, CardContent } from '../ui/card/Card'
// import { Button } from '../ui/button/Button'
import { Timer, Trash2 } from 'lucide-react'
import { Exercise } from '../../types/types'
import { formatTime } from '../../lib/utils'

interface ExerciseListProps {
	exercises: Exercise[]
	onRemove: (index: number) => void
}

export default function ExerciseList({
	exercises,
	onRemove,
}: ExerciseListProps) {
	if (exercises.length === 0) return null

	return (
		<div className='space-y-4 mb-6'>
			<h3 className='text-lg font-semibold text-gray-300'>Exercises</h3>
			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{exercises.map((exercise, index) => (
					<Card key={index} className='bg-gray-800 border-gray-700'>
						<CardContent className='p-4'>
							<div className='flex justify-between items-center mb-2'>
								<h4 className='font-medium text-lg text-white ellipsis-custom'>
									{exercise.name}{' '}
									<span className='text-gray-500 text-sm'>
										(x{exercise.rounds})
									</span>
								</h4>
								<span className='text-sm text-gray-300'>
									{/* <Button
										variant='destructive'
										className='p-0 w-8 h-8 bg-red-700 hover:bg-red-900'
										size='sm'
										onClick={() => onRemove(index)}
									>
										<Trash2 className='h-4 w-4' />
									</Button> */}
									<Trash2
										className='h-4 w-4 hover:text-red-300 cursor-pointer'
										onClick={() => onRemove(index)}
									/>
								</span>
							</div>
							<div className='flex justify-between items-end text-sm text-gray-400'>
								<div className='flex items-center'>
									<Timer className='w-4 h-4 mr-1 inline-block' />
									<span>
										{formatTime(exercise.workTime + exercise.restTime)}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
