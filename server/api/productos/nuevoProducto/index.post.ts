// Importa las dependencias necesarias de H3 para manejar los eventos HTTP y errores
import { defineEventHandler, createError } from "h3";
// Importa los esquemas de validación de los productos
import { validaresquemaAgregarProducto } from "~~/server/utils/schemas/productos";
// Importa las funciones de repositorio para agregar stock y crear productos
import {
  agregarStock,
  crearProducto,
} from "~~/server/utils/repositories/productos";

// Define el manejador del evento para la ruta del API
export default defineEventHandler(async (event) => {
  // Verifica si el usuario está autenticado obteniendo la sesión del evento
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error si el usuario no está logueado
    });
  }

  // Verifica si el usuario tiene uno de los roles permitidos (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene los permisos adecuados, lanza un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje si el usuario no tiene permisos
    });
  }

  try {
    // Lee el cuerpo de la solicitud que contiene los datos del producto
    const body = await readBody(event);

    // Valida los datos del producto usando el esquema de validación
    const validBody = await validaresquemaAgregarProducto(body);

    // Si los datos no son válidos, lanza un error 400 (Bad Request)
    if (!validBody) {
      throw createError({
        statusCode: 400, // Código HTTP 400: Bad Request
        message: "Datos inválidos", // Mensaje de error si los datos no son válidos
      });
    }

    // Agrega el stock al producto en la base de datos usando la función correspondiente
    const nuevoProducto = await agregarStock(validBody);

    // Devuelve el producto recién creado junto con el código de estado 201 (Creado)
    return {
      statusCode: 201, // Código HTTP 201: Recurso creado
      body: nuevoProducto, // Retorna el objeto del nuevo producto
    };
  } catch (error) {
    // Si ocurre un error, lo imprime en la consola para su depuración
    console.error(
      "Error al crear el producto:",
      (error as Error).message || error // Mensaje de error
    );

    // Lanza un error con el código adecuado, normalmente 500 (Error interno del servidor)
    throw createError({
      statusCode: (error as any).statusCode || 500, // Código HTTP 500: Error interno del servidor
      message: (error as any).message || "Error interno del servidor", // Mensaje de error
    });
  }
});
