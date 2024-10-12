import { Exercise } from '../../types/types'
import { formatTime } from '../../lib/utils'

interface TimerDisplayProps {
	isReady: boolean
	readyCountdown: number
	isResting: boolean
	currentExercise: Exercise | undefined
	currentExerciseRound: number
	currentRound: number
	totalRounds: number
	currentTime: number
}

export default function TimerDisplay({
	isReady,
	readyCountdown,
	isResting,
	currentExercise,
	currentExerciseRound,
	currentRound,
	totalRounds,
	currentTime,
}: TimerDisplayProps) {
	const getBackgroundColor = () => {
		if (isReady) return 'bg-white text-black'
		if (isResting) return 'bg-blue-600'
		return 'bg-green-600'
	}

	return (
		<div
			className={`text-center p-8 rounded-lg transition-colors duration-300 ${getBackgroundColor()} 
      min-h-[400px] flex flex-col ${
				isReady ? 'justify-center' : 'justify-between'
			}`}
		>
			{isReady ? (
				<>
					{/* <h2 className='text-4xl font-bold mb-4 mt-0 pt-0'>Get Ready!</h2> */}
					<p className='text-8xl font-bold mb-4'>
						{readyCountdown === 1 ? 'GO!' : readyCountdown}
					</p>
				</>
			) : (
				<>
					<div>
						<h2 className='text-3xl font-medium mb-2 opacity-80'>
							{isResting ? 'Rest' : currentExercise?.name}
						</h2>
						<p className='text-md mb-4 opacity-60'>
							({currentExerciseRound}/{currentExercise?.rounds})
						</p>
					</div>
					<p className='text-8xl font-bold mb-4'>{formatTime(currentTime)}</p>
					<p className='text-xl mt-8 opacity-80'>
						Set {currentRound} of {totalRounds}
					</p>
				</>
			)}
		</div>
	)
}
