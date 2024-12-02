// Importamos las funciones necesarias de H3 para manejar eventos y errores
import { defineEventHandler, readBody, createError, getRouterParam } from "h3";
// Importamos la librería de validación valibot para manejar errores de validación
import * as v from "valibot";
// Importamos el esquema de validación para la actualización de procedencia
import { validarEsquemaActualizacionProcedencia } from "~~/server/utils/schemas/general";
// Importamos la función para actualizar la procedencia en el repositorio
import { actualizarProcedencia } from "~~/server/utils/repositories/alimentadores";

// Definimos el handler para la ruta
export default defineEventHandler(async (event) => {
  // Verificamos si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no está logueado, lanzamos un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje si el usuario no está autenticado
    });
  }

  // Verificamos que el usuario tenga el rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es adecuado, lanzamos un error 401
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje si el usuario no tiene permisos
    });
  }

  try {
    // Obtenemos el ID de procedencia desde los parámetros de la ruta
    const { id } = await getValidatedRouterParams(
      event, // Obtenemos los parámetros de la ruta
      validarEsquemaIdNumericoRuta // Validamos que el ID sea numérico
    );

    // Leemos y validamos el cuerpo de la solicitud (que contiene los nuevos datos de la procedencia)
    const body = await readValidatedBody(
      event, // Obtenemos el cuerpo de la solicitud
      validarEsquemaActualizacionProcedencia // Validamos los datos de la procedencia con el esquema
    );

    // Intentamos actualizar la procedencia en el repositorio (base de datos)
    const procedenciaActualizada = await actualizarProcedencia(id, body);

    // Si la procedencia no existe, lanzamos un error 404
    if (!procedenciaActualizada) {
      throw createError({
        status: 404, // Código HTTP 404: No encontrado
        message: "La procedencia no existe", // Mensaje si no encontramos la procedencia
      });
    }

    // Si la actualización es exitosa, retornamos los datos actualizados de la procedencia
    return procedenciaActualizada;
  } catch (error) {
    // Si el error es de validación de datos, lanzamos un error 400 (Solicitud incorrecta)
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400, // Código HTTP 400: Solicitud incorrecta
        message: "Datos de procedencia inválidos.", // Mensaje de error para datos inválidos
      });
    }

    // Si ocurre cualquier otro error, lo lanzamos tal cual
    throw error;
  }
});
