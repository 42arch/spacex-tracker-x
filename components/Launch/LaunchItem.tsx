import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { LaunchInfo } from '../../types'

// interface ILaunchInfo {
// 	name: string
// 	date_utc: string,
// 	success: boolean,
// 	upcoming: boolean
// }

interface IProps {
	data: LaunchInfo,
	goDetail: () => void
}

const LaunchItem: FunctionComponent<IProps> = ({ data, goDetail }) => {
	return (
		<div className='cursor-pointer hover:bg-slate-900 hover:rounded-sm w-full h-28 min-h-[160px] flex items-center'>
			<div className='relative w-8 flex justify-center items-center'>
				{/* <span className='block h-full w-1.5 bg-slate-200 absolute top-1/2'></span> */}
				<span className='block w-4 h-4 rounded-full bg-blue-500 z-10'></span>
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
						<div></div>
					)
				}
			</div>
			<div className='flex flex-col px-4'>
				<span>{ data.name }</span>
				<span>{ data.date_utc }</span>
				<span>{ data.success ? 'success' : (data.upcoming ? 'upcoming' : 'fail') }</span>
			</div>
			<div className='hidden md:flex flex-col px-4'>
				<span>Rocket: Falcon 9</span>
				<span>Site: CCSFS SLC 40</span>
				<span>Flight number: 11</span>
			</div>
		</div>
	)
}

export default LaunchItem
