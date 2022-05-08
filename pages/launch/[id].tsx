import Layout from "../../components/Layout"
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import Link from "next/link"
import Image from 'next/image'
import { LaunchInfo, LaunchPad, Payload, Rocket } from "../../types"
import { GetStaticProps, GetStaticPropsContext } from "next"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { getOneLaunch, getOneLaunchpad, getOneRocket, getPayloads } from "../../utils/api"
import { useRouter } from "next/router"

interface IProp {
	data: LaunchInfo | null
	rocket: Rocket | null
	launchpad: LaunchPad | null
	payloads: Payload[] | null
	error: boolean
}

export async function getStaticPaths() {
  return {
    paths: [
      
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	try {
		const id = context.params?.id?.toString()
		const data = await getOneLaunch(id)
		const rocket = await getOneRocket(data.rocket)
		const launchpad = await getOneLaunchpad(data.launchpad)
		const payloads = await getPayloads(data.payloads)

		data.date_utc = format(new Date(data.date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'", {locale: zhCN})
		return {
			props: {
				error: false,
				data: data,
				rocket,
				launchpad,
				payloads
			}
		}
	} catch (error) {
		return {
			props: {
				error: true,
				data: null,
				rocket: null,
				launchpad: null,
				payloads: null
			}
		}
	}
}

export default function Launch({ data, rocket, launchpad, payloads, error } : IProp) {
	const router = useRouter()
	const openLink = (url: string) => {
		window.open(url, '__blank')
	}

	return <Layout>
			<section className='w-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 text-gray-300'>
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
										<button onClick={() => { window.open(data.links.webcast, '__blank') }} className="border-2 border-gray-400 text-gray-400 hover:text-red-500 hover:border-red-500 duration-100 rounded h-10">
											Watch Webcast
										</button>
									</div>
								</div>
								<div className="py-4 md:py-8">
									<div className="py-4">
										{/* <p className="block w-24 text-lg">Details:</p> */}
										<p className="block text text-lg py-4">{ data.details || 'null' }</p>
									</div>
									{
										rocket && (
											<div className="py-4">
												<p className="block w-24 text-lg">Rocket</p>
												<Link href={`/rocket/${data.rocket}`} >
													<a className="block text-gray-400 py-4 hover:text-white underline underline-offset-2">{ rocket.name }</a>
												</Link>
											</div>
										)
									}
									{
										launchpad && (
											<div className="py-4">
												<p className="block w-24 text-lg">Launchpad</p>
												<a className="block cursor-pointer text-gray-400 py-4 hover:text-white underline underline-offset-2">{ launchpad.full_name }</a>
											</div>
										)
									}

									<div className="py-4">
										<p className="block w-24 text-lg">Payloads:</p>
										<div>
											{
												payloads && payloads.map(payload => (
													<a key={payload.id} className="block text-gray-400 py-4 hover:text-white">{ payload.name }</a>
												))
											}
										</div>
									</div>
									<div className="py-4">
										<p className="block w-24 text-lg">Links:</p>
										<div className="flex py-4">
											{
												data.links.presskit && (
													<button onClick={ () => openLink(data.links.presskit) } className="link-btn">
														Presskit
													</button>
												)
											}
											{
												data.links.wikipedia && (
													<button onClick={ () => openLink(data.links.wikipedia) } className="link-btn">
														Wikipedia
													</button>
												)
											}
											{
												data.links.article && (
													<button onClick={ () => openLink(data.links.article) } className="link-btn">
														Article
													</button>
												)
											}
										</div>
									</div>
									<div className="py-4">
										<p className="block w-24 text-lg">Photos:</p>
										<div className="flex flex-wrap justify-evenly just py-4 w-full">
											{
												data.links.flickr.original.map(photo => (
													<button onClick={() => { window.open(photo, '__blank') }} key={photo} className="w-[24rem] h-[18rem] md:h-[20rem] md:mx-2">
														<Image className="object-cover cursor-pointer rounded" src={photo} layout="responsive" width={400} height={300} alt={photo}></Image>
													</button>
												))
											}
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
						<span onClick={() => router.back()} className='cursor-pointer w-20 h-12 leading-normal flex items-center text-center hover:text-white'>
							<ArrowSmLeftIcon className="h-5 w-5"/>
							<span className="pl-2"> Back </span>
						</span>
					</div>
				</div>
			</section>
	</Layout>
}