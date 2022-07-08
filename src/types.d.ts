interface UserCredentials {
  accessToken?: string
  idToken?: string
  pendingToken?: null
  providerId: string
  signInMethod: string
}

interface UserInfo {
  apiKey?: string
  appName?: string
  createdAt?: string
  displayName?: string | null
  email?: string | null
  emailVerified?: Boolean
  isAnonymous: Boolean
  lastLoginAt?: string
  photoURL: string | null
  providerData: {
    displayName: string
    email: string
    phoneNumber: null | string
    photoURL: string
    providerId: 'google.com' | 'github.com'
    uid: string
  }[]
  stsTokenManager?: {
    refreshToken: string
    accessToken: string
    expirationTime: Number
  }
  uid: string
}

interface RouteInfo<ElementType> {
  path: string
  element: ElementType
  navText: string
  showInMainNav: Boolean
}

type SupportedProvider = 'google' | 'github'