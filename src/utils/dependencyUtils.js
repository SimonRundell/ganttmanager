export function buildDependencyMap(dependencies) {
  return (dependencies ?? []).reduce((map, dep) => {
    const key = dep.successor_id
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(dep)
    return map
  }, {})
}
