declare global {
  const __buildAssetsURL: typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/paths')['buildAssetsURL']
  const __publicAssetsURL: typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/paths')['publicAssetsURL']
  const actualizarCategoria: typeof import('../../server/utils/repositories/alimentadores')['actualizarCategoria']
  const actualizarEstadoConservacion: typeof import('../../server/utils/repositories/alimentadores')['actualizarEstadoConservacion']
  const actualizarNivelEducativo: typeof import('../../server/utils/repositories/alimentadores')['actualizarNivelEducativo']
  const actualizarProcedencia: typeof import('../../server/utils/repositories/alimentadores')['actualizarProcedencia']
  const actualizarProducto: typeof import('../../server/utils/repositories/productos')['actualizarProducto']
  const actualizarProveedor: typeof import('../../server/utils/repositories/alimentadores')['actualizarProveedor']
  const actualizarSala: typeof import('../../server/utils/repositories/alimentadores')['actualizarSala']
  const actualizarSubcategoria: typeof import('../../server/utils/repositories/alimentadores')['actualizarSubcategoria']
  const actualizarUsuario: typeof import('../../server/utils/repositories/users')['actualizarUsuario']
  const agregarStock: typeof import('../../server/utils/repositories/productos')['agregarStock']
  const appendCorsHeaders: typeof import('../../node_modules/h3')['appendCorsHeaders']
  const appendCorsPreflightHeaders: typeof import('../../node_modules/h3')['appendCorsPreflightHeaders']
  const appendHeader: typeof import('../../node_modules/h3')['appendHeader']
  const appendHeaders: typeof import('../../node_modules/h3')['appendHeaders']
  const appendResponseHeader: typeof import('../../node_modules/h3')['appendResponseHeader']
  const appendResponseHeaders: typeof import('../../node_modules/h3')['appendResponseHeaders']
  const asignarFechaDevolucion: typeof import('../../server/utils/repositories/productos')['asignarFechaDevolucion']
  const asignarResponsableAProducto: typeof import('../../server/utils/repositories/productos')['asignarResponsableAProducto']
  const assertMethod: typeof import('../../node_modules/h3')['assertMethod']
  const cachedEventHandler: typeof import('../../node_modules/nitropack/dist/runtime')['cachedEventHandler']
  const cachedFunction: typeof import('../../node_modules/nitropack/dist/runtime')['cachedFunction']
  const callNodeListener: typeof import('../../node_modules/h3')['callNodeListener']
  const cambiarPass: typeof import('../../server/utils/repositories/users')['cambiarPass']
  const clearResponseHeaders: typeof import('../../node_modules/h3')['clearResponseHeaders']
  const clearSession: typeof import('../../node_modules/h3')['clearSession']
  const clearUserSession: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session')['clearUserSession']
  const crearProducto: typeof import('../../server/utils/repositories/productos')['crearProducto']
  const crearUsuario: typeof import('../../server/utils/repositories/users')['crearUsuario']
  const createApp: typeof import('../../node_modules/h3')['createApp']
  const createAppEventHandler: typeof import('../../node_modules/h3')['createAppEventHandler']
  const createError: typeof import('../../node_modules/h3')['createError']
  const createEvent: typeof import('../../node_modules/h3')['createEvent']
  const createEventStream: typeof import('../../node_modules/h3')['createEventStream']
  const createRouter: typeof import('../../node_modules/h3')['createRouter']
  const defaultContentType: typeof import('../../node_modules/h3')['defaultContentType']
  const defineAppConfig: typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/config')['defineAppConfig']
  const defineCachedEventHandler: typeof import('../../node_modules/nitropack/dist/runtime')['defineCachedEventHandler']
  const defineCachedFunction: typeof import('../../node_modules/nitropack/dist/runtime')['defineCachedFunction']
  const defineEventHandler: typeof import('../../node_modules/h3')['defineEventHandler']
  const defineLazyEventHandler: typeof import('../../node_modules/h3')['defineLazyEventHandler']
  const defineNitroErrorHandler: typeof import('../../node_modules/nitropack/dist/runtime')['defineNitroErrorHandler']
  const defineNitroPlugin: typeof import('../../node_modules/nitropack/dist/runtime')['defineNitroPlugin']
  const defineNodeListener: typeof import('../../node_modules/h3')['defineNodeListener']
  const defineNodeMiddleware: typeof import('../../node_modules/h3')['defineNodeMiddleware']
  const defineOAuthAuth0EventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/auth0')['defineOAuthAuth0EventHandler']
  const defineOAuthBattledotnetEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/battledotnet')['defineOAuthBattledotnetEventHandler']
  const defineOAuthCognitoEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/cognito')['defineOAuthCognitoEventHandler']
  const defineOAuthDiscordEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/discord')['defineOAuthDiscordEventHandler']
  const defineOAuthDropboxEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/dropbox')['defineOAuthDropboxEventHandler']
  const defineOAuthFacebookEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/facebook')['defineOAuthFacebookEventHandler']
  const defineOAuthGitHubEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/github')['defineOAuthGitHubEventHandler']
  const defineOAuthGitLabEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/gitlab')['defineOAuthGitLabEventHandler']
  const defineOAuthGoogleEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/google')['defineOAuthGoogleEventHandler']
  const defineOAuthInstagramEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/instagram')['defineOAuthInstagramEventHandler']
  const defineOAuthKeycloakEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/keycloak')['defineOAuthKeycloakEventHandler']
  const defineOAuthLinearEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linear')['defineOAuthLinearEventHandler']
  const defineOAuthLinkedInEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linkedin')['defineOAuthLinkedInEventHandler']
  const defineOAuthMicrosoftEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/microsoft')['defineOAuthMicrosoftEventHandler']
  const defineOAuthPaypalEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/paypal')['defineOAuthPaypalEventHandler']
  const defineOAuthPolarEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/polar')['defineOAuthPolarEventHandler']
  const defineOAuthSpotifyEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/spotify')['defineOAuthSpotifyEventHandler']
  const defineOAuthSteamEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/steam')['defineOAuthSteamEventHandler']
  const defineOAuthTikTokEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/tiktok')['defineOAuthTikTokEventHandler']
  const defineOAuthTwitchEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/twitch')['defineOAuthTwitchEventHandler']
  const defineOAuthVKEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/vk')['defineOAuthVKEventHandler']
  const defineOAuthXEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/x')['defineOAuthXEventHandler']
  const defineOAuthXSUAAEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/xsuaa')['defineOAuthXSUAAEventHandler']
  const defineOAuthYandexEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/yandex')['defineOAuthYandexEventHandler']
  const defineOAuthZitadelEventHandler: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/zitadel')['defineOAuthZitadelEventHandler']
  const defineRenderHandler: typeof import('../../node_modules/nitropack/dist/runtime')['defineRenderHandler']
  const defineRequestMiddleware: typeof import('../../node_modules/h3')['defineRequestMiddleware']
  const defineResponseMiddleware: typeof import('../../node_modules/h3')['defineResponseMiddleware']
  const defineTask: typeof import('../../node_modules/nitropack/dist/runtime')['defineTask']
  const defineWebSocket: typeof import('../../node_modules/h3')['defineWebSocket']
  const defineWebSocketHandler: typeof import('../../node_modules/h3')['defineWebSocketHandler']
  const deleteCookie: typeof import('../../node_modules/h3')['deleteCookie']
  const dynamicEventHandler: typeof import('../../node_modules/h3')['dynamicEventHandler']
  const esquemaActualizacionCategoria: typeof import('../../server/utils/schemas/general')['esquemaActualizacionCategoria']
  const esquemaActualizacionProveedor: typeof import('../../server/utils/schemas/general')['esquemaActualizacionProveedor']
  const esquemaActualizacionSubcategoria: typeof import('../../server/utils/schemas/general')['esquemaActualizacionSubcategoria']
  const eventHandler: typeof import('../../node_modules/h3')['eventHandler']
  const fetchWithEvent: typeof import('../../node_modules/h3')['fetchWithEvent']
  const fromNodeMiddleware: typeof import('../../node_modules/h3')['fromNodeMiddleware']
  const fromPlainHandler: typeof import('../../node_modules/h3')['fromPlainHandler']
  const fromWebHandler: typeof import('../../node_modules/h3')['fromWebHandler']
  const getCookie: typeof import('../../node_modules/h3')['getCookie']
  const getHeader: typeof import('../../node_modules/h3')['getHeader']
  const getHeaders: typeof import('../../node_modules/h3')['getHeaders']
  const getMethod: typeof import('../../node_modules/h3')['getMethod']
  const getProxyRequestHeaders: typeof import('../../node_modules/h3')['getProxyRequestHeaders']
  const getQuery: typeof import('../../node_modules/h3')['getQuery']
  const getRequestFingerprint: typeof import('../../node_modules/h3')['getRequestFingerprint']
  const getRequestHeader: typeof import('../../node_modules/h3')['getRequestHeader']
  const getRequestHeaders: typeof import('../../node_modules/h3')['getRequestHeaders']
  const getRequestHost: typeof import('../../node_modules/h3')['getRequestHost']
  const getRequestIP: typeof import('../../node_modules/h3')['getRequestIP']
  const getRequestPath: typeof import('../../node_modules/h3')['getRequestPath']
  const getRequestProtocol: typeof import('../../node_modules/h3')['getRequestProtocol']
  const getRequestURL: typeof import('../../node_modules/h3')['getRequestURL']
  const getRequestWebStream: typeof import('../../node_modules/h3')['getRequestWebStream']
  const getResponseHeader: typeof import('../../node_modules/h3')['getResponseHeader']
  const getResponseHeaders: typeof import('../../node_modules/h3')['getResponseHeaders']
  const getResponseStatus: typeof import('../../node_modules/h3')['getResponseStatus']
  const getResponseStatusText: typeof import('../../node_modules/h3')['getResponseStatusText']
  const getRouteRules: typeof import('../../node_modules/nitropack/dist/runtime')['getRouteRules']
  const getRouterParam: typeof import('../../node_modules/h3')['getRouterParam']
  const getRouterParams: typeof import('../../node_modules/h3')['getRouterParams']
  const getSession: typeof import('../../node_modules/h3')['getSession']
  const getUserSession: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session')['getUserSession']
  const getValidatedQuery: typeof import('../../node_modules/h3')['getValidatedQuery']
  const getValidatedRouterParams: typeof import('../../node_modules/h3')['getValidatedRouterParams']
  const handleCacheHeaders: typeof import('../../node_modules/h3')['handleCacheHeaders']
  const handleCors: typeof import('../../node_modules/h3')['handleCors']
  const hashPassword: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/password')['hashPassword']
  const isCorsOriginAllowed: typeof import('../../node_modules/h3')['isCorsOriginAllowed']
  const isError: typeof import('../../node_modules/h3')['isError']
  const isEvent: typeof import('../../node_modules/h3')['isEvent']
  const isEventHandler: typeof import('../../node_modules/h3')['isEventHandler']
  const isMethod: typeof import('../../node_modules/h3')['isMethod']
  const isPreflightRequest: typeof import('../../node_modules/h3')['isPreflightRequest']
  const isStream: typeof import('../../node_modules/h3')['isStream']
  const isWebResponse: typeof import('../../node_modules/h3')['isWebResponse']
  const lazyEventHandler: typeof import('../../node_modules/h3')['lazyEventHandler']
  const moverProductosASala: typeof import('../../server/utils/repositories/productos')['moverProductosASala']
  const nitroPlugin: typeof import('../../node_modules/nitropack/dist/runtime')['nitroPlugin']
  const obtenerAlertas: typeof import('../../server/utils/repositories/productos')['obtenerAlertas']
  const obtenerDatosReporteResponsables: typeof import('../../server/utils/repositories/reportes')['obtenerDatosReporteResponsables']
  const obtenerDatosReporteSala: typeof import('../../server/utils/repositories/reportes')['obtenerDatosReporteSala']
  const obtenerProductos: typeof import('../../server/utils/repositories/productos')['obtenerProductos']
  const obtenerProductosEditarFiltroSala: typeof import('../../server/utils/repositories/productos')['obtenerProductosEditarFiltroSala']
  const obtenerProductosFiltroSala: typeof import('../../server/utils/repositories/productos')['obtenerProductosFiltroSala']
  const obtenerProductosMasAsignados: typeof import('../../server/utils/repositories/reportes')['obtenerProductosMasAsignados']
  const obtenerProductosNoAgrupados: typeof import('../../server/utils/repositories/productos')['obtenerProductosNoAgrupados']
  const obtenerProductosParaDevolucion: typeof import('../../server/utils/repositories/productos')['obtenerProductosParaDevolucion']
  const obtenerProductosParaPrestamo: typeof import('../../server/utils/repositories/productos')['obtenerProductosParaPrestamo']
  const obtenerProductosParaSelect: typeof import('../../server/utils/repositories/productos')['obtenerProductosParaSelect']
  const obtenerProductosPorIndividualizacion: typeof import('../../server/utils/repositories/productos')['obtenerProductosPorIndividualizacion']
  const obtenerProductosTotales: typeof import('../../server/utils/repositories/productos')['obtenerProductosTotales']
  const obtenerTotalPorProducto: typeof import('../../server/utils/repositories/reportes')['obtenerTotalPorProducto']
  const obtenerUsuarioPorEmail: typeof import('../../server/utils/repositories/users')['obtenerUsuarioPorEmail']
  const parseCookies: typeof import('../../node_modules/h3')['parseCookies']
  const prisma: typeof import('../../server/utils/prisma/prisma')['default']
  const promisifyNodeListener: typeof import('../../node_modules/h3')['promisifyNodeListener']
  const proxyRequest: typeof import('../../node_modules/h3')['proxyRequest']
  const readBody: typeof import('../../node_modules/h3')['readBody']
  const readFormData: typeof import('../../node_modules/h3')['readFormData']
  const readMultipartFormData: typeof import('../../node_modules/h3')['readMultipartFormData']
  const readRawBody: typeof import('../../node_modules/h3')['readRawBody']
  const readValidatedBody: typeof import('../../node_modules/h3')['readValidatedBody']
  const removeResponseHeader: typeof import('../../node_modules/h3')['removeResponseHeader']
  const replaceUserSession: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session')['replaceUserSession']
  const requireUserSession: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session')['requireUserSession']
  const runTask: typeof import('../../node_modules/nitropack/dist/runtime')['runTask']
  const sanitizeStatusCode: typeof import('../../node_modules/h3')['sanitizeStatusCode']
  const sanitizeStatusMessage: typeof import('../../node_modules/h3')['sanitizeStatusMessage']
  const sealSession: typeof import('../../node_modules/h3')['sealSession']
  const send: typeof import('../../node_modules/h3')['send']
  const sendError: typeof import('../../node_modules/h3')['sendError']
  const sendIterable: typeof import('../../node_modules/h3')['sendIterable']
  const sendNoContent: typeof import('../../node_modules/h3')['sendNoContent']
  const sendProxy: typeof import('../../node_modules/h3')['sendProxy']
  const sendRedirect: typeof import('../../node_modules/h3')['sendRedirect']
  const sendStream: typeof import('../../node_modules/h3')['sendStream']
  const sendWebResponse: typeof import('../../node_modules/h3')['sendWebResponse']
  const serveStatic: typeof import('../../node_modules/h3')['serveStatic']
  const sessionHooks: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session')['sessionHooks']
  const setCookie: typeof import('../../node_modules/h3')['setCookie']
  const setHeader: typeof import('../../node_modules/h3')['setHeader']
  const setHeaders: typeof import('../../node_modules/h3')['setHeaders']
  const setResponseHeader: typeof import('../../node_modules/h3')['setResponseHeader']
  const setResponseHeaders: typeof import('../../node_modules/h3')['setResponseHeaders']
  const setResponseStatus: typeof import('../../node_modules/h3')['setResponseStatus']
  const setUserSession: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session')['setUserSession']
  const splitCookiesString: typeof import('../../node_modules/h3')['splitCookiesString']
  const toEventHandler: typeof import('../../node_modules/h3')['toEventHandler']
  const toNodeListener: typeof import('../../node_modules/h3')['toNodeListener']
  const toPlainHandler: typeof import('../../node_modules/h3')['toPlainHandler']
  const toWebHandler: typeof import('../../node_modules/h3')['toWebHandler']
  const toWebRequest: typeof import('../../node_modules/h3')['toWebRequest']
  const unsealSession: typeof import('../../node_modules/h3')['unsealSession']
  const updateSession: typeof import('../../node_modules/h3')['updateSession']
  const useAppConfig: typeof import('../../node_modules/nitropack/dist/runtime')['useAppConfig']
  const useBase: typeof import('../../node_modules/h3')['useBase']
  const useEvent: typeof import('../../node_modules/nitropack/dist/runtime')['useEvent']
  const useNitroApp: typeof import('../../node_modules/nitropack/dist/runtime')['useNitroApp']
  const useRuntimeConfig: typeof import('../../node_modules/nitropack/dist/runtime')['useRuntimeConfig']
  const useSession: typeof import('../../node_modules/h3')['useSession']
  const useStorage: typeof import('../../node_modules/nitropack/dist/runtime')['useStorage']
  const validarActualizacionUsuario: typeof import('../../server/utils/schemas/general')['validarActualizacionUsuario']
  const validarEsquemaActualizacionCategoria: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionCategoria']
  const validarEsquemaActualizacionEstadoConservacion: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionEstadoConservacion']
  const validarEsquemaActualizacionNivelEducativo: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionNivelEducativo']
  const validarEsquemaActualizacionProcedencia: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionProcedencia']
  const validarEsquemaActualizacionProducto: typeof import('../../server/utils/schemas/productos')['validarEsquemaActualizacionProducto']
  const validarEsquemaActualizacionProveedor: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionProveedor']
  const validarEsquemaActualizacionSala: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionSala']
  const validarEsquemaActualizacionSubcategoria: typeof import('../../server/utils/schemas/general')['validarEsquemaActualizacionSubcategoria']
  const validarEsquemaAsignarResponsable: typeof import('../../server/utils/schemas/asignarResponsable')['validarEsquemaAsignarResponsable']
  const validarEsquemaAsignarSala: typeof import('../../server/utils/schemas/asignarResponsable')['validarEsquemaAsignarSala']
  const validarEsquemaCreacionProducto: typeof import('../../server/utils/schemas/productos')['validarEsquemaCreacionProducto']
  const validarEsquemaCreacionSala: typeof import('../../server/utils/schemas/general')['validarEsquemaCreacionSala']
  const validarEsquemaFechaDevolucion: typeof import('../../server/utils/schemas/general')['validarEsquemaFechaDevolucion']
  const validarEsquemaIdNumericoRuta: typeof import('../../server/utils/schemas/general')['validarEsquemaIdNumericoRuta']
  const validarFormularioCreacionUsuario: typeof import('../../server/utils/schemas/schema.registro')['validarFormularioCreacionUsuario']
  const validarFormularioLogin: typeof import('../../server/utils/schemas/schema.login')['validarFormularioLogin']
  const validarPassSchema: typeof import('../../server/utils/schemas/general')['validarPassSchema']
  const validaresquemaAgregarProducto: typeof import('../../server/utils/schemas/productos')['validaresquemaAgregarProducto']
  const validaresquemaAgregarStock: typeof import('../../server/utils/schemas/productos')['validaresquemaAgregarStock']
  const verifyPassword: typeof import('../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/password')['verifyPassword']
  const writeEarlyHints: typeof import('../../node_modules/h3')['writeEarlyHints']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { OAuthAuth0Config } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/auth0.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/auth0.d.ts')
  // @ts-ignore
  export type { OAuthBattledotnetConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/battledotnet.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/battledotnet.d.ts')
  // @ts-ignore
  export type { OAuthCognitoConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/cognito.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/cognito.d.ts')
  // @ts-ignore
  export type { OAuthDiscordConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/discord.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/discord.d.ts')
  // @ts-ignore
  export type { OAuthDropboxConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/dropbox.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/dropbox.d.ts')
  // @ts-ignore
  export type { OAuthFacebookConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/facebook.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/facebook.d.ts')
  // @ts-ignore
  export type { OAuthGitHubConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/github.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/github.d.ts')
  // @ts-ignore
  export type { OAuthGitLabConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/gitlab.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/gitlab.d.ts')
  // @ts-ignore
  export type { OAuthGoogleConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/google.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/google.d.ts')
  // @ts-ignore
  export type { OAuthInstagramConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/instagram.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/instagram.d.ts')
  // @ts-ignore
  export type { OAuthKeycloakConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/keycloak.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/keycloak.d.ts')
  // @ts-ignore
  export type { OAuthLinearConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linear.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linear.d.ts')
  // @ts-ignore
  export type { OAuthLinkedInConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linkedin.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linkedin.d.ts')
  // @ts-ignore
  export type { OAuthMicrosoftConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/microsoft.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/microsoft.d.ts')
  // @ts-ignore
  export type { OAuthPaypalConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/paypal.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/paypal.d.ts')
  // @ts-ignore
  export type { OAuthPolarConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/polar.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/polar.d.ts')
  // @ts-ignore
  export type { OAuthSpotifyConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/spotify.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/spotify.d.ts')
  // @ts-ignore
  export type { OAuthSteamConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/steam.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/steam.d.ts')
  // @ts-ignore
  export type { OAuthTikTokConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/tiktok.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/tiktok.d.ts')
  // @ts-ignore
  export type { OAuthTwitchConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/twitch.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/twitch.d.ts')
  // @ts-ignore
  export type { OAuthVKConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/vk.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/vk.d.ts')
  // @ts-ignore
  export type { OAuthXConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/x.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/x.d.ts')
  // @ts-ignore
  export type { OAuthXSUAAConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/xsuaa.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/xsuaa.d.ts')
  // @ts-ignore
  export type { OAuthYandexConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/yandex.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/yandex.d.ts')
  // @ts-ignore
  export type { OAuthZitadelConfig } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/zitadel.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/zitadel.d.ts')
  // @ts-ignore
  export type { SessionHooks } from 'C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/utils/session.d.ts'
  import('C:/Users/11/Desktop/inventario/node_modules/nuxt-auth-utils/dist/runtime/server/utils/session.d.ts')
  // @ts-ignore
  export type { FormularioActualizacionUsuario, FormularioActualizacionEstado, FormularioActualizacionSubCategoria, FormularioActualizacionCategoria, FormularioActualizacionFechaDevolucion } from '../../server/utils/schemas/general'
  import('../../server/utils/schemas/general')
  // @ts-ignore
  export type { FormularioCreacionProducto, FormularioActualizacionProducto, FormularioAgregarStock } from '../../server/utils/schemas/productos'
  import('../../server/utils/schemas/productos')
  // @ts-ignore
  export type { FormularioLogin } from '../../server/utils/schemas/schema.login'
  import('../../server/utils/schemas/schema.login')
  // @ts-ignore
  export type { FormularioCreacionUsuario } from '../../server/utils/schemas/schema.registro'
  import('../../server/utils/schemas/schema.registro')
}
export { defineCachedFunction, defineCachedEventHandler, cachedFunction, cachedEventHandler, useRuntimeConfig, useStorage, useNitroApp, defineNitroPlugin, nitroPlugin, defineRenderHandler, getRouteRules, useAppConfig, useEvent, defineTask, runTask, defineNitroErrorHandler } from '../../node_modules/nitropack/dist/runtime';
export { appendCorsHeaders, appendCorsPreflightHeaders, appendHeader, appendHeaders, appendResponseHeader, appendResponseHeaders, assertMethod, callNodeListener, clearResponseHeaders, clearSession, createApp, createAppEventHandler, createError, createEvent, createEventStream, createRouter, defaultContentType, defineEventHandler, defineLazyEventHandler, defineNodeListener, defineNodeMiddleware, defineRequestMiddleware, defineResponseMiddleware, defineWebSocket, defineWebSocketHandler, deleteCookie, dynamicEventHandler, eventHandler, fetchWithEvent, fromNodeMiddleware, fromPlainHandler, fromWebHandler, getCookie, getHeader, getHeaders, getMethod, getProxyRequestHeaders, getQuery, getRequestFingerprint, getRequestHeader, getRequestHeaders, getRequestHost, getRequestIP, getRequestPath, getRequestProtocol, getRequestURL, getRequestWebStream, getResponseHeader, getResponseHeaders, getResponseStatus, getResponseStatusText, getRouterParam, getRouterParams, getSession, getValidatedQuery, getValidatedRouterParams, handleCacheHeaders, handleCors, isCorsOriginAllowed, isError, isEvent, isEventHandler, isMethod, isPreflightRequest, isStream, isWebResponse, lazyEventHandler, parseCookies, promisifyNodeListener, proxyRequest, readBody, readFormData, readMultipartFormData, readRawBody, readValidatedBody, removeResponseHeader, sanitizeStatusCode, sanitizeStatusMessage, sealSession, send, sendError, sendIterable, sendNoContent, sendProxy, sendRedirect, sendStream, sendWebResponse, serveStatic, setCookie, setHeader, setHeaders, setResponseHeader, setResponseHeaders, setResponseStatus, splitCookiesString, toEventHandler, toNodeListener, toPlainHandler, toWebHandler, toWebRequest, unsealSession, updateSession, useBase, useSession, writeEarlyHints } from 'h3';
export { buildAssetsURL as __buildAssetsURL, publicAssetsURL as __publicAssetsURL } from '../../node_modules/nuxt/dist/core/runtime/nitro/paths';
export { defineAppConfig } from '../../node_modules/nuxt/dist/core/runtime/nitro/config';
export { defineOAuthAuth0EventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/auth0';
export { defineOAuthBattledotnetEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/battledotnet';
export { defineOAuthCognitoEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/cognito';
export { defineOAuthDiscordEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/discord';
export { defineOAuthDropboxEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/dropbox';
export { defineOAuthFacebookEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/facebook';
export { defineOAuthGitHubEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/github';
export { defineOAuthGitLabEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/gitlab';
export { defineOAuthGoogleEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/google';
export { defineOAuthInstagramEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/instagram';
export { defineOAuthKeycloakEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/keycloak';
export { defineOAuthLinearEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linear';
export { defineOAuthLinkedInEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/linkedin';
export { defineOAuthMicrosoftEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/microsoft';
export { defineOAuthPaypalEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/paypal';
export { defineOAuthPolarEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/polar';
export { defineOAuthSpotifyEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/spotify';
export { defineOAuthSteamEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/steam';
export { defineOAuthTikTokEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/tiktok';
export { defineOAuthTwitchEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/twitch';
export { defineOAuthVKEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/vk';
export { defineOAuthXEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/x';
export { defineOAuthXSUAAEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/xsuaa';
export { defineOAuthYandexEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/yandex';
export { defineOAuthZitadelEventHandler } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/lib/oauth/zitadel';
export { hashPassword, verifyPassword } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/password';
export { sessionHooks, getUserSession, setUserSession, replaceUserSession, clearUserSession, requireUserSession } from '../../node_modules/nuxt-auth-utils/dist/runtime/server/utils/session';
export { default as prisma } from '../../server/utils/prisma/prisma';
export { actualizarProveedor, actualizarProcedencia, actualizarNivelEducativo, actualizarSala, actualizarEstadoConservacion, actualizarSubcategoria, actualizarCategoria } from '../../server/utils/repositories/alimentadores';
export { obtenerProductosParaSelect, obtenerProductosParaPrestamo, obtenerProductosParaDevolucion, obtenerProductosFiltroSala, obtenerProductosEditarFiltroSala, obtenerProductos, obtenerProductosNoAgrupados, obtenerProductosTotales, crearProducto, actualizarProducto, asignarResponsableAProducto, obtenerProductosPorIndividualizacion, moverProductosASala, obtenerAlertas, asignarFechaDevolucion, agregarStock } from '../../server/utils/repositories/productos';
export { obtenerDatosReporteResponsables, obtenerDatosReporteSala, obtenerProductosMasAsignados, obtenerTotalPorProducto } from '../../server/utils/repositories/reportes';
export { crearUsuario, obtenerUsuarioPorEmail, actualizarUsuario, cambiarPass } from '../../server/utils/repositories/users';
export { validarEsquemaAsignarResponsable, validarEsquemaAsignarSala } from '../../server/utils/schemas/asignarResponsable';
export { validarEsquemaIdNumericoRuta, validarActualizacionUsuario, validarPassSchema, esquemaActualizacionProveedor, validarEsquemaActualizacionProveedor, validarEsquemaActualizacionProcedencia, validarEsquemaActualizacionNivelEducativo, validarEsquemaActualizacionSala, validarEsquemaActualizacionEstadoConservacion, esquemaActualizacionSubcategoria, validarEsquemaActualizacionSubcategoria, esquemaActualizacionCategoria, validarEsquemaActualizacionCategoria, validarEsquemaCreacionSala, validarEsquemaFechaDevolucion } from '../../server/utils/schemas/general';
export { validarEsquemaCreacionProducto, validarEsquemaActualizacionProducto, validaresquemaAgregarStock, validaresquemaAgregarProducto } from '../../server/utils/schemas/productos';
export { validarFormularioLogin } from '../../server/utils/schemas/schema.login';
export { validarFormularioCreacionUsuario } from '../../server/utils/schemas/schema.registro';