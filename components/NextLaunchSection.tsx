import React, { useEffect, useState } from 'react'
import { ArrowDownIcon } from '@heroicons/react/solid'
import { useNextLaunch } from '../hooks/useNextLaunch'
import { formatDuration, intervalToDuration, Duration, differenceInDays } from 'date-fns'
import { useTranslation } from 'next-i18next'

const NextLaunchSection = () => {
	const { t } = useTranslation('common')
	const { data: nextLaunchData, error, loading } = useNextLaunch()
	const [ countdown, setCountdown ] = useState<Duration>({})

	useEffect(() => {
		if(nextLaunchData) {
			const { date_utc } = nextLaunchData
			let timer = setInterval(() => {
				let now = new Date()
				let days = differenceInDays(new Date(date_utc), now)
				let count = intervalToDuration({ start: now, end: new Date(date_utc) })
				count.days = days
				setCountdown(count)
			}, 1000)
			return () => clearInterval(timer)
		}
	}, [nextLaunchData])

	return (
		<section id='home' className='block relative w-full h-screen bg-black bg-bg1 bg-no-repeat bg-cover bg-center'>
			<div className='h-full flex justify-center items-center'>
				{
					nextLaunchData && (
						<div className='flex flex-col justify-between h-96 w-4/5 md:w-1/2 p-8 bg-slate-600 bg-opacity-50 rounded-lg'>
							<div className='flex flex-col'>
								<span className='text-lg text-white'>
									{ t('next.title') }
								</span>
								<span className='text-3xl pt-3 text-white font-bold'>
									{
										nextLaunchData.name
									}
								</span>
							</div>
		
							<div className='flex h-24 w-full justify-evenly'>
								<div className='flex flex-col w-14'>
									<span className='text-3xl text-left'>{ countdown.days }</span>
									<span className='pt-1'>{ t('next.time.day') }</span>
								</div>
								<div className='flex flex-col w-14'>
									<span className='text-3xl text-left'>{ countdown.hours }</span>
									<span className='pt-1'>{ t('next.time.hour') }</span>
								</div>
								<div className='flex flex-col w-14'>
									<span className='text-3xl text-left'>{ countdown.minutes }</span>
									<span className='pt-1'>{ t('next.time.min') }</span>
								</div>
								<div className='flex flex-col w-14'>
									<span className='text-3xl text-left'>{ countdown.seconds }</span>
									<span className='pt-1'>{ t('next.time.sec') }</span>
								</div>
							</div>
		
							<div className='flex flex-col text-white text-sm'>
								<span>
									Launch Time:	Fri 6th May, 5:51 pm
								</span>
								<span>
									Launch Site:	KSC LC 39A (Florida)
								</span>
								<span>
									Rocket:	Falcon 9
								</span>
							</div>
						</div>
					)
				}
				<a href='#launchs' className='absolute bottom-2'>
					<ArrowDownIcon className="cursor-pointer animate-bounce text-center h-8 text-white opacity-80"/>				
				</a>
			</div>
		</section>
	)
}

export default NextLaunchSection