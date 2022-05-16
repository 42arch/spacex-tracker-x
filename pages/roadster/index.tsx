import { format } from 'date-fns'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { Roadster, Rocket } from '../../types'
import { getRoadster } from '../../utils/api'

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let data = null
	try {
		data = await getRoadster() as Roadster
		data.launch_date_utc = format(new Date(data.launch_date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'")
		console.log(2333, data.launch_date_utc)
	} catch (error) {

	}
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
			data
		}
	}
}

const RoadsterIndex = ({ data }: { data: Roadster }) => {
	const router = useRouter()
	return (
		<Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 text-gray-300'>
					<div className='h-auto'>
						<div className="flex flex-col">
							<div className="w-full flex flex-col md:flex-row">
								<div className="h-full flex flex-col justify-center py-4 md:py-0">
									<span className="py-4 text-3xl md:text-center">{ data.name }</span>
								</div>
							</div>
							<div className="py-4 md:py-8">
								<p className="block text text-lg py-4">{ data.details }</p>
								<div className='py-2'>
									<button onClick={() => { window.open(data.wikipedia, '__blank') }} className='btn'>wiki</button>
									<button onClick={() => { window.open(data.video, '__blank') }} className='btn'>webcast</button>
								</div>
							</div>
							<div className="py-4">
								<p className="block text-lg">Info</p>
								<div className='px-2 max-w-sm md:max-w-xl'>
									<div className='py-1 flex'>
										<a className="block text-gray-400 w-48">Launch Time: </a>
										<a className="block text-gray-400">{ data.launch_date_utc }</a>
									</div>
									<div className='py-1 flex'>
										<a className="block text-gray-400 w-48">Orbit: </a>
										<a className="block text-gray-400">{ data.orbit_type }</a>
									</div>
									<div className='py-1 flex'>
										<a className="block text-gray-400 w-48">Speed: </a>
										<a className="block text-gray-400">{ data.speed_kph } km/h</a>
									</div>
									<div className='py-1 flex'>
										<a className="block text-gray-400 w-48">Distance From Earth: </a>
										<a className="block text-gray-400">{ data.earth_distance_km } km</a>
									</div>
									<div className='py-1 flex'>
										<a className="block text-gray-400 w-48">Distance From Mars: </a>
										<a className="block text-gray-400">{ data.mars_distance_km } km</a>
									</div>
								</div>
							</div>
							<div className="py-4">
							<p className="block w-24 text-lg">Photos</p>
							<div className="flex px-2 flex-wrap justify-evenly just py-4 w-full">
								{
									data.flickr_images.map(photo => (
										<button onClick={() => { window.open(photo, '__blank') }} key={photo} className="w-[24rem] h-[18rem] md:h-[20rem] md:mx-2">
											<Image className="object-cover cursor-pointer rounded" src={photo} layout="responsive" width={400} height={300} alt={photo}></Image>
										</button>
									))
								}
							</div>
						</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default RoadsterIndex
