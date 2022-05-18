import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import NextLaunchSection from '../components/NextLaunchSection'
import Layout, { siteTitle } from '../components/Layout'
import { getNextLaunch, queryOneLaunch } from '../utils/api'

export async function getStaticProps({ locale }: {locale: any}) {
	const nextLaunch = await getNextLaunch()
	const moreInfo = await queryOneLaunch(nextLaunch.id)
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			data: moreInfo
		}
	}
}

const Home = ({ data } : InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<Layout home simple>
			<Head>
				<title>{ siteTitle }</title>
			</Head>
			<div className="flex flex-col h-full relative">
				<NextLaunchSection data={data}/>
			</div>
		</Layout>
	)
}

export default Home