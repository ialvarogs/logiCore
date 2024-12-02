import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos.
import { defineEventHandler, createError } from "h3"; // Importa herramientas de H3 para definir el manejador de eventos y crear errores personalizados.

export default defineEventHandler(async (event) => {
  // Define el manejador del evento para la creación de una nueva subcategoría.

  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si el usuario no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }

  // Verifica si el usuario tiene permisos de "Administrador" o "Encargado"
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene permisos adecuados, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error indicando que el usuario no tiene permisos suficientes.
    });
  }

  // Lee el cuerpo de la solicitud para obtener el nombre de la subcategoría y el id de la categoría.
  const { nombreSubcategoria, idCategoria } = await readBody(event);

  try {
    // Crea la nueva subcategoría en la base de datos usando Prisma
    const nuevaSubcategoria = await prisma.subcategoria.create({
      data: {
        nombreSubcategoria, // El nombre de la subcategoría que el usuario envió en la solicitud.
        idCategoria, // El id de la categoría asociada a la nueva subcategoría.
      },
    });

    // Devuelve un mensaje de éxito y el id de la nueva subcategoría creada.
    return {
      message: "Subcategoría creada con éxito", // Mensaje de éxito indicando que la subcategoría se creó correctamente.
      id: nuevaSubcategoria.idSubcategoria, // El id de la nueva subcategoría creada.
    };
  } catch (error) {
    // Si ocurre un error durante la creación, lo captura y lo maneja.
    console.error("Error al crear subcategoría:", error); // Imprime el error en la consola para depuración.
    throw createError({
      status: 500, // Error interno del servidor.
      message: "Error al crear subcategoría", // Mensaje de error que se retorna al cliente en caso de fallar la creación.
    });
  }
});
