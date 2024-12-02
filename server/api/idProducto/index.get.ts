// Importamos las funciones necesarias de 'h3' para manejar eventos HTTP y errores,
// y Prisma para interactuar con la base de datos.
import { defineEventHandler, createError, getQuery } from "h3";
import prisma from "~~/server/utils/prisma/prisma";

// Definimos el handler para el evento. Este código se ejecuta cuando se recibe una solicitud HTTP.
export default defineEventHandler(async (event) => {
  try {
    // Verificamos si el usuario tiene una sesión activa.
    const usuarioLog = await requireUserSession(event);

    // Si el usuario no está autenticado, lanzamos un error 401 (No autorizado).
    if (!usuarioLog) {
      throw createError({
        status: 401, // Código HTTP 401: No autorizado
        message: "Requiere inicio se sesión", // Mensaje de error si no hay sesión activa
      });
    }

    // Verificamos si el usuario tiene uno de los roles permitidos: "Administrador" o "Encargado".
    // Si el usuario no tiene el rol adecuado, lanzamos un error 401 (Permisos insuficientes).
    if (
      usuarioLog.user.rol !== "Administrador" &&
      usuarioLog.user.rol !== "Encargado"
    ) {
      throw createError({
        status: 401, // Código HTTP 401: No autorizado
        message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos suficientes
      });
    }

    // Obtenemos el parámetro 'individualizacionDelBien' de la URL (query string).
    const { individualizacionDelBien } = getQuery(event);

    // Si no se pasa el parámetro 'individualizacionDelBien', lanzamos un error 400 (Bad Request).
    if (!individualizacionDelBien) {
      throw createError({
        statusCode: 400, // Código HTTP 400: Solicitud incorrecta
        message: "El parámetro 'individualizacionDelBien' es requerido.", // Mensaje de error si el parámetro es faltante
      });
    }

    try {
      // Consultamos los productos de la base de datos cuyo 'individualizacionDelBien' coincida con el valor proporcionado.
      const productos = await prisma.producto.findMany({
        where: {
          individualizacionDelBien: individualizacionDelBien as string, // Filtramos por el parámetro 'individualizacionDelBien'
        },
        select: {
          idProducto: true, // Seleccionamos solo el campo 'idProducto' de los productos
        },
      });

      // Retornamos los IDs de los productos que coinciden con el parámetro proporcionado.
      return productos.map((producto) => producto.idProducto);
    } catch (error) {
      // Si ocurre un error al consultar los productos, lo registramos en la consola y lanzamos un error genérico.
      console.error(
        "Error al obtener productos por individualizacionDelBien:",
        error
      );
      throw new Error(
        "Error al obtener productos por individualizacionDelBien."
      );
    }
  } catch (error) {
    // Si ocurre un error en cualquier parte del proceso, lo registramos en la consola.
    console.error(
      "Error al obtener productos:",
      (error as Error).message || error
    );

    // Lanza un error con el código de estado y mensaje apropiado.
    throw createError({
      statusCode: (error as any).statusCode || 500, // Código de estado HTTP (500 si es un error general)
      message: (error as any).message || "Error interno del servidor", // Mensaje de error
    });
  }
});
