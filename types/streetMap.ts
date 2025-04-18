import type { STREET_MAP_GEO_JSON_TYPE } from '@/config'

type StreetMapGeojsonCoordinates3D = number[][][];
type StreetMapGeojsonCoordinates4D = number[][][][];

export type StreetMapGeojson = {
  coordinates: StreetMapGeojsonCoordinates3D | StreetMapGeojsonCoordinates4D
  type: STREET_MAP_GEO_JSON_TYPE
}

export type LatLng = { lat: number; lng: number }
