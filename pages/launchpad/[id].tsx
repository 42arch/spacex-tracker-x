import Link from 'next/link'
import Image from 'next/image'
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { LaunchPad } from '../../types'
import { getLaunchpads, getOneLaunchpad } from '../../utils/api'

export async function getStaticPaths() {
	const launchpads = await getLaunchpads()
	const paths = launchpads.map(l => (`/launchpad/${l.id}`))
	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	try {
		const id = context.params?.id?.toString()
		const data: LaunchPad = await getOneLaunchpad(id)
		return {
			props: {
				error: false,
				data: data,
				loading: !data
			}
		}
	} catch (error) {
		return {
			props: {
				error: true,
				data: null,
				loading: false
			}
		}
	}
}

const Launchpad = ({ data, loading }: { data: LaunchPad, loading: boolean }) => {
	const router = useRouter()

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 text-gray-300'>
					<div className='h-auto'>
						<div className="flex flex-col">
							<div className="w-full flex flex-col md:flex-row">
								<div className="h-full flex flex-col justify-center py-4 md:py-0">
									<span className="py-4 text-3xl md:text-center">{ data.full_name }</span>
									<p className={`py-2 uppercase ${ data.status === 'active' ? 'text-green-500' : 'text-red-500' }`}>
										{ data.status }
									</p>
								</div>
							</div>
							<div className="py-4 md:py-8">
								<p className="block text text-lg py-4">{ data.details }</p>
							</div>
							<div className="py-4">
								<p className="block text-lg">Info</p>
								<div className='px-2 max-w-sm md:max-w-xl'>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Name: </a>
										<a className="block text-gray-400">{ data.name }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Locality: </a>
										<a className="block text-gray-400">{ data.locality }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Region: </a>
										<a className="block text-gray-400">{ data.region }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Coordinate: </a>
										<a className="block text-gray-400">{ data.longitude }, { data.latitude }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Timezone: </a>
										<a className="block text-gray-400">{ data.timezone }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Launch Times: </a>
										<a className="block text-gray-400" title='successes/attempts'>{ data.launch_successes } / { data.launch_attempts }</a>
									</div>
								</div>
							</div>
							{/* <div className="py-4">
								<p className="block text-lg">Engine</p>
								<div className='px-2 max-w-sm md:max-w-xs'>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Type: </a>
										<a className="block text-gray-400">{ data.engines.type }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Version: </a>
										<a className="block text-gray-400">{ data.engines.version }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Number: </a>
										<a className="block text-gray-400">{ data.engines.number }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">layout: </a>
										<a className="block text-gray-400">{ data.engines.layout }</a>
									</div>
								</div>
							</div>
							<div className="py-4">
								<p className="block text-lg">Payload Weights</p>
								<div className='px-2 max-w-sm md:max-w-xs'>
									{
										data.payload_weights.map(w => (
											<div className='py-1 flex' key={w.id}>
												<a className="rocket-info-key" title={w.name}>{ w.id }: </a>
												<a className="block text-gray-400">{ w.kg } kg / { w.lb } lb</a>
											</div>	
										))
									}
								</div>
							</div> */}
							<div className="py-4">
								<p className="block w-24 text-lg">Photos</p>
								<div className="flex px-2 flex-wrap justify-evenly just py-4 w-full">
									{
										data.images.large.map(photo => (
											<button onClick={() => { window.open(photo, '__blank') }} key={photo} className="w-[24rem] h-[18rem] md:h-[20rem] md:mx-2">
												<Image className="object-cover cursor-pointer rounded" src={photo} layout="responsive" width={400} height={300} alt={photo}></Image>
											</button>
										))
									}
								</div>
							</div>

						</div>
						<span onClick={() => router.back()} className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center hover:text-white'>
							<ArrowSmLeftIcon className="h-5 w-5"/>
							<span className="pl-2"> Back </span>
						</span>
					</div>
				</div>
			</section>
	</Layout>
}

export default Launchpad
