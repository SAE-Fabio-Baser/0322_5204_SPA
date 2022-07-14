import { addDoc, getFirestore } from 'firebase/firestore'
import {
  doc,
  collection,
  updateDoc,
  getDocs,
  getDoc,
} from 'firebase/firestore/lite'
import Watchlist from '../Views/Watchlist'
import { FirebaseApp } from 'firebase/app'
import firebase from 'firebase/compat'
import User = firebase.User

export async function getAllWatchlists(app: FirebaseApp) {
  const db = getFirestore(app)

  const watchlistsColl = collection(db, 'watchlists')
  const watchlistDocs = await getDocs(watchlistsColl)
  return watchlistDocs.docs.map(
    doc =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Watchlist)
  )
}

export async function getWatchlistById(app: FirebaseApp, id: string) {
  const allWatchlists = await getAllWatchlists(app)

  return allWatchlists.find(list => list.id === id)
}

export async function createWatchlist(
  app: FirebaseApp,
  firebaseUser: Partial<User>,
  watchlistName: string
) {
  if (!app || !firebaseUser) return

  const db = getFirestore(app)

  const watchlistsColl = collection(db, 'watchlists')

  return await addDoc(watchlistsColl, {
    name: watchlistName,
    owner: {
      id: firebaseUser.uid,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    },
  } as Watchlist)
}

export async function addMovieToWatchlist(
  app: FirebaseApp,
  watchlistId: string,
  movie: TMDB_Movie
) {
  const db = getFirestore(app)

  const watchlistRef = doc(db, 'watchlists', watchlistId)

  const watchlistDoc = await getDoc(watchlistRef)
  const watchlist = watchlistDoc.data() as Watchlist

  if (!watchlist) return

  const found = !!watchlist.movies?.find(wlMovie => wlMovie.id === movie.id)

  if (found) return

  const watchlistMovies = watchlist.movies || []

  await updateDoc(watchlistRef, { movies: [...watchlistMovies, movie] })

  console.log(watchlistRef)
}