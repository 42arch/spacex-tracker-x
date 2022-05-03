import React from 'react'

const NextLaunchSection = () => {
	return (
		<section id='home' className='block relative w-full h-screen bg-black bg-bg1 bg-no-repeat bg-cover'>
			<div className='h-full flex justify-center items-center font-DIN'>
				<div className='flex flex-col justify-between h-80 w-1/2 p-8 bg-slate-600 bg-opacity-50 rounded-lg'>
					<div className='flex flex-col'>
						<span className='text-lg text-white'>
							NEXT LAUNCH
						</span>
						<span className='text-3xl pt-2 text-white font-bold'>
							Starlink 4-17 (v1.5)
						</span>
					</div>

					<div className='flex h-24 w-full justify-evenly'>
						<div className='flex flex-col'>
							<span className='text-2xl text-left'>2</span>
							<span>DAYS</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-2xl text-left'>11</span>
							<span>HOURS</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-2xl text-left'>2</span>
							<span>MINS</span>
						</div>
						<div className='flex flex-col'>
							<span className='text-2xl text-left'>59</span>
							<span>SECS</span>
						</div>
					</div>

					<div className='flex flex-col text-white text-sm'>
						<span>
							Launch Time:	Fri 6th May, 5:51 pm
						</span>
						<span>
							Launch Site:	KSC LC 39A (Florida)
						</span>
					</div>
				</div>
			</div>
			
		</section>
	)
}

export default NextLaunchSection