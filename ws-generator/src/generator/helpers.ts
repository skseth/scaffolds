import fetch from 'node-fetch'

export const latestDependencies = async (deps: Record<string, string>) => {
  const latestDeps: Record<string, string> = {}
  for (const key in deps) {
    try {
      const latestInfo: any = await fetch(
        `https://registry.npmjs.org/${key}/latest`
      ).then((res) => res.json())

      if (
        latestInfo.name === key &&
        latestInfo.version &&
        typeof latestInfo.version === 'string'
      ) {
        latestDeps[key] = `^${latestInfo.version}`
      }
    } catch (e) {
      console.log(`warning: couldn't fetch latest version of ${key}: ${e}`)
    }

    if (!latestDeps[key]) {
      latestDeps[key] = deps[key]
    }
  }
  return latestDeps
}
