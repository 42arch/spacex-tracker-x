import Layout from "../../components/Layout"
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import Link from "next/link"
import Image from 'next/image'
import { useOneLaunch } from "../../hooks/useOneLaunch"
import useSWR from "swr"
import { LaunchInfo } from "../../types"
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

	// // const { data: launchInfo } = useOneLaunch(launchId)
	// const fetcher = (url: string) => fetch(url).then(res => res.json())
	// const { data, error} = useSWR<LaunchInfo>(`https://api.spacexdata.com/v4/launches/${id}`, fetcher)

	try {
		const id = context.params?.id
		const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
		const data = await res.json() as LaunchInfo
		data.date_utc = format(new Date(data.date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'", {locale: zhCN})
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

export default function Launch({ data, error } : {data: LaunchInfo, error: any}) {

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 flex flex-col justify-center text-white'>
					<div>
					{
						data ? (
							<div className="w-full h-40 md:h-52 flex flex-col items-center md:flex-row ">
								<div className="mx-4">
									{
										data.links.patch.small ? (
											<Image src={ data.links.patch.small } alt='patch' width={200} height={200}/>
										) : (
											<Image src='/images/spacex-white.png' alt='patch' width={200} height={200}/>
										)
									}
								</div>
								<div className="h-full flex flex-col justify-center py-4 md:py-0 md:px-4">
									<span className="py-4 text-3xl font-bold text-center">
										{
											data.name
										}
									</span>
									<p className="py-2">{ data.date_utc }</p>
									<p className={`py-2 uppercase ${ data.upcoming ? 'text-blue-500' : ( data.success ? 'text-green-500' : 'text-red-500' )}`}>
										{ data.success ? 'success' : (data.upcoming ? 'upcoming' : 'fail') }
									</p>
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