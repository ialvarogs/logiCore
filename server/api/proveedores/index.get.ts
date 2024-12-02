// Importa el cliente de Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";
// Importa las funciones de manejo de eventos y creación de errores de H3
import { defineEventHandler, createError } from "h3";

// Define el manejador de la solicitud para obtener proveedores
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

  try {
    // Intenta obtener la lista de proveedores desde la base de datos
    const proveedores = await prisma.proveedor.findMany();

    // Si la consulta es exitosa, formatea la lista de proveedores
    // Solo se incluye la información relevante: id, nombre, email y teléfono
    const proveedoresFormateados = proveedores.map((proveedor) => ({
      id: proveedor.idProveedor, // El ID del proveedor (usando el campo idProveedor de la base de datos)
      nombre: proveedor.proveedor, // El nombre del proveedor
      email: proveedor.email, // El email del proveedor
      telefono: proveedor.telefono, // El teléfono del proveedor
    }));

    // Devuelve la lista de proveedores formateada
    return proveedoresFormateados;
  } catch (error) {
    // Si ocurre un error al intentar obtener los proveedores, lo captura
    console.error("Error al obtener proveedores:", error);

    // Lanza un error 500 (Error interno del servidor) con un mensaje de error
    throw createError({
      status: 500, // Error 500: Error interno del servidor
      message: "Error al obtener proveedores", // Mensaje indicando que hubo un problema al obtener los proveedores
    });
  }
});
