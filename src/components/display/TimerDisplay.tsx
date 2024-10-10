import { Label } from '../ui/label/Label'
import { Progress } from '../ui/progress/Progress'
import { Exercise } from '../../types/types'

interface TimerDisplayProps {
	currentTime: number
	isResting: boolean
	exercises: Exercise[]
	currentExercise: number
	currentRound: number
	totalRounds: number
	elapsedTime: number
	totalWorkTime: number
	calculateTotalTime: () => number
}

export default function TimerDisplay({
	currentTime,
	isResting,
	exercises,
	currentExercise,
	currentRound,
	totalRounds,
	elapsedTime,
	totalWorkTime,
	calculateTotalTime,
}: TimerDisplayProps) {
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`
	}

	return (
		<div
			className={`text-center p-6 rounded-lg transition-colors duration-500 ${
				isResting ? 'bg-blue-900' : 'bg-red-900'
			}`}
		>
			<h4 className='text-2xl font-bold mb-2'>{isResting ? 'Rest' : 'Work'}</h4>
			<p className='text-5xl font-bold mb-4 text-blue-400'>
				{formatTime(currentTime)}
			</p>
			<p className='text-lg mb-2'>
				Exercise:{' '}
				<span className='font-semibold text-green-400'>
					{exercises[currentExercise]?.name}
				</span>{' '}
				({currentExercise + 1}/{exercises.length})
			</p>
			<p className='text-lg mb-4'>
				Round:{' '}
				<span className='font-semibold text-yellow-400'>
					{currentRound}/{totalRounds}
				</span>
			</p>
			{!isResting && exercises[currentExercise + 1] && (
				<p className='text-sm text-gray-400'>
					Next: {exercises[currentExercise + 1].name}
				</p>
			)}
			<div className='mt-4'>
				<Label className='text-gray-300 mb-2 block'>Total Progress</Label>
				<Progress
					value={(elapsedTime / calculateTotalTime()) * 100}
					className='h-2 bg-gray-700'
					// indicatorClassName='bg-blue-500'
				/>
			</div>
			<div className='mt-4'>
				<Label className='text-gray-300 mb-2 block'>Work Time Progress</Label>
				<Progress
					value={(elapsedTime / totalWorkTime) * 100}
					className='h-2 bg-gray-700'
					// indicatorClassName='bg-green-500'
				/>
			</div>
		</div>
	)
}
