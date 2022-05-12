import { MoonIcon, SunIcon, TranslateIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'

const Footer: FunctionComponent = () => {
	const router = useRouter()
	const {theme, setTheme} = useTheme()
	console.log(111, router.locale)
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
			
			<span className='block w-full'>
				This website is not affiliated with SpaceX. All the data is from 
				<a className=' underline px-1' href="https://github.com/r-spacex/SpaceX-API"> r/spacex’s API </a>
			</span>
		</footer>
	)
}

export default Footer
