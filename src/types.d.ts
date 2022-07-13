declare interface Window {
  store: Record<any, any>
}

interface RouteInfo<ElementType> {
  path: string
  element: ElementType
  navText: string
  showInMainNav: Boolean
}

type SupportedProvider = 'google' | 'github'