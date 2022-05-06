import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { LaunchInfo } from '../../types'
import { useRocket } from '../../hooks/useRocket'
import { useLaunchPad } from '../../hooks/useLaunchPad'
import { format } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'

interface IProps {
	data: LaunchInfo,
	goDetail: () => void
}

const LaunchItem: FunctionComponent<IProps> = ({ data, goDetail }) => {

	const { data: rocketInfo } = useRocket(data.rocket)
	const { data: launchPadInfo} = useLaunchPad(data.launchpad)

	const year = format(new Date(data.date_utc), 'yyyy', {locale: zhCN})
	const month = format(new Date(data.date_utc), 'MMMM', {locale: zhCN})
	const fullDate = format(new Date(data.date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'", {locale: zhCN})
	console.log(2222, year, month, fullDate)

	return (
		<div className='cursor-pointer hover:bg-slate-900 hover:rounded-sm w-full h-28 min-h-[160px] flex items-center'>
			<div className='relative w-8 flex justify-center items-center'>
				<span className={`block w-4 h-4 rounded-full ${ data.upcoming ? 'bg-blue-500' : ( data.success ? 'bg-green-500' : 'bg-red-500' )} z-10`}></span>
			</div>
			<div className='flex flex-col justify-evenly w-20 text-center'>
				<span>{ month }</span>
				<span>{ year }</span>
			</div>
			<div className="mx-4">
				{
					data.links.patch.small ? (
						<Image src={ data.links.patch.small } alt='patch' width={120} height={120}/>
						// <img src={ data.links.patch.small } alt='patch' />
					) : (
						<Image src='/images/spacex-white.png' alt='patch' width={120} height={120}/>
					)
				}
			</div>
			<div className='h-full py-8 flex flex-col px-4 justify-evenly'>
				<p className='truncate'>{ data.name }</p>
				<p className='truncate'>{ fullDate }</p>
				<p className={`uppercase ${ data.upcoming ? 'text-blue-500' : ( data.success ? 'text-green-500' : 'text-red-500' )}`}>
					{ data.success ? 'successful' : (data.upcoming ? 'upcoming' : 'failed') }
				</p>
			</div>
			<div className='h-full py-8 hidden md:flex flex-col justify-evenly px-4'>
				<p>Rocket: { rocketInfo?.name }</p>
				<p>Site: { launchPadInfo?.name }</p>
				<p>Flight number: { data.flight_number }</p>
			</div>
		</div>
	)
}

export default LaunchItem
