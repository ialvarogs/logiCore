// Importación de dependencias necesarias para manejar eventos en H3 y errores
import { defineEventHandler, createError } from "h3";
// Importación de las funciones para obtener productos
import {
  obtenerProductos,
  obtenerProductosTotales,
} from "~~/server/utils/repositories/productos";

export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error con código 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  // Verifica si el rol del usuario es Administrador, Encargado o Docente
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado" &&
    usuarioLog.user.rol !== "Docente"
  ) {
    // Si el rol no es adecuado, lanza un error con código 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error
    });
  }

  try {
    // Obtiene los productos totales
    const productos = await obtenerProductosTotales();

    // Devuelve los productos obtenidos
    return productos;
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema al obtener los productos
    console.error("Error al obtener productos:", error);

    // Se asume que el error puede no tener un mensaje específico, por lo que se proporciona uno genérico
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    // Lanza un error con código 500 (Error interno del servidor)
    throw createError({
      status: 500, // Código de estado 500: Error interno del servidor
      message: errorMessage, // Mensaje de error
    });
  }
});
