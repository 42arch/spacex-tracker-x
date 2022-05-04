import useSWR, { Fetcher } from 'swr'

type Launch = {
	id: string
	name: string
	flight_number: number
	date_unix: number
	date_utc: string
	rocket: string
	launchpad: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())


export const useNextLaunch = () => {
	const { data, error} = useSWR<Launch>('https://api.spacexdata.com/v4/launches/next', fetcher)
	return {
		data,
		error,
		loading: !error && !data
	}
}