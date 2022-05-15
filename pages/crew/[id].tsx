import { GetStaticProps, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Layout from '../../components/Layout'
import { Crew, Payload } from '../../types'
import { getAllCrews, getPayloadIds, queryOneCrew, queryOnePayload } from '../../utils/api'

export async function getStaticPaths() {
	const crews = await getAllCrews()
	const enPaths = crews.map(crew => (`/crew/${crew.id}`))
	const cnPaths = crews.map(crew => (`/zh-CN/crew/${crew.id}`))
	return {
		paths: [...enPaths, ...cnPaths],
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let data = null
	try {
		const id = params?.id?.toString()
		data = await queryOneCrew(id) as Crew
	} catch (error) {
	}
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
			data: data
		}
	}
}

export default function CrewPage({ data }: { data: Crew }) {
	return <Layout>
		<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
			<div className='w-full h-full px-2 md:px-10 py-4 md:py-8 text-gray-300'>
				<div className='h-auto'>
					{
						data ? (
							<div className="flex flex-col">
								<div className="w-full flex flex-col md:flex-row">
									<div className="mx-4 flex justify-center items-center">
										<Image src={ data.image } alt='patch' width={256} height={320}/>
									</div>
									<div className="h-full flex flex-col justify-center py-4 md:py-0 px-2 md:px-16">
										<span className="py-4 text-3xl md:text-center">
											{ data.name }
										</span>
										<p className={`py-2 uppercase ${ data.status === 'active' ? 'text-green-500' : 'text-red-500' }`}>
											{ data.status }
										</p>
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