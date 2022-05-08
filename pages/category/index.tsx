import { useRouter } from 'next/router'
import React from 'react'
import CategoryCard from '../../components/CategoryCard'
import Layout from '../../components/Layout'

export function getStaticProps() {
	return {
		props: {}
	}
}

const CategoryIndex = () => {
	const router = useRouter()
	return (
		<Layout>
			<section className='w-full h-main py-20 px-10 flex flex-wrap justify-evenly items-center md:grid md:grid-cols-4 md:gap-10'>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-rocket.jpg' name='rocket'></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-launchpad.png' name='launchpad'></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-launchpad.png' name='payload'></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-launchpad.png' name='ship'></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-crew.jpg' name='crew'></CategoryCard>
				<CategoryCard jumpTo={() => { router.push('/rocket') }} bgPath='/images/bg-crew.jpg' name='landpad'></CategoryCard>
			</section>
		</Layout>
	)
}

export default CategoryIndex