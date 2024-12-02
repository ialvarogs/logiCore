import { defineEventHandler, readBody, createError, getRouterParam } from "h3"; // Importa funciones de H3 para manejar eventos HTTP
import * as v from "valibot"; // Importa la librería de validación 'valibot'
import { actualizarProducto } from "~~/server/utils/repositories/productos"; // Importa la función para actualizar el producto en el repositorio
import { validarEsquemaActualizacionProducto } from "~~/server/utils/schemas/productos"; // Importa el esquema de validación para la actualización del producto

// Define el manejador del evento HTTP
export default defineEventHandler(async (event) => {
  // Verifica si el usuario está logueado. Si no, devuelve un error 401 (No autorizado)
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error de autenticación (No autorizado)
      message: "Requiere inicio se sesión", // Mensaje de error
    });
  }

  try {
    // Obtiene el ID del producto desde los parámetros de la URL y lo valida con el esquema
    const { id } = await getValidatedRouterParams(
      event, // Extrae los parámetros de la ruta
      validarEsquemaIdNumericoRuta // Valida que el ID sea un número válido
    );

    // Si no se obtiene un ID válido, se lanza un error 400 (Bad Request)
    if (!id) {
      throw createError({
        status: 400, // Error de solicitud incorrecta
        message: "ID de producto inválido.", // Mensaje de error
      });
    }

    // Lee y valida el cuerpo de la solicitud utilizando un esquema de validación
    const body = await readBody(event); // Extrae el cuerpo de la solicitud
    const datosValidos = await readValidatedBody(
      event, // Lee el cuerpo de la solicitud y lo valida
      validarEsquemaActualizacionProducto // Valida el cuerpo de acuerdo con el esquema de validación
    );

    // Si los datos no son válidos, lanza un error 400 (Bad Request)
    if (!datosValidos) {
      throw createError({
        status: 400, // Error de solicitud incorrecta
        message: "Datos de producto inválidos.", // Mensaje de error
      });
    }

    // Actualiza el producto en la base de datos utilizando la función 'actualizarProducto'
    const productoActualizado = await actualizarProducto(id, body);
    // Si el producto no existe o no pudo ser actualizado, lanza un error 404 (Not Found)
    if (!productoActualizado) {
      throw createError({
        status: 404, // Error de no encontrado
        message: "El producto no existe.", // Mensaje de error
      });
    }

    // Retorna el producto actualizado
    return productoActualizado;
  } catch (error) {
    // Si ocurre un error de validación de 'valibot', lanza un error 400 con un mensaje de datos inválidos
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400, // Error de solicitud incorrecta
        message: "Datos de producto inválidos.", // Mensaje de error
      });
    }

    // Si ocurre otro tipo de error, lo lanza
    throw error;
  }
});
