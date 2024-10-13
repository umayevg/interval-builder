import { Card, CardContent } from '../ui/card/Card'
// import { Button } from '../ui/button/Button'
import { Timer } from 'lucide-react'
import { Exercise } from '../../types/types'
import { formatTime } from '../../lib/utils'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

interface ExerciseListProps {
	exercises: Exercise[]
	onRemove: (index: number) => void
}

export default function ExerciseList({
	exercises,
	onRemove,
}: ExerciseListProps) {
	const { t } = useTranslation()
	if (exercises.length === 0) return null

	return (
		<div className='space-y-4 mb-6'>
			<h3 className='text-lg font-semibold text-gray-300'>
				{t('labels.exercises')}
			</h3>
			<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{exercises.map((exercise, index) => (
					<Card
						key={index}
						className='bg-gray-800 transition-all duration-150 hover:border-blue-800 border-transparent'
					>
						<CardContent className='p-4 pt-2 pb-2'>
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
									<Cross1Icon
										className='h-4 w-4 hover:text-red-500 duration-200 cursor-pointer'
										onClick={() => onRemove(index)}
									/>
								</span>
							</div>
							<div className='flex justify-between text-sm text-gray-600 '>
								<div className='flex justify-between items-center'>
									<span>
										W: {formatTime(exercise.workTime)} | R:{' '}
										{formatTime(exercise.restTime)}
									</span>
								</div>
								<div>
									<Timer className='w-4 h-4 mr-1 inline-block mb-1' />
									<span>
										{formatTime(
											(exercise.workTime + exercise.restTime) * exercise.rounds
										)}
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
