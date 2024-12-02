// Importamos el cliente de Prisma para interactuar con la base de datos y funciones auxiliares de manejo de errores.
import prisma from "~~/server/utils/prisma/prisma";
import { defineEventHandler, createError } from "h3";

// Definimos el handler para el evento de la ruta.
// Esta función se ejecuta cuando se realiza una solicitud a la ruta asociada.
export default defineEventHandler(async (event) => {
  // Verificamos si el usuario está autenticado y tiene una sesión activa.
  const usuarioLog = await requireUserSession(event);

  // Si no hay usuario autenticado, lanzamos un error con código 401 (no autorizado).
  if (!usuarioLog) {
    throw createError({
      status: 401, // Código de estado HTTP para "No autorizado"
      message: "Requiere inicio se sesión", // Mensaje de error que se enviará al cliente
    });
  }

  // Verificamos si el rol del usuario es "Administrador" o "Encargado".
  // Si no tiene uno de estos roles, lanzamos un error con código 401 (no autorizado).
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401, // Código de estado HTTP para "No autorizado"
      message: "Permisos insuficientes", // Mensaje de error que se enviará al cliente
    });
  }

  try {
    // Intentamos obtener la lista de todos los estados de conservación desde la base de datos utilizando Prisma.
    const estadosConservacion = await prisma.estadoConservacion.findMany();

    // Formateamos los datos obtenidos, extrayendo solo los campos relevantes.
    // Aquí, estamos creando un nuevo arreglo con los campos "id" y "estado" de cada estado de conservación.
    const estadosFormateados = estadosConservacion.map((estado) => ({
      id: estado.idEstado, // El identificador del estado de conservación
      estado: estado.estado, // El nombre o descripción del estado
    }));

    // Retornamos la lista formateada como respuesta a la solicitud.
    return estadosFormateados;
  } catch (error) {
    // Si ocurre algún error al obtener los estados de conservación, lo registramos en la consola.
    console.error("Error al obtener estados de conservación:", error);

    // Lanzamos un error con código 500 (Error interno del servidor) y un mensaje detallado.
    throw createError({
      status: 500, // Código de estado HTTP para "Error interno del servidor"
      message: "Error al obtener estados de conservación", // Mensaje de error que se enviará al cliente
    });
  }
});
