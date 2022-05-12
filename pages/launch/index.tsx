import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import useSWRInfinite from "swr/infinite"
import LaunchItem from '../../components/Launch/LaunchItem'
import Layout from '../../components/Layout'
import { LaunchInfo } from '../../types'

const TABS = ['All', 'Upcoming', 'Success', 'Fail']
const launchList: LaunchInfo[] = []

export async function getStaticProps({ locale }: {locale: any}) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}

const LaunchIndex = () => {
	const [activeTab, setActiveTab] = useState(0)
	const switchTab = (index: number) => {
		launchList.length = 0
		setPage(1)
		setActiveTab(index)
	}

	const [page, setPage] = useState(1)

	const fetcher = (url: string, page: number, status: string) => {
		const query: { upcoming?: boolean, success?: boolean } = {}
		switch (status) {
			case 'Upcoming':
				query.upcoming = true
				break
			case 'Success':
				query.success = true
				break
			case 'Fail':
				query.success = false
				break
			default:
				break
		}
		return fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
			query,
			"options": {
				"select": "id, name, date_utc",
				"page": page,
				"limit": 10,
				"sort": {
					"date_unix": "desc"
				}
			} }) }).then(res => res.json()).then(data => data.docs)
	}

	const { data, error, mutate, size, setSize } = useSWRInfinite<LaunchInfo[]>(() => (['https://api.spacexdata.com/v4/launches/query', page, TABS[activeTab] ]), fetcher)
	const isLoading = !data && !error

	if(data && data.length > 0) {
		launchList.push(...data[0])
	}

	return (
		<Layout>
			<section className='w-full h-full relative pt-4 pb-18 px-2 md:px-10 flex flex-col'>
				<div className='w-full h-20 md:h-10 flex flex-wrap justify-evenly items-center'>
					{
						TABS.map((tab, index) => {
							return (
								<button key={tab} onClick={() => { switchTab(index) }} className={`cursor-pointer text-xl hover:bg-slate-900 duration-100 w-28 h-8 md:h-10 leading-8 md:leading-10 text-center rounded-md ${ activeTab === index ? 'bg-slate-900' : '' }`}>
									{ tab }
								</button>
							)
						})
					}
				</div>
				<div className='w-full h-full px-4 md:px-10 py-4 md:py-8 flex flex-col justify-center text-white'>
					{
						launchList.map((info, index) => {
							return (
								<LaunchItem  key={index} data={info} goDetail={() => {console.log(222)}}></LaunchItem>
							)
						})
					}
					<div className='flex justify-center items-center pt-8'>
						{
							isLoading ? (
								<span className='w-1/2 h-12 text-center'>loading</span>
							) : (
								<button className='w-1/2 h-12' onClick={ () => { setPage(page+1) } }>load more</button>
							)
						}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default LaunchIndex
