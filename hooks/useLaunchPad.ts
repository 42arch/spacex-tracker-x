import useSWR from "swr"
import { LaunchPad } from "../types"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useLaunchPad = (id: string) => {
	const { data, error} = useSWR<LaunchPad>(`https://api.spacexdata.com/v4/launchpads/${id}`, fetcher)

	return {
		data,
		error,
		loading: !error && !data
	}
}