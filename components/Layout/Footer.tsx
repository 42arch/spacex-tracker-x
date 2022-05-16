import { MoonIcon, SunIcon, TranslateIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'

const Footer: FunctionComponent = () => {
	const { t } = useTranslation()
	const router = useRouter()
	const {theme, setTheme} = useTheme()
	const [curLocale, setCurLocale] = useState(router.locale)
	useEffect(() => {
		router.push(router.route, router.asPath, {
			locale: curLocale,
		})
	}, [curLocale])

	const onLocaleChange = () => {
		if(curLocale === 'en') {
			setCurLocale('zh-CN')
		} else {
			setCurLocale('en')
		}
	}

	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setTheme('dark')
		setMounted(true)
	}, [])
	if (!mounted) {
		return null
	}

	return (
		<footer className='h-28 w-full p-2 text-center flex flex-col justify-center items-center'>
			<div className='w-1/2 py-2 text-black dark:text-white'>
				<button onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}
					className='w-8 h-8 mx-2 p-1 rounded-full bg-black dark:bg-white text-orange-500 '
				>
					{ theme === 'light' ? <SunIcon/> : <MoonIcon/> }
				</button>
				<button onClick={ onLocaleChange }
					className='w-8 h-8 mx-2 p-1 rounded-full bg-black dark:bg-white text-orange-500 '
				>
					{ curLocale === 'en' ? <TranslateIcon/> : <TranslateIcon className=' rotate'/> }
				</button>
			</div>
			<span className='block w-full text-xs'>
				{ t('footer.info') }
				<a className=' underline px-1' href="https://github.com/r-spacex/SpaceX-API">r-spacex/SpaceX-API</a>
				{ t('footer.suffix') }
			</span>
		</footer>
	)
}

export default Footer
