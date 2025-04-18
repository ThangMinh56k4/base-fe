export const DEFAULT_SNACKBAR_OPTIONS = {
  visibleIcon: true,
  timeout: 3000,
  location: 'top',
  position: 'fixed',
  minWidth: 416,
  minHeight: 56
} as const

export const SNACKBAR_TYPE = {
  info: 'info',
  error: 'error',
  success: 'primary'
} as const

export const LOCAL_STORAGE_KEY = {
  TOKEN: '_authToken'
}

export const ROUTES = {
  home: {
    name: 'home',
    path: '/'
  },
  login: {
    name: 'login',
    path: '/login'
  },
  map: {
    name: 'map',
    path: '/map'
  }
} as const

export const META_AUTH = {
  guest: 'guest'
}

export const ERROR_STATUS = {
  notFound: 404
}

export const ERROR_MESSAGES = {
  page: {
    pageNotFound: 'The page you are looking for could not be found.',
    invalidUrl: 'Please check the URL and try accessing again.'
  }
}

export const DATE_FORMAT = {
  dateTime: 'MMMM dd, yyyy hh:mm'
}

export const LOAD_MORE_STATUS = {
  ok: 'ok',
  empty: 'empty',
  error: 'error'
} as const

export const DEFAULT_PAGE_SIZE = 20
export const DEFAULT_PAGE = 1

export const WORKER_FUNCTION_OPTIONS = {
  heavyCalculation: {
    name: 'heavyCalculation',
    type: 'calculationComplete'
  }
}

export const DEFAULT_CENTER = { lat: 16.0544, lng: 108.2022 }
export const DEFAULT_ZOOM = 14

export const POLYGON_SETTING_DEFAULT = {
  strokeColor: '#FF0000',
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  strokeWeight: 2,
  zIndex: 1
}

export enum STREET_MAP_GEO_JSON_TYPE {
  polygon = 'Polygon',
  multiPolygon = 'MultiPolygon'
}

export enum STREET_MAP_CLASS {
  polygon = 'boundary'
}

export enum MAP_TYPE_ID {
  roadMap = 'roadmap',
  satellite = 'satellite',
  hybrid = 'hybrid',
  terrain = 'terrain'
}

export const MAP_TYPE_ID_DEFAULT = MAP_TYPE_ID.roadMap
export const MAP_TYPE_ID_OPTIONS = [
  {
    id: MAP_TYPE_ID.roadMap,
    name: 'Road Map'
  },
  {
    id: MAP_TYPE_ID.satellite,
    name: 'Satellite'
  },
  {
    id: MAP_TYPE_ID.hybrid,
    name: 'Hybrid'
  },
  {
    id: MAP_TYPE_ID.terrain,
    name: 'Terrain'
  }
]
