// Importa la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importa las funciones necesarias de H3 para manejar eventos HTTP y crear errores personalizados
import { defineEventHandler, createError } from "h3";

// Define el manejador de eventos para la creación de una nueva categoría
export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa, obteniendo la información del usuario
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error con código 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesión", // Mensaje de error si el usuario no está autenticado
    });
  }

  // Verifica que el usuario logueado tenga rol de "Administrador" o "Encargado"
  // Si no tiene uno de esos roles, lanza un error de permisos insuficientes
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos adecuados
    });
  }

  // Lee el cuerpo de la solicitud para obtener el nombre de la nueva categoría
  const { nombreCategoria } = await readBody(event);

  try {
    // Intenta crear la nueva categoría en la base de datos
    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombreCategoria, // Utiliza el nombre de la categoría proporcionado en el cuerpo de la solicitud
      },
    });

    // Si la categoría se crea con éxito, devuelve un mensaje de éxito y el ID de la nueva categoría
    return {
      message: "Categoría creada con éxito", // Mensaje de éxito
      id: nuevaCategoria.idCategoria, // El ID de la nueva categoría creada
    };
  } catch (error) {
    // Si ocurre un error al crear la categoría, se captura y se muestra en la consola
    console.error("Error al crear categoría:", error);

    // Lanza un error con código 500 (Error interno del servidor) si algo falla al crear la categoría
    throw createError({
      status: 500,
      message: "Error al crear categoría", // Mensaje genérico de error en caso de falla
    });
  }
});
