<script setup lang="ts">
import { MAP_TYPE_ID_OPTIONS } from '~/config'

const { loading } = storeToRefs(useAppStore())

defineOptions({
  name: 'MapHeader'
})

const { findLocation, findCurrentLocation } = useMapStore()
const { mapTypeId } = storeToRefs(useMapStore())
const searchLocation = ref('')
</script>

<template>
  <layout-header class="map-header">
    <template #appTile>
      <div class="search-box">
        <input
          v-model="searchLocation"
          type="text"
          class="input"
          placeholder="Search location..."
        />
        <button
          class="button"
          :disabled="loading"
          @click="findLocation(searchLocation)"
        >
          <app-loading-spinner
            v-if="loading"
            class="loading"
          />
          <v-icon
            v-else
            icon="fas fa-search"
          />
        </button>
        <button
          class="button"
          :disabled="loading"
          @click="findCurrentLocation"
        >
          <v-icon
            icon="fas fa-map-marker-alt"
            class="icon"
            @click="findCurrentLocation"
          />
        </button>
        <select
          v-model="mapTypeId"
          class="select"
        >
          <option
            v-for="(option, index) in MAP_TYPE_ID_OPTIONS"
            :key="index"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
    </template>
  </layout-header>
</template>

<style lang="scss" scoped>
.map-header :deep(.v-toolbar-title) > .v-toolbar-title__placeholder > .search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;

  > .input {
    width: 100%;
    max-width: 200px;
    padding: 10px;
    border-radius: 5px;
    transition: border-color 0.3s ease;
    font-size: 16px;
    color: theme-color(primary);
    background-color: theme-color(on-primary);

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: theme-color(primary);
    }

    &::-webkit-search-decoration,
    &::-webkit-search-results-decoration,
    &::-webkit-search-results-button {
      display: none;
    }
  }

  > .button {
    padding: 10px 15px;
    border-radius: 5px;
    color: theme-color(primary);
    font-size: 16px;
  }

  > .button > .loading {
    width: 20px;
    height: 20px;
    color: theme-color(primary);
  }

  > .location {
    font-size: 25px;
    color: theme-color(primary);
    margin-left: 5px;
  }

  > .select {
    margin-left: 20px;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 16px;
    color: theme-color(primary);
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23299271'><path d='M7 10l5 5 5-5H7z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 5px center;
    background-size: 20px;
    border: 1px solid theme-color(primary);
    width: 250px;

    &:focus {
      outline: none;
    }
  }
}
</style>
