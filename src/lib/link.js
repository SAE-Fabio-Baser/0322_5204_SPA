import {
  linkWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
} from 'firebase/auth'

export default function (providerName) {
  const providers = {
    google: GoogleAuthProvider,
    github: GithubAuthProvider,
  }
  const provider = new providers[providerName]()

  const auth = getAuth()
  linkWithPopup(auth.currentUser, provider)
    .then((result) => {
      // Accounts successfully linked.
      const user = result.user
      console.log(user)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // ...
      console.error(error)
    })
}