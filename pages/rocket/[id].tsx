import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { Rocket } from '../../types'
import { getOneRocket, getRockets } from '../../utils/api'

export async function getStaticPaths() {
	const rockets = await getRockets()
	const enPaths = rockets.map(r => (`/rocket/${r.id}`))
	const cnPaths = rockets.map(r => (`/zh-CN/rocket/${r.id}`))
	return {
		paths: [...enPaths, ...cnPaths],
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	try {
		const id = params?.id?.toString()
		const data: Rocket = await getOneRocket(id)
		return {
			props: {
				...(locale && await serverSideTranslations(locale, ['common'])),
				error: false,
				data: data,
				loading: !data
			}
		}
	} catch (error) {
		return {
			props: {
				...(locale && await serverSideTranslations(locale, ['common'])),
				error: true,
				data: null,
				loading: false
			}
		}
	}
}

export default function RocketPage({ data, loading }: { data: Rocket, loading: boolean }) {
	const { t } = useTranslation()

	return <Layout>
		<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
			<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 dark:text-gray-200'>
				<div className='h-auto'>
					<div className="flex flex-col">
						<div className="w-full flex flex-col md:flex-row">
							<div className="h-full flex flex-col justify-center py-4 md:py-0">
								<span className="py-4 text-3xl md:text-center">{ data.name }</span>
								<p className={`py-2 uppercase ${ data.active ? 'text-green-500' : 'text-red-500' }`}>
									{data.active ? `${ t('status.active') }` : `${ t('status.inactive') }` }
								</p>
							</div>
						</div>
						<div className="py-4 md:py-8">
							<p className="block text text-lg py-4">{ data.description }</p>
						</div>
						<div className="py-4">
							<p className="block text-lg">{ t('rocket.info') }</p>
							<div className='px-2 max-w-sm md:max-w-xl'>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.firstFlight') }: </a>
									<a className="info-value">{ data.first_flight }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.country') }: </a>
									<a className="info-value">{ data.country }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.company') }: </a>
									<a className="info-value">{ data.company }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.cost') }: </a>
									<a className="info-value">{ data.cost_per_launch }$</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.successRate') }: </a>
									<a className="info-value">{ data.success_rate_pct }%</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.stages') }: </a>
									<a className="info-value">{ data.stages }</a>
								</div>
							</div>
						</div>
						<div className="py-4">
							<p className="block text-lg">{ t('rocket.engine') }</p>
							<div className='px-2 max-w-sm md:max-w-xs'>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.type') }: </a>
									<a className="info-value">{ data.engines.type }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.version') }: </a>
									<a className="info-value">{ data.engines.version }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.number') }: </a>
									<a className="info-value">{ data.engines.number }</a>
								</div>
								<div className='py-1 flex'>
									<a className="info-key">{ t('rocket.layout') }: </a>
									<a className="info-value">{ data.engines.layout }</a>
								</div>
							</div>
						</div>
						<div className="py-4">
							<p className="block text-lg">{ t('rocket.payloadWeight') }</p>
							<div className='px-2 max-w-sm md:max-w-xs'>
								{
									data.payload_weights.map(w => (
										<div className='py-1 flex' key={w.id}>
											<a className="info-key" title={w.name}>{ w.id }: </a>
											<a className="info-value">{ w.kg } kg / { w.lb } lb</a>
										</div>	
									))
								}
							</div>
						</div>
						<div className="py-4">
							<p className="block w-24 text-lg">{ t('rocket.photo') }</p>
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
}