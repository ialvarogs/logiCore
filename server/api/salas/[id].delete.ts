// Importa las dependencias necesarias
import prisma from "~~/server/utils/prisma/prisma"; // Para interactuar con la base de datos mediante Prisma
import { defineEventHandler, createError } from "h3"; // Define y maneja eventos HTTP y errores
import { validarEsquemaIdNumericoRuta } from "#imports"; // Para validar que el ID de la ruta sea un número

// Define el manejador de evento para la eliminación de una sala
export default defineEventHandler(async (event: any) => {
  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje indicando que se necesita iniciar sesión
    });
  }

  // Verifica si el usuario tiene el rol adecuado para eliminar la sala (Administrador o Encargado)
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

  // Extrae el ID de la sala desde los parámetros de la URL
  const { id } = await getValidatedRouterParams(
    event, // El evento que contiene la solicitud
    validarEsquemaIdNumericoRuta // Esquema que valida que el ID sea numérico
  );

  try {
    // Verifica si la sala existe en la base de datos mediante Prisma
    const sala = await prisma.sala.findUnique({
      where: { idSala: Number(id) }, // Consulta utilizando el ID de la sala
    });

    // Si la sala no existe, lanza un error 404 (No encontrada)
    if (!sala) {
      throw createError({
        status: 404, // Error 404: No encontrada
        message: "Sala no encontrada.", // Mensaje indicando que la sala no fue encontrada
      });
    }

    // Elimina la sala de la base de datos
    await prisma.sala.delete({
      where: { idSala: Number(id) }, // Elimina la sala especificada por su ID
    });

    // Retorna un mensaje confirmando que la sala ha sido eliminada con éxito
    return { message: "Sala eliminada con éxito." };
  } catch (error) {
    // Si ocurre un error durante la eliminación de la sala, captura el error y maneja la respuesta
    console.error("Error al eliminar sala:", error); // Imprime el error en la consola

    // Lanza un error 500 (Error interno del servidor)
    throw createError({
      status: 500, // Error 500: Error interno del servidor
      message: "Error al eliminar sala.", // Mensaje explicando que hubo un error al eliminar la sala
    });
  }
});
