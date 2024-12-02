// Importación de dependencias de H3 para manejar eventos y errores
import { defineEventHandler, createError } from "h3";
// Importación de las funciones de validación y asignación de responsable
import { validarEsquemaAsignarResponsable } from "~~/server/utils/schemas/asignarResponsable";
import { asignarResponsableAProducto } from "~~/server/utils/repositories/productos";

export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error de autenticación
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  // Verifica si el rol del usuario es Administrador o Encargado
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es adecuado, lanza un error de permisos insuficientes
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Permisos insuficientes", // Mensaje de error
    });
  }

  try {
    // Extrae los datos del cuerpo de la solicitud
    const body = await readBody(event);

    // Valida los datos utilizando el esquema correspondiente
    const validBody = await validarEsquemaAsignarResponsable(body);

    // Si la validación falla, lanza un error con los detalles
    if (!validBody) {
      throw createError({
        statusCode: 400, // Código de estado 400: Solicitud incorrecta
        message: "Datos inválidos", // Mensaje de error
      });
    }

    // Asigna el responsable al producto en la base de datos
    const nuevoResponsable = await asignarResponsableAProducto(validBody);

    // Devuelve el resultado de la operación
    return {
      statusCode: 201, // Código de estado 201: Creado exitosamente
      body: nuevoResponsable, // El nuevo responsable asignado
    };
  } catch (error) {
    // Manejo de errores en caso de que falle la operación
    console.error(
      "Error al asignar responsable al producto:",
      (error as Error).message || error
    );

    // Lanza un error con detalles adicionales
    throw createError({
      statusCode: (error as any).statusCode || 500, // Código de estado 500: Error interno del servidor
      message: (error as any).message || "Error interno del servidor", // Mensaje de error
    });
  }
});
