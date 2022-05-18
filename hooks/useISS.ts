import useSWR, { Fetcher } from 'swr'
import { FeatureCollection, Feature } from 'geojson'
import { ISSData } from '../types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const line: number[][] = []

const traceGeojson: Feature = 
	{
		type: 'Feature', 
		geometry: {
			type: 'LineString',
			coordinates: []
		},
		properties: {}
	}

export const useISS = () => {
	const { data, error} = useSWR<ISSData>('/api/iss', fetcher, { refreshInterval: 3000 })
	data?.iss && (
		line.push([data?.iss.longitude, data?.iss.latitude])
	)

	return {
		trace: {
			type: 'FeatureCollection',
			features: [
				{ type: 'Feature', 
					geometry: {
						type: 'LineString',
						coordinates: line
					},
					properties: {}
				}
			]
		},
		line,
		data,
		error,
		loading: !error && !data
	}
}