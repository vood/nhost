import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  ssr: {
    external: ['form-data', 'proxy-from-env', 'follow-redirects'],
    optimizeDeps: ['form-data']
  }
}

export default config
