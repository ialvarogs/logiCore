// Importa las funciones necesarias para manejar eventos HTTP, leer el cuerpo de la solicitud y crear errores
import { defineEventHandler, readBody, createError } from "h3";
// Importa la librería de validación 'valibot' para manejar errores de validación
import * as v from "valibot";
// Importa el esquema de validación para la actualización de estado de conservación
import { validarEsquemaActualizacionEstadoConservacion } from "~~/server/utils/schemas/general";
// Importa la función para actualizar el estado de conservación en el repositorio
import { actualizarEstadoConservacion } from "~~/server/utils/repositories/alimentadores";

// Define el manejador del evento para actualizar un estado de conservación
export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error con código 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesión", // Mensaje de error si el usuario no está autenticado
    });
  }

  // Verifica si el usuario logueado tiene rol de "Administrador" o "Encargado"
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
    // Obtiene y valida el ID del estado de conservación desde los parámetros de la ruta
    // Se asegura de que el ID sea numérico utilizando la validación correspondiente
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Validación para asegurarse de que el ID sea numérico
    );

    // Lee el cuerpo de la solicitud y valida los datos según el esquema de actualización
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionEstadoConservacion // Validación del cuerpo de la solicitud
    );

    // Intenta actualizar el estado de conservación en el repositorio
    const estadoActualizado = await actualizarEstadoConservacion(id, body);

    // Si no se encuentra el estado de conservación para actualizar, lanza un error 404
    if (!estadoActualizado) {
      throw createError({
        status: 404,
        message: "El estado de conservación no existe", // Mensaje de error si el estado de conservación no se encuentra
      });
    }

    // Retorna el estado de conservación actualizado
    return estadoActualizado;
  } catch (error) {
    // Manejo de errores de validación, si los datos no cumplen con el esquema esperado
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de estado de conservación inválidos.", // Mensaje de error si los datos son inválidos
      });
    }

    // Si ocurre otro tipo de error, lo lanza para ser gestionado por el middleware global
    throw error;
  }
});
