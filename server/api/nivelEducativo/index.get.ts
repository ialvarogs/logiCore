// Importamos la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importamos las funciones necesarias de H3 para definir el handler y manejar errores
import { defineEventHandler, createError } from "h3";

// Definimos el handler para la ruta
export default defineEventHandler(async (event) => {
  // Verificamos si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no está logueado, lanzamos un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error si el usuario no tiene sesión
    });
  }

  // Verificamos que el usuario tenga el rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene el rol adecuado, lanzamos un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos adecuados
    });
  }

  // Bloque try-catch para manejar la lógica de obtener los niveles educativos
  try {
    // Consultamos la base de datos para obtener todos los niveles educativos
    const nivelesEducativos = await prisma.nivelEducativo.findMany();

    // Formateamos la respuesta para incluir solo los campos necesarios
    // Esto puede ser útil para evitar exponer información innecesaria en la respuesta
    const nivelesFormateados = nivelesEducativos.map((nivel) => ({
      id: nivel.idNivel, // Extraemos el campo 'idNivel' como 'id'
      nombre: nivel.nivelEducativo, // Extraemos el nombre del nivel educativo
    }));

    // Retornamos los niveles educativos formateados
    return nivelesFormateados;
  } catch (error) {
    // Si ocurre un error al intentar obtener los niveles educativos, lo capturamos aquí
    console.error("Error al obtener niveles educativos:", error); // Log del error en la consola para depuración

    // Lanza un error 500 (Error interno del servidor)
    throw createError({
      status: 500, // Código HTTP 500: Error interno del servidor
      message: "Error al obtener niveles educativos.", // Mensaje genérico de error
    });
  }
});
