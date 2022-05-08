import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { Rocket } from '../../types'
import { getRockets } from '../../utils/api'

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	try {
		const data: Rocket[] = await getRockets()
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

const RocketIndex = ({ data }: { data: Rocket[] }) => {
	const router = useRouter()
	return (
		<Layout>
			<section className='w-full h-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col justify-center'>
				<div className='py-8 pl-4 flex flex-col items-center md:items-start'>
					{
						data && (
							data.map(rocket => (
								<div key={rocket.id} className=' min-w-min py-4'>
									<Link href={`/rocket/${rocket.id}`}>
										<a className=' underline underline-offset-2 text-center text-xl'> { rocket.name } </a>
									</Link>
								</div>
							))
						)
					}
				</div>
				<span onClick={() => router.back()} className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center hover:text-white'>
					<ArrowSmLeftIcon className="h-5 w-5"/>
					<span className="pl-2"> Back </span>
				</span>
			</section>
		</Layout>
	)
}

export default RocketIndex
