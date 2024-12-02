// Middleware que se ejecuta en las rutas de Nuxt.js para verificar el acceso del usuario
export default defineNuxtRouteMiddleware((to) => {
  // Se obtiene el estado de la sesión del usuario (si está logueado) y los datos del usuario
  const { loggedIn, user } = useUserSession();

  // Se obtiene el valor de la propiedad 'auth' de los metadatos de la ruta
  const auth = to.meta.auth;

  // Si la ruta no requiere autenticación (auth === false), se permite el acceso
  if (auth === false) {
    return;
  }

  // Si el usuario no está logueado, redirige a la página de inicio
  if (!loggedIn.value) {
    return navigateTo("/");
  }

  // Se obtiene el rol del usuario
  const rol = user.value.rol;

  // Si 'auth' es un arreglo, lo mantiene como tal, si no, lo convierte en un arreglo
  const requerirRoles = Array.isArray(auth) ? auth : [auth];

  // Si el rol del usuario está en los roles requeridos para acceder a la ruta, se permite el acceso
  if (requerirRoles.length && requerirRoles.includes(rol)) {
    return;
  } else {
    // Si el rol del usuario no tiene acceso, se redirige a la página de productos
    return navigateTo("/productos");
  }
});