import { Viewer, ImageryLayer  } from 'resium'
import { ArcGisMapServerImageryProvider } from 'cesium'

export default function Cesium() {
  return (
    <Viewer full shadows={true} timeline={false} animation={false} baseLayerPicker={false} vrButton={false} homeButton={false}
			geocoder={false}
		>
			<ImageryLayer
				imageryProvider={
					new ArcGisMapServerImageryProvider({
						url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
					})
				}
			/>
		</Viewer>
  )
}