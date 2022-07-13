import config from '../config'

const prefix = config.localStoragePrefix

export function setStorage(key: string, value: any): void {
  localStorage.setItem(prefix + key, JSON.stringify(value))
}

export function getStorage(key: string) {
  try {
    return JSON.parse(localStorage.getItem(prefix + key) || '')
  } catch (e) {
    return null
  }
}

export function removeStorage(key: string): void {
  localStorage.removeItem(prefix + key)
}