import useSWR from 'swr'
import { LaunchInfo } from '../types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useOneLaunch = (id: string) => {
	const { data, error} = useSWR<LaunchInfo>(`https://api.spacexdata.com/v4/launches/${id}`, fetcher)
	return {
		data,
		error,
		loading: !error && !data
	}
}