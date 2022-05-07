import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { Rocket } from '../../types'
import { getOneRocket, getRockets } from '../../utils/api'

export async function getStaticPaths() {
	const rockets = await getRockets()
	const paths = rockets.map(r => (`/rocket/${r.id}`))
	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	try {
		const id = context.params?.id?.toString()
		const data: Rocket = await getOneRocket(id)
		return {
			props: {
				error: false,
				data: data

			}
		}
	} catch (error) {
		return {
			props: {
				error: true,
				data: null
			}
		}
	}
}

export default function RocketPage({rocket}: { rocket: Rocket }) {
	const router = useRouter()

	console.log(233, rocket)

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 text-gray-300'>
					rocket 33333
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