export default defineEventHandler((event) => {
  // 1. Establecer las cabeceras CORS para permitir solicitudes de otros orígenes.
  appendHeaders(event, {
    "Access-Control-Allow-Origin": "*", // Permite que cualquier origen realice solicitudes a la API.
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS", // Define los métodos HTTP permitidos.
    "Access-Control-Allow-Credentials": "true", // Permite el uso de cookies o autenticación en solicitudes entre dominios.
    "Access-Control-Allow-Headers": "Content-Type, X-Autorization", // Especifica qué cabeceras se pueden enviar en las solicitudes.
    "Access-Control-Expose-Headers": "X-Autorization", // Permite que ciertas cabeceras sean expuestas en la respuesta.
  });

  // 2. Comprobar si es una solicitud preflight (OPTIONS).
  if (isPreflightRequest(event)) {
    return null; // Si es una solicitud OPTIONS (preflight), no procesamos la solicitud y solo respondemos con las cabeceras CORS.
  }
});
