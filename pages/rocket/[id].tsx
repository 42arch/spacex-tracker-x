import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'

export default function Rocket() {
	const router = useRouter()

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 text-gray-300'>
					rocket
					<div>
						<span onClick={() => router.back()} className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center hover:text-white'>
							<ArrowSmLeftIcon className="h-5 w-5"/>
							<span className="pl-2"> Back </span>
						</span>
					</div>
				</div>
			</section>
	</Layout>
}