import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos
import { defineEventHandler, createError } from "h3"; // Importa las funciones de H3 para manejar eventos y crear errores
import { validarEsquemaIdNumericoRuta } from "#imports"; // Importa un validador para asegurarse de que el ID en la ruta sea un número

// Define el manejador de eventos para este endpoint
export default defineEventHandler(async (event) => {
  // Obtiene la sesión del usuario logueado, mediante la función `requireUserSession`
  const usuarioLog = await requireUserSession(event);

  // Si no se encuentra un usuario logueado, responde con un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  // Verifica que el usuario tenga uno de los roles permitidos (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene el rol adecuado
    });
  }

  // Extrae el `id` del producto desde los parámetros de la URL utilizando la validación del esquema
  const { id } = await getValidatedRouterParams(
    event, // Obtiene el parámetro de la ruta
    validarEsquemaIdNumericoRuta // Valida que el ID sea un número
  );

  try {
    // Verifica si el producto existe en la base de datos utilizando el ID
    const producto = await prisma.producto.findUnique({
      where: { idProducto: id }, // Busca el producto por su ID
    });

    // Si el producto no existe, lanza un error 404 (No encontrado)
    if (!producto) {
      throw createError({
        status: 404, // Código de estado HTTP 404
        message: "Producto no encontrada.", // Mensaje de error si no se encuentra el producto
      });
    }

    // Verifica si el producto está asignado a alguna sala
    const sala = await prisma.productoSala.findFirst({
      where: { idProducto: id }, // Busca en la tabla `productoSala` si existe una asignación
    });

    // Si el producto está asignado a una sala, elimina la relación en la tabla `productoSala`
    if (sala) {
      await prisma.productoSala.deleteMany({
        where: { idProducto: id }, // Elimina todas las entradas relacionadas con el producto en la tabla `productoSala`
      });
    }

    // Elimina el producto de la base de datos
    await prisma.producto.delete({
      where: { idProducto: id }, // Elimina el producto por su ID
    });

    // Retorna un mensaje de éxito indicando que el producto fue eliminado correctamente
    return { message: "Producto eliminado con éxito." };
  } catch (error) {
    // Si ocurre un error en alguna de las operaciones anteriores, lo captura y lo imprime en la consola
    console.error("Error al eliminar Producto:", error);

    // Lanza un error 500 (Error interno del servidor) con el mensaje correspondiente
    throw createError({
      status: 500, // Código de estado HTTP 500
      message: "Error al eliminar Producto.", // Mensaje de error genérico
    });
  }
});
