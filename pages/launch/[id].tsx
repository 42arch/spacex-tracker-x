import Layout from "../../components/Layout"
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import Link from "next/link"
import { useOneLaunch } from "../../hooks/useOneLaunch"
import useSWR from "swr"
import { LaunchInfo } from "../../types"
import { GetStaticProps } from "next"

export async function getStaticPaths() {
  return {
    paths: [
      
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}: any) => {
	const id = params.id

	// // const { data: launchInfo } = useOneLaunch(launchId)
	// const fetcher = (url: string) => fetch(url).then(res => res.json())
	// const { data, error} = useSWR<LaunchInfo>(`https://api.spacexdata.com/v4/launches/${id}`, fetcher)

	const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
	const data = await res.json() as LaunchInfo
	console.log(222, data)
	return {
		props: {
			info: data
		}
	}
}

export default function Launch({ info } : {info: LaunchInfo}) {
	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 flex flex-col justify-center text-white'>
					<div>
					{
						info ? (
							<div className="w-full ">
								<span>
									{
										info.name
									}
								</span>
								<p>{ info.date_utc }</p>
							</div>
						) : (
							<span>loading</span>
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