// Importamos la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importamos las funciones necesarias de H3 para manejar eventos HTTP y errores
import { defineEventHandler, createError } from "h3";

// Definimos el handler para la ruta
export default defineEventHandler(async (event) => {
  // Verificamos si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no está logueado, lanzamos un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje si el usuario no está autenticado
    });
  }

  // Verificamos que el usuario tenga el rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es adecuado, lanzamos un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje si el usuario no tiene permisos
    });
  }

  // Extraemos el valor del campo 'procedencia' del cuerpo de la solicitud
  const { procedencia } = await readBody(event);

  // Validamos que 'procedencia' no esté vacío
  if (!procedencia) {
    throw createError({
      status: 400, // Código HTTP 400: Bad Request
      message: "El procedencia de la procedencia es requerido.", // Mensaje de error si 'procedencia' está vacío
    });
  }

  try {
    // Intentamos crear una nueva procedencia en la base de datos
    const nuevaProcedencia = await prisma.procedencia.create({
      data: {
        procedencia, // Asignamos el valor recibido al campo 'procedencia' en la base de datos
      },
    });

    // Si la creación es exitosa, retornamos el mensaje de éxito y los datos de la nueva procedencia
    return {
      message: "Procedencia creada con éxito", // Mensaje indicando éxito
      procedencia: {
        id: nuevaProcedencia.idProcedencia, // ID de la nueva procedencia
        procedencia: nuevaProcedencia.procedencia, // Nombre de la nueva procedencia
      },
    };
  } catch (error) {
    // Si ocurre un error al crear la procedencia, lo registramos en la consola
    console.error("Error al crear la procedencia:", error);

    // Lanza un error 500 (Error interno del servidor) si falla la creación
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al crear la procedencia", // Mensaje de error
    });
  }
});
