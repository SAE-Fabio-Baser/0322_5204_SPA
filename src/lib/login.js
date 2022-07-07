import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { setStorage } from './storage'

export default function login(providerName) {
  const providers = {
    google: GoogleAuthProvider,
    github: GithubAuthProvider,
  }

  const provider = new providers[providerName]()

  return new Promise((resolve, reject) => {
    if (!provider) reject('No Provider matching: ' + providerName)

    const auth = getAuth()
    window.auth = auth
    signInWithPopup(auth, provider)
      .then((response) => {
        const credentials = GoogleAuthProvider.credentialFromResult(response)
        setStorage('userCredentials', credentials)
        setStorage('userInfo', auth.currentUser)
        resolve({ credentials, userInfo: auth.currentUser })
      })
      .catch(reject)
  })
}