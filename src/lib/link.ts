import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
} from 'firebase/auth'

export default function (providerName: SupportedProvider): void {
  const providers = {
    google: GoogleAuthProvider,
    github: GithubAuthProvider,
  }
  const provider = new providers[providerName]()

  const auth = getAuth()
  if (auth.currentUser) {
    linkWithPopup(auth.currentUser, provider)
      .then(console.debug)
      .catch(console.error)
  }
}