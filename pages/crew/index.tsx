import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { Crew, Rocket } from '../../types'
import { getAllCrews, getRockets } from '../../utils/api'

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let data = null
	try {
		data = await getAllCrews() as Crew[]

	} catch (error) {

	}
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
			data
		}
	}
}

const CrewIndex = ({ data }: { data: Crew[] }) => {
	const router = useRouter()
	return (
		<Layout>
			<section className='w-full h-full relative pt-4 pb-18 px-2 md:px-20 flex flex-col justify-center'>
				<div className='py-8 pl-4 flex flex-col items-center md:items-start'>
					{
						data && (
							data.map(crew => (
								<div key={crew.id} className=' min-w-min py-4'>
									<Link href={`/crew/${crew.id}`}>
										<a className=' underline underline-offset-2 text-center text-xl'> { crew.name } </a>
									</Link>
								</div>
							))
						)
					}
				</div>
			</section>
		</Layout>
	)
}

export default CrewIndex
