import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(() => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').at(-1)
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  const base = isGitHubPages ? `/${repositoryName}/` : '/'

  return {
    base,
    plugins: [react(), rebasePublicImages(base)],
  }
})

function rebasePublicImages(base) {
  return {
    name: 'storm-forge-public-image-base',
    enforce: 'post',
    generateBundle(_options, bundle) {
      if (base === '/') return

      Object.values(bundle).forEach((output) => {
        if (output.type === 'chunk') {
          output.code = output.code.replaceAll('/images/', `${base}images/`)
          return
        }

        if (typeof output.source === 'string') {
          output.source = output.source.replaceAll('/images/', `${base}images/`)
        }
      })
    },
  }
}
