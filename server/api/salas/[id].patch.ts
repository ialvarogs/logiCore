import { defineEventHandler, readBody, createError } from "h3"; // Importa las herramientas necesarias de H3 para manejar eventos, leer cuerpos y generar errores.
import * as v from "valibot"; // Importa la librería de validación para manejar errores de validación en los datos.
import { validarEsquemaActualizacionSala } from "~~/server/utils/schemas/general"; // Importa el esquema de validación para la actualización de sala (debes verificar la ruta de importación).
import { actualizarSala } from "~~/server/utils/repositories/alimentadores"; // Importa la función que maneja la actualización de una sala en el repositorio de datos.

export default defineEventHandler(async (event) => {
  // Define un manejador para el evento HTTP, que se ejecuta de forma asíncrona.

  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si no está autenticado, lanza un error 401.
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión",
    });
  }

  // Verifica que el usuario tenga el rol adecuado para realizar la acción
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Solo los administradores y encargados pueden hacer la actualización
    throw createError({
      status: 401,
      message: "Permisos insuficientes",
    });
  }

  try {
    // Obtiene el ID de la sala desde los parámetros de la ruta y valida que sea un número.
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Este esquema asegura que el ID sea un número válido.
    );

    // Lee el cuerpo de la solicitud y valida que los datos sean correctos para la actualización de la sala.
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionSala // Aquí se valida que los datos enviados para la sala sean válidos según el esquema definido.
    );

    // Llama a la función para actualizar la sala en el repositorio (base de datos).
    const salaActualizada = await actualizarSala(id, body);
    if (!salaActualizada) {
      // Si la sala no se encuentra o no se puede actualizar, lanza un error 404.
      throw createError({
        status: 404,
        message: "La sala no existe",
      });
    }

    // Retorna la sala actualizada si todo salió bien
    return salaActualizada;
  } catch (error) {
    // Maneja errores de validación (por ejemplo, si los datos no son válidos según el esquema).
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de sala inválidos.", // Si hay un error de validación, devuelve un error 400 con un mensaje específico.
      });
    }

    // Si ocurre otro tipo de error, lo propaga para que sea manejado por el sistema
    throw error; // Propaga otros errores que no sean de validación.
  }
});
