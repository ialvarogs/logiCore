// Definimos el handler para el evento de la ruta.
// Esta función se ejecutará cuando se reciba una solicitud HTTP a esta ruta.
export default defineEventHandler(async (event) => {
  try {
    // Verificamos si el usuario está autenticado y tiene una sesión activa.
    const usuarioLog = await requireUserSession(event);

    // Si el usuario no está autenticado, lanzamos un error 401 (No autorizado).
    if (!usuarioLog) {
      throw createError({
        status: 401, // Código de estado HTTP para "No autorizado"
        message: "Requiere inicio se sesión", // Mensaje de error si no hay sesión activa
      });
    }

    // Verificamos si el rol del usuario es "Administrador" o "Encargado".
    // Si el usuario no tiene uno de estos roles, lanzamos un error 401 (Permisos insuficientes).
    if (
      usuarioLog.user.rol !== "Administrador" &&
      usuarioLog.user.rol !== "Encargado"
    ) {
      throw createError({
        status: 401, // Código de estado HTTP para "No autorizado"
        message: "Permisos insuficientes", // Mensaje de error si el usuario no tiene permisos suficientes
      });
    }

    // Obtenemos la fecha y hora actual del servidor usando el objeto Date.
    const fechaActual = new Date();

    // Formateamos la fecha en formato 'YYYY-MM-DD' (solo la parte de la fecha).
    const fecha = fechaActual.toLocaleDateString("es-ES", {
      year: "numeric", // Año en formato numérico (4 dígitos)
      month: "2-digit", // Mes en formato numérico de 2 dígitos (ej. 04)
      day: "2-digit", // Día en formato numérico de 2 dígitos (ej. 09)
    });

    // Formateamos la hora en formato 'HH:mm:ss' (hora, minutos, segundos en formato de 24 horas).
    const hora = fechaActual.toLocaleTimeString("es-CL", {
      hour: "2-digit", // Hora en formato numérico de 2 dígitos (ej. 14)
      minute: "2-digit", // Minuto en formato numérico de 2 dígitos (ej. 30)
      second: "2-digit", // Segundo en formato numérico de 2 dígitos (ej. 05)
      hour12: false, // Usamos el formato de 24 horas (sin AM/PM)
    });

    // Retornamos tanto la fecha como la hora en formato 'YYYY-MM-DD HH:mm:ss'
    return {
      status: 200, // Código HTTP 200 para indicar éxito
      data: {
        fecha: fecha, // Fecha en formato 'YYYY-MM-DD'
        hora: hora, // Hora en formato 'HH:mm:ss'
      },
    };
  } catch (error) {
    // Si ocurre un error en cualquier parte del proceso, lanzamos un error 500.
    console.error("Error al obtener la hora y fecha:", error);
    throw createError({
      status: 500, // Código HTTP 500 para "Error interno del servidor"
      message: "Error al obtener la hora y fecha", // Mensaje de error para informar de un fallo en el proceso
    });
  }
});
