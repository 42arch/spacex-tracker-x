import Layout from "../../components/Layout"
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import Link from "next/link"
import Image from 'next/image'
import { useOneLaunch } from "../../hooks/useOneLaunch"
import useSWR from "swr"
import { LaunchInfo, LaunchPad } from "../../types"
import { GetStaticProps, GetStaticPropsContext } from "next"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

export async function getStaticPaths() {
  return {
    paths: [
      
    ],
    fallback: true
  }
}

const getOneLaunch = async (id: string | undefined) => {
	const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
	const data: LaunchInfo = await res.json()
	return data
}

const getOneLaunchpad = async (id: string | undefined) => {
	const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${id}`)
	const data: LaunchPad = await res.json()
	return data
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	try {
		const id = context.params?.id?.toString()
		const data = await getOneLaunch(id)
		const launchpad = await getOneLaunchpad(data.launchpad)
		data.date_utc = format(new Date(data.date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'", {locale: zhCN})
		
		return {
			props: {
				error: false,
				data: data,
				launchpad
			}
		}
	} catch (error) {
		return {
			props: {
				error: true,
				data: null,
				launchpad: null
			}
		}
	}
}

export default function Launch({ data, launchpad, error } : {data: LaunchInfo, launchpad: LaunchPad, error: any}) {

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 text-gray-200'>
					<div className="h-auto">
					{
						data ? (
							<div className="flex flex-col">
								<div className="w-full flex flex-col md:flex-row">
									<div className="mx-4 flex justify-center items-center">
										{
											data.links.patch.small ? (
												<Image src={ data.links.patch.small } alt='patch' width={200} height={200}/>
											) : (
												<Image src='/images/spacex-white.png' alt='patch' width={200} height={200}/>
											)
										}
									</div>
									<div className="h-full flex flex-col justify-center py-4 md:py-0 px-2 md:px-16">
										<span className="py-4 text-3xl md:text-center">
											{
												data.name
											}
										</span>
										<p className="py-2">{ data.date_utc }</p>
										<p className={`py-2 uppercase ${ data.upcoming ? 'text-blue-500' : ( data.success ? 'text-green-500' : 'text-red-500' )}`}>
											{ data.success ? 'success' : (data.upcoming ? 'upcoming' : 'fail') }
										</p>
										{/* <Link href={ data.links.webcast }> */}
											<button onClick={() => { window.open(data.links.webcast, '__blank') }} className="border-2 border-gray-400 text-gray-400 hover:text-red-500 hover:border-red-500 duration-100 rounded h-10">
												Watch Webcast
											</button>
										{/* </Link> */}
									</div>
								</div>
								<div className="py-4 md:py-8">
									<div className="py-4">
										<p className="block w-24 text-lg">Details:</p>
										<p className="block text text-gray-400 py-4">{ data.details }</p>
									</div>
									<div>
									<div className="py-4">
										<p className="block w-24 text-lg">Launchpad:</p>
										<p className="block text text-gray-400 py-4">{ launchpad.full_name }</p>
									</div>
									</div>
								</div>
							</div>
						) : (
							error ? (
								<span>Something went wrong</span>
							) : (
								<span>Loading</span>
							)
						)
					}
					</div>

					<div>
						<Link href='/launch'>
							<span className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center'>
								<ArrowSmLeftIcon className="h-5 w-5"/>
								<span className="pl-2"> Back </span>
							</span>
						</Link>
					</div>
				</div>
			</section>
	</Layout>
}