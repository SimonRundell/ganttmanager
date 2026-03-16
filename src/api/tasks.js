import { get, post } from './client'

export function fetchTasks(projectId) {
  return get(`/tasks/getTasks.php?projectId=${projectId}`)
}

export function createTask(payload) {
  return post('/tasks/createTask.php', payload)
}

export function updateTask(payload) {
  return post('/tasks/updateTask.php', payload)
}

export function deleteTask(payload) {
  return post('/tasks/deleteTask.php', payload)
}

export function reorderTasks(payload) {
  return post('/tasks/reorderTasks.php', payload)
}

export function updateProgress(payload) {
  return post('/tasks/updateProgress.php', payload)
}
