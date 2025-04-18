import { formatGeoJson } from '@/utils'
import { STREET_MAP_CLASS } from '@/config'

import type { LatLng } from '@/types'

export default class ParkingExistenceApi {
  private endpoint: string;

  constructor() {
    this.endpoint = 'https://nominatim.openstreetmap.org/search'
  }

  async search(searchParam: string) {
    const searchParams = {
      'format': 'json',
      'q': searchParam,
      'polygon_geojson': '1',
      'accept-language': 'vi'
    }

    try {
      const response = await fetch(
        `${this.endpoint}?${new URLSearchParams(searchParams)}`
      )

      return response.json()
    }
    catch (error) {
      console.log('error', error)

      return null
    }
  }

  async getRegionBorder(region: string): Promise<LatLng[][]> {
    const response = await this.search(region)

    if (!response || response.length === 0) {
      return [] as LatLng[][]
    }

    const data = response.find((item: any) => {
      const { class: itemClass, name } = item

      if (itemClass !== STREET_MAP_CLASS.polygon) {
        return false
      }

      const REGEX_REGION = new RegExp(region);

      return REGEX_REGION.test(name)
    })

    if (!data) {
      return [] as LatLng[][]
    }

    return formatGeoJson(data.geojson) as LatLng[][]
  }
}
