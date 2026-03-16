import { get, post } from './client'

export function fetchResources(projectId) {
  return get(`/resources/getResources.php?projectId=${projectId}`)
}

export function createResource(payload) {
  return post('/resources/createResource.php', payload)
}

export function updateResource(payload) {
  return post('/resources/updateResource.php', payload)
}

export function deleteResource(payload) {
  return post('/resources/deleteResource.php', payload)
}

export function assignResource(payload) {
  return post('/resources/assignResource.php', payload)
}

export function removeAssignment(payload) {
  return post('/resources/removeAssignment.php', payload)
}
