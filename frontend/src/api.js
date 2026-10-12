import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', headers: { 'Content-Type': 'application/json' } });
export const getTasks = (params) => api.get('/tasks', { params }).then(r => r.data);
export const getStats = () => api.get('/tasks/stats').then(r => r.data);
export const createTask = (task) => api.post('/tasks', task).then(r => r.data);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task).then(r => r.data);
export const patchStatus = (id, status) => api.patch(`/tasks/${id}/status`, { status }).then(r => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
