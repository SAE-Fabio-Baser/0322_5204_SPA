import { Location } from 'react-router-dom'

function getQueryParams(location: Location) {
  return new URLSearchParams(location.search)
}

export default getQueryParams