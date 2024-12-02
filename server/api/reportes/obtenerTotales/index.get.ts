// Importa las dependencias necesarias
import { defineEventHandler, createError } from "h3";
import { obtenerTotalPorProducto } from "~~/server/utils/repositories/reportes";

// Define el manejador de la solicitud para obtener los datos del gráfico
export default defineEventHandler(async (event) => {
  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje que indica que se requiere estar autenticado
    });
  }

  // Verifica que el usuario tenga un rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene los permisos adecuados, lanza un error 401 (No autorizado)
    throw createError({
      status: 401, // Error 401: No autorizado
      message: "Permisos insuficientes", // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }

  try {
    // Llama a la función obtenerTotalPorProducto para obtener los datos del gráfico
    const datos = await obtenerTotalPorProducto();

    // Devuelve los datos obtenidos para ser usados en el gráfico
    return datos;
  } catch (error) {
    // Si ocurre un error al obtener los datos, se captura el error y se lanza un error 500 (Error interno)
    console.error("Error al obtener los datos del gráfico:", error);

    // Asume que el error puede no tener un mensaje explícito y lo maneja
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";

    // Lanza el error con el mensaje correspondiente
    throw createError({
      status: 500, // Error 500: Error interno del servidor
      message: errorMessage, // Mensaje de error
    });
  }
});
