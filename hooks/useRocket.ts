import useSWR from "swr"
import { Rocket } from "../types"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useRocket = (id: string) => {
	const { data, error} = useSWR<Rocket>(`https://api.spacexdata.com/v4/rockets/${id}`, fetcher)
	return {
		data,
		error,
		loading: !error && !data
	}
}