import React, { FunctionComponent, useEffect, useState } from 'react'
import { ArrowDownIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import { useNextLaunch } from '../hooks/useNextLaunch'
import { formatDuration, intervalToDuration, Duration, differenceInDays, format } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { LaunchInfo } from '../types'
import Button from './Button'
import Link from 'next/link'

interface IProps {
	data: LaunchInfo
}

const NextLaunchSection: FunctionComponent<IProps> = ({ data }) => {
	const { t } = useTranslation('common')
	const [ countdown, setCountdown ] = useState<Duration>({})

	useEffect(() => {
		if(data) {
			const { date_utc } = data
			let timer = setInterval(() => {
				let now = new Date()
				let days = differenceInDays(new Date(date_utc), now)
				let count = intervalToDuration({ start: now, end: new Date(date_utc) })
				count.days = days
				setCountdown(count)
			}, 1000)
			return () => clearInterval(timer)
		}
	}, [data])

	return (
		<section id='home' className='block relative w-full h-full bg-black bg-bg3 bg-no-repeat bg-cover bg-center'>
			<div className='h-full flex justify-center items-center'>
				{
					data && (
						<div className='flex flex-col justify-between h-96 w-4/5 md:w-1/2 p-4 md:p-8 dark:bg-slate-800 bg-slate-400 dark:bg-opacity-40 bg-opacity-50 rounded-lg'>
							<div className='flex flex-col'>
								<span className='text-lg'>
									{ t('next.title') }
								</span>
								<Link href={`/launch/${data.id}`}>
									<p className='cursor-pointer text-3xl pt-3 font-bold flex'>
										{ data.name }
										<ExternalLinkIcon className='h-4 w-4'/>
									</p>
								</Link>
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
							<div className='flex flex-col text-base'>
								<p className='flex'>
									<span className='block w-24'>{ t('next.info.launchTime') }:</span>
									<span>{ format(new Date(data.date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'") }</span>
								</p>
								<p className='flex'>
									<span className='block w-24'>{ t('next.info.launchSite') }:</span>
									<span>{ data.launchpad.name }</span>
								</p>
								<p className='flex'>
									<span className='block w-24'>{ t('next.info.rocket') }:</span>
									<span>{ data.rocket.name }</span>
								</p>
							</div>
						</div>
					)
				}
				<Link href='/category'>
					<a className='absolute bottom-2'>
						<ArrowDownIcon className="cursor-pointer animate-bounce text-center h-8 text-white opacity-80"/>				
					</a>
				</Link>
			</div>
		</section>
	)
}

export default NextLaunchSection