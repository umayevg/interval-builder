import { Play, Pause, StopCircle, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button/Button'
import { Exercise } from '../../types/types'

interface TimerControlsProps {
	exercises: Exercise[]
	isRunning: boolean
	isPaused: boolean
	startTimer: () => void
	pauseTimer: () => void
	stopTimer: () => void
	resetTimer: () => void
}

export default function TimerControls({
	exercises,
	isRunning,

	isPaused,
	startTimer,
	pauseTimer,
	stopTimer,
	resetTimer,
}: TimerControlsProps) {
	return (
		<div className='flex flex-wrap justify-center space-x-2 space-y-2'>
			{exercises.length > 0 && (
				<>
					{!isRunning && (
						<Button
							onClick={startTimer}
							disabled={isRunning && !isPaused}
							className='bg-green-600 hover:bg-green-700 transition-colors duration-200'
						>
							<Play className='mr-2 h-4 w-4' /> Start
						</Button>
					)}
					<Button
						onClick={pauseTimer}
						disabled={!isRunning}
						className='bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200'
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
						className='bg-red-600 hover:bg-red-700 transition-colors duration-200'
					>
						<StopCircle className='mr-2 h-4 w-4' /> Stop
					</Button>
					<Button
						onClick={resetTimer}
						className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
					>
						<RotateCcw className='mr-2 h-4 w-4' /> Reset
					</Button>
				</>
			)}
		</div>
	)
}
