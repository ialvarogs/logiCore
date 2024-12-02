// Importa la instancia de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importa las funciones necesarias de h3 para manejar eventos y errores HTTP
import { defineEventHandler, createError } from "h3";
// Importa la función que valida el esquema de un ID numérico desde los parámetros de la ruta
import { validarEsquemaIdNumericoRuta } from "#imports";

// Define el manejador del evento para la ruta solicitada (esto es un handler HTTP)
export default defineEventHandler(async (event: any) => {
  // Verifica si el usuario está autenticado (sesión iniciada)
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error 401: Usuario no autenticado
      message: "Requiere inicio se sesión", // Mensaje de error cuando el usuario no ha iniciado sesión
    });
  }

  // Verifica si el usuario tiene el rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401, // Error 401: Usuario sin permisos suficientes
      message: "Permisos insuficientes", // Mensaje de error para usuarios sin permisos adecuados
    });
  }

  // Obtiene el 'id' de los parámetros de la ruta, y valida que sea un ID numérico
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta // Función que valida que el parámetro ID sea un número
  );

  try {
    // Verifica si el proveedor existe en la base de datos usando Prisma
    const proveedor = await prisma.proveedor.findUnique({
      where: { idProveedor: Number(id) }, // Busca el proveedor por ID en la base de datos
    });

    // Si el proveedor no existe, lanza un error 404 (No encontrado)
    if (!proveedor) {
      throw createError({
        status: 404, // Error 404: Recurso no encontrado
        message: "Proveedor no encontrado.", // Mensaje de error cuando no se encuentra el proveedor
      });
    }

    // Si el proveedor existe, se procede a eliminarlo de la base de datos
    await prisma.proveedor.delete({
      where: { idProveedor: Number(id) }, // Elimina el proveedor por su ID
    });

    // Devuelve una respuesta exitosa con un mensaje
    return { message: "Proveedor eliminado con éxito." };
  } catch (error) {
    // En caso de un error (por ejemplo, problemas con la base de datos), se maneja el error aquí
    console.error("Error al eliminar proveedor:", error); // Registra el error en la consola
    throw createError({
      status: 500, // Error 500: Error interno del servidor
      message: "Error al eliminar proveedor.", // Mensaje de error general
    });
  }
});
