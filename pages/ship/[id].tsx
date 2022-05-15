import { GetStaticProps, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Layout from '../../components/Layout'
import { Ship } from '../../types'
import { getAllShips, queryOneShip } from '../../utils/api'
import Link from 'next/link'

export async function getStaticPaths() {
	const ships = await getAllShips()
	const enPaths = ships.map(ship => (`/ship/${ship.id}`))
	const cnPaths = ships.map(ship => (`/zh-CN/ship/${ship.id}`))
	return {
		paths: [...enPaths, ...cnPaths],
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let data = null
	try {
		const id = params?.id?.toString()
		data = await queryOneShip(id) as Ship
	} catch (error) {
	}
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
			data: data
		}
	}
}

export default function ShipPage({ data }: { data: Ship }) {
	return <Layout>
		<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
			<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 text-gray-300'>
				<div className='h-auto'>
					{
						data ? (
							<div className="flex flex-col">
								<div className="w-full flex flex-col md:flex-row">
									<div className="h-full flex flex-col justify-center py-4 md:py-0">
										<span className="py-4 text-3xl md:text-center">{ data.name }</span>
										<p className={`py-2 uppercase ${ data.active ? 'text-green-500' : 'text-red-500' }`}>
											{data.active ? 'active' : 'inactive' }
										</p>
									</div>
								</div>
								<div className="py-4 md:py-8">
								<p className="block text-lg">Info</p>
								<div className='px-2 max-w-sm md:max-w-xl'>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Type: </a>
										<a className="block text-gray-400">{ data.type }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Roles: </a>
										<a className="block text-gray-400">{ data.roles.join(',  ').toString() }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Built Year: </a>
										<a className="block text-gray-400">{ data.year_built }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">Home Port: </a>
										<a className="block text-gray-400">{ data.home_port }</a>
									</div>
									<div className='py-1 flex'>
										<a className="rocket-info-key">mmsi: </a>
										<a className="block text-gray-400">{ data.mmsi }</a>
									</div>
								</div>
							</div>
							<div className="py-4">
							{
									data.image && (
										<div className="py-4">
											<p className="block w-24 text-lg">Photos</p>
											<div className="flex px-2 flex-wrap justify-evenly just py-4 w-full">
												{
													<button onClick={() => { window.open(data.image, '__blank') }} className="w-[24rem] h-[18rem] md:h-[20rem] md:mx-2">
														<Image className="object-cover cursor-pointer rounded" src={data.image} layout="responsive" width={480} height={340} alt={data.image}></Image>
													</button>
												}
											</div>
										</div>
									)
								}
								<div className="py-4">
									<p className="block w-24 text-lg">Launches</p>
									<div>
										{
											data.launches && data.launches.map(launch => (
												<Link key={launch.id} href={`/launch/${launch.id}`}>
													<button className="block text-gray-400 px-2 py-4 hover:text-white underline underline-offset-2">{ launch.name }</button>
												</Link>
											))
										}
									</div>
								</div>
							</div>
						</div>
						) : (
							<span>loading</span>
						)
					}
				</div>
			</div>
		</section>
	</Layout>
}