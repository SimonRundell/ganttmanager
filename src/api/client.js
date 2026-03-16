let cachedApiBase = null

async function getApiBase() {
  if (cachedApiBase) {
    return cachedApiBase
  }

  try {
    const response = await fetch('/.config.json')
    const config = await response.json()
    const base = (config?.apiURL || '').replace(/\/+$/, '')
    cachedApiBase = base ? `${base}/api` : '/api'
  } catch (error) {
    cachedApiBase = '/api'
  }

  return cachedApiBase
}

async function request(path, options = {}) {
  const apiBase = await getApiBase()
  const url = `${apiBase}${path}`
  const headers = options.headers || {}
  const isFormData = options.body instanceof FormData

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: isFormData
      ? headers
      : {
          'Content-Type': 'application/json',
          ...headers,
        },
  })

  const text = await response.text()
  let data = {}
  if (text) {
    try {
      data = JSON.parse(text)
    } catch (error) {
      data = { message: text }
    }
  }

  if (!response.ok) {
    const message = data?.message || 'Request failed'
    const error = new Error(message)
    error.status = response.status
    error.payload = data
    throw error
  }

  return data
}

export function get(path) {
  return request(path, { method: 'GET' })
}

export function post(path, body) {
  return request(path, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
  })
}

export function put(path, body) {
  return request(path, {
    method: 'PUT',
    body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
  })
}

export function del(path, body) {
  return request(path, {
    method: 'DELETE',
    body: body ? JSON.stringify(body) : undefined,
  })
}
