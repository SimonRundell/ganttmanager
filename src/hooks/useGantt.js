import { useMemo } from 'react'
import { eachDayOfInterval, format, parseISO } from 'date-fns'

export function useGantt(tasks, startDate, endDate) {
  return useMemo(() => {
    if (!startDate || !endDate) {
      return { columns: [], bars: [] }
    }

    const start = parseISO(startDate)
    const end = parseISO(endDate)
    const columns = eachDayOfInterval({ start, end }).map((date) => ({
      key: format(date, 'yyyy-MM-dd'),
      label: format(date, 'dd'),
    }))

    const bars = tasks.map((task) => ({
      ...task,
    }))

    return { columns, bars }
  }, [tasks, startDate, endDate])
}
