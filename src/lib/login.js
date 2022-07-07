import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

export default function login(providerName) {
  const providers = {
    google: GoogleAuthProvider,
    github: GithubAuthProvider,
  }

  const provider = new providers[providerName]()

  return new Promise((resolve, reject) => {
    if (!provider) reject('No Provider matching: ' + providerName)

    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((response) => {
        const credentials = GoogleAuthProvider.credentialFromResult(response)
        resolve(credentials)
      })
      .catch(reject)
  })
}