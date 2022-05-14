import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { LaunchPad, Rocket } from '../../types'
import { getLaunchpads } from '../../utils/api'

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	let data = null
	try {
		data = await getLaunchpads() as LaunchPad[]
	} catch (error) {

	}
	return {
		props: {
			...(locale && await serverSideTranslations(locale, ['common'])),
			data
		}
	}
}

const RocketIndex = ({ data }: { data: LaunchPad[] }) => {
	const router = useRouter()
	return (
		<Layout>
			<section className='w-full h-full relative pt-4 pb-18 px-2 md:px-20 flex flex-col justify-center'>
				<div className='py-8 pl-4 flex flex-col items-center md:items-start'>
					{
						data && (
							data.map(launchpad => (
								<div key={launchpad.id} className=' min-w-min py-4'>
									<Link href={`/launchpad/${launchpad.id}`}>
										<a className=' underline underline-offset-2 text-center text-xl'> { launchpad.name } </a>
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

export default RocketIndex
