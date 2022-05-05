import React from 'react'
import CategoryCard from '../../components/CategoryCard'
import Layout from '../../components/Layout'

export function getStaticProps() {
	return {
		props: {}
	}
}

const CategoryIndex = () => {
	return (
		<Layout>
			<section className='w-full h-full py-2 px-10 flex flex-wrap justify-evenly items-center'>
				<CategoryCard bgPath='/images/bg-rocket.jpg' name='rocket'></CategoryCard>
				<CategoryCard bgPath='/images/bg-launchpad.png' name='launchpad'></CategoryCard>
				<CategoryCard bgPath='/images/bg-crew.jpg' name='crew'></CategoryCard>
				{/* <CategoryCard bgPath='/images/bg-crew.jpg' name='crew'></CategoryCard> */}
				<CategoryCard bgPath='/images/bg-crew.jpg' name='landpad'></CategoryCard>
			</section>
		</Layout>
	)
}

export default CategoryIndex