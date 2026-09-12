import axios from 'axios'

// In dev the backend runs on :8080, frontend on :5173 (different ports).
// Vite exposes env vars prefixed with VITE_ via import.meta.env.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/tasks'

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const taskApi = {
  getAll: () => client.get('').then(res => res.data),
  getById: (id) => client.get(`/${id}`).then(res => res.data),
  create: (task) => client.post('', task).then(res => res.data),
  update: (id, task) => client.put(`/${id}`, task).then(res => res.data),
  remove: (id) => client.delete(`/${id}`),
}
