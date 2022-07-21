import { removeStorage } from './storage'

export default function (): void {
  removeStorage('userCredentials')
  removeStorage('credential')
  removeStorage('userInfo')
  removeStorage('firebaseUser')
}