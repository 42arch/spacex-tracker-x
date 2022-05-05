import React, { useState } from 'react'
import useSWRInfinite from "swr/infinite"
import LaunchItem from '../../components/Launch/LaunchItem'
import Layout from '../../components/Layout'
import { useLaunches } from '../../hooks/useLaunches'
import { LaunchInfo } from '../../types'

const tabs = ['All', 'UpComing', 'Success', 'Fail']
// type Launch = {
// 	id: string
// 	name: string
// 	flight_number: number
// 	date_unix: number
// 	date_utc: string
// 	rocket: string
// 	launchpad: string
// }

type dataType = {
	docs: LaunchInfo[],
	limit: number,
	page: number,
	totalDocs: number
}
const launchList: LaunchInfo[] = []
const LaunchIndex = () => {

	const [activeTab, setActiveTab] = useState(0)
	const [page, setPage] = useState(1)

	const fetcher = (url: string, page: number) => fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
		"query": {
			// "upcoming": true
		},
		"options": {
			"page": page,
			"limit": 10,
			"sort": {
				"date_unix": "desc"
			}
		} }) }).then(res => res.json()).then(data => data.docs)

	const { data, error, mutate, size, setSize } = useSWRInfinite<LaunchInfo[]>(() => (['https://api.spacexdata.com/v4/launches/query', page]), fetcher)
	const isLoading = !data && !error
	
	if(data && data.length>0) {
		launchList.push(...data[0])
	}
	
	return (
		<Layout>
			<section className='w-full h-full relative pt-4 pb-24 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-20 md:h-10 flex flex-wrap justify-evenly items-center'>
					{
						tabs.map((tab, index) => {
							return (
								<span key={tab} onClick={() => { setActiveTab(index) }} className={`cursor-pointer text-xl hover:bg-slate-900 duration-300 w-28 h-8 md:h-10 leading-8 md:leading-10 text-center rounded-md ${ activeTab === index ? 'bg-slate-900' : '' }`}>
									{ tab }
								</span>
							)
						})
					}
				</div>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 flex flex-col justify-center text-white'>
					{
						launchList.map((info, index) => {
							return (
								<LaunchItem data={info} key={index}></LaunchItem>
							)
						})
					}
					{
						isLoading && (
							<span>loading</span>
						)
					}
					<button onClick={ () => { setPage(page+1) } }>load more</button>
				</div>
			</section>
		</Layout>
	)
}

export default LaunchIndex
