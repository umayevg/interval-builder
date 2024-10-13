import { useEffect, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { clsx } from 'clsx'
import FlagIcon from 'react-flagkit'
import i18n from 'i18next'
import i18next from 'i18next'

interface LanguageOption {
	code: string
	label: string
	flag: string // ISO 3166-1 alpha-2 flag code
}

// const languages: LanguageOption[] = [
// 	{ code: 'en', label: 'English', flag: 'US' },
// 	{ code: 'es', label: 'Español', flag: 'ES' },
// 	{ code: 'de', label: 'Deutsch', flag: 'DE' },
// 	{ code: 'ru', label: 'Русский', flag: 'RU' },
// 	{ code: 'fr', label: 'Français', flag: 'FR' },
// 	{ code: 'pt', label: 'Português', flag: 'PT' },
// 	{ code: 'cn', label: '中文', flag: 'CN' },
// 	{ code: 'jp', label: '日本語', flag: 'JP' },
// 	{ code: 'ar', label: 'العربية', flag: 'SA' },
// ]

const languages: LanguageOption[] = [
	{ code: 'en', label: '', flag: 'US' },
	{ code: 'es', label: '', flag: 'ES' },
	{ code: 'de', label: '', flag: 'DE' },
	{ code: 'ru', label: '', flag: 'RU' },
	{ code: 'fr', label: '', flag: 'FR' },
	{ code: 'pt', label: '', flag: 'PT' },
	{ code: 'cn', label: '', flag: 'CN' },
	{ code: 'jp', label: '', flag: 'JP' },
	{ code: 'ar', label: '', flag: 'SA' },
]

const LOCAL_STORAGE_KEY = 'selectedLanguage'

export default function LanguageSwitcher() {
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
		languages[0]
	)

	const handleLanguageChange = (language: LanguageOption) => {
		setSelectedLanguage(language)
		i18next.changeLanguage(language.code) // Update i18next language
		localStorage.setItem(LOCAL_STORAGE_KEY, language.code)
	}

	useEffect(() => {
		const storedLanguageCode =
			localStorage.getItem(LOCAL_STORAGE_KEY) || i18n.language
		const matchedLanguage = languages.find(
			lang => lang.code === storedLanguageCode.slice(0, 2)
		)

		if (matchedLanguage) {
			setSelectedLanguage(matchedLanguage)
			i18n.changeLanguage(matchedLanguage.code) // Set i18next language on load
		} else {
			// Fallback to browser language if it matches
			const browserLanguage = navigator.language.slice(0, 2)
			const languageFromBrowser = languages.find(
				lang => lang.code === browserLanguage
			)
			if (languageFromBrowser) {
				setSelectedLanguage(languageFromBrowser)
				i18n.changeLanguage(languageFromBrowser.code)
				localStorage.setItem(LOCAL_STORAGE_KEY, languageFromBrowser.code)
			}
		}
	}, [])

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className='flex items-center gap- px-4 py-2 rounded-full shadow-md hover:bg-slate-800 transition-colors border border-slate-700'>
					<FlagIcon country={selectedLanguage.flag} size={16} />
					<span>{selectedLanguage.label}</span>
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className='w-auto p-2 mt-2 bg-slate-900 rounded-lg shadow-lg border border-slate-700'
					sideOffset={5}
					align='end'
				>
					<div className='flex flex-col gap-2'>
						{languages.map(language => (
							<Popover.Close key={language.code} asChild>
								<button
									onClick={() => handleLanguageChange(language)}
									className={clsx(
										'flex items-center gap- p-2 rounded-md transition-colors',
										selectedLanguage.code === language.code
											? 'bg-blue-900 text-blue-100'
											: 'hover:bg-slate-800'
									)}
								>
									<FlagIcon country={language.flag} size={16} />
									<span>{language.label}</span>
								</button>
							</Popover.Close>
						))}
					</div>
					<Popover.Arrow className='fill-current text-slate-700' />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	)
}
