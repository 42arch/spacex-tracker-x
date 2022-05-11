import { MoonIcon, SunIcon, TranslateIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Switch from '../Switch'

const Footer = () => {
	const router = useRouter()
	const {theme, setTheme} = useTheme()
	const [curLocale, setCurLocale] = useState('en')
	// const [themeChecked, setThemeChecked] = useState(false)
	// const [checked, setChecked] = useState(false)

	useEffect(() => {
		router.locale === 'zh-CN' && (setCurLocale('zh-CN'))
	}, [router.locale])

	const onLocaleChange = () => {
		if(curLocale === 'en') {
			setCurLocale('zh-CN')
		} else {
			setCurLocale('en')
		}
		router.push(router.route, router.asPath, {
			locale: curLocale,
		})
	}

	return (
		<footer className=' h-28 w-full text-center flex flex-col md:flex-row justify-center items-center'>
			<div className='w-full py-2 text-black dark:text-white'>
				<button onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}
					className='w-9 h-9 p-1 rounded-full bg-black dark:bg-white text-orange-500 '
				>
					{ theme === 'light' ? <SunIcon/> : <MoonIcon/> }
				</button>

				<button onClick={ onLocaleChange }
					className='w-9 h-9 p-1 rounded-full bg-black dark:bg-white text-orange-500 '
				>
					{ curLocale === 'en' ? <TranslateIcon/> : <TranslateIcon className=' rotate'/> }
				</button>
				{/* <Switch checked={checked} nagetiveNode={'中'} positiveNode={'en'} onChange={(e) => { onLocaleChange(e) }}/> */}
			</div>
			
			<div className=''>
				This website is not affiliated with SpaceX. All the data is from 
				<a className=' underline px-1' href="https://github.com/r-spacex/SpaceX-API"> r/spacex’s API </a>
			</div>
		</footer>
	)
}

export default Footer
