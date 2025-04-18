import type { GoogleMap } from 'vue3-google-map'

import type { LatLng } from '@/types'
import { DEFAULT_CENTER, DEFAULT_ZOOM, SNACKBAR_TYPE, MAP_TYPE_ID_DEFAULT } from '@/config'
import { isEmptyArray } from '@/utils'

export const useMapStore = defineStore('map', () => {
  const { $services } = useNuxtApp()
  const { showLoading, hideLoading, showSnackbar } = useAppStore()

  const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null)
  const mapCenter = ref(DEFAULT_CENTER)
  const mapZoom = ref(DEFAULT_ZOOM)
  const userPosition = ref<LatLng | null>(null)
  const selectedPoint = ref<LatLng | null>(null)
  const regionBorders = ref<Array<LatLng[]>>([])
  const mapTypeId = ref(MAP_TYPE_ID_DEFAULT)

  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          mapCenter.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        },
        error => {
          console.warn('Error getting location:', error.message)
          mapCenter.value = DEFAULT_CENTER
        }
      )
    } else {
      console.warn('Geolocation is not supported by this browser.')
      mapCenter.value = DEFAULT_CENTER
    }
  })

  const getPolygonSettings = (borders: LatLng[]) => ({
    options: { paths: borders },
    strokeColor: '#006CD0',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#006CD0',
    fillOpacity: 0.35
  })

  const findLocation = async (query: string) => {
    showLoading()
    const regionBordersResponse = await $services.streetMap.getRegionBorder(query)

    if (isEmptyArray(regionBordersResponse) && mapRef.value?.map) {
      showSnackbar(SNACKBAR_TYPE.error, 'No results found for the given query')
      userPosition.value = null
      selectedPoint.value = null
      regionBorders.value = []
    }

    if (!isEmptyArray(regionBordersResponse) && mapRef.value?.map) {
      regionBorders.value = regionBordersResponse
      const bounds = new google.maps.LatLngBounds()

      regionBordersResponse.flat().forEach((coord: LatLng) => {
        bounds.extend(new google.maps.LatLng(coord.lat, coord.lng))
      })

      mapRef.value.map.fitBounds(bounds)
    }

    hideLoading()

    return regionBordersResponse
  }

  const findCurrentLocation = async () => {
    showLoading()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          mapCenter.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          userPosition.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          mapZoom.value = 15
        },
        error => {
          console.warn('Error getting location:', error.message)
        }
      )
    } else {
      console.warn('Geolocation is not supported by this browser.')
    }
    hideLoading()
  }

  const getSelectedMarker = () => ({
    position: selectedPoint.value,
    icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
  })

  return {
    mapRef,
    mapCenter,
    mapZoom,
    userPosition,
    selectedPoint,
    regionBorders,
    mapTypeId,
    getPolygonSettings,
    findLocation,
    findCurrentLocation,
    getSelectedMarker
  }
})
