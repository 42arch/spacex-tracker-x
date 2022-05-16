import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { Payload } from '../../types'
import { getPayloadIds, queryOnePayload } from '../../utils/api'

export async function getStaticPaths() {
	const payloads = await getPayloadIds()
	const enPaths = payloads.map(id => (`/payload/${id}`))
	const cnPaths = payloads.map(id => (`/zh-CN/payload/${id}`))
	return {
		paths: [...enPaths, ...cnPaths],
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let data = null
	try {
		const id = params?.id?.toString()
		data = await queryOnePayload(id) as Payload
	} catch (error) {
	}
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
			data: data
		}
	}
}

export default function RocketPage({ data }: { data: Payload }) {
	const router = useRouter()

	return <Layout>
		<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
			<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 dark:text-gray-200'>
				<div className='h-auto'>
					<div className="flex flex-col">
						<div className="w-full flex flex-col md:flex-row">
							<div className="h-full flex flex-col justify-center py-4 md:py-0">
								<span className="py-4 text-3xl md:text-center">{ data.name }</span>
								<p className={`py-2 uppercase text-green-500`}>
									{ data.type }
								</p>
							</div>
						</div>
						{
							data.dragon.capsule && (
								<div className="py-4 md:py-8">
									<p className="block text text-lg py-4">{ data.dragon.capsule.last_update }</p>
								</div>
							)
						}
						{
							data.dragon.capsule && (
								<div className="py-4">
									<p className="block text-lg">Dragon Capsule</p>
									<div className='px-2 max-w-sm md:max-w-xl'>
										<div className='py-1 flex'>
											<a className="info-key">status: </a>
											<a className="info-value">{ data.dragon.capsule.status }</a>
										</div>
										<div className='py-1 flex'>
											<a className="info-key">Reuse Count: </a>
											<a className="info-value">{ data.dragon.capsule.reuse_count }</a>
										</div>
										<div className='py-1 flex'>
											<a className="info-key">Water Landings: </a>
											<a className="info-value">{ data.dragon.capsule.water_landings }</a>
										</div>
										<div className='py-1 flex'>
											<a className="info-key">Land Landings: </a>
											<a className="info-value">{ data.dragon.capsule.land_landings }</a>
										</div>
									</div>
								</div>
							)
						}
						<div className="py-4">
							<p className="block text-lg">Basic Info</p>
							<div className='px-2 max-w-sm md:max-w-xl'>
								<div className='py-1 flex'>
									<a className="info-key">Reused: </a>
									<a className="info-value">{ data.reused ? 'Yes' : 'No' }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">Nationalities: </a>
									<a className="info-value">{ data.nationalities.toString() }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">Customers: </a>
									<a className="info-value">{ data.customers.toString() }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">Manufacturers: </a>
									<a className="info-value">{ data.manufacturers.toString() }</a>
								</div>
							</div>
						</div>
						<div className="py-4">
							<p className="block text-lg">Orbit Info</p>
							<div className='px-2 max-w-sm md:max-w-xl'>
								<div className='py-1 flex'>
									<a className="info-key">Orbit: </a>
									<a className="info-value">{ data.orbit }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">Reference System: </a>
									<a className="info-value">{ data.reference_system }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">Regime: </a>
									<a className="info-value">{ data.regime }</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</Layout>
}