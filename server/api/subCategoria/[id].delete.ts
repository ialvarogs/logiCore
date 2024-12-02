import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos.
import { defineEventHandler, createError } from "h3"; // Importa las herramientas de H3 para manejar eventos HTTP y errores.
import { validarEsquemaIdNumericoRuta } from "#imports"; // Importa la función para validar que el ID en la URL es numérico.

export default defineEventHandler(async (event) => {
  // Define el manejador del evento HTTP.

  // Verifica si el usuario está autenticado.
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si no hay sesión de usuario, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje que indica que se necesita iniciar sesión.
    });
  }

  // Verifica si el usuario tiene permisos de "Administrador" o "Encargado".
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene el rol adecuado, lanza un error 401.
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error indicando que el usuario no tiene permisos suficientes.
    });
  }

  // Obtiene y valida el ID de la subcategoría desde los parámetros de la URL.
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta // Valida que el ID sea un número (función personalizada).
  );

  try {
    // Intenta eliminar la subcategoría de la base de datos.
    const subcategoria = await prisma.subcategoria.delete({
      where: { idSubcategoria: id }, // Busca la subcategoría por su ID y la elimina.
    });

    // Si la eliminación es exitosa, devuelve un mensaje de éxito con los detalles de la subcategoría eliminada.
    return { message: "Subcategoría eliminada con éxito", subcategoria };
  } catch (error) {
    // Si ocurre un error al intentar eliminar la subcategoría, se captura y muestra el error.
    console.error("Error al eliminar subcategoría:", error); // Imprime el error en la consola para depuración.

    // Lanza un error 500 indicando que hubo un problema al eliminar la subcategoría.
    throw createError({
      status: 500,
      message: "Error al eliminar subcategoría", // Mensaje de error al intentar eliminar la subcategoría.
    });
  }
});
