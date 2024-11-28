export const initByPassHost = (baseURL?: string) => {
  const { origin } = window.location
  if (/.+localhost.+/g.test(origin) && baseURL !== 'server-side-api/'){
    return 'http://localhost:8080/'
  }
  return ''
}

export const initHostOrigin = (baseURL: string = '') => {
  if (/^https:\/\/.+/g.test(baseURL)) {
    return baseURL
  }
  const { origin } = window.location
  const trailingBackSlash = origin.endsWith('/') ? '' : '/'
  const baseURL_ = `${origin}${trailingBackSlash}${baseURL}`
  return baseURL_
}

export const getHost = (baseURL?: string) => {
  const api = `${initByPassHost(baseURL)}${initHostOrigin(baseURL)}`
  return api
}
