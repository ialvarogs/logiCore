// Importamos la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importamos las funciones necesarias de H3 para manejar los eventos HTTP y crear errores
import { defineEventHandler, createError } from "h3";
// Importamos la función de validación de ID numérico desde un archivo común
import { validarEsquemaIdNumericoRuta } from "#imports";

// Definimos el handler para la ruta
export default defineEventHandler(async (event: any) => {
  // Verificamos si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no está logueado, lanzamos un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error si el usuario no está autenticado
    });
  }

  // Verificamos que el usuario tenga el rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol del usuario no es uno de los permitidos, lanzamos un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje indicando que no tiene permisos para eliminar la procedencia
    });
  }

  // Obtener el ID de la procedencia desde los parámetros de la ruta
  const { id } = await getValidatedRouterParams(
    event, // Obtenemos los parámetros de la ruta
    validarEsquemaIdNumericoRuta // Validamos que el ID sea numérico utilizando el esquema de validación
  );

  try {
    // Intentamos encontrar la procedencia con el ID proporcionado
    const procedencia = await prisma.procedencia.findUnique({
      where: { idProcedencia: Number(id) }, // Buscamos la procedencia por el ID convertido a número
    });

    // Si no encontramos la procedencia, lanzamos un error 404
    if (!procedencia) {
      throw createError({
        status: 404, // Código HTTP 404: No encontrado
        message: "Procedencia no encontrada.", // Mensaje indicando que la procedencia no existe
      });
    }

    // Si la procedencia existe, la eliminamos de la base de datos
    await prisma.procedencia.delete({
      where: { idProcedencia: Number(id) }, // Eliminamos la procedencia usando su ID
    });

    // Retornamos un mensaje indicando que la procedencia fue eliminada con éxito
    return { message: "Procedencia eliminada con éxito." };
  } catch (error) {
    // Si ocurre un error, lo registramos en la consola para depuración
    console.error("Error al eliminar procedencia:", error);

    // Lanza un error 500 (Error interno del servidor)
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al eliminar procedencia.", // Mensaje genérico indicando un error en el servidor
    });
  }
});
