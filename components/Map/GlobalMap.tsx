import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import mapboxgl, { LngLatLike, Map } from "mapbox-gl"
import { Terminator } from "../../utils/solar"
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson"
import { useISS } from "../../hooks/useISS"

interface IProps {
	
}

const MapCon: FunctionComponent<IProps> = ({}) => {
	const addMarker = (url: string, lnglat: LngLatLike) => {
		const el = document.createElement('div')
		el.className = 'marker'
		el.style.backgroundImage = `url(${url})`
		el.style.width = `2rem`
		el.style.height = `2rem`
		el.style.backgroundSize = '100%'
		map.current && new mapboxgl.Marker(el).setLngLat(lnglat).addTo(map.current)
	}

	const addTerminatorLayer = (geojson: FeatureCollection | string) => {
		map.current?.getLayer('terminator') && map.current.removeLayer('terminator')
		map.current?.getSource('terminator') && map.current.removeSource('terminator')
		map.current?.addSource('terminator', { type: 'geojson', data: geojson })
		map.current?.addLayer({
			id: 'terminator',
			type: 'fill',
			source: 'terminator',
			layout: {},
			paint: {
				'fill-color': '#ffffff',
				'fill-opacity': 0.1
			}
		})
	}

	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<Map | null>(null)
	const [zoom, setZoom] = useState(1)
	const { data, trace } = useISS()

	addMarker('/images/sun.png', [0, 0])
	
	const geojson = new Terminator().toGeoJSON()
	// addTerminatorLayer(geojson)

	const [terminator, updateTerminator] = useState<string | FeatureCollection>(geojson)

	useEffect(() => {
		if(!map.current?.isStyleLoaded()) {
			console.log(2333, terminator)
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
		}, 60000)
		return () => clearInterval(timer)
	}, [])




	return (
		<div ref={ mapContainer } className="w-full h-full">
		</div>
	)
}

export default MapCon