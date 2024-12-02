import { defineEventHandler, readBody, createError } from "h3"; // Importa herramientas de H3 para definir manejadores de eventos y manejar errores.
import * as v from "valibot"; // Importa la librería valibot para validación de datos.
import { validarEsquemaActualizacionSubcategoria } from "~~/server/utils/schemas/general"; // Importa el esquema de validación para la actualización de subcategorías.
import { actualizarSubcategoria } from "~~/server/utils/repositories/alimentadores"; // Importa la función que actualiza la subcategoría en la base de datos.

export default defineEventHandler(async (event) => {
  // Define el manejador del evento HTTP para actualizar una subcategoría.

  // Verifica si el usuario está autenticado.
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si el usuario no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error cuando no hay sesión.
    });
  }

  // Verifica si el usuario tiene permisos de "Administrador" o "Encargado".
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene los permisos adecuados, lanza un error 401.
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error indicando que no tiene permisos suficientes.
    });
  }

  try {
    // Obtiene y valida el ID de la subcategoría desde los parámetros de la URL.
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Valida que el ID sea numérico, con una función de validación personalizada.
    );

    // Lee y valida el cuerpo de la solicitud.
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionSubcategoria // Valida que el cuerpo de la solicitud cumpla con el esquema esperado.
    );

    console.log(body); // Para depuración: imprime el cuerpo de la solicitud (en producción esto no se recomienda).

    // Actualiza la subcategoría en la base de datos mediante el repositorio.
    const subcategoriaActualizada = await actualizarSubcategoria(id, body);
    if (!subcategoriaActualizada) {
      // Si la subcategoría no existe o no se pudo actualizar, lanza un error 404.
      throw createError({
        status: 404,
        message: "La subcategoría no existe", // Mensaje de error si no se encuentra la subcategoría.
      });
    }

    // Retorna la subcategoría actualizada como respuesta exitosa.
    return subcategoriaActualizada; // Devuelve los datos de la subcategoría actualizada.
  } catch (error) {
    // Manejo de errores de validación.
    if (error instanceof v.ValiError) {
      // Si el error es un error de validación de la librería valibot, se maneja de esta forma.
      throw createError({
        status: 400,
        message: "Datos de subcategoría inválidos.", // Mensaje de error si los datos enviados no son válidos.
      });
    }

    // Si el error no es de validación, lo vuelve a lanzar para ser manejado por un sistema de manejo de errores global.
    throw error;
  }
});
