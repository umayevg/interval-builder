import { I18nextProvider } from 'react-i18next'
import TimerConstructor from './components/TimerConstructor'
import i18n from './translations/i18n'
import { Analytics } from '@vercel/analytics/react'

function App() {
	return (
		<>
			<I18nextProvider i18n={i18n}>
				<TimerConstructor />

				<Analytics />
			</I18nextProvider>
		</>
	)
}

export default App
