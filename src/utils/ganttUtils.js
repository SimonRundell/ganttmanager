export function getSpanDays(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const ms = end - start
  return Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)) + 1)
}
