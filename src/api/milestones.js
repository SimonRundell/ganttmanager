import { get, post } from './client'

export function fetchMilestones(projectId) {
  return get(`/milestones/getMilestones.php?projectId=${projectId}`)
}

export function createMilestone(payload) {
  return post('/milestones/createMilestone.php', payload)
}

export function updateMilestone(payload) {
  return post('/milestones/updateMilestone.php', payload)
}

export function deleteMilestone(payload) {
  return post('/milestones/deleteMilestone.php', payload)
}
