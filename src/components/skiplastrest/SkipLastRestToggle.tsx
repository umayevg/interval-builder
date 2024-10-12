import { Switch } from '../ui/switch/Switch'
import { Label } from '../ui/label/Label'

interface SkipLastRestToggleProps {
	checked: boolean
	onToggle: () => void
}

export default function SkipLastRestToggle({
	checked,
	onToggle,
}: SkipLastRestToggleProps) {
	return (
		<div className='flex items-center space-x-2 mb-4'>
			<Switch
				id='skip-last-rest'
				checked={checked}
				onCheckedChange={onToggle}
				className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200  text-red'
			/>
			<Label htmlFor='skip-last-rest' className='text-gray-300'>
				Skip final rest
			</Label>
		</div>
	)
}
