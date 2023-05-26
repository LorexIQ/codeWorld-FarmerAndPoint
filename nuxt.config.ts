// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    // @ts-ignore
    ssr: false,

    modules: [
        '@vueuse/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/google-fonts',
        'nuxt-icons',
        '@nuxtjs/device',
    ],

    plugins: [
        '~/plugins/evBus.ts',
        '~/plugins/themes.ts'
    ],

    auth: {
        baseURL: process.env.BASE_URL,
        provider: {
            type: 'local',
            endpoints: {
                signIn: {path: process.env.AUTH_ENDPOINT_SIGNIN, method: 'post'},
                signUp: {path: process.env.AUTH_ENDPOINT_SIGNUP, method: 'post'},
                signOut: {path: process.env.AUTH_ENDPOINT_SIGNOUT, method: 'post'},
                getSession: {path: process.env.AUTH_ENDPOINT_SESSION, method: 'get'},
            }
        },

        globalAppMiddleware: {
            isEnabled: true,
            allow404WithoutAuth: false
        }
    },

    googleFonts: {
        download: true,
        families: {
            'Roboto': true,
            'Open Sans': true,
            'Poppins': true
        }
    },

    "css": [
        "~/app/styles/main.scss",
        "~/app/styles/themes.scss",
    ],

    devtools: {
        enabled: true
    }
})
