import useSWR, { Fetcher } from 'swr'
import { LaunchInfo } from '../types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useNextLaunch = () => {
	const { data, error} = useSWR<LaunchInfo>('https://api.spacexdata.com/v4/launches/next', fetcher)
	return {
		data,
		error,
		loading: !error && !data
	}
}