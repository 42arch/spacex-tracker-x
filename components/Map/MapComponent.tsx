/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React, { FunctionComponent } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl'

interface IProps {
	coordinate: {
		longitude: number
		latitude: number
	}
}
const accessToken = 'pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'

const MapComponent: FunctionComponent<IProps> = ({ coordinate }) => (
	<Map mapboxAccessToken = {accessToken}
		initialViewState={{
			longitude: coordinate.longitude,
			latitude: coordinate.latitude,
			zoom: 15
		}}
		attributionControl={ false }
		style = {{width: '100%', height: '100%', borderRadius: '3px'}}
		mapStyle="mapbox://styles/mapbox/dark-v10"
	>
		<NavigationControl />
		<Marker longitude={ coordinate.longitude } latitude={ coordinate.latitude } anchor='center' >
			<img src={`https://a.tiles.mapbox.com/v4/marker/pin-m-rocket+3b82f6.png?access_token=${accessToken}`}/>
		</Marker>
	</Map>
)

export default MapComponent