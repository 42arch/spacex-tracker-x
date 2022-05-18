import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'

const GlobalMap = dynamic(
	() => import('../../components/Map/GlobalMap'),
	{ ssr: false }
)

export async function getStaticProps({ locale }: {locale: any}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}

const ISSIndex = () => {
	return (
		<Layout simple>
			<div className='w-full h-main absolute'>
			<section className='w-full h-full min-h-main px-0 relative'>
				<GlobalMap/>
			</section>
			</div>
		</Layout>
	)
}

export default ISSIndex
