// Importamos las funciones necesarias de la librería h3 y PrismaClient
import { defineEventHandler, createError } from "h3"; // h3: utilidad para crear manejadores de eventos
import { PrismaClient } from "@prisma/client"; // PrismaClient: cliente para interactuar con la base de datos usando Prisma

// Instanciamos el cliente de Prisma para poder realizar consultas a la base de datos
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Se obtiene la sesión del usuario, usando la función 'requireUserSession'
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanzamos un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de error 401, indicando que se requiere inicio de sesión
      message: "Requiere inicio se sesión", // Mensaje de error que se devuelve al usuario
    });
  }

  // Verificamos si el rol del usuario es 'Administrador' o 'Encargado'
  // Si no tiene uno de estos roles, se lanza un error de permisos insuficientes (401)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401, // Código de error 401, indicando que los permisos son insuficientes
      message: "Permisos insuficientes", // Mensaje que se envía si el usuario no tiene los permisos necesarios
    });
  }

  try {
    // Intentamos obtener todos los estados de usuario desde la base de datos mediante Prisma
    const estados = await prisma.estadoUsuario.findMany();

    // Retornamos los estados obtenidos de la base de datos al cliente
    return estados;
  } catch (error) {
    // Si ocurre un error al intentar obtener los estados, se captura aquí
    console.error("Error al obtener estados:", error);

    // Lanza un error 500 (Internal Server Error) si la consulta a la base de datos falla
    throw createError({
      status: 500, // Código de error 500, indicando que hubo un problema en el servidor
      message: "Error al obtener estados", // Mensaje de error que se devuelve al cliente
    });
  }
});
