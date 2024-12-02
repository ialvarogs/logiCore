// Importación de dependencias necesarias de H3
import { defineEventHandler, createError } from "h3";
// Función para obtener productos para préstamo desde el repositorio
import { obtenerProductosParaPrestamo } from "~~/server/utils/repositories/productos";

export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error de autenticación
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Requiere inicio de sesión", // Mensaje de error
    });
  }

  // Verifica si el usuario tiene permisos adecuados (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es adecuado, lanza un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error
    });
  }

  try {
    // Extrae el parámetro 'individualizacionDelBien' de la consulta
    const { individualizacionDelBien } = getQuery(event);

    // Verifica que el parámetro 'individualizacionDelBien' esté presente y sea un string
    if (
      !individualizacionDelBien ||
      typeof individualizacionDelBien !== "string"
    ) {
      throw createError({
        statusCode: 400, // Código de estado 400: Solicitud incorrecta
        message:
          "El parámetro 'individualizacionDelBien' es requerido y debe ser un texto.", // Mensaje de error
      });
    }

    // Llama a la función para obtener los productos asociados a 'individualizacionDelBien'
    const productos = await obtenerProductosParaPrestamo(
      individualizacionDelBien
    );

    // Devuelve la lista de productos obtenida
    return productos;
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola para facilitar la depuración
    console.error("Error al obtener productos:", error);

    // Captura el mensaje de error y lanza una respuesta con código 500 (Error interno del servidor)
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido"; // Si es una instancia de Error, usa el mensaje, de lo contrario, un mensaje genérico

    throw createError({
      status: 500, // Código de estado 500: Error interno del servidor
      message: errorMessage, // Mensaje de error
    });
  }
});
