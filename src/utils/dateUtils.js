import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns'

export function toDateLabel(dateStr) {
  return format(parseISO(dateStr), 'MMM dd')
}

export function addDaysToDate(dateStr, days) {
  return format(addDays(parseISO(dateStr), days), 'yyyy-MM-dd')
}

export function dayDiff(start, end) {
  return differenceInCalendarDays(parseISO(end), parseISO(start))
}
