// Importación de dependencias necesarias de H3 y funciones de validación
import { defineEventHandler, readBody, createError, getRouterParam } from "h3";
import {
  asignarFechaDevolucion,
  asignarResponsableAProducto,
} from "~~/server/utils/repositories/productos"; // Funciones para actualizar datos de productos
import {
  validarEsquemaFechaDevolucion,
  validarEsquemaIdNumericoRuta,
} from "~~/server/utils/schemas/general"; // Esquemas de validación para fechas y IDs

// Define el manejador del evento para esta API
export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, retorna un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  // Verifica si el usuario tiene permisos adecuados (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es adecuado, lanza un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código de estado 401: No autorizado
      message: "Permisos insuficientes", // Mensaje si el usuario no tiene los permisos requeridos
    });
  }

  try {
    // Extrae y valida el ID desde los parámetros de la URL
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Valida el ID con un esquema específico
    );

    // Lee el cuerpo de la solicitud y valida la fecha de devolución con el esquema adecuado
    const body = await readValidatedBody(event, validarEsquemaFechaDevolucion);
    const { fecha, idProducto } = body; // Extrae los datos del cuerpo (fecha y idProducto)

    // Imprime los datos para asegurar que los parámetros estén correctos
    console.log(
      "Datos a actualizar = idUsuario: ",
      id,
      "Fecha: ",
      fecha,
      "idProducto: ",
      idProducto
    );

    // Llama a la función para asignar la fecha de devolución y obtener el resultado
    const nuevaFecha = asignarFechaDevolucion(fecha, idProducto, id);

    // Devuelve el nuevo registro creado (la fecha de devolución asignada)
    return {
      statusCode: 201, // Código de estado 201: Recurso creado
      body: nuevaFecha, // El cuerpo de la respuesta incluye la nueva fecha asignada
    };
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola para facilitar la depuración
    console.error(
      "Error al asignar responsable al producto:",
      (error as Error).message || error
    );

    // Lanza un error con un código de estado adecuado, normalmente 500 para errores internos del servidor
    throw createError({
      statusCode: (error as any).statusCode || 500, // Código de estado 500: Error interno
      message: (error as any).message || "Error interno del servidor", // Mensaje de error
    });
  }
});
