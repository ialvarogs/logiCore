// Importa las funciones necesarias para manejar eventos HTTP y errores en la API
import { defineEventHandler, readBody, createError } from "h3";
// Importa la librería 'valibot' para la validación de datos
import * as v from "valibot";
// Importa el esquema de validación para la actualización de nivel educativo
import { validarEsquemaActualizacionNivelEducativo } from "~~/server/utils/schemas/general"; // Asegúrate de importar el esquema correcto
// Importa la función del repositorio que maneja la actualización de nivel educativo
import { actualizarNivelEducativo } from "~~/server/utils/repositories/alimentadores"; // Asegúrate de que la ruta sea correcta

// Definición del handler para la ruta
export default defineEventHandler(async (event) => {
  // Verificación de sesión: Comprobamos si el usuario tiene una sesión activa
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si no está logueado, lanzamos un error 401 (No autorizado)
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje de error indicando que se necesita iniciar sesión
    });
  }

  // Verificación de permisos: Aseguramos que el usuario tenga el rol de "Administrador" o "Encargado"
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el rol no es uno de los permitidos, lanzamos un error 401 (Permisos insuficientes)
    throw createError({
      status: 401, // Código HTTP 401: No autorizado
      message: "Permisos insuficientes", // Mensaje indicando que no tiene permisos para esta acción
    });
  }

  try {
    // Obtener y validar el 'id' del nivel educativo desde los parámetros de la ruta
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Esquema de validación que asegura que el 'id' es un número válido
    );

    // Leer y validar el cuerpo de la solicitud para la actualización del nivel educativo
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionNivelEducativo // Esquema de validación para los datos del nivel educativo a actualizar
    );

    // Llamada a la función del repositorio para actualizar el nivel educativo en la base de datos
    const nivelEducativoActualizado = await actualizarNivelEducativo(id, body);

    // Si no se encuentra el nivel educativo para actualizar, lanzamos un error 404 (No encontrado)
    if (!nivelEducativoActualizado) {
      throw createError({
        status: 404, // Código HTTP 404: No encontrado
        message: "El nivel educativo no existe", // Mensaje indicando que no se pudo encontrar el nivel educativo
      });
    }

    // Retorna el nivel educativo actualizado como respuesta
    return nivelEducativoActualizado;
  } catch (error) {
    // Manejo de errores de validación: Si el error es una instancia de 'ValiError' de valibot
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400, // Código HTTP 400: Solicitud incorrecta (errores de validación)
        message: "Datos de nivel educativo inválidos.", // Mensaje de error para datos inválidos
      });
    }

    // Si ocurre cualquier otro error, lo lanzamos para ser manejado por el middleware global de errores
    throw error;
  }
});
