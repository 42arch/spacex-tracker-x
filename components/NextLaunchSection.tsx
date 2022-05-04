import React from 'react'
import { ArrowDownIcon } from '@heroicons/react/solid'

const NextLaunchSection = () => {
	return (
		<section id='home' className='block relative w-full h-screen bg-black bg-bg1 bg-no-repeat bg-cover bg-center'>
			<div className='h-full flex justify-center items-center'>
				<div className='flex flex-col justify-between h-96 w-4/5 md:w-1/2 p-8 bg-slate-600 bg-opacity-50 rounded-lg'>
					<div className='flex flex-col'>
						<span className='text-lg text-white'>
							NEXT LAUNCH
						</span>
						<span className='text-3xl pt-3 text-white font-bold'>
							Starlink 4-17 (v1.5)
						</span>
					</div>

					<div className='flex h-24 w-full justify-evenly'>
						<div className='flex flex-col w-14'>
							<span className='text-3xl text-left'>221</span>
							<span className='pt-1'>DAYS</span>
						</div>
						<div className='flex flex-col w-14'>
							<span className='text-3xl text-left'>11</span>
							<span className='pt-1'>HOURS</span>
						</div>
						<div className='flex flex-col w-14'>
							<span className='text-3xl text-left'>2</span>
							<span className='pt-1'>MINS</span>
						</div>
						<div className='flex flex-col w-14'>
							<span className='text-3xl text-left'>59</span>
							<span className='pt-1'>SECS</span>
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
				<a href='#launchs' className='absolute bottom-2'>
					<ArrowDownIcon className="cursor-pointer animate-bounce text-center h-8 text-white opacity-80"/>				
				</a>
			</div>
		</section>
	)
}

export default NextLaunchSection