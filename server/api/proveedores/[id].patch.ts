// Importa las dependencias necesarias para la manipulación de eventos HTTP y validación
import { defineEventHandler, readBody, createError, getRouterParam } from "h3";
// Importa la librería de validación para manejar errores de validación de datos
import * as v from "valibot";
// Importa los esquemas de validación y las funciones de repositorio
import { validarEsquemaActualizacionProveedor } from "~~/server/utils/schemas/general";
import { actualizarProveedor } from "~~/server/utils/repositories/alimentadores";

// Define el manejador del evento para la ruta solicitada (esto es un handler HTTP)
export default defineEventHandler(async (event) => {
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

  try {
    // Obtiene el 'id' de los parámetros de la ruta, y valida que sea un ID numérico
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Función que valida que el parámetro ID sea un número
    );

    // Lee y valida el cuerpo de la solicitud con los datos del proveedor a actualizar
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionProveedor // Esquema de validación para la actualización del proveedor
    );

    // Actualiza el proveedor en el repositorio usando la función 'actualizarProveedor'
    const proveedorActualizado = await actualizarProveedor(id, body);

    // Si no se encuentra el proveedor, lanza un error 404 (Proveedor no encontrado)
    if (!proveedorActualizado) {
      throw createError({
        status: 404, // Error 404: Recurso no encontrado
        message: "El proveedor no existe", // Mensaje de error cuando no se encuentra el proveedor
      });
    }

    // Devuelve el proveedor actualizado
    return proveedorActualizado;
  } catch (error) {
    // Si ocurre un error de validación de los datos del proveedor, lanza un error 400
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400, // Error 400: Datos inválidos
        message: "Datos de proveedor inválidos.", // Mensaje de error de validación
      });
    }

    // Si ocurre cualquier otro error, lanza ese error
    throw error;
  }
});
