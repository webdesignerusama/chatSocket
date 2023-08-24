// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  serverHandlers: [
    {
        route: '/ws',
        handler: '~/server-middleware/socket'
    }
]
  
 
})
