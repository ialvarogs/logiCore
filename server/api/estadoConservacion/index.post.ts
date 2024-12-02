// Importamos el cliente Prisma para interactuar con la base de datos y funciones auxiliares de manejo de errores.
import prisma from "~~/server/utils/prisma/prisma";
import { defineEventHandler, createError } from "h3";

// Definimos el handler para el evento de la ruta.
// Esta función se ejecuta cuando se realiza una solicitud HTTP a la ruta asociada.
export default defineEventHandler(async (event) => {
  // Verificamos si el usuario tiene una sesión activa.
  // Si el usuario no está autenticado, lanzamos un error con código 401 (no autorizado).
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  // Verificamos si el rol del usuario es "Administrador" o "Encargado".
  // Si el usuario no tiene uno de estos roles, lanzamos un error con código 401 (no autorizado).
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error
    });
  }

  // Leemos el cuerpo de la solicitud (en este caso, el "estado" que se enviará para crear un nuevo estado de conservación).
  const { estado } = await readBody(event);

  try {
    // Intentamos crear un nuevo estado de conservación en la base de datos usando Prisma.
    const nuevoEstado = await prisma.estadoConservacion.create({
      data: {
        estado, // El nombre o descripción del nuevo estado de conservación
      },
    });

    // Si la creación es exitosa, retornamos un mensaje de éxito con el ID del nuevo estado.
    return {
      message: "Estado de conservación creado con éxito", // Mensaje de éxito
      id: nuevoEstado.idEstado, // ID del nuevo estado de conservación creado
    };
  } catch (error) {
    // Si ocurre un error al intentar crear el estado, lo registramos en la consola.
    console.error("Error al crear estado de conservación:", error);

    // Lanzamos un error con código 500 (Error interno del servidor) y un mensaje adecuado.
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al crear estado de conservación", // Mensaje de error
    });
  }
});
