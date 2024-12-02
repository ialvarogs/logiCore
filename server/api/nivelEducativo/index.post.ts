// Importamos la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importamos las funciones necesarias de H3 para manejar los eventos HTTP y crear errores
import { defineEventHandler, createError } from "h3";

// Definimos el handler para la ruta
export default defineEventHandler(async (event) => {
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
      message: "Permisos insuficientes", // Mensaje indicando que no tiene permisos para crear el nivel educativo
    });
  }

  // Leemos el cuerpo de la solicitud, específicamente el campo 'nivelEducativo'
  const { nivelEducativo } = await readBody(event);

  // Validamos que el campo 'nivelEducativo' no esté vacío
  if (!nivelEducativo) {
    // Si el campo está vacío, lanzamos un error 400 (Solicitud incorrecta)
    throw createError({
      status: 400, // Código HTTP 400: Solicitud incorrecta
      message: "El nivel educativo es obligatorio.", // Mensaje de error si el campo 'nivelEducativo' está vacío
    });
  }

  try {
    // Intentamos crear un nuevo nivel educativo en la base de datos
    const nuevoNivel = await prisma.nivelEducativo.create({
      data: {
        nivelEducativo, // Pasamos el valor del campo 'nivelEducativo' para crear el nuevo registro
      },
    });

    // Si la creación es exitosa, retornamos un mensaje de éxito junto con el ID del nuevo nivel educativo
    return {
      message: "Nivel educativo creado con éxito.", // Mensaje indicando que la creación fue exitosa
      id: nuevoNivel.idNivel, // Retornamos el ID del nuevo nivel educativo
    };
  } catch (error) {
    // Si ocurre un error al intentar crear el nivel educativo, lo capturamos aquí
    console.error("Error al crear nivel educativo:", error); // Log del error en la consola para facilitar la depuración

    // Lanza un error 500 (Error interno del servidor)
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al crear nivel educativo.", // Mensaje genérico indicando un error en el servidor
    });
  }
});
