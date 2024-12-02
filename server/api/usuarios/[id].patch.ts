import { defineEventHandler, createError } from "h3"; // Importa las funciones necesarias para manejar eventos y errores en H3.
import { actualizarUsuario } from "~~/server/utils/repositories/users"; // Importa la función que se encarga de actualizar el usuario.
import {
  validarActualizacionUsuario, // Importa el validador para los datos de actualización del usuario.
  validarEsquemaIdNumericoRuta, // Importa el validador para el ID numérico de la ruta.
} from "~~/server/utils/schemas/general"; // Asegúrate de que los esquemas de validación estén correctamente definidos.

export default defineEventHandler(async (event) => {
  // Define el manejador de eventos para la actualización de usuario.

  // 1. Verificación de la sesión del usuario
  const usuarioLog = await requireUserSession(event); // Verifica si el usuario está autenticado.
  if (!usuarioLog) {
    // Si no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }

  // 2. Validación del ID del usuario en la ruta
  const { id } = await getValidatedRouterParams(
    event,
    validarEsquemaIdNumericoRuta // Valida que el ID proporcionado en la ruta sea un número válido.
  );

  // 3. Lectura y validación de los datos del cuerpo de la solicitud
  const usuarioAActualizar = await readValidatedBody(
    event,
    validarActualizacionUsuario // Valida que los datos proporcionados en el cuerpo de la solicitud sean correctos para la actualización del usuario.
  );

  try {
    // 4. Log para verificar los datos antes de la actualización
    console.log("Datos a actualizar:", usuarioAActualizar); // Muestra los datos que se van a actualizar en la consola para su verificación.

    // 5. Llamada a la función para actualizar el usuario
    const usuarioActualizado = await actualizarUsuario(id, usuarioAActualizar); // Llama a la función que realiza la actualización en la base de datos.

    if (usuarioActualizado) {
      // Si la actualización es exitosa, retorna los datos del usuario actualizado.
      return usuarioActualizado;
    }

    // 6. Manejo de error si el usuario no existe
    throw createError({
      status: 404,
      message: "Usuario no encontrado", // Si el usuario no fue encontrado, lanza un error 404.
    });
  } catch (error) {
    // 7. Manejo de errores generales
    console.log("Error en la actualización del usuario:", error); // Muestra el error en la consola.
    throw createError({
      status: 500,
      message: "Error interno del servidor :(", // Lanza un error 500 si ocurre algún problema durante el proceso.
    });
  }
});
