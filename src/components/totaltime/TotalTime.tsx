import { Exercise } from '../../types/types'
import { calculateTotalTime, formatTime } from '../../lib/utils'

interface TotalTimeProps {
	exercises: Exercise[]
	totalRounds: number
	skipLastRest: boolean
}

export default function TotalTime({
	exercises,
	totalRounds,
	skipLastRest,
}: TotalTimeProps) {
	const totalTime = calculateTotalTime(exercises, totalRounds, skipLastRest)

	return (
		<div className='mb-4'>
			<h3 className='text-lg font-semibold text-gray-300 mb-2'>Total Time</h3>
			<p className='text-2xl font-bold text-blue-400'>
				{formatTime(totalTime)}
			</p>
		</div>
	)
}
