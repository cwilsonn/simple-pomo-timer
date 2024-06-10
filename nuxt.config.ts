import daisyui from 'daisyui';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  googleFonts: {
    families: {
      Inter: {
      wght: [400, 500, 600, 700],
        ital: [400, 500, 600, 700],
      },
      'Space Mono': {
        wght: [400, 700],
        ital: [400, 700],
      }
    },
  },
  tailwindcss: {
    config: {
      plugins: [daisyui],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['Space Mono', 'monospace'],
          },
        },
      },
    },
  },
});
