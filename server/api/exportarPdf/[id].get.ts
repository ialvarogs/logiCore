// Importación de dependencias necesarias para manejar eventos en H3 y manejar errores
import { defineEventHandler, createError } from "h3";
// Importación de la función para obtener productos con filtro por sala
import { obtenerProductosFiltroSala } from "~~/server/utils/repositories/productos";

export default defineEventHandler(async (event) => {

    console.log("Entré");
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error con código 401 (No autorizado)
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
    // Si el rol no es adecuado, lanza un error con código 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error
    });
  }

  try {
    // Obtiene y valida el ID de la sala desde los parámetros de la URL
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Asegúrate de que este esquema de validación esté definido
    );

    // Obtiene los productos filtrados por la sala
    const productos = await obtenerProductosFiltroSala(id);
    console.log(productos);
    // Devuelve la lista de productos filtrados
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