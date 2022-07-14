import createStore from 'zustand'
import firebase from 'firebase/compat'
import OAuthCredential = firebase.auth.OAuthCredential
import User = firebase.User
import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import Watchlist from './Views/Watchlist'

export interface StoreState {
  credential: OAuthCredential | null
  firebaseUser: Partial<User> | null
  setCredential: (newCredential: OAuthCredential | null) => void
  setFirebaseUser: (newUser: Partial<User> | null) => void
  firebaseApp: null | FirebaseApp
  setFirebaseApp: (firebaseApp: FirebaseApp) => void
  watchlists: Watchlist[]
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
    const watchlists = watchlistDocs.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Watchlist)
    )

    const currentUserId = get().firebaseUser?.uid

    const myWatchlists = watchlists.filter(list => {
      const isOwner = list.owner?.id === currentUserId

      const isCollaborator = !!list.collaborators?.filter(
        collab => collab.id === currentUserId
      )

      return isOwner || isCollaborator
    })

    set({ watchlists: myWatchlists })
  },
}))

export default useStore