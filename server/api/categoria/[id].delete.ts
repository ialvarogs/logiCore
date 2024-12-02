// Importa la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importa las funciones necesarias de H3 para manejar eventos HTTP y crear errores personalizados
import { defineEventHandler, createError } from "h3";
// Importa una función para validar parámetros de ruta (en este caso, un ID numérico)
import { validarEsquemaIdNumericoRuta } from "#imports"; // Asegúrate de tener la validación correcta en el archivo de imports

// Define el manejador de eventos para la ruta de eliminación de categoría
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
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene los permisos necesarios
    });
  }

  // Obtiene el parámetro de ruta 'id' y lo valida usando el esquema 'validarEsquemaIdNumericoRuta'
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta // Este esquema valida que el ID sea un número
  );

  try {
    // Intenta eliminar la categoría de la base de datos usando Prisma
    const categoria = await prisma.categoria.delete({
      where: { idCategoria: id }, // Elimina la categoría según el 'idCategoria'
    });

    // Si la eliminación es exitosa, devuelve un mensaje de éxito y los detalles de la categoría eliminada
    return { message: "Categoría eliminada con éxito", categoria };
  } catch (error) {
    // Si ocurre un error durante la eliminación, se captura y se muestra en la consola
    console.error("Error al eliminar categoría:", error);

    // Lanza un error con código 500 (Error interno del servidor) si algo falla al eliminar la categoría
    throw createError({
      status: 500,
      message: "Error al eliminar categoría", // Mensaje genérico para un error en el servidor
    });
  }
});
