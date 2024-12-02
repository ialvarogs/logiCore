import { defineEventHandler, createError } from "h3"; // Importa las funciones necesarias para manejar eventos y errores en H3.
import { validarFormularioCreacionUsuario } from "~~/server/utils/schemas/schema.registro"; // Importa la validación del formulario para la creación de un usuario.
import { obtenerUsuarioPorEmail } from "~~/server/utils/repositories/users"; // Importa la función que obtiene un usuario por su correo electrónico.

export default defineEventHandler(async (event) => {
  // Define el manejador del evento para la creación de usuario.

  // 1. Verificación de la sesión del usuario
  const usuarioLog = await requireUserSession(event); // Verifica si el usuario ha iniciado sesión.
  if (!usuarioLog) {
    // Si el usuario no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error indicando que el usuario debe iniciar sesión.
    });
  }

  // 2. Verificación de permisos del usuario
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene rol de "Administrador" ni "Encargado", lanza un error 401 (permiso insuficiente).
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos adecuados.
    });
  }

  // 3. Validación del cuerpo de la solicitud
  const body = await readValidatedBody(event, validarFormularioCreacionUsuario); // Lee y valida el cuerpo de la solicitud utilizando el esquema de validación.

  // 4. Comprobación de si el usuario ya existe
  const usuario = await obtenerUsuarioPorEmail(body.email); // Llama a la función para verificar si ya existe un usuario con el mismo correo electrónico.

  if (usuario) {
    // Si ya existe un usuario con el mismo correo, lanza un error 409 (conflicto).
    throw createError({
      status: 409,
      message: "Ya existe un usuario vinculado al email proporcionado.", // Mensaje de error indicando que el correo ya está registrado.
    });
  }

  // 5. Creación del nuevo usuario
  return {
    status: 201, // Retorna un estado 201 indicando que el recurso ha sido creado exitosamente.
    message: "Usuario creado exitosamente", // Mensaje de éxito para la creación del usuario.
    data: await crearUsuario(body), // Llama a la función que crea el usuario en la base de datos y devuelve los datos del nuevo usuario.
  };
});
