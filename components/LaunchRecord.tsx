import React from 'react'
import Button from './Button'

const LaunchRecordSection = () => {
	return (
		<section id='launchs' className='w-full h-screen font-DIN-bold bg-black bg-bg2 bg-center z-10'>
			<div className='h-full flex flex-col justify-center px-[200px]'>
				<div className='flex flex-col justify-evenly h-36 w-1/3'>
					<span className='text-5xl mb-6 text-white font-bold'>
						Launch Missions
					</span>
					<div className=''>
						<Button onClick={ () => { console.log(23334) } }>
							MORE
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LaunchRecordSection