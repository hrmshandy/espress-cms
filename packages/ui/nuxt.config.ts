import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	modules: ['shadcn-nuxt'],
	shadcn: {
		prefix: 'Ui',
		componentDir: join(currentDir, './src/vue/components'),
	},
	css: [
		join(currentDir, './src/styles/main.css'),
	],
	alias: {
		'@': join(currentDir, './'),
		'~': join(currentDir, './'),
	},
	vite: {
		plugins: [
		  tailwindcss(),
		],
	},
})
