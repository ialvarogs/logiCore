// Importa las funciones necesarias de la librería "h3"
import { defineEventHandler, readBody, createError } from "h3";
// Importa la función que mueve los productos a la sala
import { moverProductosASala } from "~~/server/utils/repositories/productos";
// Importa el esquema de validación para la asignación de sala
import { validarEsquemaAsignarSala } from "~~/server/utils/schemas/asignarResponsable"; // Asegúrate de tener este esquema definido

// Define el manejador de eventos para la solicitud entrante
export default defineEventHandler(async (event) => {
  // Obtiene la sesión del usuario actual
  const usuarioLog = await requireUserSession(event);
  
  // Si no hay usuario logueado, lanza un error 401 (requiere inicio de sesión)
  if (!usuarioLog) {
    throw createError({
      status: 401,
      message: "Requiere inicio de sesión",
    });
  }

  // Si el usuario no tiene un rol adecuado (Administrador o Encargado), lanza un error 401 (permiso insuficiente)
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
    // Lee el cuerpo de la solicitud (request body)
    const body = await readBody(event);
    console.log(body);  // Imprime el cuerpo para propósitos de depuración

    // Valida los datos del cuerpo de la solicitud con el esquema definido
    // Permite que la fecha sea undefined si no se proporciona
    const datosValidos = await readValidatedBody(
      event,
      validarEsquemaAsignarSala
    );

    // Si la validación de los datos falla, lanza un error 400 (datos inválidos)
    if (!datosValidos) {
      throw createError({
        status: 400,
        message:
          "Datos inválidos. Asegúrate de que los ID de los productos y el ID de la sala sean correctos.",
      });
    }

    // Extrae los valores del cuerpo de la solicitud validados
    const { idProducto, idSala, fechaAsignacion } = datosValidos;

    // Valida la fecha de asignación
    // Si la fecha es proporcionada, convierte la cadena a un objeto Date
    let fechaFormateada: Date | undefined = undefined;
    if (fechaAsignacion) {
      const fechaObj = new Date(fechaAsignacion);

      // Si la fecha es válida, la convierte en un objeto Date
      if (!isNaN(fechaObj.getTime())) {
        fechaFormateada = fechaObj;
      } else {
        // Si la fecha no es válida, asigna undefined
        console.log("Fecha inválida, se usará undefined.");
        fechaFormateada = undefined;
      }
    }

    // Llama a la función del repositorio para mover los productos a la nueva sala,
    // pasando la fecha formateada (o undefined si no es válida)
    const resultado = await moverProductosASala(
      idProducto,
      idSala,
      fechaFormateada
    );

    // Si la operación es exitosa, devuelve un mensaje de éxito y el resultado de la operación
    return { status: 200, message: "Sala asignada con éxito", resultado };
  } catch (error) {
    // Si ocurre un error durante el procesamiento, imprime el error y lanza un error 500 (fallo interno del servidor)
    console.error("Error al asignar la sala:", error);
    throw createError({
      status: 500,
      message: "Error al procesar la solicitud de asignación de sala.",
    });
  }
});
