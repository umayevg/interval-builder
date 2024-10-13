import { Exercise } from '../../types/types'
import { formatTime } from '../../lib/utils'
import { useTranslation } from 'react-i18next'

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
	const { t } = useTranslation()
	// const getBackgroundColor = () => {
	// 	// if (isReady) return 'bg-white text-black'
	// 	if (isReady) return 'bg-yellow-500'
	// 	if (isResting) return 'bg-blue-600'
	// 	return 'bg-green-600'
	// }

	return (
		<div
			className={`text-center p-8 rounded-lg min-h-[400px] flex flex-col ${
				isReady ? 'justify-center' : 'justify-between'
			}`}
		>
			{isReady ? (
				<div className='transition-all duration-300 ease-in-out'>
					{/* <h2 className='text-4xl font-bold mb-4 mt-0 pt-0'>Get Ready!</h2> */}
					<p className='text-8xl font-bold mb-4'>
						{readyCountdown === 1 ? 'GO!' : '0' + readyCountdown}
					</p>
				</div>
			) : (
				<>
					<div>
						<h2 className='text-3xl font-medium opacity-40'>
							{isResting ? t('labels.resting') : currentExercise?.name}
						</h2>
						<p className='text-md opacity-40'>
							({currentExerciseRound}/{currentExercise?.rounds})
						</p>
					</div>
					<p className='text-8xl font-bold mb-4'>{formatTime(currentTime)}</p>
					<p className='text-xl mt-8 opacity-40'>
						{totalRounds > 1 ? (
							t('labels.totalRound') + ' ' + currentRound + '/' + totalRounds
						) : (
							<span>&nbsp;</span>
						)}
						{/* {t('labels.totalRound')} {currentRound} of {totalRounds} */}
					</p>
				</>
			)}
		</div>
	)
}
