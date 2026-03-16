import { get, post } from './client'

export function fetchProjects() {
  return get('/projects/getProjects.php')
}

export function fetchProject(projectId) {
  return get(`/projects/getProject.php?id=${projectId}`)
}

export function createProject(payload) {
  return post('/projects/createProject.php', payload)
}

export function updateProject(payload) {
  return post('/projects/updateProject.php', payload)
}

export function deleteProject(payload) {
  return post('/projects/deleteProject.php', payload)
}

export function fetchMembers(projectId) {
  return get(`/projects/getMembers.php?projectId=${projectId}`)
}

export function addMember(payload) {
  return post('/projects/addMember.php', payload)
}

export function removeMember(payload) {
  return post('/projects/removeMember.php', payload)
}

export function fetchAllStudents() {
  return get('/projects/getAllStudents.php')
}
