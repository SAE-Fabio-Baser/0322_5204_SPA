import config from '../config'

const prefix = config.localStoragePrefix

export function setStorage(key, value) {
  localStorage.setItem(prefix + key, JSON.stringify(value))
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(prefix + key))
}

export function removeStorage(key) {
  localStorage.removeItem(prefix + key)
}