const BASE_URL = 'http://localhost:3000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.error || res.statusText)
  }

  if (res.status === 204) return null
  return res.json()
}

export const listItems = () => request('/items')
export const createItem = (data) => request('/items', { method: 'POST', body: JSON.stringify(data) })
export const updateItem = (id, data) => request(`/items/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteItem = (id) => request(`/items/${id}`, { method: 'DELETE' })