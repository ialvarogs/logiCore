// api/productos.ts
import { defineEventHandler, createError } from "h3"; // Importa las funciones para manejar eventos HTTP y crear errores
import { validarEsquemaCreacionProducto } from "~~/server/utils/schemas/productos"; // Importa el esquema de validación para la creación de productos
import { crearProducto } from "~~/server/utils/repositories/productos"; // Importa la función que inserta un nuevo producto en la base de datos

// Define el manejador del evento para la ruta solicitada (esto es un handler HTTP)
export default defineEventHandler(async (event) => {
  // Verifica si el usuario está autenticado (sesión iniciada)
  const usuarioLog = await requireUserSession(event);

  // Si el usuario no está autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error 401: Usuario no autenticado
      message: "Requiere inicio se sesión", // Mensaje para el error de autenticación
    });
  }

  try {
    // Extrae los datos del cuerpo de la solicitud HTTP usando 'readBody'
    const body = await readBody(event);

    // Valida los datos del cuerpo con el esquema de validación para la creación del producto
    const validBody = await validarEsquemaCreacionProducto(body);

    // Si los datos no son válidos según el esquema, lanza un error 400 (Bad Request)
    if (!validBody) {
      throw createError({
        statusCode: 400, // Error 400: Datos inválidos
        message: "Datos inválidos", // Mensaje para el error de validación
      });
    }

    // Llama a la función 'crearProducto' que inserta el nuevo producto en la base de datos
    const nuevoProducto = await crearProducto(validBody);

    // Devuelve una respuesta con el nuevo producto y un código de estado 201 (Creado)
    return {
      statusCode: 201, // Código de estado HTTP 201: Recurso creado exitosamente
      body: nuevoProducto, // El cuerpo de la respuesta será el producto recién creado
    };
  } catch (error) {
    // Captura cualquier error que ocurra durante la creación del producto
    console.error(
      "Error al crear el producto:", // Mensaje de depuración en caso de error
      (error as Error).message || error // Extrae el mensaje de error si está disponible
    );

    // Lanza un error 500 (Error interno del servidor) si algo falla
    throw createError({
      statusCode: (error as any).statusCode || 500, // Código de error (por defecto 500)
      message: (error as any).message || "Error interno del servidor", // Mensaje de error
    });
  }
});
