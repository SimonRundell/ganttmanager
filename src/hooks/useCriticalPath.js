import { useMemo } from 'react'

export function useCriticalPath(tasks) {
  return useMemo(() => {
    if (!tasks) {
      return []
    }
    return tasks.filter((task) => task.is_critical)
  }, [tasks])
}
