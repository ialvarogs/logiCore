import { defineEventHandler, createError } from "h3"; // Importa las funciones de H3 para manejar eventos HTTP
import { obtenerProductos } from "~~/server/utils/repositories/productos"; // Importa la función que obtiene los productos desde el repositorio

// Define el manejador del evento para la ruta solicitada
export default defineEventHandler(async (event) => {
  // Verifica si el usuario está logueado, mediante la función 'requireUserSession'.
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error de autenticación (No autorizado)
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  try {
    // Llama a la función 'obtenerProductos' para obtener todos los productos desde el repositorio.
    const productos = await obtenerProductos();

    // Si todo sale bien, devuelve la lista de productos obtenidos.
    return productos; // Devuelve los productos obtenidos como respuesta.
  } catch (error) {
    // Si ocurre un error en el proceso de obtener los productos, lo captura aquí.
    console.error("Error al obtener productos:", error);

    // Si el error es una instancia de Error, extrae el mensaje de error; de lo contrario, asigna un mensaje por defecto.
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido"; // Definir el mensaje de error

    // Lanza un error 500 (Error interno del servidor) con el mensaje correspondiente
    throw createError({
      status: 500, // Error de servidor (Error interno)
      message: errorMessage, // Mensaje de error que ocurrió en el servidor
    });
  }
});
