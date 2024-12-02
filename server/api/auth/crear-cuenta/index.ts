// Importa las funciones necesarias de H3 para manejar eventos HTTP y crear errores personalizados
import { defineEventHandler, createError } from "h3";
// Importa el esquema de validación para el formulario de creación de usuario
import { validarFormularioCreacionUsuario } from "~~/server/utils/schemas/schema.registro";
// Importa la función que obtiene un usuario desde el repositorio, en este caso por su email
import { obtenerUsuarioPorEmail } from "~~/server/utils/repositories/users";

// Define el manejador de eventos para esta ruta
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

  // Verifica que el usuario logueado tenga rol de "Administrador", si no es así, lanza un error de permisos insuficientes
  if (usuarioLog.user.rol !== "Administrador") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos de administrador
    });
  }

  // Lee y valida el cuerpo de la solicitud utilizando el esquema de validación 'validarFormularioCreacionUsuario'
  const body = await readValidatedBody(event, validarFormularioCreacionUsuario);

  // Consulta si ya existe un usuario con el mismo email proporcionado en el cuerpo de la solicitud
  const usuario = await obtenerUsuarioPorEmail(body.email);

  // Si se encuentra un usuario con el mismo email, lanza un error con código 409 (Conflicto)
  if (usuario) {
    throw createError({
      status: 409,
      message: "Ya existe un usuario vinculado al email proporcionado.", // Mensaje de error si ya existe un usuario con el mismo email
    });
  }

  // Si no hay conflictos, crea el usuario con los datos proporcionados y devuelve una respuesta exitosa
  return {
    status: 201, // Código de estado HTTP para creación exitosa
    message: "Usuario creado exitosamente", // Mensaje de éxito
    data: await crearUsuario(body), // Llama a la función para crear el nuevo usuario y devuelve los datos creados
  };
});
