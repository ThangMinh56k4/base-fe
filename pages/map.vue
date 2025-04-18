<script setup lang="ts">
import { GoogleMap, Marker, Polygon, CustomControl } from 'vue3-google-map'

definePageMeta({
  auth: true,
  layout: 'map'
})

const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_MAPS_API_KEY as string

const mapStore = useMapStore()
const { mapRef, mapCenter, mapZoom, userPosition, selectedPoint, regionBorders, mapTypeId } = storeToRefs(mapStore)
const { getPolygonSettings, getSelectedMarker } = mapStore

const handleZoomChanged = () => {
  const currentZoom = mapRef.value?.map?.getZoom()
  console.log('Zoom level changed:', currentZoom)
}

// const handleMapClick = (event: { latLng: google.maps.LatLng | null }) => {
//   if (!event.latLng) return
//   const lat = event.latLng.lat()
//   const lng = event.latLng.lng()
//   selectedPoint.value = { lat, lng }
// }

function onPolygonClick(event: google.maps.MapMouseEvent) {
  const latLng = event.latLng?.toJSON()
  if (latLng) {
    const { lat, lng } = latLng
    selectedPoint.value = { lat, lng }
  }
}
</script>

<template>
  <GoogleMap
    ref="mapRef"
    :api-key="apiKey"
    style="width: 100%; height: 100%"
    :center="mapCenter"
    :zoom="mapZoom"
    :map-type-id="mapTypeId"
    @zoom_changed="handleZoomChanged"
  >
    <CustomControl position="BOTTOM_CENTER">
      <map-header />
    </CustomControl>
    <Marker
      v-if="userPosition"
      :options="{ position: userPosition }"
    />
    <Marker
      v-if="selectedPoint"
      :options="getSelectedMarker()"
    />
    <Polygon
      v-for="(borders, index) in regionBorders"
      :key="index"
      :options="getPolygonSettings(borders)"
      @click="onPolygonClick"
    />
  </GoogleMap>
</template>

<style lang="scss" scoped>
.location-input {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: border-color 0.3s ease;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  &::placeholder {
    color: #aaa;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-results-decoration,
  &::-webkit-search-results-button {
    display: none;
  }
}
</style>
