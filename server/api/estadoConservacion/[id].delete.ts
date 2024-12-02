// Importa la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importa las funciones necesarias de H3 para manejar eventos HTTP y crear errores personalizados
import { defineEventHandler, createError } from "h3";
// Importa la validación para asegurar que el parámetro de la ruta (ID) sea numérico
import { validarEsquemaIdNumericoRuta } from "#imports"; // Asegúrate de tener la validación adecuada

// Define el manejador de eventos para la eliminación de un estado de conservación
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

  // Obtiene y valida el ID de estado de conservación desde los parámetros de la ruta
  // Utiliza 'validarEsquemaIdNumericoRuta' para asegurarse de que el ID sea numérico
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta // Validación del ID numérico
  );

  try {
    // Intenta eliminar el estado de conservación correspondiente en la base de datos
    const estado = await prisma.estadoConservacion.delete({
      where: { idEstado: id }, // El ID del estado de conservación que se desea eliminar
    });

    // Si la eliminación es exitosa, retorna un mensaje de éxito con los detalles del estado eliminado
    return { message: "Estado de conservación eliminado con éxito", estado };
  } catch (error) {
    // Si ocurre un error al eliminar el estado de conservación, se captura y se muestra en la consola
    console.error("Error al eliminar estado de conservación:", error);

    // Lanza un error con código 500 (Error interno del servidor) si algo falla durante la eliminación
    throw createError({
      status: 500,
      message: "Error al eliminar estado de conservación", // Mensaje de error genérico
    });
  }
});
