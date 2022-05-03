import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import LaunchCard from '../components/LaunchCard'
import Layout, { siteTitle } from '../components/Layout'

const Home: NextPage = () => {
	return (
		<Layout home>
			<Head>
        <title>{ siteTitle }</title>
      </Head>

			<section className="flex ">
        {/* <p>Next launch</p>
        <p>
					Starlink 4-17 (v1.5)
        </p> */}
      </section>

		</Layout>
	)
}

export default Home