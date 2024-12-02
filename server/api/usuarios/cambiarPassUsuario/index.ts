import prisma from "~~/server/utils/prisma/prisma"; // Importa la instancia de Prisma para interactuar con la base de datos.

export default defineEventHandler(async (event: any) => {
  // Define el manejador de eventos para el cambio de contraseña.

  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    // Si el usuario no está autenticado, lanza un error 401 (no autorizado).
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión", // Mensaje de error que indica que el usuario debe iniciar sesión.
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
      message: "Permisos insuficientes", // Mensaje de error que indica que el usuario no tiene permisos suficientes.
    });
  }

  // Lee el cuerpo de la solicitud para obtener los parámetros de cambio de contraseña
  const {
    usuarioId,
    contrasenaActual,
    nuevaContrasena,
    confirmarNuevaContrasena,
  } = await readBody(event); // Extrae los valores de `usuarioId`, `contrasenaActual`, `nuevaContrasena` y `confirmarNuevaContrasena`.

  // 1. Verificar que ambas contraseñas nuevas coincidan
  if (nuevaContrasena !== confirmarNuevaContrasena) {
    // Si las nuevas contraseñas no coinciden, lanza un error.
    throw createError({
      status: 400,
      message: "Las nuevas contraseñas no coinciden.", // Mensaje de error si las contraseñas no coinciden.
    });
  }

  // 2. Buscar al usuario en la base de datos
  const usuario = await prisma.usuario.findUnique({
    where: { idUsuario: usuarioId }, // Busca el usuario en la base de datos utilizando su `idUsuario`.
  });

  if (!usuario) {
    // Si no se encuentra el usuario, lanza un error.
    throw createError({
      status: 404,
      message: "Usuario no encontrado.", // Mensaje de error si el usuario no existe en la base de datos.
    });
  }

  // 3. Verificar la contraseña actual
  if (!(await verifyPassword(usuario.contrasena, contrasenaActual))) {
    // Compara la contraseña actual del usuario con la proporcionada.
    throw createError({
      status: 401,
      message: "Contraseña incorrecta", // Si la contraseña actual no es correcta, lanza un error.
    });
  }

  // 4. Hashear la nueva contraseña utilizando la función `hashPassword`
  const newPassword = await hashPassword(nuevaContrasena); // Hashea la nueva contraseña antes de guardarla en la base de datos.

  // 5. Actualizar la contraseña en la base de datos
  await prisma.usuario.update({
    where: { idUsuario: usuarioId }, // Busca al usuario por `idUsuario`.
    data: { contrasena: newPassword }, // Actualiza la contraseña con la nueva contraseña hasheada.
  });

  // Retorna un mensaje de éxito indicando que la contraseña fue actualizada correctamente.
  return { message: "Contraseña actualizada con éxito" };
});
