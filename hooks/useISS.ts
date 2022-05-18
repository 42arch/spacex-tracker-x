import useSWR, { Fetcher } from 'swr'
import { FeatureCollection, Feature } from 'geojson'
import { useEffect, useState } from "react"
import { Terminator } from "../utils/solar"
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
		} as FeatureCollection,
		line,
		data,
		error,
		loading: !error && !data
	}
}

export const useTerminator = () => {
	const [terminator, updateTerminator] = useState<string | FeatureCollection>(new Terminator().toGeoJSON())

	useEffect(() => {
		let timer = setInterval(() => {
			const geojson = new Terminator().toGeoJSON()
			updateTerminator(geojson)
		}, 6000)
		return () => clearInterval(timer)
	}, [])

	return {
		terminator
	}
}