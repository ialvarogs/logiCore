// Importa la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importa las funciones necesarias de H3 para manejar eventos HTTP y crear errores personalizados
import { defineEventHandler, createError } from "h3";

// Define el manejador de eventos para obtener la lista de categorías
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
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene los permisos adecuados
    });
  }

  try {
    // Realiza una consulta a la base de datos para obtener la lista de categorías
    // Se incluye también las subcategorías asociadas a cada categoría
    const categorias = await prisma.categoria.findMany({
      include: {
        subcategorias: true, // Incluir las subcategorías si son necesarias en la respuesta
      },
    });

    // Formatea la lista de categorías para devolver solo los campos relevantes
    // En este caso, devuelve el 'id' y 'nombre' de cada categoría
    const categoriasFormateadas = categorias.map((categoria) => ({
      id: categoria.idCategoria,
      nombre: categoria.nombreCategoria,
    }));

    // Retorna las categorías formateadas como respuesta
    return categoriasFormateadas;
  } catch (error) {
    // Si ocurre un error al obtener las categorías, se captura y se muestra en la consola
    console.error("Error al obtener categorías:", error);

    // Lanza un error con código 500 (Error interno del servidor) si algo falla
    throw createError({
      status: 500,
      message: "Error al obtener categorías", // Mensaje de error genérico
    });
  }
});
