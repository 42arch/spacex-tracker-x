import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import mapboxgl, { LngLatLike, Map, Marker } from "mapbox-gl"
import { Terminator } from "../../utils/solar"
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson"
import { useISS } from "../../hooks/useISS"


const MapCon: FunctionComponent = ({}) => {


	const createMarker = (url: string, lnglat: LngLatLike) => {
		const el = document.createElement('div')
		el.className = 'marker'
		el.style.backgroundImage = `url(${url})`
		el.style.width = `1.5rem`
		el.style.height = `1.5rem`
		el.style.backgroundSize = '100%'
		const marker = new mapboxgl.Marker(el).setLngLat(lnglat)
		return marker
	}

	const addTerminatorLayer = (geojson: FeatureCollection | string) => {
		if(map.current?.getSource('terminator')) {
			const terSource = map.current.getSource('terminator')
			if(terSource.type ==='geojson') {
				terSource.setData(geojson)
			}
		} else {
			map.current?.addSource('terminator', { type: 'geojson', data: geojson })
			map.current?.addLayer({
				id: 'terminator',
				type: 'fill',
				source: 'terminator',
				layout: {},
				paint: {
					'fill-color': '#000000',
					'fill-opacity': 0.2
				}
			})
		}
	}


	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<Map | null>(null)
	const [zoom, setZoom] = useState(1)
	const { data, trace } = useISS()

	const sunMarker = useRef<Marker | null>(createMarker('/images/sun.png', [0, 0]))
	const issMarker = useRef<Marker | null>(createMarker('/images/iss.gif', [0, 0]))
	map.current && issMarker.current?.addTo(map.current)
	map.current && sunMarker.current?.addTo(map.current)
	if(data?.iss.solar_lat && data.iss.solar_lon) {
		sunMarker.current?.setLngLat([data.iss.solar_lon, data.iss.solar_lat])
		issMarker.current?.setLngLat([data.iss.longitude, data.iss.latitude])
	}

	const geojson = new Terminator().toGeoJSON()

	const [terminator, updateTerminator] = useState<string | FeatureCollection>(geojson)

	useEffect(() => {
		if(!map.current?.isStyleLoaded()) {
			map.current?.on('load', () => {
				addTerminatorLayer(terminator)
			})
		} else {
			addTerminatorLayer(terminator)
		}

		mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'
		if(map.current) {
			return
		}
		
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [0, 0],
			attributionControl: false,
			zoom: zoom
		})
		map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')
	}, [terminator])

	
	useEffect(() => {
		let timer = setInterval(() => {
			const geojson = new Terminator().toGeoJSON()
			updateTerminator(geojson)
		}, 6000)
		return () => clearInterval(timer)
	}, [])




	return (
		<div ref={ mapContainer } className="w-full h-full">
		</div>
	)
}

export default MapCon