// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import en from './locales/en.json'
import es from './locales/es.json'
import de from './locales/de.json'
import ru from './locales/ru.json'
import fr from './locales/fr.json'
import pt from './locales/pt.json'
import cn from './locales/cn.json'
import jp from './locales/jp.json'
import ar from './locales/ar.json'

// i18next configuration
i18n
	.use(LanguageDetector) // Detects the user's language
	.use(initReactI18next) // Passes i18n down to react-i18next
	.init({
		resources: {
			en: { translation: en },
			es: { translation: es },
			de: { translation: de },
			ru: { translation: ru },
			fr: { translation: fr },
			pt: { translation: pt },
			cn: { translation: cn },
			jp: { translation: jp },
			ar: { translation: ar },
		},
		fallbackLng: 'en', // Fallback language if the detected language is not available
		detection: {
			order: [
				'queryString',
				'cookie',
				'localStorage',
				'navigator',
				'htmlTag',
				'path',
				'subdomain',
			],
			caches: ['localStorage', 'cookie'], // Cache the language in local storage or cookies
		},
		interpolation: {
			escapeValue: false, // React already escapes text to prevent XSS
		},
	})

export default i18n
