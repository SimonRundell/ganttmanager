import { useMemo } from 'react'
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  parseISO,
} from 'date-fns'

function normalizeDate(value) {
  if (!value) {
    return null
  }
  const datePart = String(value).split(' ')[0]
  return parseISO(`${datePart}T00:00:00`)
}

export function useGantt(tasks, startDate, endDate, milestones = []) {
  return useMemo(() => {
    if (!startDate || !endDate) {
      return { columns: [], bars: [] }
    }

    const projectStart = normalizeDate(startDate)
    const projectEnd = normalizeDate(endDate)

    const taskDates = tasks
      .map((task) => ({
        start: normalizeDate(task.start_date),
        end: normalizeDate(task.end_date),
      }))
      .filter((range) => range.start && range.end)

    const milestoneDates = milestones
      .map((milestone) => ({
        start: normalizeDate(milestone.target_date),
        end: normalizeDate(milestone.target_date),
      }))
      .filter((range) => range.start && range.end)

    const taskStartMin = [...taskDates, ...milestoneDates].reduce(
      (min, range) => (range.start < min ? range.start : min),
      projectStart,
    )
    const taskEndMax = [...taskDates, ...milestoneDates].reduce(
      (max, range) => (range.end > max ? range.end : max),
      projectEnd,
    )

    const start = taskStartMin || projectStart
    const end = taskEndMax || projectEnd
    const columns = eachDayOfInterval({ start, end }).map((date) => ({
      key: format(date, 'yyyy-MM-dd'),
      label: format(date, 'dd'),
    }))

    const bars = tasks.map((task) => {
      const taskStart = normalizeDate(task.start_date)
      const taskEnd = normalizeDate(task.end_date)
      if (!taskStart || !taskEnd || !start || !end) {
        return {
          ...task,
          gridStart: 1,
          gridSpan: 1,
        }
      }
      const startOffset = Math.max(
        0,
        differenceInCalendarDays(taskStart, start),
      )
      const span = Math.max(
        1,
        differenceInCalendarDays(taskEnd, taskStart) + 1,
      )

      return {
        ...task,
        gridStart: startOffset + 1,
        gridSpan: span,
      }
    })

    const milestoneBars = (milestones || []).map((milestone) => {
      const target = normalizeDate(milestone.target_date)
      if (!target || !start) {
        return { ...milestone, gridStart: 1 }
      }
      const offset = Math.max(0, differenceInCalendarDays(target, start))
      return { ...milestone, gridStart: offset + 1 }
    })

    return {
      columns,
      bars,
      milestones: milestoneBars,
      columnCount: columns.length,
    }
  }, [tasks, startDate, endDate, milestones])
}
