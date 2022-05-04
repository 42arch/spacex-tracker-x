import { ArrowDownIcon } from '@heroicons/react/solid'
import React from 'react'
import Button from './Button'

const CategorySection = () => {
	return (
		<section id='category' className='relative flex flex-col justify-center items-center w-full h-screen font-DIN-bold bg-black bg-bg3 bg-center z-10'>
			<div className='h-full w-full md:w-1/2 flex flex-col justify-center px-6'>
				<div className='flex flex-col justify-evenly h-36 w-full md:w-1/3'>
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
			{/* <a href='#category' className='absolute bottom-2'>
				<ArrowDownIcon className="cursor-pointer animate-bounce text-center h-8 text-white opacity-80"/>				
			</a> */}
		</section>
	)
}

export default CategorySection
