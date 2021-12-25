const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
    publicRuntimeConfig: {
        tmdb_url: process.env.TMDB_BASE_URL,
        tmdb_key: process.env.TMDB_API_KEY
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
})