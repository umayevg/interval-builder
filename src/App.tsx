import { I18nextProvider } from 'react-i18next'
import TimerConstructor from './components/TimerConstructor'
import i18n from './translations/i18n'

function App() {
	return (
		<>
			<I18nextProvider i18n={i18n}>
				<TimerConstructor />
			</I18nextProvider>
		</>
	)
}

export default App
