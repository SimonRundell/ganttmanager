import { get, post } from './client'

export function fetchDependencies(projectId) {
  return get(`/dependencies/getDependencies.php?projectId=${projectId}`)
}

export function createDependency(payload) {
  return post('/dependencies/createDependency.php', payload)
}

export function deleteDependency(payload) {
  return post('/dependencies/deleteDependency.php', payload)
}
