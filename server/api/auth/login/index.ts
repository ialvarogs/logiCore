// Importa el esquema de validación para el formulario de login, que valida el email y la contraseña
import { validarFormularioLogin } from "~~/server/utils/schemas/schema.login";

// Define el manejador de eventos para la ruta del login
export default defineEventHandler(async (event: any) => {
  // Lee y valida el cuerpo de la solicitud utilizando el esquema 'validarFormularioLogin'
  const { email, contrasena } = await readValidatedBody(
    event,
    validarFormularioLogin
  );

  // Consulta el usuario en la base de datos usando el email proporcionado, el segundo parámetro 'true' asegura que incluya detalles adicionales (como la contraseña)
  const usuario = await obtenerUsuarioPorEmail(email, true);

  // Si no se encuentra el usuario, lanza un error con código 401 (No autorizado)
  if (!usuario) {
    return createError({
      status: 401,
      message: "Usuario y/o contraseña incorrecto(s)", // Mensaje de error si el usuario no existe
    });
  }

  // Verifica que la contraseña proporcionada coincida con la almacenada en la base de datos
  if (!(await verifyPassword(usuario.contrasena, contrasena))) {
    throw createError({
      status: 401,
      message: "Usuario y/o contraseña incorrecto(s)", // Mensaje de error si la contraseña no coincide
    });
  }

  // Si las credenciales son correctas, crea un objeto 'usuarioSeguro' con los datos relevantes para la sesión
  const usuarioSeguro = {
    id: usuario.idUsuario,
    nombre: usuario.nombre,
    rol: usuario.rol,
    estado: usuario.idEstadoUsuario, // ID del estado del usuario (activo, inactivo, etc.)
  };

  // Establece la sesión del usuario en el sistema, guardando los datos de 'usuarioSeguro'
  await setUserSession(event, {
    user: usuarioSeguro, // Guarda los datos del usuario en la sesión
  });

  // Devuelve el objeto 'usuarioSeguro' como respuesta
  return usuarioSeguro;
});
