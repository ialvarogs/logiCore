// Importa las funciones necesarias de H3 para manejar eventos HTTP y crear errores personalizados
import { defineEventHandler, readBody, createError } from "h3";
// Importa todas las validaciones de Valibot
import * as v from "valibot";
// Importa el esquema de validación para la actualización de categorías
import { validarEsquemaActualizacionCategoria } from "~~/server/utils/schemas/general";
// Importa la función para actualizar una categoría en el repositorio de alimentadores
import { actualizarCategoria } from "~~/server/utils/repositories/alimentadores";

// Define el manejador de eventos para la ruta de actualización de categoría
export default defineEventHandler(async (event) => {
  // Verifica si el usuario tiene una sesión activa, obteniendo la información del usuario
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error con código 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesión", // Mensaje de error si el usuario no está autenticado
    });
  }

  // Verifica que el usuario logueado tenga rol de "Administrador" o "Encargado"
  // Si no tiene uno de esos roles, lanza un error de permisos insuficientes
  if (usuarioLog.user.rol !== "Administrador" || "Encargado") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos suficientes
    });
  }

  try {
    // Obtiene y valida el ID de categoría desde los parámetros de la ruta
    // Se utiliza 'validarEsquemaIdNumericoRuta' para asegurar que el ID sea numérico
    const { id } = await getValidatedRouterParams(
      event,
      validarEsquemaIdNumericoRuta // Validación del ID numérico
    );

    // Lee y valida el cuerpo de la solicitud usando el esquema 'validarEsquemaActualizacionCategoria'
    // Esto garantiza que los datos recibidos para la categoría sean correctos
    const body = await readValidatedBody(
      event,
      validarEsquemaActualizacionCategoria // Validación del cuerpo de la solicitud
    );

    // Actualiza la categoría en el repositorio usando el ID y el cuerpo de la solicitud
    const categoriaActualizada = await actualizarCategoria(id, body);

    // Si no se encuentra la categoría (no se pudo actualizar), lanza un error con código 404
    if (!categoriaActualizada) {
      throw createError({
        status: 404,
        message: "La categoría no existe", // Mensaje de error si no se encuentra la categoría a actualizar
      });
    }

    // Si la categoría se actualizó correctamente, retorna la categoría actualizada
    return categoriaActualizada;
  } catch (error) {
    // Manejo de errores de validación: si el error es una instancia de 'ValiError' de Valibot
    if (error instanceof v.ValiError) {
      // Si los datos enviados no son válidos según el esquema, lanza un error 400 (Bad Request)
      throw createError({
        status: 400,
        message: "Datos de categoría inválidos.", // Mensaje de error si los datos de la categoría no son válidos
      });
    }

    // Si ocurre cualquier otro error, se vuelve a lanzar para ser manejado más arriba
    throw error;
  }
});
