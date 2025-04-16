// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    '@vee-validate/nuxt',
    'nuxt-lodash',
    '@nuxtjs/partytown'
  ],

  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Training Nuxt.js',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        }
      ],
      script: [
        // Partytown
        { src: '/script/partytown.js', type: 'text/partytown' },
        // Insert your CRISP Script here e.g.:
        { innerHTML: 'window.$crisp = []; window.CRISP_WEBSITE_ID = "0000"' },
        { src: 'https://client.crisp.chat/l.js', async: true, type: 'text/partytown' },
        // Facebook SDK
        {
          src: 'https://connect.facebook.net/en_US/sdk.js',
          async: true,
          defer: true,
          crossorigin: 'anonymous'
        },
        {
          children: `
            window.fbAsyncInit = function() {
              FB.init({
                appId: '${process.env.FACEBOOK_APP_ID}',
                xfbml: true,
                version: 'v21.0'
              });
            };
          `,
          type: 'text/javascript'
        },
      ]
    }
  },

  css: [
    '@/assets/sass/main.scss',
    '@/assets/sass/vuetify/main.scss'
  ],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    }
  },
  compatibilityDate: '2024-04-03',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/sass/utils/mixins.scss" as *;
            @use "~/assets/sass/utils/vars.scss" as *;
          `
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        commaDangle: 'only-multiline'
      },
    },
  },

  partytown: {
    forward: ['$crisp', '$crisp.push'],
  },

  pinia: {
    storesDirs: ['./stores/**']
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  vuetify: {
    vuetifyOptions: './vuetify.config.ts'
  },

  // components: [
  //   {
  //     path: '~/components/common',
  //     pathPrefix: false
  //   }
  // ]
});
