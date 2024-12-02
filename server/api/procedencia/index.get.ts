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

  try {
    // Intentamos obtener la lista de procedencias desde la base de datos
    const procedencias = await prisma.procedencia.findMany();

    // Formateamos la respuesta para incluir solo los campos necesarios (idProcedencia y el nombre de la procedencia)
    const procedenciasFormateadas = procedencias.map((procedencia) => ({
      id: procedencia.idProcedencia, // Usamos el campo idProcedencia como ID único
      procedencia: procedencia.procedencia, // Usamos el nombre de la procedencia
    }));

    // Retornamos la lista de procedencias formateada
    return procedenciasFormateadas;
  } catch (error) {
    // Si ocurre un error al obtener las procedencias, lo registramos en la consola
    console.error("Error al obtener procedencias:", error);

    // Lanza un error 500 (Error interno del servidor)
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al obtener procedencias", // Mensaje indicando un error al obtener los datos
    });
  }
});
