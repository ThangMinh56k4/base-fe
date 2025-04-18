import type { StreetMapGeojson, LatLng } from '@/types'
import { STREET_MAP_GEO_JSON_TYPE } from '@/config'

export function formatGeoJson(geoJson: StreetMapGeojson) {
  const { coordinates, type } = geoJson

  if (type === STREET_MAP_GEO_JSON_TYPE.polygon) {
    const results = coordinates[0].map((coordinate) => {
      const [lng, lat] = coordinate
      return { lat, lng }
    })

    return [results] as LatLng[][]
  }
  else if (type === STREET_MAP_GEO_JSON_TYPE.multiPolygon) {
    const results = coordinates.map((polygon: any) => {
      return polygon[0].map((coordinate: number[]) => {
        const [lng, lat] = coordinate
        return { lat, lng }
      })
    })

    return results as LatLng[][]
  }
  else {
    return [] as LatLng[][]
  }
}
