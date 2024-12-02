import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos.
import { defineEventHandler, createError } from "h3"; // Importa las herramientas necesarias de H3 para manejar eventos HTTP y errores.

export default defineEventHandler(async (event) => {
  // Define un manejador para el evento HTTP que se ejecuta de forma asíncrona.

  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si el usuario no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error si no está autenticado.
    });
  }

  // Verifica que el usuario tenga el rol adecuado para realizar la acción
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Solo los usuarios con rol de "Administrador" o "Encargado" pueden acceder.
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Si el usuario no tiene permisos, lanza un error 401.
    });
  }

  try {
    // Obtiene la lista de salas desde la base de datos, incluyendo información del nivel educativo relacionado con cada sala.
    const salas = await prisma.sala.findMany({
      include: {
        nivelEducativo: true, // Incluye los datos relacionados con el nivel educativo de cada sala.
      },
    });

    // Formatea la respuesta para incluir solo los campos necesarios y dar un formato más limpio
    const salasFormateadas = salas.map((sala) => ({
      id: sala.idSala, // Usa el campo 'idSala' como identificador único
      numero: sala.numeroSala, // Número de la sala
      nombre: sala.nombreSala, // Nombre de la sala
      capacidad: sala.capacidad, // Capacidad de la sala
      idNivel: sala.idNivel, // ID del nivel educativo asociado
      nivel: sala.nivelEducativo.nivelEducativo, // Nombre del nivel educativo (asumimos que el campo 'nivelEducativo' contiene el nombre del nivel)
    }));

    return salasFormateadas; // Retorna la lista de salas formateadas con la información necesaria.
  } catch (error) {
    // Manejo de errores en caso de que la consulta a la base de datos falle.
    console.error("Error al obtener salas:", error); // Imprime el error en la consola para propósitos de depuración.
    throw createError({
      status: 500, // Lanza un error 500 (error interno del servidor) si algo sale mal.
      message: "Error al obtener salas.", // Mensaje de error general para indicar un fallo en la obtención de las salas.
    });
  }
});
