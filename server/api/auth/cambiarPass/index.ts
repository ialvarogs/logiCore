// Importa la función 'cambiarPass' desde el repositorio de usuarios, que se encargará de cambiar la contraseña
import { cambiarPass } from "~~/server/utils/repositories/users";
// Importa el esquema de validación para la contraseña desde un archivo de esquemas generales
import { validarPassSchema } from "~~/server/utils/schemas/general";

// Define el manejador de eventos para la ruta
export default defineEventHandler(async (event: any) => {
  // Verifica si el usuario tiene una sesión activa, obteniendo la información del usuario
  const usuarioLog = await requireUserSession(event);

  // Si no hay sesión activa, lanza un error con el código de estado 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesión", // Mensaje de error si el usuario no está autenticado
    });
  }

  // Verifica si el usuario tiene rol de "Administrador", de lo contrario, lanza un error de permisos insuficientes
  if (usuarioLog.user.rol !== "Administrador") {
    throw createError({
      status: 401,
      message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene los permisos necesarios
    });
  }

  // Obtiene el cuerpo de la solicitud (lo que se envía en la petición)
  const body = await readBody(event);
  console.log(body); // Imprime el cuerpo de la solicitud para depuración

  try {
    // Valida el cuerpo de la solicitud utilizando el esquema de validación
    const bodyValido = validarPassSchema(body); // Si la validación falla, se lanzará un error

    // Extrae la nueva contraseña y el ID del usuario desde el cuerpo validado
    const password = bodyValido.contrasena;
    const idUsuario = bodyValido.idUsuario; // Asegúrate de que 'idUsuario' esté correctamente definido en el cuerpo

    // Llama a la función 'cambiarPass' para cambiar la contraseña del usuario
    const passCambiada = await cambiarPass(idUsuario, password);

    // Si no se pudo cambiar la contraseña, lanza un error con código 500
    if (!passCambiada) {
      throw createError({
        status: 500,
        message: "Error al cambiar la contraseña", // Mensaje de error si no se pudo realizar el cambio
      });
    }

    // Si todo va bien, devuelve un mensaje de éxito
    return { message: "Contraseña cambiada correctamente" };
  } catch (error: unknown) {
    // Si ocurre un error durante la validación o el procesamiento, se captura aquí
    console.error("Error en el formato o en la validación:", error); // Imprime el error para depuración

    // Se establece un mensaje genérico de error por defecto
    let errorMessage = "Error en el formato o en la validación";

    // Si el error es una instancia de Error, obtenemos su mensaje
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Lanza un error con el código 400 (Bad Request) y el mensaje adecuado
    throw createError({
      status: 400,
      message: errorMessage, // El mensaje de error que se lanza al cliente
    });
  }
});
