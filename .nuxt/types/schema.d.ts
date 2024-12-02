import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@unocss/nuxt`
     */
    ["unocss"]: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-auth-utils`
     */
    ["auth"]: typeof import("nuxt-auth-utils").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@unocss/nuxt`
     */
    ["unocss"]?: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-auth-utils`
     */
    ["auth"]?: typeof import("nuxt-auth-utils").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@unocss/nuxt", Exclude<NuxtConfig["unocss"], boolean>] | ["nuxt-auth-utils", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@unocss/nuxt`
     * @see https://www.npmjs.com/package/@unocss/nuxt
     */
    ["unocss"]: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `nuxt-auth-utils`
     * @see https://www.npmjs.com/package/nuxt-auth-utils
     */
    ["auth"]: typeof import("nuxt-auth-utils").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@unocss/nuxt`
     * @see https://www.npmjs.com/package/@unocss/nuxt
     */
    ["unocss"]?: typeof import("@unocss/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `nuxt-auth-utils`
     * @see https://www.npmjs.com/package/nuxt-auth-utils
     */
    ["auth"]?: typeof import("nuxt-auth-utils").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@unocss/nuxt", Exclude<NuxtConfig["unocss"], boolean>] | ["nuxt-auth-utils", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   session: {
      name: string,

      password: string,

      cookie: {
         sameSite: string,
      },
   },

   hash: {
      scrypt: any,
   },

   webauthn: {
      register: any,

      authenticate: any,
   },

   oauth: {
      github: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      gitlab: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      spotify: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      google: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      twitch: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      auth0: {
         clientId: string,

         clientSecret: string,

         domain: string,

         audience: string,

         redirectURL: string,
      },

      microsoft: {
         clientId: string,

         clientSecret: string,

         tenant: string,

         scope: Array<any>,

         authorizationURL: string,

         tokenURL: string,

         userURL: string,

         redirectURL: string,
      },

      discord: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      battledotnet: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      keycloak: {
         clientId: string,

         clientSecret: string,

         serverUrl: string,

         realm: string,

         redirectURL: string,
      },

      linear: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      linkedin: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      cognito: {
         clientId: string,

         clientSecret: string,

         region: string,

         userPoolId: string,

         redirectURL: string,
      },

      facebook: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      instagram: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      paypal: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      steam: {
         apiKey: string,

         redirectURL: string,
      },

      x: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      xsuaa: {
         clientId: string,

         clientSecret: string,

         domain: string,

         redirectURL: string,
      },

      vk: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      yandex: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      tiktok: {
         clientKey: string,

         clientSecret: string,

         redirectURL: string,
      },

      dropbox: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      polar: {
         clientId: string,

         clientSecret: string,

         redirectURL: string,
      },

      zitadel: {
         clientId: string,

         clientSecret: string,

         domain: string,

         redirectURL: string,
      },
   },
  }
  interface PublicRuntimeConfig {

  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }