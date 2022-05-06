import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { LaunchInfo } from '../../types'
import { useRocket } from '../../hooks/useRocket'
import { useLaunchPad } from '../../hooks/useLaunchPad'

interface IProps {
	data: LaunchInfo,
	goDetail: () => void
}

const statusColors = {
	'success': 'bg-green',
	'upcomming': 'bg-blue',
	'fail': 'bg-red',
}

const LaunchItem: FunctionComponent<IProps> = ({ data, goDetail }) => {

	const { data: rocketInfo } = useRocket(data.rocket)
	const { data: launchPadInfo} = useLaunchPad(data.launchpad)

	return (
		<div className='cursor-pointer hover:bg-slate-900 hover:rounded-sm w-full h-28 min-h-[160px] flex items-center'>
			<div className='relative w-8 flex justify-center items-center'>
				{/* <span className='block h-full w-1.5 bg-slate-200 absolute top-1/2'></span> */}
				<span className={`block w-4 h-4 rounded-full ${ data.upcoming ? 'bg-blue-500' : ( data.success ? 'bg-green-500' : 'bg-red-500' )} z-10`}></span>
			</div>
			<div className='w-20 text-center'>
				2022
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
			<div className='flex flex-col px-4'>
				<p className='truncate'>{ data.name }</p>
				<p className='truncate'>{ data.date_utc }</p>
				<p className='truncate'>{ data.success ? 'success' : (data.upcoming ? 'upcoming' : 'fail') }</p>
			</div>
			<div className='hidden md:flex flex-col px-4'>
				<p>Rocket: { rocketInfo?.name }</p>
				<p>Site: { launchPadInfo?.name }</p>
				<p>Flight number: { data.flight_number }</p>
			</div>
		</div>
	)
}

export default LaunchItem
