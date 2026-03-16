import { useMemo } from 'react'

export function useDependencies(dependencies) {
  return useMemo(() => dependencies ?? [], [dependencies])
}
