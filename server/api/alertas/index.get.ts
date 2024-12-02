// Importa las funciones necesarias de H3, un framework para manejar eventos HTTP en Nuxt 3
import { defineEventHandler, createError } from "h3";
// Importa la función 'obtenerAlertas' desde el repositorio de productos, que se encargará de obtener las alertas
import { obtenerAlertas } from "~~/server/utils/repositories/productos"; // Asegúrate de que la ruta sea correcta

// Define el manejador de eventos para la ruta
export default defineEventHandler(async (event) => {
  try {
    // Verifica si el usuario tiene una sesión activa, obteniendo la información del usuario
    const usuarioLog = await requireUserSession(event);

    // Si no hay sesión activa, lanza un error con el código de estado 401 (No autorizado)
    if (!usuarioLog) {
      throw createError({
        status: 401,
        message: "Requiere inicio de sesión", // Mensaje de error si el usuario no está autenticado
      });
    }

    // Si el usuario está autenticado, procede a obtener la lista de alertas
    const alertas = await obtenerAlertas(); // Llama a la función que obtiene las alertas desde la base de datos o repositorio

    // Devuelve la lista de alertas obtenida
    return alertas;
  } catch (error) {
    // Si ocurre algún error durante la ejecución, se captura aquí y se muestra en la consola
    console.error("Error al obtener productos:", error);

    // Lanza un error con el código de estado 500 (Error interno del servidor) y un mensaje descriptivo
    throw createError({
      status: 500,
      message: "Error al obtener productos", // Mensaje genérico para cuando hay un problema al obtener los productos
    });
  }
});
