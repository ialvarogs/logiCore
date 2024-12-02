// Importa las definiciones de esquema para la creación y actualización de usuarios
import { FormularioActualizacionUsuario } from "../schemas/general";
import prisma from "~~/server/utils/prisma/prisma";
import { FormularioCreacionUsuario } from "../schemas/schema.registro";

// Función asincrónica para crear un nuevo usuario
export async function crearUsuario(usuario: FormularioCreacionUsuario) {
  // Hashea la contraseña del usuario antes de guardarla en la base de datos
  const contrasenaHasheada = await hashPassword(usuario.contrasena);

  // Inicia una transacción para asegurar que ambas operaciones (creación de usuario y asignación de rol) se realicen de forma atómica
  return prisma.$transaction(async (prisma) => {
    // Crear el usuario en la base de datos sin incluir la contraseña en la respuesta
    const nuevoUsuario = await prisma.usuario.create({
      omit: {
        contrasena: true, // Omite la contraseña en la respuesta de la creación
      },
      data: {
        nombre: usuario.nombre, // Asigna el nombre del usuario
        apellido: usuario.apellido, // Asigna el apellido del usuario
        contrasena: contrasenaHasheada, // Guarda la contraseña hasheada
        email: usuario.email, // Asigna el email del usuario
        idEstadoUsuario: usuario.idEstadoUsuario, // Asigna el estado del usuario (activo, inactivo, etc.)
      },
    });

    // Crea la relación entre el usuario y el rol en la tabla `UsuarioRol`
    await prisma.usuarioRol.create({
      data: {
        idUsuario: nuevoUsuario.idUsuario, // Asocia el rol con el ID del usuario creado
        idRol: usuario.idRol, // Asigna el rol al usuario
      },
    });

    // Devuelve el usuario recién creado (sin incluir la contraseña en la respuesta)
    return nuevoUsuario;
  });
}

// Función asincrónica para obtener un usuario a partir de su email
export async function obtenerUsuarioPorEmail(
  email: string, // Email del usuario que se desea buscar
  contrasena: boolean = false // Parámetro opcional para indicar si se necesita la contraseña (por defecto es false)
) {
  try {
    // Recupera el usuario de la base de datos con su email y sus roles
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email, // Buscar por el email del usuario
      },
      include: {
        usuarioRoles: {
          // Incluir los roles asociados al usuario
          include: {
            rol: true, // Incluir la información del rol (nombre, permisos, etc.)
          },
        },
      },
    });

    // Verificar si el usuario fue encontrado
    if (usuario) {
      // Verificar si el usuario está inactivo
      if (usuario.idEstadoUsuario === 2) {
        throw createError({
          status: 403, // Código de estado HTTP 403 (Prohibido)
          message: "Usuario inactivo", // Mensaje de error si el usuario está inactivo
        });
      }

      // Extraer el nombre del rol si el usuario tiene roles asociados
      const rolNombre =
        usuario.usuarioRoles.length > 0
          ? usuario.usuarioRoles[0].rol.nombreRol // Asume que el primer rol es el principal
          : null;

      // Devuelve la información del usuario junto con el nombre de su rol
      return {
        ...usuario, // Devuelve todas las propiedades del usuario
        rol: rolNombre, // Añade el nombre del rol al objeto del usuario
      };
    }

    // Si no se encontró el usuario, devuelve null
    return null;
  } catch (error) {
    // Lanza el error si ocurre algún problema al buscar el usuario
    throw error;
  }
}

// Función asincrónica para actualizar la información de un usuario en la base de datos
export async function actualizarUsuario(
  id: number, // ID del usuario a actualizar
  usuarioActualizado: FormularioActualizacionUsuario // Datos que se desean actualizar del usuario
) {
  try {
    // Logs para verificar la información recibida
    console.log("ID del usuario a actualizar:", id);
    console.log("Datos a actualizar:", usuarioActualizado);

    // Desestructuración para separar el idRol de los datos del usuario
    const { idRol, ...datosUsuario } = usuarioActualizado;

    // Actualiza el usuario en la base de datos
    const usuario = await prisma.usuario.update({
      where: { idUsuario: id }, // Identifica el usuario por su ID
      data: {
        ...datosUsuario, // Actualiza los datos del usuario (nombre, email, etc.)
        usuarioRoles: {
          // Primero elimina todos los roles existentes del usuario
          deleteMany: { idUsuario: id },
          // Luego crea el nuevo rol para el usuario
          create: {
            idRol, // Asocia el nuevo rol al usuario (asegurarse de que `idRol` es el ID correcto)
          },
        },
      },
    });

    // Log para confirmar la actualización del usuario
    console.log("Usuario actualizado:", usuario);

    // Devuelve el usuario actualizado
    return usuario;
  } catch (error) {
    // En caso de error, muestra el error y lanza un nuevo mensaje
    console.error("Error en actualizarUsuario:", error);
    throw new Error("No se pudo actualizar el usuario.");
  }
}

// Función asincrónica para cambiar la contraseña de un usuario
export async function cambiarPass(userId: number, password: string) {
  try {
    // Hashea la nueva contraseña utilizando una función (hashPassword)
    const hashedPassword = await hashPassword(password);

    // Realiza la actualización de la contraseña en la base de datos
    await prisma.usuario.update({
      where: { idUsuario: userId }, // Busca al usuario por su ID
      data: { contrasena: hashedPassword }, // Actualiza la contraseña con el hash generado
    });

    // Si todo salió bien, devuelve 'true'
    return true;
  } catch (error) {
    // En caso de error, registra el error en consola y devuelve 'false'
    console.error("Error al actualizar la contraseña:", error);
    return false;
  }
}
