import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos.
import { defineEventHandler, createError } from "h3"; // Importa herramientas de H3 para definir el manejador de eventos HTTP y para crear errores personalizados.

export default defineEventHandler(async (event) => {
  // Define el manejador del evento para obtener la lista de subcategorías.

  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si el usuario no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }

  // Verifica si el usuario tiene permisos de "Administrador" o "Encargado"
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene permisos adecuados, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error indicando que el usuario no tiene permisos suficientes.
    });
  }

  try {
    // Obtiene la lista de todas las subcategorías de la base de datos usando Prisma.
    const subcategorias = await prisma.subcategoria.findMany({
      include: {
        categoria: true, // Incluye los detalles de la categoría relacionada con cada subcategoría.
      },
    });

    // Formatea la respuesta para incluir solo los campos necesarios
    const subcategoriasFormateadas = subcategorias.map((subcategoria) => ({
      id: subcategoria.idSubcategoria, // Asigna el ID de la subcategoría.
      nombre: subcategoria.nombreSubcategoria, // Asigna el nombre de la subcategoría.
      idCategoria: subcategoria.idCategoria, // Asigna el ID de la categoría.
      categoria: subcategoria.categoria.nombreCategoria, // Asigna el nombre de la categoría relacionada.
    }));

    // Retorna la lista de subcategorías formateadas
    return subcategoriasFormateadas; // Devuelve los datos de las subcategorías con la información formateada.
  } catch (error) {
    // Si ocurre un error al obtener las subcategorías, se maneja aquí.
    console.error("Error al obtener subcategorías:", error); // Imprime el error en la consola para depuración.
    throw createError({
      status: 500, // El error es un error interno del servidor.
      message: "Error al obtener subcategorías", // Mensaje de error que se retorna al cliente.
    });
  }
});
