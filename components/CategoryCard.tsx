import React, { FunctionComponent } from 'react'
import styles from './CategoryCard.module.css'

interface IProps {
	bgPath: string
	name: string
	jumpTo: () => void
}

const CategoryCard: FunctionComponent<IProps> = ({ bgPath, name, jumpTo }) => {
	return (
		<div style={{ backgroundImage: `url(${bgPath})`}} className={`group rounded relative m-4 md:m-0 flex opacity-100 dark:opacity-80 justify-end h-[20rem] md:h-[22rem] w-[18rem] md:w-[16rem] md:justify-self-center md:self-center bg-no-repeat bg-cover bg-center`}>
			<div className='flex justify-center items-center absolute bottom-3 invisible group-hover:visible w-full h-0 group-hover:h-full duration-300'>
				<a onClick={ jumpTo } className='cursor-pointer opacity-100 bg-black text-white hover:bg-slate-900 w-1/2 h-10 leading-10 text-center'>
					MORE
				</a>
			</div>
			<span className='w-full text-center absolute text-white bottom-3 uppercase text-2xl font-bold'>
				{
					name
				}
			</span>
		</div>
	)
}

export default CategoryCard
