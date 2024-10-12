import { Button } from '../ui/button/Button'
import { Label } from '../ui/label/Label'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface TotalRoundsProps {
	totalRounds: number
	onUpdate: (value: number) => void
}

export default function TotalRounds({
	totalRounds,
	onUpdate,
}: TotalRoundsProps) {
	return (
		<div className='mb-6'>
			<Label htmlFor='totalRounds' className='text-gray-300 block mb-2'>
				Total Rounds:
			</Label>
			<div className='flex items-center space-x-2'>
				<Button
					type='button'
					disabled={totalRounds === 1}
					onClick={() => onUpdate(totalRounds - 1)}
					className='bg-gray-700 hover:bg-gray-600'
				>
					<ChevronDown className='h-4 w-4' />
				</Button>
				<span className='flex bg-gray-800 h-[40px] items-center border-gray-700 text-white mx-2 min-w-[50px] text-center rounded-md justify-center'>
					<span>{totalRounds}</span>
				</span>
				<Button
					type='button'
					onClick={() => onUpdate(totalRounds + 1)}
					className='bg-gray-700 hover:bg-gray-600'
				>
					<ChevronUp className='h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}
