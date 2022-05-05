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

const params = {

}

const fetcher = (url: string, page: number) => fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
	"query": {
		"upcoming": true
	},
	"options": {
		"page": page,
		"limit": 14,
		"sort": {
			"date_unix": "desc"
		}
	} }) }).then(res => res.json())

export const useLaunches = (page: number) => {
	const { data, error} = useSWR<Launch>(['https://api.spacexdata.com/v4/launches/query', page], fetcher)
	return {
		data,
		error,
		loading: !error && !data
	}
}