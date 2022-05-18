import { FeatureCollection, Geometry, GeoJsonProperties, Feature } from 'geojson'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl'
import Image from 'next/image'
import { useISS } from '../../hooks/useISS'
import { Terminator } from '../../utils/solar'

interface IProps {

}
const accessToken = 'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

const terminatorStyle = {
	'id': 'my-data',
	'type': 'fill',
	'source': 'my-data',
	'layout': {},
	'paint': {
	'fill-color': '#ffffff',
	'fill-opacity': 0.2
	}
}

const traceStyle = {
	'id': 'trace',
	'type': 'line',
	// 'source': 'trace',
	paint: {
		'line-color': 'yellow',
		'line-opacity': 1,
		'line-width': 5
	}
}

const pointStyle = {
	id: 'point',
	type: 'circle',
	paint: {
		'circle-radius': 10,
		'circle-color': '#007cbf'
	}
};


// const aa = {
// 	type: 'FeatureCollection',
// 	features: [
// 		{type: 'Feature', geometry: {type: 'LineString', coordinates: [[-120, 40], [lon, lat]]}}
// 	]
// }

// const bb = {
// 	type: 'FeatureCollection',
// 	features: [
// 		{type: 'Feature', geometry: {type: 'Point', coordinates: [lon, lat]}}
// 	]
// }

const MapComponent: FunctionComponent<IProps> = ({ }) => {
	let lon = -121
	let lat = 41
	let point = [lon, lat]
	let coord = [[-120, 40], [lon, lat]]
	const { data, trace } = useISS()
	// console.log(333, trace)

	const geojson = new Terminator().toGeoJSON()
	const [terminator, updateTerminator] = useState<string | FeatureCollection<Geometry, GeoJsonProperties>>(geojson)


	const [test, updateTest] = useState({
		type: 'FeatureCollection',
		features: [
			{type: 'Feature', geometry: {type: 'LineString', coordinates: coord}}
		]
	})

	// const [test, updateTest] = useState({
	// 	type: 'FeatureCollection',
	// 	features: [
	// 		{type: 'Feature', geometry: {type: 'Point', coordinates: point}}
	// 	]
	// })

	useEffect(() => {
		let timer = setInterval(() => {
			const geojson = new Terminator().toGeoJSON()
			updateTerminator(geojson)
		}, 60000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {

		let timer = setInterval(() => {
			lon++
			lat++
			coord.push([lon, lat])
			console.log(coord)

			// aa.features[0].geometry.coordinates.push([lon, lat])
			// bb.features[0].geometry.coordinates = [lon, lat]


			updateTest({
				type: 'FeatureCollection',
				features: [
					{type: 'Feature', geometry: {type: 'LineString', coordinates: coord}}
				]
			})
			point = [lon, lat]

			// updateTest({
			// 	type: 'FeatureCollection',
			// 	features: [
			// 		{type: 'Feature', geometry: {type: 'Point', coordinates: point}}
			// 	]
			// })

			// updateTest(aa)
			console.log(888, test)
		}, 2000)
		return () => clearInterval(timer)
	}, [])


	const testgeojson = {
		type: 'FeatureCollection',
		features: [
			{type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
		]
	}
	

	return (
		<Map mapboxAccessToken = {accessToken}
			initialViewState={{
				longitude: 0,
				latitude: 0,
				zoom: 1
			}}
			attributionControl={ false }
			style = {{width: '100%', height: '100%', borderRadius: '3px'}}
			mapStyle="mapbox://styles/mapbox/dark-v10"
		>
			<NavigationControl />
			{/* <Source id="my-data" type="geojson" data={terminator}>
				<Layer {...terminatorStyle} />
			</Source> */}
			<Source id="trace" type="geojson" data={ test }>
				<Layer {...traceStyle} />
			</Source>
				{/* <Source id="point" type="geojson" data={test}>
					<Layer {...pointStyle} />
				</Source> */}


			{
				(data?.iss.latitude && data.iss.longitude) && (
					<Marker longitude={data?.iss.longitude} latitude={ data?.iss.latitude } anchor="bottom" >
						<Image src='/images/iss.gif' alt='sun' width={24} height={24}/>
					</Marker>
				)
			}
			{
				(data?.iss.solar_lon && data?.iss.solar_lat) && (
					<Marker longitude={data?.iss.solar_lon} latitude={ data?.iss.solar_lat } anchor="bottom" >
						<Image src='/images/sun.png' alt='sun' width={24} height={24}/>
					</Marker>
				)
			}
		</Map>
	)}

export default MapComponent