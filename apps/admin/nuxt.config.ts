// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'shadcn-nuxt'
  ],

  css: [
    './assets/css/main.css'
  ],

  vite: {
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "~/components/uihttps://tailwindcss.com/docs/installation/using-vite"
     */
    componentDir: './components/ui'
  },

  typescript: {
    strict: true,
    shim: false,
  }
})