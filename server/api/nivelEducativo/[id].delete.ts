// Importamos Prisma para interactuar con la base de datos, y funciones de H3 para manejar eventos y errores
import prisma from "~~/server/utils/prisma/prisma";
import { defineEventHandler, createError } from "h3";
// Importamos una función de validación para asegurar que los parámetros en la ruta sean correctos
import { validarEsquemaIdNumericoRuta } from "#imports";

// Definimos el handler para la solicitud. Esta función se ejecutará cuando se reciba una solicitud HTTP a esta ruta.
export default defineEventHandler(async (event: any) => {
  // Verificamos si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanzamos un error 401 (No autorizado).
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error si no hay sesión activa
    });
  }

  // Verificamos si el usuario tiene uno de los roles permitidos: "Administrador" o "Encargado"
  // Si el usuario no tiene el rol adecuado, lanzamos un error 401 (Permisos insuficientes).
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos suficientes
    });
  }

  // Obtener el parámetro 'id' de la ruta y validarlo para asegurarse de que es un número
  const { id } = await getValidatedRouterParams(
    event, // Evento de la solicitud
    validarEsquemaIdNumericoRuta // Función de validación para asegurar que 'id' es un número
  );

  try {
    // Consultamos si el nivel educativo existe en la base de datos usando el id proporcionado
    const nivel = await prisma.nivelEducativo.findUnique({
      where: { idNivel: Number(id) }, // Buscamos por el 'idNivel' del nivel educativo
    });

    // Si no se encuentra el nivel educativo, lanzamos un error 404 (No encontrado)
    if (!nivel) {
      throw createError({
        status: 404, // Código HTTP 404: No encontrado
        message: "Nivel educativo no encontrado.", // Mensaje de error si no se encuentra el nivel educativo
      });
    }

    // Si el nivel educativo existe, procedemos a eliminarlo de la base de datos
    await prisma.nivelEducativo.delete({
      where: { idNivel: Number(id) }, // Eliminamos el nivel educativo con el 'idNivel' correspondiente
    });

    // Retornamos un mensaje de éxito indicando que el nivel educativo fue eliminado
    return { message: "Nivel educativo eliminado con éxito." };
  } catch (error) {
    // Si ocurre un error en cualquier parte del proceso, lo registramos en la consola
    console.error("Error al eliminar nivel educativo:", error);

    // Lanza un error 500 (Error interno del servidor) con un mensaje genérico
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al eliminar nivel educativo.", // Mensaje de error si ocurre un problema
    });
  }
});
