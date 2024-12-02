// Importa el cliente de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";

// Define el manejador de la solicitud para crear un nuevo proveedor
export default defineEventHandler(async (event) => {
  // Verifica si el usuario está autenticado
  const usuarioLog = await requireUserSession(event);

  // Si no hay usuario autenticado, lanza un error 401 (No autorizado)
  if (!usuarioLog) {
    throw createError({
      status: 401, // Error 401: No autorizado
      message: "Requiere inicio se sesión", // Mensaje que indica que se requiere estar autenticado
    });
  }

  // Verifica que el usuario tenga un rol adecuado (Administrador o Encargado)
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    // Si el usuario no tiene los permisos adecuados, lanza un error 401 (No autorizado)
    throw createError({
      status: 401, // Error 401: No autorizado
      message: "Permisos insuficientes", // Mensaje que indica que el usuario no tiene permisos suficientes
    });
  }

  // Obtiene los datos del cuerpo de la solicitud
  const { nombre, telefono, email } = await readBody(event);

  // Verifica que el nombre esté presente y que al menos uno entre teléfono o email no esté vacío
  if (!nombre || (!telefono && !email)) {
    // Si faltan los campos requeridos, lanza un error 400 (Solicitud incorrecta)
    throw createError({
      status: 400, // Error 400: Solicitud incorrecta
      message:
        "El nombre es obligatorio, y debe haber al menos un número de teléfono o un correo electrónico.", // Mensaje de validación
    });
  }

  try {
    // Asigna el nombre del proveedor a una variable
    const proveedor = nombre;

    // Inserta el nuevo proveedor en la base de datos usando Prisma
    const nuevoProveedor = await prisma.proveedor.create({
      data: {
        proveedor, // Nombre del proveedor
        email, // Email del proveedor
        telefono, // Teléfono del proveedor
      },
    });

    // Si la inserción es exitosa, devuelve un mensaje y los datos del nuevo proveedor
    return {
      message: "Proveedor creado con éxito", // Mensaje de éxito
      proveedor: nuevoProveedor, // Los datos del proveedor recién creado
    };
  } catch (error) {
    // Si ocurre un error al insertar el proveedor, captura el error y lanza un error 500 (Error interno del servidor)
    throw createError({
      status: 500, // Error 500: Error interno del servidor
      message: "Error al crear el proveedor", // Mensaje indicando que hubo un problema al crear el proveedor
    });
  }
});
