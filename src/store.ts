import createStore from 'zustand'
import firebase from 'firebase/compat'
import OAuthCredential = firebase.auth.OAuthCredential
import User = firebase.User

interface StoreState {
  credential: OAuthCredential | null
  firebaseUser: Partial<User> | null
  setCredential: (newCredential: OAuthCredential | null) => void
  setFirebaseUser: (newUser: Partial<User> | null) => void
}

const useStore = createStore<StoreState>(set => ({
  credential: null,
  setCredential: credential => set({ credential }),
  firebaseUser: null,
  setFirebaseUser: firebaseUser => set({ firebaseUser }),
}))

export default useStore