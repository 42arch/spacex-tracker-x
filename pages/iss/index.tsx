import dynamic from 'next/dynamic'
import Head from 'next/head'
import Layout from '../../components/Layout'

const GlobalMap = dynamic(
	() => import('../../components/Map/GlobalMap'),
	{ ssr: false }
)

const ISSIndex = () => {
	return (
		<Layout simple>
			<div className='w-full h-main absolute'>
			<section className='w-full h-full min-h-main py-2 px-0 md:px-4 relative'>
				<GlobalMap/>
			</section>
			</div>
		</Layout>
	)
}

export default ISSIndex
