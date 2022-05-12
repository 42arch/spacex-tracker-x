import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

export async function getStaticProps({ locale }: {locale: any}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}

const LaunchPadIndex = () => {
	return (
		<div>LaunchPadIndex</div>
	)
}

export default LaunchPadIndex
