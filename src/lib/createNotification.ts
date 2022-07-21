import { FirebaseApp } from 'firebase/app'
import { Database, getDatabase, push, ref } from 'firebase/database'

function createNotification(
  app: FirebaseApp,
  options: { userId: string; code: string },
  data: Record<string, any>
) {
  const db: Database = getDatabase(app)
  const { userId, code } = options

  const dbRef = ref(db, 'notifications/' + userId)

  const notification: MovieParty.Notification = {
    code,
    data,
    time: Date.now(),
  }

  push(dbRef, notification)
}

export default createNotification