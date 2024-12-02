// Importación de dependencias necesarias
import { defineEventHandler, createError } from "h3"; // Para manejar eventos y errores HTTP
import { PrismaClient } from "@prisma/client"; // Importa la instancia de Prisma para interactuar con la base de datos

// Instancia de Prisma, que proporciona acceso a la base de datos
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Verificar que el usuario esté autenticado antes de proceder
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de error 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje que indica que se necesita autenticación
    });
  }

  // Verificar que el usuario tenga un rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene los permisos adecuados, lanza un error 401 (No autorizado)
    throw createError({
      status: 401, // Error 401: No autorizado
      message: "Permisos insuficientes", // Mensaje indicando que el usuario no tiene permisos suficientes
    });
  }

  try {
    // Realizar una consulta a la base de datos para obtener todos los roles de usuario
    const roles = await prisma.rol.findMany();

    // Retornar los roles obtenidos como respuesta a la solicitud
    return roles;
  } catch (error) {
    // Si ocurre un error al obtener los roles, captura el error y maneja la respuesta
    console.error("Error al obtener roles:", error); // Imprime el error en la consola

    // Lanza un error 500 (Error interno del servidor) con un mensaje descriptivo
    throw createError({
      status: 500, // Código de error 500: Error interno del servidor
      message: "Error al obtener roles", // Mensaje explicando el error
    });
  }
});
