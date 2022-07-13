import createStore from 'zustand'
import firebase from 'firebase/compat'
import OAuthCredential = firebase.auth.OAuthCredential
import User = firebase.User
import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

interface StoreState {
  credential: OAuthCredential | null
  firebaseUser: Partial<User> | null
  setCredential: (newCredential: OAuthCredential | null) => void
  setFirebaseUser: (newUser: Partial<User> | null) => void
  firebaseApp: null | FirebaseApp
  setFirebaseApp: (firebaseApp: FirebaseApp) => void
  watchlists: any[]
  fetchWatchtlists: () => void
}

const useStore = createStore<StoreState>((set, get) => ({
  credential: null,
  setCredential: credential => set({ credential }),
  firebaseUser: null,
  setFirebaseUser: firebaseUser => set({ firebaseUser }),
  firebaseApp: null,
  setFirebaseApp: firebaseApp => set({ firebaseApp }),
  watchlists: [],
  fetchWatchtlists: async () => {
    const app = get().firebaseApp
    if (!app) return

    const db = getFirestore(app)

    const watchlistsColl = collection(db, 'watchlists')
    const watchlistDocs = await getDocs(watchlistsColl)
    const watchlists = watchlistDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(watchlists)
    set({ watchlists })
  },
}))

export default useStore