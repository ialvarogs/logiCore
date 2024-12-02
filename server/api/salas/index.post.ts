import { defineEventHandler, createError, readBody } from "h3"; // Importa las herramientas de H3 para manejar eventos HTTP y errores.
import { validarEsquemaCreacionSala } from "~~/server/utils/schemas/general"; // Importa la función que valida el esquema para la creación de sala.
import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos.
import * as v from "valibot"; // Importa la librería 'valibot' para manejo de errores de validación.

export default defineEventHandler(async (event) => {
  // Define el manejador del evento HTTP.

  // Verifica si el usuario está autenticado.
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si no hay sesión, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje que indica que se necesita iniciar sesión.
    });
  }

  // Verifica si el usuario tiene los permisos necesarios (rol de Administrador o Encargado).
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene el rol adecuado, lanza un error 401.
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error indicando falta de permisos.
    });
  }

  try {
    // Lee el cuerpo de la solicitud que contiene los datos para crear la sala.
    const body = await readBody(event);
    // Valida los datos recibidos en el cuerpo de la solicitud.
    const validBody = await validarEsquemaCreacionSala(body);

    // Extrae los valores de los datos validados.
    const { numeroSala, nombreSala, capacidad, idNivel } = validBody;

    // Verifica que todos los campos requeridos estén presentes y sean válidos.
    if (!numeroSala || !nombreSala || capacidad === undefined || !idNivel) {
      throw createError({
        status: 400,
        message: "Todos los campos son obligatorios y deben ser válidos.", // Error si falta algún campo obligatorio.
      });
    }

    // Crea la nueva sala en la base de datos.
    const nuevaSala = await prisma.sala.create({
      data: {
        numeroSala: Number(numeroSala), // Convierte el número de la sala a tipo numérico.
        nombreSala, // Nombre de la sala.
        capacidad: Number(capacidad), // Convierte la capacidad a tipo numérico.
        idNivel: Number(idNivel), // Convierte el ID del nivel educativo a tipo numérico.
      },
    });

    // Retorna un mensaje de éxito con el ID de la nueva sala.
    return { message: "Sala creada con éxito.", id: nuevaSala.idSala };
  } catch (error) {
    // Manejo de errores si la validación de los datos falla.
    if (error instanceof v.ValiError) {
      throw createError({
        status: 400,
        message: "Datos de sala inválidos.", // Mensaje de error en caso de que los datos no sean válidos.
      });
    }

    // Manejo de errores generales (si ocurre un error al crear la sala).
    console.error("Error al crear sala:", error); // Imprime el error en la consola para depuración.
    throw createError({
      status: 500,
      message: "Error al crear sala.", // Mensaje de error en caso de fallo en la creación de la sala.
    });
  }
});
