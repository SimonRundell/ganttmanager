import { get } from './client'

export function fetchProjectSummary(projectId) {
  return get(`/reports/getProjectSummary.php?projectId=${projectId}`)
}

export function fetchTaskReport(projectId) {
  return get(`/reports/getTaskReport.php?projectId=${projectId}`)
}

export function fetchResourceReport(projectId) {
  return get(`/reports/getResourceReport.php?projectId=${projectId}`)
}
