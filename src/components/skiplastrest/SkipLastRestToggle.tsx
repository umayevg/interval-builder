import { Switch } from '../ui/switch/Switch'
import { Label } from '../ui/label/Label'
import { useTranslation } from 'react-i18next'

interface SkipLastRestToggleProps {
	checked: boolean
	onToggle: () => void
}

export default function SkipLastRestToggle({
	checked,
	onToggle,
}: SkipLastRestToggleProps) {
	const { t } = useTranslation()
	return (
		<div className='flex flex-col items-center space-x-2 mb-4'>
			<Label htmlFor='skip-last-rest' className='text-gray-300 mt-2 mb-4'>
				{t('labels.skipLastRest')}
			</Label>
			<Switch
				id='skip-last-rest'
				checked={checked}
				onCheckedChange={onToggle}
				className='bg-gray-600 hover:bg-gray-700 transition-colors duration-200  text-red'
			/>
		</div>
	)
}
