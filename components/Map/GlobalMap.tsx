import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import mapboxgl, { LngLatLike, Map, Marker } from "mapbox-gl"
import { FeatureCollection } from "geojson"
import { useISS } from "../../hooks/useISS"
import { useTerminator } from "../../hooks/useISS"

const mapStyles = [
	{ label: 'dark', value: 'dark-v10' },
	{ label: 'light', value: 'light-v10' },
	{ label: 'satellite', value: 'satellite-v9' },
	{ label: 'streets', value: 'streets-v11' }
]

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

	const addTraceLayer = (geojson: FeatureCollection | string) => {
		if(map.current?.getSource('trace')) {
			const traceSource = map.current.getSource('trace')
			if(traceSource.type ==='geojson') {
				traceSource.setData(geojson)
			}
		} else {
			map.current?.addSource('trace', { type: 'geojson', data: geojson })
			map.current?.addLayer({
				id: 'trace',
				type: 'line',
				source: 'trace',
				'layout': {
					'line-cap': 'round',
					'line-join': 'round'
					},
				'paint': {
					'line-color': '#ffffff',
					'line-width': 3,
					'line-opacity': 0.8
				}
			})
		}
	}

	const switchStyle = (style: string) => {
		map.current?.setStyle(`mapbox://styles/mapbox/${style}`, { diff: true })
	}

	const mapContainer = useRef<HTMLDivElement>(null)
	const map = useRef<Map | null>(null)
	const { data, trace } = useISS()
	const { terminator } = useTerminator()
	if(!map.current?.isStyleLoaded()) {
		map.current?.on('load', () => {
			addTerminatorLayer(terminator)
			addTraceLayer(trace)
		})
	} else {
		addTerminatorLayer(terminator)
		addTraceLayer(trace)
	}

	const sunMarker = useRef<Marker | null>(createMarker('/images/sun.png', [0, 0]))
	const issMarker = useRef<Marker | null>(createMarker('/images/iss.gif', [0, 0]))
	map.current && issMarker.current?.addTo(map.current)
	map.current && sunMarker.current?.addTo(map.current)
	if(data?.iss && data.iss.solar_lat && data.iss.solar_lon) {
		sunMarker.current?.setLngLat([data.iss.solar_lon, data.iss.solar_lat])
		issMarker.current?.setLngLat([data.iss.longitude, data.iss.latitude])
		map.current?.jumpTo({center: [data.iss.longitude, data.iss.latitude]})
	}

	useEffect(() => {
		mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'
		if(map.current) {
			return
		}
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: 'mapbox://styles/mapbox/dark-v10',
			center: [0, 0],
			attributionControl: false,
			zoom: 1
		})
		map.current.addControl(new mapboxgl.NavigationControl(), 'top-left')
	}, [terminator])

	const [styleChecked, setStyleChecked] = useState<string>(mapStyles[0].value)
	useEffect(() => {
		switchStyle(styleChecked)
	}, [styleChecked])

	return (
		<>
			<div ref={ mapContainer } className="w-full h-full">
			</div>
			<div className="w-1/3 md:w-1/12 p-2 rounded h-36 dark:bg-slate-800 bg-slate-400 absolute bottom-0 left-0 flex flex-col z-10">
				{
					mapStyles.map((style, idx) => (
						<div key={style.value} className="h-8 leading-8 flex items-center">
							<input className="mr-4" onClick={(e) => { setStyleChecked(style.value) }} id={style.value} type="radio" name="rtoggle" defaultValue={style.label} defaultChecked={ styleChecked === style.value } />
							<label className="cursor-pointer uppercase" htmlFor={ style.value }>{style.label}</label>
						</div>
					))
				}
			</div>
			<div className="cursor-pointer w-1/2 md:w-1/6 min-h-[16rem] dark:bg-slate-800 bg-slate-400 p-2 md:p-4 rounded absolute bottom-0 right-0 opacity-50 hover:opacity-95 ">
				<div className="w-full pt-2">
					<p className="pb-2">Info</p>
					<div className="w-full flex justify-between pl-2 text-sm">
						<span className=" w-24">latitude:</span>
						<span>{ data?.iss.latitude }</span>
					</div>
					<div className="w-full flex justify-between pl-2 text-sm">
						<span className=" w-24">longitude:</span>
						<span>{ data?.iss.longitude }</span>
					</div>
					<div className="w-full flex justify-between pl-2 text-sm">
						<span className=" w-24">altitude:</span>
						<span>{ data?.iss.altitude }</span>
					</div>
					<div className="w-full flex justify-between pl-2 text-sm">
						<span className=" w-24">velocity:</span>
						<span>{ data?.iss.velocity } km/h</span>
					</div>
				</div>
				<div className="w-full pt-2">
					<p className="pb-2">{ data?.crews.number } People In Space Now</p>
					{
						data?.crews.people.map(p => (
							<p className="pl-2 text-sm" key={p.name}>{ p.name }</p>
						))
					}
				</div>

			</div>
		</>
	)
}

export default MapCon