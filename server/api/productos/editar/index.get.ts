// Importación de dependencias necesarias para el manejo de eventos HTTP en H3
import { defineEventHandler, createError } from "h3";
// Importación de la función para obtener productos no agrupados
import { obtenerProductosNoAgrupados } from "~~/server/utils/repositories/productos";

export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error de autenticación
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  // Verifica si el rol del usuario es Administrador o Encargado
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es adecuado, lanza un error de permisos insuficientes
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error
    });
  }

  try {
    // Obtiene los productos no agrupados desde el repositorio
    const productos = await obtenerProductosNoAgrupados();

    // Devuelve la lista de productos no agrupados
    return productos;
  } catch (error) {
    // Manejo de errores si ocurre un problema al obtener los productos
    console.error("Error al obtener productos no agrupados:", error);

    // Verifica si el error tiene un mensaje, si no, asigna un mensaje genérico
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    // Lanza un error con el código de estado 500 (Error interno del servidor)
    throw createError({
      status: 500, // Código de estado 500: Error interno del servidor
      message: errorMessage, // Mensaje de error
    });
  }
});
