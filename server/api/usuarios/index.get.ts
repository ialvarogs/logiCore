import { defineEventHandler, createError } from "h3";
import prisma from "~~/server/utils/prisma/prisma";

export default defineEventHandler(async (event) => {
  const usuarioLog = await requireUserSession(event);
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio se sesión",
    });
  }
  if (
    usuarioLog.user.rol !== "Administrador" &&
    usuarioLog.user.rol !== "Encargado"
  ) {
    throw createError({
      status: 401,
      message: "Permisos insuficientes",
    });
  }
  try {
    // Obtener la lista de usuarios con su rol y estado
    const usuarios = await prisma.usuario.findMany({
      include: {
        usuarioRoles: {
          include: {
            rol: true, // Incluye los datos del rol
          },
        },
        estadoUsuario: true, // Incluye el estado del usuario
      },
    });

    // Formatear la respuesta para incluir solo la información necesaria
    const usuariosFormateados = usuarios.map((usuario) => {
      // Extraemos el primer rol, si existe
      const primerRol = usuario.usuarioRoles[0] ? usuario.usuarioRoles[0].rol : null;
      
      return {
        id: usuario.idUsuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: primerRol ? primerRol.nombreRol : null, // Solo un rol
        idRol: primerRol ? primerRol.idRol : null,   // Solo el id del primer rol
        estado: usuario.estadoUsuario.estado,
        idEstadoUsuario: usuario.idEstadoUsuario, 
      };
    });

    return usuariosFormateados;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw createError({
      status: 500,
      message: "Error al obtener usuarios",
    });
  }
});
