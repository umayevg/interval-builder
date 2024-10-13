// import { Play, Pause, StopCircle, RotateCcw } from 'lucide-react'
// import { Button } from '../ui/button/Button'
// import { Exercise } from '../../types/types'

// interface TimerControlsProps {
// 	exercises: Exercise[]
// 	isRunning: boolean
// 	isPaused: boolean
// 	startTimer: () => void
// 	pauseTimer: () => void
// 	stopTimer: () => void
// 	resetTimer: () => void
// }

// export default function TimerControls({
// 	exercises,
// 	isRunning,

// 	isPaused,
// 	startTimer,
// 	pauseTimer,
// 	stopTimer,
// 	resetTimer,
// }: TimerControlsProps) {
// 	return (
// 		<div className='flex flex-wrap justify-center space-x-2 space-y-2'>
// 			{exercises.length > 0 && (
// 				<>
// 					{!isRunning && (
// 						<Button
// 							onClick={startTimer}
// 							disabled={isRunning && !isPaused}
// 							className='bg-green-600 hover:bg-green-700 transition-colors duration-200'
// 						>
// 							<Play className='mr-2 h-4 w-4' /> Start
// 						</Button>
// 					)}
// 					<Button
// 						onClick={pauseTimer}
// 						disabled={!isRunning}
// 						className='bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200'
// 					>
// 						{isPaused ? (
// 							<Play className='mr-2 h-4 w-4' />
// 						) : (
// 							<Pause className='mr-2 h-4 w-4' />
// 						)}
// 						{isPaused ? 'Resume' : 'Pause'}
// 					</Button>
// 					<Button
// 						onClick={stopTimer}
// 						disabled={!isRunning && !isPaused}
// 						className='bg-red-600 hover:bg-red-700 transition-colors duration-200'
// 					>
// 						<StopCircle className='mr-2 h-4 w-4' /> Stop
// 					</Button>
// 					<Button
// 						onClick={resetTimer}
// 						className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200'
// 					>
// 						<RotateCcw className='mr-2 h-4 w-4' /> Reset
// 					</Button>
// 				</>
// 			)}
// 		</div>
// 	)
// }

// import { Button } from '../ui/button/Button'
// import {
// 	Play,
// 	Pause,
// 	StopCircle,
// 	RotateCcw,
// 	Volume2,
// 	VolumeX,
// } from 'lucide-react'
// import { Exercise } from '../../types/types'

// interface ControlsProps {
// 	exercises: Exercise[]
// 	isRunning: boolean
// 	isPaused: boolean
// 	isSoundEnabled: boolean
// 	onStart: () => void
// 	onPause: () => void
// 	onStop: () => void
// 	onReset: () => void
// 	onToggleSound: () => void
// }

// export default function Controls({
// 	exercises,
// 	isRunning,
// 	isPaused,
// 	isSoundEnabled,
// 	onStart,
// 	onPause,
// 	onStop,
// 	onReset,
// 	onToggleSound,
// }: ControlsProps) {
// 	return (
// 		<div className='flex flex-wrap justify-center gap-2 mt-6'>
// 			{exercises.length > 0 && (
// 				<>
// 					{!isRunning && (
// 						<Button
// 							onClick={onStart}
// 							className='bg-green-600 hover:bg-green-700'
// 						>
// 							<Play className='mr-2 h-4 w-4' /> Start
// 						</Button>
// 					)}
// 					{isRunning && (
// 						<>
// 							<Button
// 								onClick={onPause}
// 								className='bg-yellow-600 hover:bg-yellow-700'
// 							>
// 								{isPaused ? (
// 									<Play className='mr-2 h-4 w-4' />
// 								) : (
// 									<Pause className='mr-2 h-4 w-4' />
// 								)}
// 								{isPaused ? 'Resume' : 'Pause'}
// 							</Button>
// 							<Button onClick={onStop} className='bg-red-600 hover:bg-red-700'>
// 								<StopCircle className='mr-2 h-4 w-4' /> Stop
// 							</Button>
// 						</>
// 					)}
// 					<Button onClick={onReset} className='bg-gray-600 hover:bg-gray-700'>
// 						<RotateCcw className='mr-2 h-4 w-4' /> Reset
// 					</Button>
// 				</>
// 			)}
// 			<Button
// 				onClick={onToggleSound}
// 				className='bg-purple-600 hover:bg-purple-700'
// 			>
// 				{isSoundEnabled ? (
// 					<Volume2 className='h-4 w-4' />
// 				) : (
// 					<VolumeX className='h-4 w-4' />
// 				)}
// 			</Button>
// 		</div>
// 	)
// }

import { Button } from '../ui/button/Button'
import {
	Play,
	Pause,
	StopCircle,
	RotateCcw,
	Volume2,
	VolumeX,
} from 'lucide-react'
import { Exercise } from '../../types/types'
import { useTranslation } from 'react-i18next'

interface ControlsProps {
	exercises: Exercise[]
	isRunning: boolean
	isPaused: boolean
	isReady: boolean
	isSoundEnabled: boolean
	onStart: () => void
	onPause: () => void
	onStop: () => void
	onReset: () => void
	onToggleSound: () => void
	onAudioInit: () => void
}

export default function Controls({
	exercises,
	isRunning,
	isPaused,
	isReady,
	isSoundEnabled,
	onStart,
	onPause,
	onStop,
	onReset,
	onToggleSound,
	onAudioInit,
}: ControlsProps) {
	const { t } = useTranslation()
	return (
		<div className='flex flex-wrap justify-center gap-2 mt-6'>
			{exercises.length > 0 && (
				<>
					{!isRunning && !isReady && (
						<>
							<Button
								onClick={() => {
									onAudioInit()
									onStart()
								}}
								className='bg-green-600 hover:bg-green-700 text-white'
							>
								<Play className='mr-2 h-4 w-4' /> {t('buttons.start')}
							</Button>
							<Button
								onClick={onReset}
								className='bg-orange-600 hover:bg-orange-700 text-white'
							>
								<RotateCcw className='mr-2 h-4 w-4' /> {t('buttons.reset')}
							</Button>
						</>
					)}
					{isRunning && (
						<>
							<Button
								onClick={onPause}
								className='bg-yellow-600 hover:bg-yellow-700 text-white'
							>
								{isPaused ? (
									<Play className='mr-2 h-4 w-4' />
								) : (
									<Pause className='mr-2 h-4 w-4' />
								)}
								{isPaused ? t('buttons.resume') : t('buttons.pause')}
							</Button>
							<Button
								onClick={onStop}
								className='bg-red-600 hover:bg-red-700 text-white'
							>
								<StopCircle className='mr-2 h-4 w-4' /> {t('buttons.stop')}
							</Button>
						</>
					)}
				</>
			)}
			<Button
				onClick={onToggleSound}
				className='bg-purple-600 hover:bg-purple-700'
			>
				{isSoundEnabled ? (
					<Volume2 className='h-4 w-4 text-white' />
				) : (
					<VolumeX className='h-4 w-4 text-white' />
				)}
			</Button>
		</div>
	)
}
