import type { NotEmptyArray, Nullish } from '@/types'

export const isNullish = (value: any): value is Nullish => value == null

export const isString = (value: any): value is string => typeof value === 'string'

export const isEmptyString = (value: any): value is '' => value === ''

export const isArray = <T>(value: T[]): value is Array<T> => Array.isArray(value)

export const isEmptyArray = (value: any): value is [] => Array.isArray(value) && value.length === 0

export const isNotEmptyArray = <T>(value: T[]): value is NotEmptyArray<T> => {
  return isArray(value) && value.length > 0
}

export const isObject = (value: any): value is object =>
  typeof value === 'object' && value.toString() === '[object Object]'

export const isEmptyObject = (value: any): value is object => {
  const isObj = isObject(value)
  const isEmptyObject = Object.keys(value).length === 0

  return isObj && isEmptyObject
}

export const isEmpty = (value: any) => {
  return isNullish(value) || isEmptyString(value) || isEmptyArray(value) || isEmptyObject(value)
}
