import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { setStorage } from './storage'
import firebase from 'firebase/compat'
import OAuthCredential = firebase.auth.OAuthCredential
import User = firebase.User
import { getDatabase, ref, set } from 'firebase/database'
import { FirebaseApp } from 'firebase/app'

function writeToUserDB(
  app: FirebaseApp,
  userId?: string,
  user?: Partial<User> | null
) {
  if (!userId || !user) return
  const db = getDatabase(app)
  const dbRef = ref(db, 'users/' + userId)

  const { displayName, email, emailVerified, photoURL } = user

  const userData = {
    displayName,
    email,
    emailVerified,
    photoURL,
  }

  set(dbRef, userData).then(console.log).catch(console.error)
}

export default function login(
  providerName: SupportedProvider,
  app: FirebaseApp
): Promise<{
  credential: OAuthCredential | null
  firebaseUser: Partial<User> | null
}> {
  const providers = {
    google: GoogleAuthProvider,
    github: GithubAuthProvider,
  }
  const provider = new providers[providerName]()

  return new Promise((resolve, reject) => {
    if (!provider) reject('No Provider matching: ' + providerName)

    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then(response => {
        const credential = GoogleAuthProvider.credentialFromResult(response)
        setStorage('userCredentials', credential)
        setStorage('userInfo', auth.currentUser)
        writeToUserDB(app, auth.currentUser?.uid, auth.currentUser)
        resolve({ credential, firebaseUser: auth.currentUser })
      })
      .catch(reject)
  })
}