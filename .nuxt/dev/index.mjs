import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, isEvent, createEvent, fetchWithEvent, getRequestHeader, eventHandler, setHeaders, sendRedirect, proxyRequest, createError, setResponseHeader, send, getResponseStatus, setResponseStatus, setResponseHeaders, getRequestHeaders, appendHeaders, isPreflightRequest, useSession, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, getQuery as getQuery$1, readBody, readValidatedBody, getValidatedRouterParams, getResponseStatusText } from 'file://C:/Users/11/Documents/inventario/node_modules/h3/dist/index.mjs';
import * as v from 'file://C:/Users/11/Documents/inventario/node_modules/valibot/dist/index.js';
import { PrismaClient } from 'file://C:/Users/11/Documents/inventario/node_modules/@prisma/client/default.js';
import { Hash } from 'file://C:/Users/11/Documents/inventario/node_modules/@adonisjs/hash/build/index.js';
import { Scrypt } from 'file://C:/Users/11/Documents/inventario/node_modules/@adonisjs/hash/build/src/drivers/scrypt.js';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file://C:/Users/11/Documents/inventario/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file://C:/Users/11/Documents/inventario/node_modules/devalue/index.js';
import destr from 'file://C:/Users/11/Documents/inventario/node_modules/destr/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, joinRelativeURL } from 'file://C:/Users/11/Documents/inventario/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://C:/Users/11/Documents/inventario/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file://C:/Users/11/Documents/inventario/node_modules/@unhead/ssr/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file://C:/Users/11/Documents/inventario/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file://C:/Users/11/Documents/inventario/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file://C:/Users/11/Documents/inventario/node_modules/hookable/dist/index.mjs';
import { klona } from 'file://C:/Users/11/Documents/inventario/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/11/Documents/inventario/node_modules/scule/dist/index.mjs';
import defu, { defuFn, defu as defu$1 } from 'file://C:/Users/11/Documents/inventario/node_modules/defu/dist/defu.mjs';
import { hash } from 'file://C:/Users/11/Documents/inventario/node_modules/ohash/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/11/Documents/inventario/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/11/Documents/inventario/node_modules/unstorage/drivers/fs.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/11/Documents/inventario/node_modules/radix3/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { consola } from 'file://C:/Users/11/Documents/inventario/node_modules/consola/dist/index.mjs';
import { getContext } from 'file://C:/Users/11/Documents/inventario/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/11/Documents/inventario/node_modules/errx/dist/index.js';
import { isVNode, version, unref } from 'file://C:/Users/11/Documents/inventario/node_modules/vue/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file://C:/Users/11/Documents/inventario/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/11/Documents/inventario/node_modules/@unhead/shared/dist/index.mjs';

const r=Object.create(null),E=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return E()[o]??r[o]},has(e,o){const i=E();return o in i||o in r},set(e,o,i){const g=E(!0);return g[o]=i,!0},deleteProperty(e,o){if(!o)return !1;const i=E(!0);return delete i[o],!0},ownKeys(){const e=E(!0);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",p=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:!0}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:!0}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:!1}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:!1}],["VERCEL","VERCEL_ENV",{ci:!1}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:!1}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:!0}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"]];function B(){if(globalThis.process?.env)for(const e of p){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:!1}:{name:"",ci:!1}}const l=B(),d=l.name;function n(e){return e?e!=="false":!1}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==!1,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const C=t==="test"||n(s.TEST);n(s.MINIMAL)||T||C||!R;const a=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||a)&&s.TERM!=="dumb"||T);const _=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(_?.split(".")[0])||null;const W=globalThis.process||Object.create(null),c={versions:{}};new Proxy(W,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const A=globalThis.process?.release?.name==="node",L=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,u=globalThis.navigator?.userAgent==="Cloudflare-Workers",b=!!globalThis.__lagon__,F=[[S,"netlify"],[N,"edge-light"],[u,"workerd"],[O,"fastly"],[D,"deno"],[L,"bun"],[A,"node"],[b,"lagon"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const P=G();P?.name||"";

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {},
  "session": {
    "name": "nuxt-session",
    "password": "e3d285c8fb66445d8eb23f14be229b8f",
    "cookie": {
      "sameSite": "lax"
    }
  },
  "hash": {
    "scrypt": {}
  },
  "webauthn": {
    "register": {},
    "authenticate": {}
  },
  "oauth": {
    "github": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "gitlab": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "spotify": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "google": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "twitch": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "auth0": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "audience": "",
      "redirectURL": ""
    },
    "microsoft": {
      "clientId": "",
      "clientSecret": "",
      "tenant": "",
      "scope": [],
      "authorizationURL": "",
      "tokenURL": "",
      "userURL": "",
      "redirectURL": ""
    },
    "discord": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "battledotnet": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "keycloak": {
      "clientId": "",
      "clientSecret": "",
      "serverUrl": "",
      "realm": "",
      "redirectURL": ""
    },
    "linear": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "linkedin": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "cognito": {
      "clientId": "",
      "clientSecret": "",
      "region": "",
      "userPoolId": "",
      "redirectURL": ""
    },
    "facebook": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "instagram": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "paypal": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "steam": {
      "apiKey": "",
      "redirectURL": ""
    },
    "x": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "xsuaa": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    },
    "vk": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "yandex": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "tiktok": {
      "clientKey": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "dropbox": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "polar": {
      "clientId": "",
      "clientSecret": "",
      "redirectURL": ""
    },
    "zitadel": {
      "clientId": "",
      "clientSecret": "",
      "domain": "",
      "redirectURL": ""
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const serverAssets = [{"baseName":"server","dir":"C:/Users/11/Documents/inventario/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\11\\Documents\\inventario","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\11\\Documents\\inventario\\server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\11\\Documents\\inventario\\.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\11\\Documents\\inventario\\.nuxt\\cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:\\Users\\11\\Documents\\inventario\\.data\\kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _Yrb4TwTFi0 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/11/Documents/inventario";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _y4voQcxMqW = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

function defineNitroPlugin(def) {
  return def;
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function defineRenderHandler(handler) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
      setResponseHeader(event, "Content-Type", "image/x-icon");
      return send(
        event,
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      );
    }
    const response = await handler(event);
    if (!response) {
      const _currentStatus = getResponseStatus(event);
      setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
      return send(
        event,
        "No response returned from render handler: " + event.path
      );
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (response.headers) {
      setResponseHeaders(event, response.headers);
    }
    if (response.statusCode || response.statusMessage) {
      setResponseStatus(event, response.statusCode, response.statusMessage);
    }
    return response.body;
  });
}

const _AWkaKVteGN = defineNitroPlugin((nitroApp) => {
  if (process.env.NUXT_OAUTH_FACEBOOK_CLIENT_ID && process.env.NUXT_OAUTH_FACEBOOK_CLIENT_SECRET || process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_ID && process.env.NUXT_OAUTH_INSTAGRAM_CLIENT_SECRET) {
    nitroApp.hooks.hook("render:html", (html) => {
      html.head.unshift(`
      <script>
        if (window.location.hash === "#_=_"){
          history.replaceState
              ? history.replaceState(null, null, window.location.href.split("#")[0])
              : window.location.hash = "";
        }
      <\/script>
    `);
    });
  }
});

const plugins = [
  _Yrb4TwTFi0,
_y4voQcxMqW,
_AWkaKVteGN
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const _xw6Oza = defineEventHandler((event) => {
  appendHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    // Permite que cualquier origen realice solicitudes a la API.
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    // Define los métodos HTTP permitidos.
    "Access-Control-Allow-Credentials": "true",
    // Permite el uso de cookies o autenticación en solicitudes entre dominios.
    "Access-Control-Allow-Headers": "Content-Type, X-Autorization",
    // Especifica qué cabeceras se pueden enviar en las solicitudes.
    "Access-Control-Expose-Headers": "X-Autorization"
    // Permite que ciertas cabeceras sean expuestas en la respuesta.
  });
  if (isPreflightRequest(event)) {
    return null;
  }
});

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

let _hash;
function getHash() {
  if (!_hash) {
    const options = useRuntimeConfig().hash?.scrypt;
    const scrypt = new Scrypt(options);
    _hash = new Hash(scrypt);
  }
  return _hash;
}
async function hashPassword(password) {
  return await getHash().make(password);
}
async function verifyPassword(hashedPassword, plainPassword) {
  return await getHash().verify(hashedPassword, plainPassword);
}

const prisma$2 = new PrismaClient();

async function actualizarProveedor(id, proveedorActualizado) {
  try {
    console.log("ID del proveedor a actualizar:", id);
    console.log("Datos a actualizar:", proveedorActualizado);
    const proveedor = await prisma$2.proveedor.update({
      where: { idProveedor: id },
      // Identifica el proveedor a través de su ID
      data: {
        ...proveedorActualizado
        // Utiliza desestructuración para actualizar solo los campos modificados
      }
    });
    console.log("Proveedor actualizado:", proveedor);
    return proveedor;
  } catch (error) {
    console.error("Error en actualizarProveedor:", error);
    throw new Error("No se pudo actualizar el proveedor.");
  }
}
async function actualizarProcedencia(id, datosActualizados) {
  try {
    console.log("ID de procedencia a actualizar:", id);
    console.log("Datos a actualizar:", datosActualizados);
    const procedenciaActualizada = await prisma$2.procedencia.update({
      where: { idProcedencia: id },
      // Busca la procedencia por su ID
      data: {
        ...datosActualizados
        // Utiliza desestructuración para actualizar solo los campos necesarios
      }
    });
    console.log("Procedencia actualizada:", procedenciaActualizada);
    return procedenciaActualizada;
  } catch (error) {
    console.error("Error en actualizarProcedencia:", error);
    throw new Error("No se pudo actualizar la procedencia.");
  }
}
async function actualizarNivelEducativo(id, nivelEducativoActualizado) {
  try {
    const nivelEducativo = await prisma$2.nivelEducativo.update({
      where: { idNivel: id },
      // Encuentra el nivel educativo por su ID
      data: nivelEducativoActualizado
      // Actualiza los datos del nivel educativo
    });
    return nivelEducativo;
  } catch (error) {
    console.error("Error en actualizarNivelEducativo:", error);
    throw new Error("No se pudo actualizar el nivel educativo.");
  }
}
async function actualizarSala(id, salaActualizada) {
  try {
    const sala = await prisma$2.sala.update({
      where: { idSala: id },
      // Encuentra la sala por su ID
      data: {
        ...salaActualizada
        // Utiliza desestructuración para actualizar solo los campos necesarios
      }
    });
    return sala;
  } catch (error) {
    console.error("Error en actualizarSala:", error);
    throw new Error("No se pudo actualizar la sala.");
  }
}
async function actualizarEstadoConservacion(id, estadoActualizado) {
  try {
    const estado = await prisma$2.estadoConservacion.update({
      where: { idEstado: id },
      // Encuentra el estado por su ID
      data: estadoActualizado
      // Actualiza los datos del estado de conservación
    });
    return estado;
  } catch (error) {
    console.error("Error al actualizar el estado de conservaci\xF3n:", error);
    throw new Error("No se pudo actualizar el estado de conservaci\xF3n.");
  }
}
async function actualizarSubcategoria(id, subcategoriaActualizada) {
  try {
    const subcategoria = await prisma$2.subcategoria.update({
      where: { idSubcategoria: id },
      // Encuentra la subcategoría por su ID
      data: subcategoriaActualizada
      // Actualiza los campos de la subcategoría
    });
    return subcategoria;
  } catch (error) {
    console.error("Error al actualizar la subcategor\xEDa:", error);
    throw new Error("No se pudo actualizar la subcategor\xEDa.");
  }
}
async function actualizarCategoria(id, categoriaActualizada) {
  try {
    const categoria = await prisma$2.categoria.update({
      where: { idCategoria: id },
      // Encuentra la categoría por su ID
      data: categoriaActualizada
      // Actualiza los datos de la categoría
    });
    return categoria;
  } catch (error) {
    console.error("Error al actualizar la categor\xEDa:", error);
    throw new Error("No se pudo actualizar la categor\xEDa.");
  }
}

const obtenerProductosParaSelect = async () => {
  try {
    const productosAgrupados = await prisma$2.producto.groupBy({
      by: ["individualizacionDelBien"],
      // Especificamos que queremos agrupar los productos solo por `individualizacionDelBien`
      _count: {
        idProducto: true
        // Contamos la cantidad de productos para cada `individualizacionDelBien`
      }
    });
    return productosAgrupados.map((grupo) => ({
      individualizacionDelBien: grupo.individualizacionDelBien,
      // Nombre del producto o descripción
      cantidad: grupo._count.idProducto
      // Cantidad de productos con esa `individualizacionDelBien`
    }));
  } catch (error) {
    console.error("Error al obtener productos para select:", error);
    throw new Error("Error al obtener productos para select.");
  }
};
const obtenerProductosParaPrestamo = async (individualizacionDelBien) => {
  try {
    const productos = await prisma$2.producto.findMany({
      where: {
        // Filtra los productos por la `individualizacionDelBien`, es decir, el nombre o descripción del producto
        individualizacionDelBien,
        responsables: {
          none: {
            // Se asegura de que no haya registros asociados con el producto que tengan una `fechaDevolucion` nula.
            // Esto significa que el producto no está actualmente prestado o está esperando ser devuelto.
            fechaDevolucion: null
          }
        }
      },
      select: {
        // Selecciona solo el `idProducto` de los productos que cumplen con el criterio
        idProducto: true
      }
    });
    return productos.map((producto) => producto.idProducto);
  } catch (error) {
    console.error("Error al obtener productos para pr\xE9stamo:", error);
    throw new Error("Error al obtener productos para pr\xE9stamo.");
  }
};
const obtenerProductosParaDevolucion = async (idUsuario) => {
  try {
    const productosAsignados = await prisma$2.productoResponsable.findMany({
      where: {
        idUsuario,
        // Filtra por el ID del usuario, asegurando que solo se obtengan productos asignados a este usuario
        fechaDevolucion: null
        // Filtra los productos que aún no han sido devueltos (fechaDevolucion es null)
      },
      select: {
        idProducto: true
        // Solo seleccionamos el idProducto, ya que solo necesitamos los identificadores de los productos
      }
    });
    return productosAsignados.map((item) => item.idProducto);
  } catch (error) {
    console.error("Error al obtener productos para devoluci\xF3n:", error);
    throw new Error("Error al obtener productos para devoluci\xF3n.");
  }
};
const obtenerProductosFiltroSala = async (idSala) => {
  try {
    const productosAgrupados = await prisma$2.producto.findMany({
      where: {
        productoSalas: {
          some: {
            idSala
            // Filtramos productos que están asignados a la sala proporcionada
          }
        }
      },
      select: {
        idProducto: true,
        // Seleccionamos el ID del producto
        individualizacionDelBien: true,
        // Seleccionamos el nombre o descripción del producto
        fechaAdquisicion: true,
        // Fecha en que el producto fue adquirido
        subcategoria: {
          select: {
            nombreSubcategoria: true
            // Nombre de la subcategoría a la que pertenece el producto
          }
        },
        estado: {
          select: {
            estado: true
            // Estado del producto (por ejemplo, 'bueno', 'en reparación', etc.)
          }
        },
        procedencia: {
          select: {
            procedencia: true
            // Procedencia del producto (por ejemplo, 'compra', 'donación', etc.)
          }
        },
        productoSalas: {
          where: {
            idSala
            // Filtramos las asignaciones específicas de la sala
          },
          orderBy: {
            fechaAsignacion: "desc"
            // Ordenamos las asignaciones por fecha, de la más reciente a la más antigua
          },
          take: 1,
          // Solo seleccionamos la asignación más reciente (la última asignación)
          select: {
            fechaAsignacion: true,
            // Tomamos la fecha de asignación (aunque no la utilizamos en la respuesta)
            sala: {
              select: {
                idSala: true,
                // ID de la sala asignada
                nombreSala: true,
                // Nombre de la sala asignada
                nivelEducativo: {
                  select: {
                    nivelEducativo: true
                    // Nivel educativo asociado con la sala
                  }
                }
              }
            }
          }
        }
      }
    });
    const productosAgrupadosPorIndividualizacion = productosAgrupados.reduce(
      (acc, producto) => {
        const ultimaAsignacion = producto.productoSalas[0];
        if (!acc[producto.individualizacionDelBien]) {
          acc[producto.individualizacionDelBien] = {
            individualizacionDelBien: producto.individualizacionDelBien,
            cantidad: 0,
            // Inicializamos el contador de productos
            fechaAdquisicion: producto.fechaAdquisicion,
            // Fecha de adquisición del producto
            Subcategoria: producto.subcategoria.nombreSubcategoria,
            // Subcategoría del producto
            Estado: producto.estado.estado,
            // Estado del producto
            Procedencia: producto.procedencia.procedencia,
            // Procedencia del producto
            Ubicacion: ultimaAsignacion.sala.nombreSala,
            // Última sala asignada al producto
            Niveleducativo: ultimaAsignacion.sala.nivelEducativo.nivelEducativo
            // Nivel educativo de la sala
          };
        }
        acc[producto.individualizacionDelBien].cantidad += 1;
        return acc;
      },
      {}
      // Inicializamos el acumulador como un objeto vacío
    );
    const resultados = Object.values(productosAgrupadosPorIndividualizacion);
    return resultados;
  } catch (error) {
    console.error("Error al obtener productos agrupados en sala:", error);
    throw new Error("Error al obtener productos agrupados en la sala.");
  }
};
const obtenerProductosEditarFiltroSala = async (idSala) => {
  try {
    const productos = await prisma$2.producto.findMany({
      where: {
        productoSalas: {
          some: {
            idSala
            // Filtramos productos que están asignados a la sala proporcionada
          }
        }
      },
      select: {
        idProducto: true,
        // Seleccionamos el ID del producto
        individualizacionDelBien: true,
        // Seleccionamos el nombre o descripción del producto
        fechaAdquisicion: true,
        // Fecha en que el producto fue adquirido
        subcategoria: {
          select: {
            nombreSubcategoria: true
            // Nombre de la subcategoría a la que pertenece el producto
          }
        },
        estado: {
          select: {
            estado: true
            // Estado del producto (por ejemplo, 'bueno', 'en reparación', etc.)
          }
        },
        procedencia: {
          select: {
            procedencia: true
            // Procedencia del producto (por ejemplo, 'compra', 'donación', etc.)
          }
        },
        productoSalas: {
          where: {
            idSala
            // Filtramos las asignaciones específicas de la sala
          },
          orderBy: {
            fechaAsignacion: "desc"
            // Ordenamos las asignaciones por fecha, de la más reciente a la más antigua
          },
          take: 1,
          // Solo seleccionamos la asignación más reciente (la última asignación)
          select: {
            fechaAsignacion: true,
            // Tomamos la fecha de asignación (aunque no la utilizamos en la respuesta)
            sala: {
              select: {
                idSala: true,
                // ID de la sala asignada
                nombreSala: true,
                // Nombre de la sala asignada
                nivelEducativo: {
                  select: {
                    nivelEducativo: true
                    // Nivel educativo asociado con la sala
                  }
                }
              }
            }
          }
        }
      }
    });
    const resultados = productos.map((producto) => {
      const ultimaAsignacion = producto.productoSalas[0];
      return {
        idProducto: producto.idProducto,
        individualizacionDelBien: producto.individualizacionDelBien,
        fechaAdquisicion: producto.fechaAdquisicion,
        Subcategoria: producto.subcategoria.nombreSubcategoria,
        Estado: producto.estado.estado,
        Procedencia: producto.procedencia.procedencia,
        Ubicacion: ultimaAsignacion.sala.nombreSala,
        // Última sala asignada al producto
        Niveleducativo: ultimaAsignacion.sala.nivelEducativo.nivelEducativo
        // Nivel educativo de la sala
      };
    });
    return resultados;
  } catch (error) {
    console.error("Error al obtener productos en la sala:", error);
    throw new Error("Error al obtener productos en la sala.");
  }
};
const obtenerProductos = async () => {
  try {
    const productosAgrupados = await prisma$2.producto.groupBy({
      by: [
        "individualizacionDelBien",
        // Agrupamos por la descripción del bien
        "idSubcategoria",
        // Agrupamos por ID de subcategoría
        "idEstado",
        // Agrupamos por ID de estado del producto
        "idProcedencia",
        // Agrupamos por ID de procedencia
        "fechaAdquisicion"
        // Agrupamos por fecha de adquisición
      ],
      _count: {
        idProducto: true
        // Contamos cuántos productos hay por grupo
      },
      _max: {
        fechaAdquisicion: true
        // Obtenemos la fecha de adquisición más reciente dentro del grupo
      }
    });
    const productosConDetalles = await Promise.all(
      productosAgrupados.map(async (grupo) => {
        const productos = await prisma$2.producto.findMany({
          where: {
            individualizacionDelBien: grupo.individualizacionDelBien,
            idSubcategoria: grupo.idSubcategoria,
            idEstado: grupo.idEstado,
            idProcedencia: grupo.idProcedencia,
            fechaAdquisicion: grupo.fechaAdquisicion
            // Aseguramos que sea la misma fecha de adquisición que el grupo
          },
          include: {
            subcategoria: { select: { nombreSubcategoria: true } },
            // Obtenemos el nombre de la subcategoría
            estado: { select: { estado: true } },
            // Obtenemos el estado del producto
            procedencia: { select: { procedencia: true } },
            // Obtenemos la procedencia del producto
            productoSalas: {
              orderBy: { fechaAsignacion: "desc" },
              // Ordenamos por fecha de asignación de la sala, la más reciente primero
              include: {
                sala: {
                  select: {
                    nombreSala: true,
                    // Nombre de la sala
                    numeroSala: true,
                    // Número de la sala
                    nivelEducativo: { select: { nivelEducativo: true } }
                    // Nivel educativo de la sala
                  }
                }
              }
            },
            responsables: {
              orderBy: { fechaAsignacion: "desc" },
              // Ordenamos por la fecha de asignación más reciente
              include: {
                usuarioResponsable: {
                  select: { nombre: true, apellido: true }
                  // Obtenemos el nombre y apellido del responsable
                }
              }
            }
          }
        });
        const productosPorResponsable = productos.reduce(
          (acc, producto) => {
            const responsableActual = producto.responsables[0];
            const ultimaSala = producto.productoSalas[0];
            const esDevuelto = (responsableActual == null ? void 0 : responsableActual.fechaDevolucion) !== null;
            const ubicacion = esDevuelto ? `${(ultimaSala == null ? void 0 : ultimaSala.sala.nombreSala) || "No asignado"} ${(ultimaSala == null ? void 0 : ultimaSala.sala.numeroSala) || "No Sala"}` : `Asignado a ${(responsableActual == null ? void 0 : responsableActual.usuarioResponsable.nombre) || "No asignado"} ${(responsableActual == null ? void 0 : responsableActual.usuarioResponsable.apellido) || ""}`;
            if (!acc[ubicacion]) {
              acc[ubicacion] = { productos: [], cantidad: 0 };
            }
            acc[ubicacion].productos.push(producto);
            acc[ubicacion].cantidad += 1;
            return acc;
          },
          {}
          // Inicializamos el acumulador vacío
        );
        const detalles = Object.keys(productosPorResponsable).map(
          (ubicacionKey) => {
            var _a;
            const responsableInfo = productosPorResponsable[ubicacionKey];
            const producto = responsableInfo.productos[0];
            const sala = ((_a = producto.productoSalas[0]) == null ? void 0 : _a.sala) || {
              nombreSala: "No asignado",
              nivelEducativo: { nivelEducativo: "No asignado" }
            };
            const numeroSala = "numeroSala" in sala ? sala.numeroSala : "No Sala";
            return {
              individualizacionDelBien: grupo.individualizacionDelBien,
              // Descripción del producto
              cantidad: responsableInfo.cantidad,
              // Cantidad de productos por responsable o ubicación
              Subcategoria: producto.subcategoria.nombreSubcategoria || "Sin subcategor\xEDa",
              // Nombre de la subcategoría
              fechaAdquisicion: grupo.fechaAdquisicion,
              // Fecha de adquisición del grupo
              Ubicacion: ubicacionKey,
              // La ubicación o responsable (dependiendo de si el producto fue devuelto)
              Estado: producto.estado.estado || "Sin estado",
              // Estado del producto
              Procedencia: producto.procedencia.procedencia || "Sin procedencia",
              // Procedencia del producto
              Niveleducativo: sala.nivelEducativo.nivelEducativo
              // Nivel educativo de la sala
            };
          }
        );
        return detalles;
      })
    );
    return productosConDetalles.flat();
  } catch (error) {
    console.error("Error al obtener productos agrupados:", error);
    throw new Error("Error al obtener productos agrupados.");
  }
};
const obtenerProductosNoAgrupados = async () => {
  try {
    const productos = await prisma$2.producto.findMany({
      include: {
        subcategoria: {
          select: { nombreSubcategoria: true, idSubcategoria: true }
          // Obtenemos el nombre y el ID de la subcategoría
        },
        estado: {
          select: { estado: true, idEstado: true }
          // Obtenemos el estado del producto y su ID
        },
        procedencia: {
          select: { procedencia: true, idProcedencia: true }
          // Obtenemos la procedencia del producto y su ID
        },
        productoSalas: {
          orderBy: { fechaAsignacion: "desc" },
          // Ordenamos por fecha de asignación más reciente
          include: {
            sala: {
              select: {
                nombreSala: true,
                // Nombre de la sala
                numeroSala: true,
                // Número de la sala
                nivelEducativo: { select: { nivelEducativo: true } }
                // Nivel educativo asociado con la sala
              }
            }
          }
        },
        responsables: {
          orderBy: { fechaAsignacion: "desc" },
          // Ordenamos por fecha de asignación más reciente
          include: {
            usuarioResponsable: {
              select: { nombre: true, apellido: true }
              // Obtenemos el nombre y apellido del responsable
            }
          }
        }
      }
    });
    const productosConDetalles = productos.map((producto) => {
      var _a, _b, _c;
      const sala = ((_a = producto.productoSalas[0]) == null ? void 0 : _a.sala) || {
        nombreSala: "No asignado",
        nivelEducativo: { nivelEducativo: "No asignado" }
      };
      const numeroSala = "numeroSala" in sala ? sala.numeroSala : "NoSala";
      const responsable = producto.responsables.length ? `Asignado a ${producto.responsables[0].usuarioResponsable.nombre} ${producto.responsables[0].usuarioResponsable.apellido}` : `${((_b = producto.productoSalas[0]) == null ? void 0 : _b.sala.nombreSala) || "No asignado"} N${((_c = producto.productoSalas[0]) == null ? void 0 : _c.sala.numeroSala) || "NoSala"}`;
      return {
        idProducto: producto.idProducto,
        // ID del producto
        individualizacionDelBien: producto.individualizacionDelBien,
        // Nombre o descripción del producto
        cantidad: 1,
        // Cada producto se cuenta por sí mismo
        Subcategoria: producto.subcategoria.nombreSubcategoria || "Sin subcategor\xEDa",
        // Nombre de la subcategoría o "Sin subcategoría" si no está disponible
        idSubcategoria: producto.subcategoria.idSubcategoria,
        // ID de la subcategoría
        fechaAdquisicion: producto.fechaAdquisicion,
        // Fecha de adquisición del producto
        Ubicacion: responsable || numeroSala,
        // Mostramos la ubicación del producto, ya sea el responsable o la sala
        Estado: producto.estado.estado || "Sin estado",
        // Estado del producto o "Sin estado" si no está disponible
        idEstado: producto.estado.idEstado,
        // ID del estado
        Procedencia: producto.procedencia.procedencia || "Sin procedencia",
        // Procedencia del producto o "Sin procedencia" si no está disponible
        idProcedencia: producto.procedencia.idProcedencia,
        // ID de la procedencia
        Niveleducativo: sala.nivelEducativo.nivelEducativo
        // Nivel educativo de la sala asociada
      };
    });
    return productosConDetalles;
  } catch (error) {
    console.error("Error al obtener productos no agrupados:", error);
    throw new Error("Error al obtener productos no agrupados.");
  }
};
async function obtenerProductosTotales() {
  const productosAgrupados = await prisma$2.producto.groupBy({
    by: ["individualizacionDelBien"],
    // Agrupamos por 'individualizacionDelBien'
    _count: {
      idProducto: true
      // Contamos la cantidad de productos en cada grupo
    }
  });
  return productosAgrupados.map((producto) => ({
    individualizacionDelBien: producto.individualizacionDelBien,
    // Código de individualización del bien
    cantidad: producto._count.idProducto
    // Cantidad de productos en este grupo
  }));
}
async function crearProducto(data) {
  try {
    const productosCreados = [];
    for (let i = 0; i < data.cantidad; i++) {
      const nuevoProducto = await prisma$2.producto.create({
        data: {
          individualizacionDelBien: data.individualizacionDelBien,
          // Asignamos el código de individualización
          fechaAdquisicion: data.fechaAdquisicion,
          // Asignamos la fecha de adquisición
          procedencia: {
            connect: { idProcedencia: data.idProcedencia }
            // Conectamos con la procedencia
          },
          estado: {
            connect: { idEstado: data.idEstado }
            // Conectamos con el estado del producto
          },
          subcategoria: {
            connect: { idSubcategoria: data.idSubcategoria }
            // Conectamos con la subcategoría
          },
          usuarioCreador: {
            connect: { idUsuario: data.idUsuarioCreador }
            // Conectamos con el usuario creador
          },
          productoSalas: {
            // Asignamos el producto a las salas especificadas
            create: data.idSalas.map((idSala) => ({
              idSala,
              // ID de la sala
              fechaAsignacion: /* @__PURE__ */ new Date()
              // Fecha de asignación actual
            }))
          }
        }
      });
      productosCreados.push(nuevoProducto);
    }
    return productosCreados;
  } catch (error) {
    console.error("Error al crear los productos:", error);
    throw error;
  }
}
async function actualizarProducto(id, datosProductoActualizados) {
  try {
    const producto = await prisma$2.producto.update({
      where: { idProducto: id },
      // Asegúrate de que id sea el campo correcto en tu base de datos
      data: {
        ...datosProductoActualizados
      }
    });
    return producto;
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    throw new Error("No se pudo actualizar el producto.");
  }
}
const asignarResponsableAProducto = async ({
  idProducto,
  fechaAsignacion,
  idUsuario
}) => {
  try {
    const fechaActual = /* @__PURE__ */ new Date();
    if (fechaAsignacion) {
      fechaAsignacion.setHours(
        fechaActual.getHours(),
        fechaActual.getMinutes(),
        fechaActual.getSeconds(),
        fechaActual.getMilliseconds()
      );
      console.log(fechaAsignacion);
    } else {
      fechaAsignacion = fechaActual;
    }
    const nuevoResponsable = await prisma$2.productoResponsable.create({
      data: {
        idProducto,
        idUsuario,
        fechaAsignacion
      }
    });
    return nuevoResponsable;
  } catch (error) {
    console.error("Error al asignar responsable al producto:", error);
    throw new Error("No se pudo asignar el responsable al producto.");
  }
};
const moverProductosASala = async (productos, idSala, fechaAsignacion) => {
  try {
    const fechaActual = /* @__PURE__ */ new Date();
    if (fechaAsignacion) {
      fechaAsignacion.setHours(
        fechaActual.getHours(),
        fechaActual.getMinutes(),
        fechaActual.getSeconds(),
        fechaActual.getMilliseconds()
      );
    } else {
      fechaAsignacion = fechaActual;
    }
    const movimientos = await prisma$2.productoSala.createMany({
      data: productos.map((idProducto) => ({
        idProducto,
        // El producto que se mueve
        idSala,
        // La nueva sala a la que se mueve
        fechaAsignacion
        // La fecha de asignación al mover el producto
      }))
    });
    return movimientos.count > 0;
  } catch (error) {
    console.error("Error al mover productos a la sala:", error);
    throw new Error("Hubo un problema al mover los productos.");
  }
};
async function obtenerAlertas() {
  try {
    const productosAgrupados = await prisma$2.producto.groupBy({
      by: ["individualizacionDelBien"],
      // Agrupamos solo por 'individualizacionDelBien'
      _count: {
        idProducto: true
        // Cantidad total de productos en el grupo
      }
    });
    const productosFiltrados = productosAgrupados.filter(
      (grupo) => grupo._count.idProducto <= 5
    );
    return productosFiltrados.map((grupo) => ({
      individualizacionDelBien: grupo.individualizacionDelBien,
      // Identificación del producto
      cantidad: grupo._count.idProducto
      // Cantidad de productos con la misma 'individualizacionDelBien'
    }));
  } catch (error) {
    console.error("Error al obtener productos agrupados:", error);
    throw new Error("Error al obtener productos agrupados.");
  }
}
async function asignarFechaDevolucion(fecha, idProducto, id) {
  const responsableExistente = await prisma$2.productoResponsable.findFirst({
    where: {
      idProducto,
      // Se busca el responsable del producto específico
      idUsuario: id
      // Se busca el responsable por ID de usuario
    }
  });
  if (!responsableExistente) {
    throw new Error(
      `No se encontr\xF3 el responsable con idProducto ${idProducto} e idResponsable ${id}`
    );
  }
  const nuevoResponsable = await prisma$2.productoResponsable.update({
    data: {
      fechaDevolucion: fecha
      // Actualiza la fecha de devolución
    },
    where: {
      idResponsable: responsableExistente.idResponsable
      // Se actualiza el responsable del producto
    }
  });
  return nuevoResponsable;
}
async function agregarStock(data) {
  try {
    const productoExistente = await prisma$2.producto.findFirst({
      where: { individualizacionDelBien: data.individualizacionDelBien },
      // Busca el producto por su identificación
      select: { subcategoria: { select: { idSubcategoria: true } } }
      // Obtiene el ID de la subcategoría del producto
    });
    if (!(productoExistente == null ? void 0 : productoExistente.subcategoria)) {
      throw new Error(
        "Subcategor\xEDa no encontrada para el producto especificado."
      );
    }
    const idSubcategoria = productoExistente.subcategoria.idSubcategoria;
    const productosCreados = [];
    for (let i = 0; i < data.cantidad; i++) {
      const nuevoProducto = await prisma$2.producto.create({
        data: {
          individualizacionDelBien: data.individualizacionDelBien,
          // Asigna el producto con la identificación especificada
          fechaAdquisicion: data.fechaAdquisicion,
          // Fecha de adquisición del producto
          procedencia: {
            connect: { idProcedencia: data.idProcedencia }
            // Conecta con la procedencia especificada
          },
          estado: {
            connect: { idEstado: data.idEstado }
            // Conecta con el estado del producto
          },
          subcategoria: {
            connect: { idSubcategoria }
            // Conecta con la subcategoría
          },
          usuarioCreador: {
            connect: { idUsuario: data.idUsuarioCreador }
            // Conecta con el usuario creador del producto
          },
          productoSalas: {
            create: data.idSalas.map((idSala) => ({
              idSala,
              // Asigna la sala al producto
              fechaAsignacion: /* @__PURE__ */ new Date()
              // Asigna la fecha de la creación
            }))
          }
        }
      });
      productosCreados.push(nuevoProducto);
    }
    return productosCreados;
  } catch (error) {
    console.error("Error al crear los productos:", error);
    throw error;
  }
}

const obtenerDatosReporteResponsables = async () => {
  try {
    const asignaciones = await prisma$2.productoResponsable.findMany({
      include: {
        producto: {
          select: {
            individualizacionDelBien: true,
            // Obtiene el nombre o descripción del producto
            idProducto: true
            // Obtiene el ID del producto
          }
        },
        usuarioResponsable: {
          select: {
            nombre: true,
            // Obtiene el nombre del usuario responsable
            apellido: true,
            // Obtiene el apellido del usuario responsable
            idUsuario: true
            // Obtiene el ID del usuario responsable
          }
        }
      }
    });
    const analisis = asignaciones.reduce(
      (acc, item) => {
        const responsable = `${item.usuarioResponsable.nombre} ${item.usuarioResponsable.apellido}`;
        const idUsuario = item.usuarioResponsable.idUsuario;
        const producto = item.producto.individualizacionDelBien;
        const fechaAsignacion = item.fechaAsignacion;
        const fechaDevolucion = item.fechaDevolucion;
        if (!acc.responsables[idUsuario]) {
          acc.responsables[idUsuario] = {
            nombre: responsable,
            productosAsignados: 0,
            // Contador de productos asignados al responsable
            tiempoPromedio: 0,
            // Tiempo promedio de asignación (en días)
            productosSinDevolver: 0
            // Contador de productos no devueltos
          };
        }
        acc.responsables[idUsuario].productosAsignados++;
        if (fechaDevolucion) {
          const tiempoAsignacion = (new Date(fechaDevolucion).getTime() - new Date(fechaAsignacion).getTime()) / (1e3 * 60 * 60 * 24);
          acc.responsables[idUsuario].tiempoPromedio += tiempoAsignacion;
        } else {
          acc.responsables[idUsuario].productosSinDevolver++;
        }
        return acc;
      },
      { responsables: {} }
      // Estructura inicial del acumulador (vacío)
    );
    Object.values(analisis.responsables).forEach((responsable) => {
      if (responsable.productosAsignados > 0) {
        responsable.tiempoPromedio /= responsable.productosAsignados;
      }
    });
    const resumenResponsables = Object.values(analisis.responsables);
    return {
      responsables: resumenResponsables,
      // Información detallada por cada responsable
      totalProductosAsignados: asignaciones.length,
      // Total de productos asignados en general
      productosSinDevolver: resumenResponsables.reduce(
        (acc, responsable) => acc + responsable.productosSinDevolver,
        // Total de productos no devueltos
        0
      )
    };
  } catch (error) {
    console.error("Error al obtener el historial de productos:", error);
    throw new Error("Error al obtener el historial de productos.");
  }
};
async function obtenerDatosReporteSala() {
  try {
    const datos = await prisma$2.productoSala.findMany({
      include: {
        producto: {
          select: {
            individualizacionDelBien: true,
            // Obtiene la descripción o nombre del producto
            idProducto: true
            // Obtiene el ID del producto
          }
        },
        sala: {
          select: {
            numeroSala: true,
            // Obtiene el número de la sala
            nombreSala: true
            // Obtiene el nombre de la sala
          }
        }
      }
    });
    const resumen = datos.reduce(
      (acc, item) => {
        const salaNombre = `${item.sala.nombreSala} (Sala ${item.sala.numeroSala})`;
        if (!acc.salas[salaNombre]) {
          acc.salas[salaNombre] = {
            nombre: salaNombre,
            // Nombre de la sala
            cantidad: 0
            // Contador de productos asignados a esta sala
          };
        }
        acc.salas[salaNombre].cantidad += 1;
        acc.totalProductosAsignados += 1;
        return acc;
      },
      { salas: {}, totalProductosAsignados: 0 }
      // Estructura inicial del acumulador
    );
    return {
      salas: Object.values(resumen.salas),
      // Convierte el objeto de salas a un arreglo
      totalProductosAsignadosSala: resumen.totalProductosAsignados
      // Total de productos asignados
    };
  } catch (error) {
    console.error("Error al obtener datos de productoSala:", error);
    throw new Error("Error al obtener datos de productoSala.");
  }
}
async function obtenerProductosMasAsignados() {
  try {
    const asignacionesResponsables = await prisma$2.productoResponsable.groupBy({
      by: ["idProducto"],
      // Agrupa los registros por el idProducto
      _count: {
        idProducto: true
        // Cuenta la cantidad de asignaciones por cada producto
      }
    });
    const asignacionesSalas = await prisma$2.productoSala.groupBy({
      by: ["idProducto"],
      // Agrupa los registros por el idProducto
      _count: {
        idProducto: true
        // Cuenta la cantidad de asignaciones por cada producto
      }
    });
    const conteoAsignaciones = {};
    asignacionesResponsables.forEach((item) => {
      const { idProducto, _count } = item;
      conteoAsignaciones[idProducto] = _count.idProducto || 0;
    });
    asignacionesSalas.forEach((item) => {
      const { idProducto, _count } = item;
      if (conteoAsignaciones[idProducto]) {
        conteoAsignaciones[idProducto] += _count.idProducto;
      } else {
        conteoAsignaciones[idProducto] = _count.idProducto;
      }
    });
    const productosOrdenados = Object.entries(conteoAsignaciones).map(([idProducto, totalAsignaciones]) => ({
      idProducto,
      // ID del producto
      totalAsignaciones
      // Total de asignaciones (sumadas de responsables y salas)
    })).sort((a, b) => b.totalAsignaciones - a.totalAsignaciones).slice(0, 10);
    const productosMasAsignados = await prisma$2.producto.findMany({
      where: {
        idProducto: {
          in: productosOrdenados.map((item) => Number(item.idProducto))
          // Filtra por los ID de productos más asignados
        }
      },
      select: {
        idProducto: true,
        // Selecciona el ID del producto
        individualizacionDelBien: true
        // Selecciona el nombre o descripción del producto
      }
    });
    const resultadoFinal = productosOrdenados.map((item) => ({
      ...productosMasAsignados.find(
        (prod) => prod.idProducto === Number(item.idProducto)
        // Encuentra el producto correspondiente
      ),
      totalAsignaciones: item.totalAsignaciones
      // Asocia el total de asignaciones con el producto
    }));
    return resultadoFinal;
  } catch (error) {
    console.error("Error al obtener los productos m\xE1s asignados:", error);
    throw new Error("Error al obtener los productos m\xE1s asignados.");
  }
}
async function obtenerTotalPorProducto() {
  try {
    const datos = await prisma$2.productoSala.findMany({
      include: {
        producto: {
          select: {
            individualizacionDelBien: true,
            // Nombre o descripción del producto
            idProducto: true
            // Identificador único del producto
          }
        }
      }
    });
    const resumen = datos.reduce(
      (acc, item) => {
        const productoNombre = item.producto.individualizacionDelBien;
        if (!acc.productos[productoNombre]) {
          acc.productos[productoNombre] = {
            nombre: productoNombre,
            cantidad: 0
            // Inicializa la cantidad en 0
          };
        }
        acc.productos[productoNombre].cantidad += 1;
        acc.totalProductosAsignados += 1;
        return acc;
      },
      { productos: {}, totalProductosAsignados: 0 }
      // Inicializa el acumulador
    );
    return {
      productos: Object.values(resumen.productos),
      // Convierte el objeto de productos a un array
      totalProductosAsignados: resumen.totalProductosAsignados
      // Total de asignaciones
    };
  } catch (error) {
    console.error("Error al obtener datos de producto:", error);
    throw new Error("Error al obtener datos de producto.");
  }
}

async function crearUsuario(usuario) {
  const contrasenaHasheada = await hashPassword(usuario.contrasena);
  return prisma$2.$transaction(async (prisma2) => {
    const nuevoUsuario = await prisma2.usuario.create({
      omit: {
        contrasena: true
        // Omite la contraseña en la respuesta de la creación
      },
      data: {
        nombre: usuario.nombre,
        // Asigna el nombre del usuario
        apellido: usuario.apellido,
        // Asigna el apellido del usuario
        contrasena: contrasenaHasheada,
        // Guarda la contraseña hasheada
        email: usuario.email,
        // Asigna el email del usuario
        idEstadoUsuario: usuario.idEstadoUsuario
        // Asigna el estado del usuario (activo, inactivo, etc.)
      }
    });
    await prisma2.usuarioRol.create({
      data: {
        idUsuario: nuevoUsuario.idUsuario,
        // Asocia el rol con el ID del usuario creado
        idRol: usuario.idRol
        // Asigna el rol al usuario
      }
    });
    return nuevoUsuario;
  });
}
async function obtenerUsuarioPorEmail(email, contrasena = false) {
  try {
    const usuario = await prisma$2.usuario.findFirst({
      where: {
        email
        // Buscar por el email del usuario
      },
      include: {
        usuarioRoles: {
          // Incluir los roles asociados al usuario
          include: {
            rol: true
            // Incluir la información del rol (nombre, permisos, etc.)
          }
        }
      }
    });
    if (usuario) {
      if (usuario.idEstadoUsuario === 2) {
        throw createError({
          status: 403,
          // Código de estado HTTP 403 (Prohibido)
          message: "Usuario inactivo"
          // Mensaje de error si el usuario está inactivo
        });
      }
      const rolNombre = usuario.usuarioRoles.length > 0 ? usuario.usuarioRoles[0].rol.nombreRol : null;
      return {
        ...usuario,
        // Devuelve todas las propiedades del usuario
        rol: rolNombre
        // Añade el nombre del rol al objeto del usuario
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
}
async function actualizarUsuario(id, usuarioActualizado) {
  try {
    console.log("ID del usuario a actualizar:", id);
    console.log("Datos a actualizar:", usuarioActualizado);
    const { idRol, ...datosUsuario } = usuarioActualizado;
    const usuario = await prisma$2.usuario.update({
      where: { idUsuario: id },
      // Identifica el usuario por su ID
      data: {
        ...datosUsuario,
        // Actualiza los datos del usuario (nombre, email, etc.)
        usuarioRoles: {
          // Primero elimina todos los roles existentes del usuario
          deleteMany: { idUsuario: id },
          // Luego crea el nuevo rol para el usuario
          create: {
            idRol
            // Asocia el nuevo rol al usuario (asegurarse de que `idRol` es el ID correcto)
          }
        }
      }
    });
    console.log("Usuario actualizado:", usuario);
    return usuario;
  } catch (error) {
    console.error("Error en actualizarUsuario:", error);
    throw new Error("No se pudo actualizar el usuario.");
  }
}
async function cambiarPass(userId, password) {
  try {
    const hashedPassword = await hashPassword(password);
    await prisma$2.usuario.update({
      where: { idUsuario: userId },
      // Busca al usuario por su ID
      data: { contrasena: hashedPassword }
      // Actualiza la contraseña con el hash generado
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar la contrase\xF1a:", error);
    return false;
  }
}

const EsquemaAsignarResponsable = v.object({
  idProducto: v.pipe(v.number(), v.integer(), v.minValue(1)),
  // `idProducto` debe ser un número entero mayor o igual a 1.
  idUsuario: v.pipe(v.number(), v.integer(), v.minValue(1)),
  // `idUsuario` debe ser un número entero mayor o igual a 1.
  fechaAsignacion: v.pipe(
    v.string(),
    // Se espera que `fechaAsignacion` sea una cadena de texto.
    v.transform((input) => new Date(input)),
    // Transformamos la cadena a un objeto Date.
    v.date()
    // Validamos que el objeto resultante sea una fecha válida.
  )
});
const validarEsquemaAsignarResponsable = v.parser(
  EsquemaAsignarResponsable
);
const EsquemaAsignarSala = v.object({
  idProducto: v.array(v.pipe(v.number(), v.minValue(1))),
  // `idProducto` debe ser un arreglo de números, cada uno mayor o igual a 1.
  idSala: v.pipe(v.number(), v.minValue(1)),
  // `idSala` debe ser un número mayor o igual a 1.
  fechaAsignacion: v.optional(
    // `fechaAsignacion` es un campo opcional.
    v.pipe(
      v.string(),
      // Se espera que `fechaAsignacion` sea una cadena de texto.
      v.transform((input) => new Date(input)),
      // Transformamos la cadena a un objeto Date.
      v.date()
      // Validamos que el objeto resultante sea una fecha válida.
    )
  )
});
const validarEsquemaAsignarSala = v.parser(EsquemaAsignarSala);

const esquemaIdNumericoRuta = v.object({
  id: v.pipe(
    v.string(),
    // Se espera que `id` sea una cadena de texto.
    v.transform((input) => Number(input)),
    // Convertimos la cadena de texto a número.
    v.number(),
    // Validamos que sea un número.
    v.integer(),
    // Validamos que sea un número entero.
    v.minValue(1)
    // Validamos que el número sea mayor o igual a 1.
  )
});
const esquemaActualizacionUsuario = v.object({
  nombre: v.optional(v.string()),
  // `nombre` es un campo opcional, si está presente debe ser una cadena de texto.
  apellido: v.optional(v.string()),
  // `apellido` es un campo opcional, si está presente debe ser una cadena de texto.
  email: v.optional(
    v.pipe(
      v.string(),
      // Se espera que `email` sea una cadena de texto.
      v.email()
      // Validamos que el `email` tenga el formato adecuado.
    )
  ),
  idEstadoUsuario: v.pipe(v.number(), v.integer(), v.minValue(1)),
  // `idEstadoUsuario` debe ser un número entero mayor o igual a 1.
  idRol: v.pipe(v.number(), v.integer(), v.minValue(1))
  // `idRol` debe ser un número entero mayor o igual a 1.
});
const validarEsquemaIdNumericoRuta = v.parser(esquemaIdNumericoRuta);
const validarActualizacionUsuario = v.parser(
  esquemaActualizacionUsuario
);
const passSchema = v.object({
  // `idUsuario` debe ser un número entero mayor o igual a 1, representando el ID del usuario.
  idUsuario: v.pipe(
    v.string(),
    // El valor inicial es un string.
    v.transform((input) => Number(input)),
    // Convertimos la cadena a número.
    v.number(),
    // Validamos que el valor sea un número.
    v.integer(),
    // Aseguramos que el número sea entero.
    v.minValue(1, "El ID del usuario es requerido")
    // Validamos que el ID sea al menos 1.
  ),
  // `contrasena` debe ser una cadena de texto con al menos 8 caracteres.
  contrasena: v.pipe(
    v.string(),
    // El valor debe ser una cadena de texto.
    v.minLength(8, "La contrase\xF1a debe tener al menos 8 caracteres")
    // Validación de longitud mínima.
  )
});
const validarPassSchema = v.parser(passSchema);
const esquemaActualizacionProveedor = v.object({
  // `proveedor` es un campo opcional para el nombre del proveedor.
  proveedor: v.optional(v.string()),
  // `email` es un campo opcional, si se proporciona debe tener un formato válido de correo electrónico.
  email: v.optional(
    v.pipe(
      v.string(),
      // El valor debe ser una cadena de texto.
      v.email()
      // Validamos que el valor tenga formato de email.
    )
  ),
  // `telefono` es un campo opcional, si se proporciona debe ser un número con entre 9 y 12 dígitos.
  telefono: v.optional(
    v.pipe(
      v.string(),
      // El valor debe ser una cadena de texto.
      v.regex(/^\d{9,12}$/)
      // Validación para un número con entre 9 y 12 dígitos.
    )
  )
});
const validarEsquemaActualizacionProveedor = v.parser(
  esquemaActualizacionProveedor
);
const esquemaActualizacionProcedencia = v.object({
  // `procedencia` es un campo opcional, si se proporciona debe ser una cadena de texto.
  procedencia: v.optional(v.string())
});
const validarEsquemaActualizacionProcedencia = v.parser(
  esquemaActualizacionProcedencia
);
const esquemaActualizacionNivelEducativo = v.object({
  // `nivelEducativo` es un campo obligatorio, debe ser una cadena de texto.
  nivelEducativo: v.string()
});
const validarEsquemaActualizacionNivelEducativo = v.parser(
  esquemaActualizacionNivelEducativo
);
const esquemaActualizacionSala = v.object({
  // `numeroSala` es opcional, debe ser un número entero mayor o igual a 1.
  numeroSala: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
  // `nombreSala` es un campo opcional de tipo string para almacenar el nombre de la sala.
  nombreSala: v.optional(v.string()),
  // `capacidad` es opcional, debe ser un número entero mayor o igual a 1, representando la capacidad de la sala.
  capacidad: v.optional(
    v.pipe(
      v.number(),
      // Acepta un valor numérico.
      v.integer(),
      // Verifica que sea un número entero.
      v.minValue(1)
      // Verifica que la capacidad sea al menos 1.
    )
  ),
  // `idNivel` es opcional, debe ser un número entero mayor o igual a 1, representando el ID del nivel educativo.
  idNivel: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)))
});
const validarEsquemaActualizacionSala = v.parser(
  esquemaActualizacionSala
);
const esquemaActualizacionEstadoConservacion = v.object({
  // `estado` es un campo opcional de tipo string que representa el estado de conservación.
  estado: v.optional(v.string())
});
const validarEsquemaActualizacionEstadoConservacion = v.parser(
  esquemaActualizacionEstadoConservacion
);
const esquemaActualizacionSubcategoria = v.object({
  // `nombreSubcategoria` es un campo opcional de tipo string para almacenar el nombre de la subcategoría.
  nombreSubcategoria: v.optional(v.string()),
  // `idCategoria` es un campo opcional que debe ser un número entero mayor o igual a 1, representando el ID de la categoría a la que pertenece la subcategoría.
  idCategoria: v.optional(
    v.pipe(
      v.number(),
      // Acepta un valor numérico.
      v.integer(),
      // Verifica que sea un número entero.
      v.minValue(1)
      // Verifica que el ID de la categoría sea al menos 1.
    )
  )
});
const validarEsquemaActualizacionSubcategoria = v.parser(
  esquemaActualizacionSubcategoria
);
const esquemaActualizacionCategoria = v.object({
  // `nombreCategoria` es un campo opcional de tipo string para almacenar el nombre de la categoría.
  nombreCategoria: v.optional(v.string())
  // Nombre de la categoría es opcional
});
const validarEsquemaActualizacionCategoria = v.parser(
  esquemaActualizacionCategoria
);
const esquemaCreacionSala = v.object({
  // `numeroSala` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  numeroSala: v.pipe(
    v.string(),
    // Primero convierte el valor a string.
    v.transform((input) => Number(input)),
    // Luego convierte el string a número.
    v.number(),
    // Verifica que sea un número.
    v.integer(),
    // Verifica que sea un número entero.
    v.minValue(1)
    // Asegura que el número sea mayor o igual a 1.
  ),
  // `nombreSala` es un campo obligatorio que debe ser una cadena no vacía.
  nombreSala: v.pipe(
    v.string(),
    // Asegura que sea una cadena de texto.
    v.minLength(1)
    // Verifica que la cadena no esté vacía.
  ),
  // `capacidad` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  capacidad: v.pipe(
    v.number(),
    // Acepta un número.
    v.integer(),
    // Verifica que sea un número entero.
    v.minValue(1)
    // Asegura que la capacidad sea al menos 1.
  ),
  // `idNivel` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  idNivel: v.pipe(
    v.number(),
    // Acepta un número.
    v.integer(),
    // Verifica que sea un número entero.
    v.minValue(1)
    // Asegura que el ID sea mayor o igual a 1.
  )
});
const validarEsquemaCreacionSala = v.parser(esquemaCreacionSala);
const esquemaFechaDevolucion = v.object({
  // `fecha` es un campo obligatorio que debe ser una fecha válida.
  fecha: v.pipe(
    v.string(),
    // Convierte el valor a string.
    v.transform((input) => new Date(input)),
    // Transforma la cadena a un objeto Date.
    v.date()
    // Verifica que sea una fecha válida.
  ),
  // `idProducto` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  idProducto: v.pipe(
    v.number(),
    // Acepta un número.
    v.integer(),
    // Verifica que sea un número entero.
    v.minValue(1)
    // Asegura que el ID del producto sea mayor o igual a 1.
  )
});
const validarEsquemaFechaDevolucion = v.parser(esquemaFechaDevolucion);

const esquemaCreacionProducto = v.object({
  individualizacionDelBien: v.pipe(
    v.string(),
    v.minLength(1),
    // Asegurar que no esté vacío
    v.maxLength(255)
    // Longitud máxima según tu requerimiento
  ),
  cantidad: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // Asegurar que sea un número entero positivo
  ),
  fechaAdquisicion: v.pipe(
    v.string(),
    v.transform((input) => new Date(input)),
    // Convertir a objeto Date
    v.date()
    // Validar que sea una fecha válida
  ),
  idProcedencia: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idEstado: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de estado, debe ser un número entero mayor o igual a 1
  ),
  idSubcategoria: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de subcategoría, debe ser un número entero mayor o igual a 1
  ),
  idUsuarioCreador: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID del usuario creador, debe ser un número entero mayor o igual a 1
  ),
  idSalas: v.pipe(
    v.array(v.number()),
    v.minLength(1),
    // Al menos un ID de sala debe ser proporcionado
    v.array(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1)
        // Asegurar que cada ID de sala sea un entero positivo
      )
    )
  )
});
const validarEsquemaCreacionProducto = v.parser(esquemaCreacionProducto);
const esquemaActualizacionProducto = v.object({
  individualizacionDelBien: v.optional(
    v.pipe(v.string(), v.minLength(1), v.maxLength(255))
  ),
  cantidad: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1))
    // Hacer este campo opcional
  ),
  fechaAdquisicion: v.optional(
    v.pipe(
      v.string(),
      v.transform((input) => new Date(input)),
      v.date()
    )
  ),
  idProcedencia: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1))
    // Hacer este campo opcional
  ),
  idEstado: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1))
    // Hacer este campo opcional
  ),
  idSubcategoria: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1))
    // Hacer este campo opcional
  ),
  idSalas: v.optional(
    v.pipe(
      v.array(v.number()),
      v.minLength(1),
      v.array(v.pipe(v.number(), v.integer(), v.minValue(1)))
    )
  )
});
const validarEsquemaActualizacionProducto = v.parser(
  esquemaActualizacionProducto
);
const esquemaAgregarStock = v.object({
  individualizacionDelBien: v.pipe(
    v.string(),
    v.minLength(1),
    // Asegurar que no esté vacío
    v.maxLength(255)
    // Longitud máxima según tu requerimiento
  ),
  cantidad: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // Asegurar que sea un número entero positivo
  ),
  fechaAdquisicion: v.optional(
    v.pipe(
      v.string(),
      v.transform((input) => new Date(input)),
      // Convertir a objeto Date
      v.date()
      // Validar que sea una fecha válida
    )
  ),
  idProcedencia: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idEstado: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de estado, debe ser un número entero mayor o igual a 1
  ),
  idUsuarioCreador: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID del usuario creador, debe ser un número entero mayor o igual a 1
  ),
  idSalas: v.pipe(
    v.array(v.number()),
    v.minLength(1),
    // Al menos un ID de sala debe ser proporcionado
    v.array(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1)
        // Asegurar que cada ID de sala sea un entero positivo
      )
    )
  )
});
const validaresquemaAgregarStock = v.parser(esquemaAgregarStock);
const esquemaAgregarProducto = v.object({
  individualizacionDelBien: v.pipe(
    v.string(),
    v.minLength(1),
    // Asegurar que no esté vacío
    v.maxLength(255)
    // Longitud máxima según tu requerimiento
  ),
  cantidad: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // Asegurar que sea un número entero positivo
  ),
  fechaAdquisicion: v.optional(
    v.pipe(
      v.string(),
      v.transform((input) => new Date(input)),
      // Convertir a objeto Date
      v.date()
      // Validar que sea una fecha válida
    )
  ),
  idProcedencia: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idSubcategoria: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idEstado: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID de estado, debe ser un número entero mayor o igual a 1
  ),
  idUsuarioCreador: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1)
    // ID del usuario creador, debe ser un número entero mayor o igual a 1
  ),
  idSalas: v.pipe(
    v.array(v.number()),
    v.minLength(1),
    // Al menos un ID de sala debe ser proporcionado
    v.array(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1)
        // Asegurar que cada ID de sala sea un entero positivo
      )
    )
  )
});
const validaresquemaAgregarProducto = v.parser(esquemaAgregarProducto);

const loginSchema = v.object({
  email: v.pipe(
    // Validación para el campo "email"
    v.string(),
    // El valor debe ser una cadena de texto
    v.minLength(1, "El email no puede estar vac\xEDo"),
    // El email no puede estar vacío
    v.email()
    // El valor debe ser un email válido
  ),
  contrasena: v.string()
  // El campo "contrasena" debe ser una cadena de texto
});
const validarFormularioLogin = v.parser(loginSchema);

const registroSchema = v.object({
  nombre: v.pipe(
    // Validación para el campo "nombre"
    v.string(),
    // El valor debe ser una cadena de texto
    v.minLength(1, "El nombre no puede estar vac\xEDo"),
    // El nombre no puede estar vacío
    v.trim()
    // Elimina espacios al principio y al final del nombre
  ),
  apellido: v.pipe(
    // Validación para el campo "apellido"
    v.string(),
    // El valor debe ser una cadena de texto
    v.minLength(1, "El apellido no puede estar vac\xEDo"),
    // El apellido no puede estar vacío
    v.trim()
    // Elimina espacios al principio y al final del apellido
  ),
  email: v.pipe(
    // Validación para el campo "email"
    v.string(),
    // El valor debe ser una cadena de texto
    v.minLength(1, "El email no puede estar vac\xEDo"),
    // El email no puede estar vacío
    v.email("El formato del email no es v\xE1lido"),
    // El email debe ser válido
    v.trim()
    // Elimina espacios al principio y al final del email
  ),
  contrasena: v.pipe(
    // Validación para el campo "contrasena"
    v.string(),
    // El valor debe ser una cadena de texto
    v.minLength(6, "La contrase\xF1a debe tener al menos 6 caracteres")
    // La contraseña debe tener al menos 6 caracteres
  ),
  idEstadoUsuario: v.pipe(
    // Validación para el campo "idEstadoUsuario"
    v.number("El ID del estado debe ser num\xE9rico"),
    // El valor debe ser un número
    v.integer(),
    // El valor debe ser un número entero
    v.minValue(1)
    // El valor debe ser mayor o igual a 1
  ),
  idRol: v.pipe(
    // Validación para el campo "idRol"
    v.number("El ID del rol debe ser num\xE9rico"),
    // El valor debe ser un número
    v.integer(),
    // El valor debe ser un número entero
    v.minValue(1)
    // El valor debe ser mayor o igual a 1
  )
});
const validarFormularioCreacionUsuario = v.parser(registroSchema);

const sessionHooks = createHooks();
async function getUserSession(event) {
  return (await _useSession(event)).data;
}
async function setUserSession(event, data, config) {
  const session = await _useSession(event, config);
  await session.update(defu$1(data, session.data));
  return session.data;
}
async function clearUserSession(event, config) {
  const session = await _useSession(event, config);
  await sessionHooks.callHookParallel("clear", session.data, event);
  await session.clear();
  return true;
}
async function requireUserSession(event, opts = {}) {
  const userSession = await getUserSession(event);
  if (!userSession.user) {
    throw createError({
      statusCode: opts.statusCode || 401,
      message: opts.message || "Unauthorized"
    });
  }
  return userSession;
}
let sessionConfig;
function _useSession(event, config = {}) {
  if (!sessionConfig) {
    const runtimeConfig = useRuntimeConfig(event);
    const envSessionPassword = `${runtimeConfig.nitro?.envPrefix || "NUXT_"}SESSION_PASSWORD`;
    sessionConfig = defu$1({ password: process.env[envSessionPassword] }, runtimeConfig.session);
  }
  const finalConfig = defu$1(config, sessionConfig);
  return useSession(event, finalConfig);
}

const _KPx4Io = eventHandler(async (event) => {
  await clearUserSession(event);
  return { loggedOut: true };
});

const _JmLQtM = eventHandler(async (event) => {
  const session = await getUserSession(event);
  if (Object.keys(session).length > 0) {
    await sessionHooks.callHookParallel("fetch", session, event);
  }
  const { secure, ...data } = session;
  return data;
});

const _lazy_Irph24 = () => Promise.resolve().then(function () { return index_get$B; });
const _lazy_vXHFUu = () => Promise.resolve().then(function () { return index$d; });
const _lazy_gdt0Vf = () => Promise.resolve().then(function () { return index$b; });
const _lazy_9Ir05Z = () => Promise.resolve().then(function () { return index$9; });
const _lazy_W9730v = () => Promise.resolve().then(function () { return _id__delete$f; });
const _lazy_DvUHv9 = () => Promise.resolve().then(function () { return _id__patch$j; });
const _lazy_Vwkxnc = () => Promise.resolve().then(function () { return index_get$z; });
const _lazy_Fk5zDG = () => Promise.resolve().then(function () { return index_post$p; });
const _lazy_xXGWPa = () => Promise.resolve().then(function () { return _id__delete$d; });
const _lazy_CDCW5Z = () => Promise.resolve().then(function () { return _id__patch$h; });
const _lazy_knDnMX = () => Promise.resolve().then(function () { return index_get$x; });
const _lazy_uKNbzk = () => Promise.resolve().then(function () { return index_post$n; });
const _lazy_eu0CyY = () => Promise.resolve().then(function () { return index$7; });
const _lazy_Ckz5XS = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_4crMYl = () => Promise.resolve().then(function () { return index$5; });
const _lazy_yClJUP = () => Promise.resolve().then(function () { return index_get$v; });
const _lazy_2njpjV = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_cImE94 = () => Promise.resolve().then(function () { return _id__patch$f; });
const _lazy_tXBpxT = () => Promise.resolve().then(function () { return index_get$t; });
const _lazy_dAUOqF = () => Promise.resolve().then(function () { return index_post$l; });
const _lazy_f5dSr0 = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_q4QUYb = () => Promise.resolve().then(function () { return _id__patch$d; });
const _lazy_L0zpyE = () => Promise.resolve().then(function () { return index_get$r; });
const _lazy_1OFEGX = () => Promise.resolve().then(function () { return index_post$j; });
const _lazy_ecHEMF = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_oz4htm = () => Promise.resolve().then(function () { return _id__patch$b; });
const _lazy_fA17FC = () => Promise.resolve().then(function () { return index_post$h; });
const _lazy_TzzfBF = () => Promise.resolve().then(function () { return _id__patch$9; });
const _lazy_lNNVnt = () => Promise.resolve().then(function () { return index_get$p; });
const _lazy_FaWihv = () => Promise.resolve().then(function () { return index_post$f; });
const _lazy_PEubJv = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_JEqGrt = () => Promise.resolve().then(function () { return index_get$n; });
const _lazy_JodVNe = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_q1t37x = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_N5yFjW = () => Promise.resolve().then(function () { return index_get$l; });
const _lazy_fS75f4 = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_MPtZqN = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_URC6Ln = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_yJ9sfK = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_UstDGm = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_aWip3d = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_rzNJGd = () => Promise.resolve().then(function () { return _id__patch$7; });
const _lazy_AECvVp = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_qNffzh = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_DYtCbi = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_xDkwd0 = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_8HzzBo = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_ddj6QK = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_NCyhyl = () => Promise.resolve().then(function () { return index$3; });
const _lazy_LHm7LR = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_VP0LAr = () => Promise.resolve().then(function () { return _id__patch$5; });
const _lazy_iFQqFo = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_CWEdcA = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_tH5Idz = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_i3g7fE = () => Promise.resolve().then(function () { return _id__patch$3; });
const _lazy_xbztDl = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_C3WUBx = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_hlf23o = () => Promise.resolve().then(function () { return _id__patch$1; });
const _lazy_dPMLhN = () => Promise.resolve().then(function () { return index$1; });
const _lazy_BoEiSj = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_hYKLA4 = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_1RlprV = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _xw6Oza, lazy: false, middleware: true, method: undefined },
  { route: '/api/alertas', handler: _lazy_Irph24, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/cambiarPass', handler: _lazy_vXHFUu, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/crear-cuenta', handler: _lazy_gdt0Vf, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth/login', handler: _lazy_9Ir05Z, lazy: true, middleware: false, method: undefined },
  { route: '/api/categoria/:id', handler: _lazy_W9730v, lazy: true, middleware: false, method: "delete" },
  { route: '/api/categoria/:id', handler: _lazy_DvUHv9, lazy: true, middleware: false, method: "patch" },
  { route: '/api/categoria', handler: _lazy_Vwkxnc, lazy: true, middleware: false, method: "get" },
  { route: '/api/categoria', handler: _lazy_Fk5zDG, lazy: true, middleware: false, method: "post" },
  { route: '/api/estadoConservacion/:id', handler: _lazy_xXGWPa, lazy: true, middleware: false, method: "delete" },
  { route: '/api/estadoConservacion/:id', handler: _lazy_CDCW5Z, lazy: true, middleware: false, method: "patch" },
  { route: '/api/estadoConservacion', handler: _lazy_knDnMX, lazy: true, middleware: false, method: "get" },
  { route: '/api/estadoConservacion', handler: _lazy_uKNbzk, lazy: true, middleware: false, method: "post" },
  { route: '/api/estados', handler: _lazy_eu0CyY, lazy: true, middleware: false, method: undefined },
  { route: '/api/exportarPdf/:id', handler: _lazy_Ckz5XS, lazy: true, middleware: false, method: "get" },
  { route: '/api/fecha', handler: _lazy_4crMYl, lazy: true, middleware: false, method: undefined },
  { route: '/api/idProducto', handler: _lazy_yClJUP, lazy: true, middleware: false, method: "get" },
  { route: '/api/nivelEducativo/:id', handler: _lazy_2njpjV, lazy: true, middleware: false, method: "delete" },
  { route: '/api/nivelEducativo/:id', handler: _lazy_cImE94, lazy: true, middleware: false, method: "patch" },
  { route: '/api/nivelEducativo', handler: _lazy_tXBpxT, lazy: true, middleware: false, method: "get" },
  { route: '/api/nivelEducativo', handler: _lazy_dAUOqF, lazy: true, middleware: false, method: "post" },
  { route: '/api/procedencia/:id', handler: _lazy_f5dSr0, lazy: true, middleware: false, method: "delete" },
  { route: '/api/procedencia/:id', handler: _lazy_q4QUYb, lazy: true, middleware: false, method: "patch" },
  { route: '/api/procedencia', handler: _lazy_L0zpyE, lazy: true, middleware: false, method: "get" },
  { route: '/api/procedencia', handler: _lazy_1OFEGX, lazy: true, middleware: false, method: "post" },
  { route: '/api/productos/:id', handler: _lazy_ecHEMF, lazy: true, middleware: false, method: "delete" },
  { route: '/api/productos/:id', handler: _lazy_oz4htm, lazy: true, middleware: false, method: "patch" },
  { route: '/api/productos/agregarStock', handler: _lazy_fA17FC, lazy: true, middleware: false, method: "post" },
  { route: '/api/productos/asignarResponsable/:id', handler: _lazy_TzzfBF, lazy: true, middleware: false, method: "patch" },
  { route: '/api/productos/asignarResponsable', handler: _lazy_lNNVnt, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos/asignarResponsable', handler: _lazy_FaWihv, lazy: true, middleware: false, method: "post" },
  { route: '/api/productos/asignarSala', handler: _lazy_PEubJv, lazy: true, middleware: false, method: "post" },
  { route: '/api/productos/editar', handler: _lazy_JEqGrt, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos/filtrarSala/:id', handler: _lazy_JodVNe, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos/filtrarSala/filtrarSalaEditar/:id', handler: _lazy_q1t37x, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos', handler: _lazy_N5yFjW, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos', handler: _lazy_fS75f4, lazy: true, middleware: false, method: "post" },
  { route: '/api/productos/nuevoProducto', handler: _lazy_MPtZqN, lazy: true, middleware: false, method: "post" },
  { route: '/api/productos/obtenerProductosDevolucion/:id', handler: _lazy_URC6Ln, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos/obtenerProductosSelect', handler: _lazy_yJ9sfK, lazy: true, middleware: false, method: "get" },
  { route: '/api/productos/obtenerProductosTotales', handler: _lazy_UstDGm, lazy: true, middleware: false, method: "get" },
  { route: '/api/proveedores/:id', handler: _lazy_aWip3d, lazy: true, middleware: false, method: "delete" },
  { route: '/api/proveedores/:id', handler: _lazy_rzNJGd, lazy: true, middleware: false, method: "patch" },
  { route: '/api/proveedores', handler: _lazy_AECvVp, lazy: true, middleware: false, method: "get" },
  { route: '/api/proveedores', handler: _lazy_qNffzh, lazy: true, middleware: false, method: "post" },
  { route: '/api/reportes/obtenerTotales', handler: _lazy_DYtCbi, lazy: true, middleware: false, method: "get" },
  { route: '/api/reportes/productoMasUtilizado', handler: _lazy_xDkwd0, lazy: true, middleware: false, method: "get" },
  { route: '/api/reportes/productoResponsable', handler: _lazy_8HzzBo, lazy: true, middleware: false, method: "get" },
  { route: '/api/reportes/productoSala', handler: _lazy_ddj6QK, lazy: true, middleware: false, method: "get" },
  { route: '/api/roles', handler: _lazy_NCyhyl, lazy: true, middleware: false, method: undefined },
  { route: '/api/salas/:id', handler: _lazy_LHm7LR, lazy: true, middleware: false, method: "delete" },
  { route: '/api/salas/:id', handler: _lazy_VP0LAr, lazy: true, middleware: false, method: "patch" },
  { route: '/api/salas', handler: _lazy_iFQqFo, lazy: true, middleware: false, method: "get" },
  { route: '/api/salas', handler: _lazy_CWEdcA, lazy: true, middleware: false, method: "post" },
  { route: '/api/subCategoria/:id', handler: _lazy_tH5Idz, lazy: true, middleware: false, method: "delete" },
  { route: '/api/subCategoria/:id', handler: _lazy_i3g7fE, lazy: true, middleware: false, method: "patch" },
  { route: '/api/subCategoria', handler: _lazy_xbztDl, lazy: true, middleware: false, method: "get" },
  { route: '/api/subCategoria', handler: _lazy_C3WUBx, lazy: true, middleware: false, method: "post" },
  { route: '/api/usuarios/:id', handler: _lazy_hlf23o, lazy: true, middleware: false, method: "patch" },
  { route: '/api/usuarios/cambiarPassUsuario', handler: _lazy_dPMLhN, lazy: true, middleware: false, method: undefined },
  { route: '/api/usuarios', handler: _lazy_BoEiSj, lazy: true, middleware: false, method: "get" },
  { route: '/api/usuarios', handler: _lazy_hYKLA4, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_1RlprV, lazy: true, middleware: false, method: undefined },
  { route: '/api/_auth/session', handler: _KPx4Io, lazy: false, middleware: false, method: "delete" },
  { route: '/api/_auth/session', handler: _JmLQtM, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_1RlprV, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (a) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const index_get$A = defineEventHandler(async (event) => {
  try {
    const usuarioLog = await requireUserSession(event);
    if (!usuarioLog) {
      throw createError({
        status: 401,
        message: "Requiere inicio de sesi\xF3n"
        // Mensaje de error si el usuario no está autenticado
      });
    }
    const alertas = await obtenerAlertas();
    return alertas;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw createError({
      status: 500,
      message: "Error al obtener productos"
      // Mensaje genérico para cuando hay un problema al obtener los productos
    });
  }
});

const index_get$B = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$A
});

const index$c = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene los permisos necesarios
    });
  }
  const body = await readBody(event);
  console.log(body);
  try {
    const bodyValido = validarPassSchema(body);
    const password = bodyValido.contrasena;
    const idUsuario = bodyValido.idUsuario;
    const passCambiada = await cambiarPass(idUsuario, password);
    if (!passCambiada) {
      throw createError({
        status: 500,
        message: "Error al cambiar la contrase\xF1a"
        // Mensaje de error si no se pudo realizar el cambio
      });
    }
    return { message: "Contrase\xF1a cambiada correctamente" };
  } catch (error) {
    console.error("Error en el formato o en la validaci\xF3n:", error);
    let errorMessage = "Error en el formato o en la validaci\xF3n";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw createError({
      status: 400,
      message: errorMessage
      // El mensaje de error que se lanza al cliente
    });
  }
});

const index$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$c
});

const index$a = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos de administrador
    });
  }
  const body = await readValidatedBody(event, validarFormularioCreacionUsuario);
  const usuario = await obtenerUsuarioPorEmail(body.email);
  if (usuario) {
    throw createError({
      status: 409,
      message: "Ya existe un usuario vinculado al email proporcionado."
      // Mensaje de error si ya existe un usuario con el mismo email
    });
  }
  return {
    status: 201,
    // Código de estado HTTP para creación exitosa
    message: "Usuario creado exitosamente",
    // Mensaje de éxito
    data: await crearUsuario(body)
    // Llama a la función para crear el nuevo usuario y devuelve los datos creados
  };
});

const index$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$a
});

const index$8 = defineEventHandler(async (event) => {
  const { email, contrasena } = await readValidatedBody(
    event,
    validarFormularioLogin
  );
  const usuario = await obtenerUsuarioPorEmail(email, true);
  if (!usuario) {
    return createError({
      status: 401,
      message: "Usuario y/o contrase\xF1a incorrecto(s)"
      // Mensaje de error si el usuario no existe
    });
  }
  if (!await verifyPassword(usuario.contrasena, contrasena)) {
    throw createError({
      status: 401,
      message: "Usuario y/o contrase\xF1a incorrecto(s)"
      // Mensaje de error si la contraseña no coincide
    });
  }
  const usuarioSeguro = {
    id: usuario.idUsuario,
    nombre: usuario.nombre,
    rol: usuario.rol,
    estado: usuario.idEstadoUsuario
    // ID del estado del usuario (activo, inactivo, etc.)
  };
  await setUserSession(event, {
    user: usuarioSeguro
    // Guarda los datos del usuario en la sesión
  });
  return usuarioSeguro;
});

const index$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$8
});

const _id__delete$e = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene los permisos necesarios
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta
    // Este esquema valida que el ID sea un número
  );
  try {
    const categoria = await prisma$2.categoria.delete({
      where: { idCategoria: id }
      // Elimina la categoría según el 'idCategoria'
    });
    return { message: "Categor\xEDa eliminada con \xE9xito", categoria };
  } catch (error) {
    console.error("Error al eliminar categor\xEDa:", error);
    throw createError({
      status: 500,
      message: "Error al eliminar categor\xEDa"
      // Mensaje genérico para un error en el servidor
    });
  }
});

const _id__delete$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$e
});

const _id__patch$i = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" || "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos suficientes
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Validación del ID numérico
    );
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionCategoria
      // Validación del cuerpo de la solicitud
    );
    const categoriaActualizada = await actualizarCategoria(id, body);
    if (!categoriaActualizada) {
      throw createError({
        status: 404,
        message: "La categor\xEDa no existe"
        // Mensaje de error si no se encuentra la categoría a actualizar
      });
    }
    return categoriaActualizada;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de categor\xEDa inv\xE1lidos."
        // Mensaje de error si los datos de la categoría no son válidos
      });
    }
    throw error;
  }
});

const _id__patch$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$i
});

const index_get$y = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene los permisos adecuados
    });
  }
  try {
    const categorias = await prisma$2.categoria.findMany({
      include: {
        subcategorias: true
        // Incluir las subcategorías si son necesarias en la respuesta
      }
    });
    const categoriasFormateadas = categorias.map((categoria) => ({
      id: categoria.idCategoria,
      nombre: categoria.nombreCategoria
    }));
    return categoriasFormateadas;
  } catch (error) {
    console.error("Error al obtener categor\xEDas:", error);
    throw createError({
      status: 500,
      message: "Error al obtener categor\xEDas"
      // Mensaje de error genérico
    });
  }
});

const index_get$z = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$y
});

const index_post$o = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos adecuados
    });
  }
  const { nombreCategoria } = await readBody(event);
  try {
    const nuevaCategoria = await prisma$2.categoria.create({
      data: {
        nombreCategoria
        // Utiliza el nombre de la categoría proporcionado en el cuerpo de la solicitud
      }
    });
    return {
      message: "Categor\xEDa creada con \xE9xito",
      // Mensaje de éxito
      id: nuevaCategoria.idCategoria
      // El ID de la nueva categoría creada
    };
  } catch (error) {
    console.error("Error al crear categor\xEDa:", error);
    throw createError({
      status: 500,
      message: "Error al crear categor\xEDa"
      // Mensaje genérico de error en caso de falla
    });
  }
});

const index_post$p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$o
});

const _id__delete$c = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos adecuados
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta
    // Validación del ID numérico
  );
  try {
    const estado = await prisma$2.estadoConservacion.delete({
      where: { idEstado: id }
      // El ID del estado de conservación que se desea eliminar
    });
    return { message: "Estado de conservaci\xF3n eliminado con \xE9xito", estado };
  } catch (error) {
    console.error("Error al eliminar estado de conservaci\xF3n:", error);
    throw createError({
      status: 500,
      message: "Error al eliminar estado de conservaci\xF3n"
      // Mensaje de error genérico
    });
  }
});

const _id__delete$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$c
});

const _id__patch$g = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene los permisos adecuados
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Validación para asegurarse de que el ID sea numérico
    );
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionEstadoConservacion
      // Validación del cuerpo de la solicitud
    );
    const estadoActualizado = await actualizarEstadoConservacion(id, body);
    if (!estadoActualizado) {
      throw createError({
        status: 404,
        message: "El estado de conservaci\xF3n no existe"
        // Mensaje de error si el estado de conservación no se encuentra
      });
    }
    return estadoActualizado;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de estado de conservaci\xF3n inv\xE1lidos."
        // Mensaje de error si los datos son inválidos
      });
    }
    throw error;
  }
});

const _id__patch$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$g
});

const index_get$w = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado HTTP para "No autorizado"
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error que se enviará al cliente
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado HTTP para "No autorizado"
      message: "Permisos insuficientes"
      // Mensaje de error que se enviará al cliente
    });
  }
  try {
    const estadosConservacion = await prisma$2.estadoConservacion.findMany();
    const estadosFormateados = estadosConservacion.map((estado) => ({
      id: estado.idEstado,
      // El identificador del estado de conservación
      estado: estado.estado
      // El nombre o descripción del estado
    }));
    return estadosFormateados;
  } catch (error) {
    console.error("Error al obtener estados de conservaci\xF3n:", error);
    throw createError({
      status: 500,
      // Código de estado HTTP para "Error interno del servidor"
      message: "Error al obtener estados de conservaci\xF3n"
      // Mensaje de error que se enviará al cliente
    });
  }
});

const index_get$x = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$w
});

const index_post$m = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  const { estado } = await readBody(event);
  try {
    const nuevoEstado = await prisma$2.estadoConservacion.create({
      data: {
        estado
        // El nombre o descripción del nuevo estado de conservación
      }
    });
    return {
      message: "Estado de conservaci\xF3n creado con \xE9xito",
      // Mensaje de éxito
      id: nuevoEstado.idEstado
      // ID del nuevo estado de conservación creado
    };
  } catch (error) {
    console.error("Error al crear estado de conservaci\xF3n:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al crear estado de conservaci\xF3n"
      // Mensaje de error
    });
  }
});

const index_post$n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$m
});

const prisma$1 = new PrismaClient();
const index$6 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de error 401, indicando que se requiere inicio de sesión
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error que se devuelve al usuario
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de error 401, indicando que los permisos son insuficientes
      message: "Permisos insuficientes"
      // Mensaje que se envía si el usuario no tiene los permisos necesarios
    });
  }
  try {
    const estados = await prisma$1.estadoUsuario.findMany();
    return estados;
  } catch (error) {
    console.error("Error al obtener estados:", error);
    throw createError({
      status: 500,
      // Código de error 500, indicando que hubo un problema en el servidor
      message: "Error al obtener estados"
      // Mensaje de error que se devuelve al cliente
    });
  }
});

const index$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$6
});

const _id__get$6 = defineEventHandler(async (event) => {
  console.log("Entr\xE9");
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Asegúrate de que este esquema de validación esté definido
    );
    const productos = await obtenerProductosFiltroSala(id);
    console.log(productos);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const _id__get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$6
});

const index$4 = defineEventHandler(async (event) => {
  try {
    const usuarioLog = await requireUserSession(event);
    if (!usuarioLog) {
      throw createError({
        status: 401,
        // Código de estado HTTP para "No autorizado"
        message: "Requiere inicio se sesi\xF3n"
        // Mensaje de error si no hay sesión activa
      });
    }
    if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
      throw createError({
        status: 401,
        // Código de estado HTTP para "No autorizado"
        message: "Permisos insuficientes"
        // Mensaje de error si el usuario no tiene permisos suficientes
      });
    }
    const fechaActual = /* @__PURE__ */ new Date();
    const fecha = fechaActual.toLocaleDateString("es-ES", {
      year: "numeric",
      // Año en formato numérico (4 dígitos)
      month: "2-digit",
      // Mes en formato numérico de 2 dígitos (ej. 04)
      day: "2-digit"
      // Día en formato numérico de 2 dígitos (ej. 09)
    });
    const hora = fechaActual.toLocaleTimeString("es-CL", {
      hour: "2-digit",
      // Hora en formato numérico de 2 dígitos (ej. 14)
      minute: "2-digit",
      // Minuto en formato numérico de 2 dígitos (ej. 30)
      second: "2-digit",
      // Segundo en formato numérico de 2 dígitos (ej. 05)
      hour12: false
      // Usamos el formato de 24 horas (sin AM/PM)
    });
    return {
      status: 200,
      // Código HTTP 200 para indicar éxito
      data: {
        fecha,
        // Fecha en formato 'YYYY-MM-DD'
        hora
        // Hora en formato 'HH:mm:ss'
      }
    };
  } catch (error) {
    console.error("Error al obtener la hora y fecha:", error);
    throw createError({
      status: 500,
      // Código HTTP 500 para "Error interno del servidor"
      message: "Error al obtener la hora y fecha"
      // Mensaje de error para informar de un fallo en el proceso
    });
  }
});

const index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$4
});

const index_get$u = defineEventHandler(async (event) => {
  try {
    const usuarioLog = await requireUserSession(event);
    if (!usuarioLog) {
      throw createError({
        status: 401,
        // Código HTTP 401: No autorizado
        message: "Requiere inicio se sesi\xF3n"
        // Mensaje de error si no hay sesión activa
      });
    }
    if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
      throw createError({
        status: 401,
        // Código HTTP 401: No autorizado
        message: "Permisos insuficientes"
        // Mensaje de error si el usuario no tiene permisos suficientes
      });
    }
    const { individualizacionDelBien } = getQuery$1(event);
    if (!individualizacionDelBien) {
      throw createError({
        statusCode: 400,
        // Código HTTP 400: Solicitud incorrecta
        message: "El par\xE1metro 'individualizacionDelBien' es requerido."
        // Mensaje de error si el parámetro es faltante
      });
    }
    try {
      const productos = await prisma$2.producto.findMany({
        where: {
          individualizacionDelBien
          // Filtramos por el parámetro 'individualizacionDelBien'
        },
        select: {
          idProducto: true
          // Seleccionamos solo el campo 'idProducto' de los productos
        }
      });
      return productos.map((producto) => producto.idProducto);
    } catch (error) {
      console.error(
        "Error al obtener productos por individualizacionDelBien:",
        error
      );
      throw new Error(
        "Error al obtener productos por individualizacionDelBien."
      );
    }
  } catch (error) {
    console.error(
      "Error al obtener productos:",
      error.message || error
    );
    throw createError({
      statusCode: error.statusCode || 500,
      // Código de estado HTTP (500 si es un error general)
      message: error.message || "Error interno del servidor"
      // Mensaje de error
    });
  }
});

const index_get$v = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$u
});

const _id__delete$a = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si no hay sesión activa
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos suficientes
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    // Evento de la solicitud
    validarEsquemaIdNumericoRuta
    // Función de validación para asegurar que 'id' es un número
  );
  try {
    const nivel = await prisma$2.nivelEducativo.findUnique({
      where: { idNivel: Number(id) }
      // Buscamos por el 'idNivel' del nivel educativo
    });
    if (!nivel) {
      throw createError({
        status: 404,
        // Código HTTP 404: No encontrado
        message: "Nivel educativo no encontrado."
        // Mensaje de error si no se encuentra el nivel educativo
      });
    }
    await prisma$2.nivelEducativo.delete({
      where: { idNivel: Number(id) }
      // Eliminamos el nivel educativo con el 'idNivel' correspondiente
    });
    return { message: "Nivel educativo eliminado con \xE9xito." };
  } catch (error) {
    console.error("Error al eliminar nivel educativo:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al eliminar nivel educativo."
      // Mensaje de error si ocurre un problema
    });
  }
});

const _id__delete$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$a
});

const _id__patch$e = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error indicando que se necesita iniciar sesión
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje indicando que no tiene permisos para esta acción
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Esquema de validación que asegura que el 'id' es un número válido
    );
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionNivelEducativo
      // Esquema de validación para los datos del nivel educativo a actualizar
    );
    const nivelEducativoActualizado = await actualizarNivelEducativo(id, body);
    if (!nivelEducativoActualizado) {
      throw createError({
        status: 404,
        // Código HTTP 404: No encontrado
        message: "El nivel educativo no existe"
        // Mensaje indicando que no se pudo encontrar el nivel educativo
      });
    }
    return nivelEducativoActualizado;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        // Código HTTP 400: Solicitud incorrecta (errores de validación)
        message: "Datos de nivel educativo inv\xE1lidos."
        // Mensaje de error para datos inválidos
      });
    }
    throw error;
  }
});

const _id__patch$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$e
});

const index_get$s = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si el usuario no tiene sesión
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos adecuados
    });
  }
  try {
    const nivelesEducativos = await prisma$2.nivelEducativo.findMany();
    const nivelesFormateados = nivelesEducativos.map((nivel) => ({
      id: nivel.idNivel,
      // Extraemos el campo 'idNivel' como 'id'
      nombre: nivel.nivelEducativo
      // Extraemos el nombre del nivel educativo
    }));
    return nivelesFormateados;
  } catch (error) {
    console.error("Error al obtener niveles educativos:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al obtener niveles educativos."
      // Mensaje genérico de error
    });
  }
});

const index_get$t = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$s
});

const index_post$k = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje indicando que no tiene permisos para crear el nivel educativo
    });
  }
  const { nivelEducativo } = await readBody(event);
  if (!nivelEducativo) {
    throw createError({
      status: 400,
      // Código HTTP 400: Solicitud incorrecta
      message: "El nivel educativo es obligatorio."
      // Mensaje de error si el campo 'nivelEducativo' está vacío
    });
  }
  try {
    const nuevoNivel = await prisma$2.nivelEducativo.create({
      data: {
        nivelEducativo
        // Pasamos el valor del campo 'nivelEducativo' para crear el nuevo registro
      }
    });
    return {
      message: "Nivel educativo creado con \xE9xito.",
      // Mensaje indicando que la creación fue exitosa
      id: nuevoNivel.idNivel
      // Retornamos el ID del nuevo nivel educativo
    };
  } catch (error) {
    console.error("Error al crear nivel educativo:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al crear nivel educativo."
      // Mensaje genérico indicando un error en el servidor
    });
  }
});

const index_post$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$k
});

const _id__delete$8 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje indicando que no tiene permisos para eliminar la procedencia
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    // Obtenemos los parámetros de la ruta
    validarEsquemaIdNumericoRuta
    // Validamos que el ID sea numérico utilizando el esquema de validación
  );
  try {
    const procedencia = await prisma$2.procedencia.findUnique({
      where: { idProcedencia: Number(id) }
      // Buscamos la procedencia por el ID convertido a número
    });
    if (!procedencia) {
      throw createError({
        status: 404,
        // Código HTTP 404: No encontrado
        message: "Procedencia no encontrada."
        // Mensaje indicando que la procedencia no existe
      });
    }
    await prisma$2.procedencia.delete({
      where: { idProcedencia: Number(id) }
      // Eliminamos la procedencia usando su ID
    });
    return { message: "Procedencia eliminada con \xE9xito." };
  } catch (error) {
    console.error("Error al eliminar procedencia:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al eliminar procedencia."
      // Mensaje genérico indicando un error en el servidor
    });
  }
});

const _id__delete$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$8
});

const _id__patch$c = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje si el usuario no tiene permisos
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      // Obtenemos los parámetros de la ruta
      validarEsquemaIdNumericoRuta
      // Validamos que el ID sea numérico
    );
    const body = await readValidatedBody(
      event,
      // Obtenemos el cuerpo de la solicitud
      validarEsquemaActualizacionProcedencia
      // Validamos los datos de la procedencia con el esquema
    );
    const procedenciaActualizada = await actualizarProcedencia(id, body);
    if (!procedenciaActualizada) {
      throw createError({
        status: 404,
        // Código HTTP 404: No encontrado
        message: "La procedencia no existe"
        // Mensaje si no encontramos la procedencia
      });
    }
    return procedenciaActualizada;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        // Código HTTP 400: Solicitud incorrecta
        message: "Datos de procedencia inv\xE1lidos."
        // Mensaje de error para datos inválidos
      });
    }
    throw error;
  }
});

const _id__patch$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$c
});

const index_get$q = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje si el usuario no tiene permisos
    });
  }
  try {
    const procedencias = await prisma$2.procedencia.findMany();
    const procedenciasFormateadas = procedencias.map((procedencia) => ({
      id: procedencia.idProcedencia,
      // Usamos el campo idProcedencia como ID único
      procedencia: procedencia.procedencia
      // Usamos el nombre de la procedencia
    }));
    return procedenciasFormateadas;
  } catch (error) {
    console.error("Error al obtener procedencias:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al obtener procedencias"
      // Mensaje indicando un error al obtener los datos
    });
  }
});

const index_get$r = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$q
});

const index_post$i = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje si el usuario no está autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje si el usuario no tiene permisos
    });
  }
  const { procedencia } = await readBody(event);
  if (!procedencia) {
    throw createError({
      status: 400,
      // Código HTTP 400: Bad Request
      message: "El procedencia de la procedencia es requerido."
      // Mensaje de error si 'procedencia' está vacío
    });
  }
  try {
    const nuevaProcedencia = await prisma$2.procedencia.create({
      data: {
        procedencia
        // Asignamos el valor recibido al campo 'procedencia' en la base de datos
      }
    });
    return {
      message: "Procedencia creada con \xE9xito",
      // Mensaje indicando éxito
      procedencia: {
        id: nuevaProcedencia.idProcedencia,
        // ID de la nueva procedencia
        procedencia: nuevaProcedencia.procedencia
        // Nombre de la nueva procedencia
      }
    };
  } catch (error) {
    console.error("Error al crear la procedencia:", error);
    throw createError({
      status: 500,
      // Código HTTP 500: Error interno del servidor
      message: "Error al crear la procedencia"
      // Mensaje de error
    });
  }
});

const index_post$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$i
});

const _id__delete$6 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene el rol adecuado
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    // Obtiene el parámetro de la ruta
    validarEsquemaIdNumericoRuta
    // Valida que el ID sea un número
  );
  try {
    const producto = await prisma$2.producto.findUnique({
      where: { idProducto: id }
      // Busca el producto por su ID
    });
    if (!producto) {
      throw createError({
        status: 404,
        // Código de estado HTTP 404
        message: "Producto no encontrada."
        // Mensaje de error si no se encuentra el producto
      });
    }
    const sala = await prisma$2.productoSala.findFirst({
      where: { idProducto: id }
      // Busca en la tabla `productoSala` si existe una asignación
    });
    if (sala) {
      await prisma$2.productoSala.deleteMany({
        where: { idProducto: id }
        // Elimina todas las entradas relacionadas con el producto en la tabla `productoSala`
      });
    }
    await prisma$2.producto.delete({
      where: { idProducto: id }
      // Elimina el producto por su ID
    });
    return { message: "Producto eliminado con \xE9xito." };
  } catch (error) {
    console.error("Error al eliminar Producto:", error);
    throw createError({
      status: 500,
      // Código de estado HTTP 500
      message: "Error al eliminar Producto."
      // Mensaje de error genérico
    });
  }
});

const _id__delete$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$6
});

const _id__patch$a = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error de autenticación (No autorizado)
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      // Extrae los parámetros de la ruta
      validarEsquemaIdNumericoRuta
      // Valida que el ID sea un número válido
    );
    if (!id) {
      throw createError({
        status: 400,
        // Error de solicitud incorrecta
        message: "ID de producto inv\xE1lido."
        // Mensaje de error
      });
    }
    const body = await readBody(event);
    const datosValidos = await readValidatedBody(
      event,
      // Lee el cuerpo de la solicitud y lo valida
      validarEsquemaActualizacionProducto
      // Valida el cuerpo de acuerdo con el esquema de validación
    );
    if (!datosValidos) {
      throw createError({
        status: 400,
        // Error de solicitud incorrecta
        message: "Datos de producto inv\xE1lidos."
        // Mensaje de error
      });
    }
    const productoActualizado = await actualizarProducto(id, body);
    if (!productoActualizado) {
      throw createError({
        status: 404,
        // Error de no encontrado
        message: "El producto no existe."
        // Mensaje de error
      });
    }
    return productoActualizado;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        // Error de solicitud incorrecta
        message: "Datos de producto inv\xE1lidos."
        // Mensaje de error
      });
    }
    throw error;
  }
});

const _id__patch$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$a
});

const index_post$g = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si el usuario no está logueado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje si el usuario no tiene permisos
    });
  }
  try {
    const body = await readBody(event);
    const validBody = await validaresquemaAgregarStock(body);
    if (!validBody) {
      throw createError({
        statusCode: 400,
        // Código HTTP 400: Bad Request
        message: "Datos inv\xE1lidos"
        // Mensaje de error si los datos no son válidos
      });
    }
    const nuevoProducto = await agregarStock(validBody);
    return {
      statusCode: 201,
      // Código HTTP 201: Recurso creado
      body: nuevoProducto
      // Retorna el objeto del nuevo producto
    };
  } catch (error) {
    console.error(
      "Error al crear el producto:",
      error.message || error
      // Mensaje de error
    );
    throw createError({
      statusCode: error.statusCode || 500,
      // Código HTTP 500: Error interno del servidor
      message: error.message || "Error interno del servidor"
      // Mensaje de error
    });
  }
});

const index_post$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$g
});

const _id__patch$8 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje si el usuario no tiene los permisos requeridos
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Valida el ID con un esquema específico
    );
    const body = await readValidatedBody(event, validarEsquemaFechaDevolucion);
    const { fecha, idProducto } = body;
    console.log(
      "Datos a actualizar = idUsuario: ",
      id,
      "Fecha: ",
      fecha,
      "idProducto: ",
      idProducto
    );
    const nuevaFecha = asignarFechaDevolucion(fecha, idProducto, id);
    return {
      statusCode: 201,
      // Código de estado 201: Recurso creado
      body: nuevaFecha
      // El cuerpo de la respuesta incluye la nueva fecha asignada
    };
  } catch (error) {
    console.error(
      "Error al asignar responsable al producto:",
      error.message || error
    );
    throw createError({
      statusCode: error.statusCode || 500,
      // Código de estado 500: Error interno
      message: error.message || "Error interno del servidor"
      // Mensaje de error
    });
  }
});

const _id__patch$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$8
});

const index_get$o = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio de sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const { individualizacionDelBien } = getQuery$1(event);
    if (!individualizacionDelBien || typeof individualizacionDelBien !== "string") {
      throw createError({
        statusCode: 400,
        // Código de estado 400: Solicitud incorrecta
        message: "El par\xE1metro 'individualizacionDelBien' es requerido y debe ser un texto."
        // Mensaje de error
      });
    }
    const productos = await obtenerProductosParaPrestamo(
      individualizacionDelBien
    );
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$p = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$o
});

const index_post$e = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const body = await readBody(event);
    const validBody = await validarEsquemaAsignarResponsable(body);
    if (!validBody) {
      throw createError({
        statusCode: 400,
        // Código de estado 400: Solicitud incorrecta
        message: "Datos inv\xE1lidos"
        // Mensaje de error
      });
    }
    const nuevoResponsable = await asignarResponsableAProducto(validBody);
    return {
      statusCode: 201,
      // Código de estado 201: Creado exitosamente
      body: nuevoResponsable
      // El nuevo responsable asignado
    };
  } catch (error) {
    console.error(
      "Error al asignar responsable al producto:",
      error.message || error
    );
    throw createError({
      statusCode: error.statusCode || 500,
      // Código de estado 500: Error interno del servidor
      message: error.message || "Error interno del servidor"
      // Mensaje de error
    });
  }
});

const index_post$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$e
});

const index_post$c = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesi\xF3n"
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
    });
  }
  try {
    const body = await readBody(event);
    console.log(body);
    const datosValidos = await readValidatedBody(
      event,
      validarEsquemaAsignarSala
    );
    if (!datosValidos) {
      throw createError({
        status: 400,
        message: "Datos inv\xE1lidos. Aseg\xFArate de que los ID de los productos y el ID de la sala sean correctos."
      });
    }
    const { idProducto, idSala, fechaAsignacion } = datosValidos;
    let fechaFormateada = void 0;
    if (fechaAsignacion) {
      const fechaObj = new Date(fechaAsignacion);
      if (!isNaN(fechaObj.getTime())) {
        fechaFormateada = fechaObj;
      } else {
        console.log("Fecha inv\xE1lida, se usar\xE1 undefined.");
        fechaFormateada = void 0;
      }
    }
    const resultado = await moverProductosASala(
      idProducto,
      idSala,
      fechaFormateada
    );
    return { status: 200, message: "Sala asignada con \xE9xito", resultado };
  } catch (error) {
    console.error("Error al asignar la sala:", error);
    throw createError({
      status: 500,
      message: "Error al procesar la solicitud de asignaci\xF3n de sala."
    });
  }
});

const index_post$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$c
});

const index_get$m = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const productos = await obtenerProductosNoAgrupados();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos no agrupados:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$n = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$m
});

const _id__get$4 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Asegúrate de que este esquema de validación esté definido
    );
    const productos = await obtenerProductosFiltroSala(id);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const _id__get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$4
});

const _id__get$2 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Asegúrate de que este esquema de validación esté definido
    );
    const productos = await obtenerProductosEditarFiltroSala(id);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const _id__get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get$2
});

const index_get$k = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error de autenticación (No autorizado)
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  try {
    const productos = await obtenerProductos();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Error de servidor (Error interno)
      message: errorMessage
      // Mensaje de error que ocurrió en el servidor
    });
  }
});

const index_get$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$k
});

const index_post$a = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: Usuario no autenticado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje para el error de autenticación
    });
  }
  try {
    const body = await readBody(event);
    const validBody = await validarEsquemaCreacionProducto(body);
    if (!validBody) {
      throw createError({
        statusCode: 400,
        // Error 400: Datos inválidos
        message: "Datos inv\xE1lidos"
        // Mensaje para el error de validación
      });
    }
    const nuevoProducto = await crearProducto(validBody);
    return {
      statusCode: 201,
      // Código de estado HTTP 201: Recurso creado exitosamente
      body: nuevoProducto
      // El cuerpo de la respuesta será el producto recién creado
    };
  } catch (error) {
    console.error(
      "Error al crear el producto:",
      // Mensaje de depuración en caso de error
      error.message || error
      // Extrae el mensaje de error si está disponible
    );
    throw createError({
      statusCode: error.statusCode || 500,
      // Código de error (por defecto 500)
      message: error.message || "Error interno del servidor"
      // Mensaje de error
    });
  }
});

const index_post$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$a
});

const index_post$8 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si el usuario no está logueado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código HTTP 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje si el usuario no tiene permisos
    });
  }
  try {
    const body = await readBody(event);
    const validBody = await validaresquemaAgregarProducto(body);
    if (!validBody) {
      throw createError({
        statusCode: 400,
        // Código HTTP 400: Bad Request
        message: "Datos inv\xE1lidos"
        // Mensaje de error si los datos no son válidos
      });
    }
    const nuevoProducto = await agregarStock(validBody);
    return {
      statusCode: 201,
      // Código HTTP 201: Recurso creado
      body: nuevoProducto
      // Retorna el objeto del nuevo producto
    };
  } catch (error) {
    console.error(
      "Error al crear el producto:",
      error.message || error
      // Mensaje de error
    );
    throw createError({
      statusCode: error.statusCode || 500,
      // Código HTTP 500: Error interno del servidor
      message: error.message || "Error interno del servidor"
      // Mensaje de error
    });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$8
});

const _id__get = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Asegúrate de que este esquema de validación esté definido
    );
    const productos = await obtenerProductosParaDevolucion(id);
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__get
});

const index_get$i = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const productos = await obtenerProductosParaSelect();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$i
});

const index_get$g = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado" && usuarioLog.user.rol !== "Docente") {
    throw createError({
      status: 401,
      // Código de estado 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje de error
    });
  }
  try {
    const productos = await obtenerProductosTotales();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Código de estado 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$g
});

const _id__delete$4 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: Usuario no autenticado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error cuando el usuario no ha iniciado sesión
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: Usuario sin permisos suficientes
      message: "Permisos insuficientes"
      // Mensaje de error para usuarios sin permisos adecuados
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta
    // Función que valida que el parámetro ID sea un número
  );
  try {
    const proveedor = await prisma$2.proveedor.findUnique({
      where: { idProveedor: Number(id) }
      // Busca el proveedor por ID en la base de datos
    });
    if (!proveedor) {
      throw createError({
        status: 404,
        // Error 404: Recurso no encontrado
        message: "Proveedor no encontrado."
        // Mensaje de error cuando no se encuentra el proveedor
      });
    }
    await prisma$2.proveedor.delete({
      where: { idProveedor: Number(id) }
      // Elimina el proveedor por su ID
    });
    return { message: "Proveedor eliminado con \xE9xito." };
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: "Error al eliminar proveedor."
      // Mensaje de error general
    });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$4
});

const _id__patch$6 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: Usuario no autenticado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error cuando el usuario no ha iniciado sesión
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: Usuario sin permisos suficientes
      message: "Permisos insuficientes"
      // Mensaje de error para usuarios sin permisos adecuados
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Función que valida que el parámetro ID sea un número
    );
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionProveedor
      // Esquema de validación para la actualización del proveedor
    );
    const proveedorActualizado = await actualizarProveedor(id, body);
    if (!proveedorActualizado) {
      throw createError({
        status: 404,
        // Error 404: Recurso no encontrado
        message: "El proveedor no existe"
        // Mensaje de error cuando no se encuentra el proveedor
      });
    }
    return proveedorActualizado;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        // Error 400: Datos inválidos
        message: "Datos de proveedor inv\xE1lidos."
        // Mensaje de error de validación
      });
    }
    throw error;
  }
});

const _id__patch$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$6
});

const index_get$e = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se requiere estar autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  try {
    const proveedores = await prisma$2.proveedor.findMany();
    const proveedoresFormateados = proveedores.map((proveedor) => ({
      id: proveedor.idProveedor,
      // El ID del proveedor (usando el campo idProveedor de la base de datos)
      nombre: proveedor.proveedor,
      // El nombre del proveedor
      email: proveedor.email,
      // El email del proveedor
      telefono: proveedor.telefono
      // El teléfono del proveedor
    }));
    return proveedoresFormateados;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: "Error al obtener proveedores"
      // Mensaje indicando que hubo un problema al obtener los proveedores
    });
  }
});

const index_get$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$e
});

const index_post$6 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se requiere estar autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  const { nombre, telefono, email } = await readBody(event);
  if (!nombre || !telefono && !email) {
    throw createError({
      status: 400,
      // Error 400: Solicitud incorrecta
      message: "El nombre es obligatorio, y debe haber al menos un n\xFAmero de tel\xE9fono o un correo electr\xF3nico."
      // Mensaje de validación
    });
  }
  try {
    const proveedor = nombre;
    const nuevoProveedor = await prisma$2.proveedor.create({
      data: {
        proveedor,
        // Nombre del proveedor
        email,
        // Email del proveedor
        telefono
        // Teléfono del proveedor
      }
    });
    return {
      message: "Proveedor creado con \xE9xito",
      // Mensaje de éxito
      proveedor: nuevoProveedor
      // Los datos del proveedor recién creado
    };
  } catch (error) {
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: "Error al crear el proveedor"
      // Mensaje indicando que hubo un problema al crear el proveedor
    });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$6
});

const index_get$c = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se requiere estar autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  try {
    const datos = await obtenerTotalPorProducto();
    return datos;
  } catch (error) {
    console.error("Error al obtener los datos del gr\xE1fico:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$c
});

const index_get$a = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se requiere estar autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  try {
    const datosGrafico = await obtenerProductosMasAsignados();
    return datosGrafico;
  } catch (error) {
    console.error("Error al obtener los datos del gr\xE1fico:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$a
});

const index_get$8 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se requiere estar autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  try {
    const datosGrafico = await obtenerDatosReporteResponsables();
    return {
      data: datosGrafico
      // Devuelve los datos en un objeto con la propiedad "data"
    };
  } catch (error) {
    console.error("Error al obtener los datos del gr\xE1fico:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$8
});

const index_get$6 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se requiere estar autenticado
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  try {
    const datosGrafico = await obtenerDatosReporteSala();
    return {
      data: datosGrafico
      // Devuelve los datos en un objeto con la propiedad "data"
    };
  } catch (error) {
    console.error("Error al obtener los datos del gr\xE1fico:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: errorMessage
      // Mensaje de error
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$6
});

const prisma = new PrismaClient();
const index$2 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Código de error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se necesita autenticación
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje indicando que el usuario no tiene permisos suficientes
    });
  }
  try {
    const roles = await prisma.rol.findMany();
    return roles;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    throw createError({
      status: 500,
      // Código de error 500: Error interno del servidor
      message: "Error al obtener roles"
      // Mensaje explicando el error
    });
  }
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
});

const _id__delete$2 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje indicando que se necesita iniciar sesión
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      // Error 401: No autorizado
      message: "Permisos insuficientes"
      // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    // El evento que contiene la solicitud
    validarEsquemaIdNumericoRuta
    // Esquema que valida que el ID sea numérico
  );
  try {
    const sala = await prisma$2.sala.findUnique({
      where: { idSala: Number(id) }
      // Consulta utilizando el ID de la sala
    });
    if (!sala) {
      throw createError({
        status: 404,
        // Error 404: No encontrada
        message: "Sala no encontrada."
        // Mensaje indicando que la sala no fue encontrada
      });
    }
    await prisma$2.sala.delete({
      where: { idSala: Number(id) }
      // Elimina la sala especificada por su ID
    });
    return { message: "Sala eliminada con \xE9xito." };
  } catch (error) {
    console.error("Error al eliminar sala:", error);
    throw createError({
      status: 500,
      // Error 500: Error interno del servidor
      message: "Error al eliminar sala."
      // Mensaje explicando que hubo un error al eliminar la sala
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete$2
});

const _id__patch$4 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Este esquema asegura que el ID sea un número válido.
    );
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionSala
      // Aquí se valida que los datos enviados para la sala sean válidos según el esquema definido.
    );
    const salaActualizada = await actualizarSala(id, body);
    if (!salaActualizada) {
      throw createError({
        status: 404,
        message: "La sala no existe"
      });
    }
    return salaActualizada;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de sala inv\xE1lidos."
        // Si hay un error de validación, devuelve un error 400 con un mensaje específico.
      });
    }
    throw error;
  }
});

const _id__patch$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$4
});

const index_get$4 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error si no está autenticado.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Si el usuario no tiene permisos, lanza un error 401.
    });
  }
  try {
    const salas = await prisma$2.sala.findMany({
      include: {
        nivelEducativo: true
        // Incluye los datos relacionados con el nivel educativo de cada sala.
      }
    });
    const salasFormateadas = salas.map((sala) => ({
      id: sala.idSala,
      // Usa el campo 'idSala' como identificador único
      numero: sala.numeroSala,
      // Número de la sala
      nombre: sala.nombreSala,
      // Nombre de la sala
      capacidad: sala.capacidad,
      // Capacidad de la sala
      idNivel: sala.idNivel,
      // ID del nivel educativo asociado
      nivel: sala.nivelEducativo.nivelEducativo
      // Nombre del nivel educativo (asumimos que el campo 'nivelEducativo' contiene el nombre del nivel)
    }));
    return salasFormateadas;
  } catch (error) {
    console.error("Error al obtener salas:", error);
    throw createError({
      status: 500,
      // Lanza un error 500 (error interno del servidor) si algo sale mal.
      message: "Error al obtener salas."
      // Mensaje de error general para indicar un fallo en la obtención de las salas.
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$4
});

const index_post$4 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se necesita iniciar sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error indicando falta de permisos.
    });
  }
  try {
    const body = await readBody(event);
    const validBody = await validarEsquemaCreacionSala(body);
    const { numeroSala, nombreSala, capacidad, idNivel } = validBody;
    if (!numeroSala || !nombreSala || capacidad === void 0 || !idNivel) {
      throw createError({
        status: 400,
        message: "Todos los campos son obligatorios y deben ser v\xE1lidos."
        // Error si falta algún campo obligatorio.
      });
    }
    const nuevaSala = await prisma$2.sala.create({
      data: {
        numeroSala: Number(numeroSala),
        // Convierte el número de la sala a tipo numérico.
        nombreSala,
        // Nombre de la sala.
        capacidad: Number(capacidad),
        // Convierte la capacidad a tipo numérico.
        idNivel: Number(idNivel)
        // Convierte el ID del nivel educativo a tipo numérico.
      }
    });
    return { message: "Sala creada con \xE9xito.", id: nuevaSala.idSala };
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de sala inv\xE1lidos."
        // Mensaje de error en caso de que los datos no sean válidos.
      });
    }
    console.error("Error al crear sala:", error);
    throw createError({
      status: 500,
      message: "Error al crear sala."
      // Mensaje de error en caso de fallo en la creación de la sala.
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$4
});

const _id__delete = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje que indica que se necesita iniciar sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error indicando que el usuario no tiene permisos suficientes.
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta
    // Valida que el ID sea un número (función personalizada).
  );
  try {
    const subcategoria = await prisma$2.subcategoria.delete({
      where: { idSubcategoria: id }
      // Busca la subcategoría por su ID y la elimina.
    });
    return { message: "Subcategor\xEDa eliminada con \xE9xito", subcategoria };
  } catch (error) {
    console.error("Error al eliminar subcategor\xEDa:", error);
    throw createError({
      status: 500,
      message: "Error al eliminar subcategor\xEDa"
      // Mensaje de error al intentar eliminar la subcategoría.
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__delete
});

const _id__patch$2 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error cuando no hay sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error indicando que no tiene permisos suficientes.
    });
  }
  try {
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta
      // Valida que el ID sea numérico, con una función de validación personalizada.
    );
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionSubcategoria
      // Valida que el cuerpo de la solicitud cumpla con el esquema esperado.
    );
    console.log(body);
    const subcategoriaActualizada = await actualizarSubcategoria(id, body);
    if (!subcategoriaActualizada) {
      throw createError({
        status: 404,
        message: "La subcategor\xEDa no existe"
        // Mensaje de error si no se encuentra la subcategoría.
      });
    }
    return subcategoriaActualizada;
  } catch (error) {
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de subcategor\xEDa inv\xE1lidos."
        // Mensaje de error si los datos enviados no son válidos.
      });
    }
    throw error;
  }
});

const _id__patch$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch$2
});

const index_get$2 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error indicando que el usuario no tiene permisos suficientes.
    });
  }
  try {
    const subcategorias = await prisma$2.subcategoria.findMany({
      include: {
        categoria: true
        // Incluye los detalles de la categoría relacionada con cada subcategoría.
      }
    });
    const subcategoriasFormateadas = subcategorias.map((subcategoria) => ({
      id: subcategoria.idSubcategoria,
      // Asigna el ID de la subcategoría.
      nombre: subcategoria.nombreSubcategoria,
      // Asigna el nombre de la subcategoría.
      idCategoria: subcategoria.idCategoria,
      // Asigna el ID de la categoría.
      categoria: subcategoria.categoria.nombreCategoria
      // Asigna el nombre de la categoría relacionada.
    }));
    return subcategoriasFormateadas;
  } catch (error) {
    console.error("Error al obtener subcategor\xEDas:", error);
    throw createError({
      status: 500,
      // El error es un error interno del servidor.
      message: "Error al obtener subcategor\xEDas"
      // Mensaje de error que se retorna al cliente.
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const index_post$2 = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error indicando que el usuario no tiene permisos suficientes.
    });
  }
  const { nombreSubcategoria, idCategoria } = await readBody(event);
  try {
    const nuevaSubcategoria = await prisma$2.subcategoria.create({
      data: {
        nombreSubcategoria,
        // El nombre de la subcategoría que el usuario envió en la solicitud.
        idCategoria
        // El id de la categoría asociada a la nueva subcategoría.
      }
    });
    return {
      message: "Subcategor\xEDa creada con \xE9xito",
      // Mensaje de éxito indicando que la subcategoría se creó correctamente.
      id: nuevaSubcategoria.idSubcategoria
      // El id de la nueva subcategoría creada.
    };
  } catch (error) {
    console.error("Error al crear subcategor\xEDa:", error);
    throw createError({
      status: 500,
      // Error interno del servidor.
      message: "Error al crear subcategor\xEDa"
      // Mensaje de error que se retorna al cliente en caso de fallar la creación.
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

const _id__patch = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta
    // Valida que el ID proporcionado en la ruta sea un número válido.
  );
  const usuarioAActualizar = await readValidatedBody(
    event,
    validarActualizacionUsuario
    // Valida que los datos proporcionados en el cuerpo de la solicitud sean correctos para la actualización del usuario.
  );
  try {
    console.log("Datos a actualizar:", usuarioAActualizar);
    const usuarioActualizado = await actualizarUsuario(id, usuarioAActualizar);
    if (usuarioActualizado) {
      return usuarioActualizado;
    }
    throw createError({
      status: 404,
      message: "Usuario no encontrado"
      // Si el usuario no fue encontrado, lanza un error 404.
    });
  } catch (error) {
    console.log("Error en la actualizaci\xF3n del usuario:", error);
    throw createError({
      status: 500,
      message: "Error interno del servidor :("
      // Lanza un error 500 si ocurre algún problema durante el proceso.
    });
  }
});

const _id__patch$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id__patch
});

const index = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error que indica que el usuario debe iniciar sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error que indica que el usuario no tiene permisos suficientes.
    });
  }
  const {
    usuarioId,
    contrasenaActual,
    nuevaContrasena,
    confirmarNuevaContrasena
  } = await readBody(event);
  if (nuevaContrasena !== confirmarNuevaContrasena) {
    throw createError({
      status: 400,
      message: "Las nuevas contrase\xF1as no coinciden."
      // Mensaje de error si las contraseñas no coinciden.
    });
  }
  const usuario = await prisma$2.usuario.findUnique({
    where: { idUsuario: usuarioId }
    // Busca el usuario en la base de datos utilizando su `idUsuario`.
  });
  if (!usuario) {
    throw createError({
      status: 404,
      message: "Usuario no encontrado."
      // Mensaje de error si el usuario no existe en la base de datos.
    });
  }
  if (!await verifyPassword(usuario.contrasena, contrasenaActual)) {
    throw createError({
      status: 401,
      message: "Contrase\xF1a incorrecta"
      // Si la contraseña actual no es correcta, lanza un error.
    });
  }
  const newPassword = await hashPassword(nuevaContrasena);
  await prisma$2.usuario.update({
    where: { idUsuario: usuarioId },
    // Busca al usuario por `idUsuario`.
    data: { contrasena: newPassword }
    // Actualiza la contraseña con la nueva contraseña hasheada.
  });
  return { message: "Contrase\xF1a actualizada con \xE9xito" };
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});

const index_get = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
    });
  }
  try {
    const usuarios = await prisma$2.usuario.findMany({
      include: {
        usuarioRoles: {
          include: {
            rol: true
            // Incluye los datos del rol
          }
        },
        estadoUsuario: true
        // Incluye el estado del usuario
      }
    });
    const usuariosFormateados = usuarios.map((usuario) => {
      const primerRol = usuario.usuarioRoles[0] ? usuario.usuarioRoles[0].rol : null;
      return {
        id: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: primerRol ? primerRol.nombreRol : null,
        // Solo un rol
        idRol: primerRol ? primerRol.idRol : null,
        // Solo el id del primer rol
        estado: usuario.estadoUsuario.estado,
        idEstadoUsuario: usuario.idEstadoUsuario
      };
    });
    return usuariosFormateados;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw createError({
      status: 500,
      message: "Error al obtener usuarios"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});

const index_post = defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesi\xF3n"
      // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }
  if (usuarioLog.user.rol !== "Administrador" && usuarioLog.user.rol !== "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes"
      // Mensaje de error si el usuario no tiene permisos adecuados.
    });
  }
  const body = await readValidatedBody(event, validarFormularioCreacionUsuario);
  const usuario = await obtenerUsuarioPorEmail(body.email);
  if (usuario) {
    throw createError({
      status: 409,
      message: "Ya existe un usuario vinculado al email proporcionado."
      // Mensaje de error indicando que el correo ya está registrado.
    });
  }
  return {
    status: 201,
    // Retorna un estado 201 indicando que el recurso ha sido creado exitosamente.
    message: "Usuario creado exitosamente",
    // Mensaje de éxito para la creación del usuario.
    data: await crearUsuario(body)
    // Llama a la función que crea el usuario en la base de datos y devuelve los datos del nuevo usuario.
  };
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file://C:/Users/11/Documents/inventario/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file://C:/Users/11/Documents/inventario/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG);
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  if (!isRenderingIsland || true) {
    const link = [];
    for (const style in styles) {
      const resource = styles[style];
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file) });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link = islandHead.link || [];
    islandHead.style = islandHead.style || [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match ? match[1] : body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const slot in ssrContext.islandContext.slots) {
    response[slot] = {
      ...ssrContext.islandContext.slots[slot],
      fallback: ssrContext.teleports?.[`island-fallback=${slot}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const clientUid in ssrContext.islandContext.components) {
    const html = ssrContext.teleports?.[clientUid].replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...ssrContext.islandContext.components[clientUid],
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
