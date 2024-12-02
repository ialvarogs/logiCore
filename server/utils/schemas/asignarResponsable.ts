// Importamos la biblioteca 'valibot' para realizar validaciones de los datos de entrada.
import * as v from "valibot";

// Definimos el esquema de validación para la asignación de un responsable a un producto.
// Este esquema valida los siguientes campos:
// - `idProducto`: Un número entero que debe ser mayor o igual a 1.
// - `idUsuario`: Un número entero que debe ser mayor o igual a 1.
// - `fechaAsignacion`: Una cadena que se transforma en un objeto Date y se valida que sea una fecha válida.
const EsquemaAsignarResponsable = v.object({
  idProducto: v.pipe(v.number(), v.integer(), v.minValue(1)), // `idProducto` debe ser un número entero mayor o igual a 1.
  idUsuario: v.pipe(v.number(), v.integer(), v.minValue(1)), // `idUsuario` debe ser un número entero mayor o igual a 1.
  fechaAsignacion: v.pipe(
    v.string(), // Se espera que `fechaAsignacion` sea una cadena de texto.
    v.transform((input) => new Date(input)), // Transformamos la cadena a un objeto Date.
    v.date() // Validamos que el objeto resultante sea una fecha válida.
  ),
});

// Creamos un parser a partir del esquema `EsquemaAsignarResponsable` que se puede usar para validar los datos de entrada.
export const validarEsquemaAsignarResponsable = v.parser(
  EsquemaAsignarResponsable
);

// Definimos el esquema de validación para la asignación de productos a salas.
// Este esquema valida los siguientes campos:
// - `idProducto`: Un arreglo de números, donde cada número debe ser mayor o igual a 1.
// - `idSala`: Un número que debe ser mayor o igual a 1.
// - `fechaAsignacion`: Un campo opcional que puede ser una cadena, que será transformada a un objeto Date y validada como fecha.
const EsquemaAsignarSala = v.object({
  idProducto: v.array(v.pipe(v.number(), v.minValue(1))), // `idProducto` debe ser un arreglo de números, cada uno mayor o igual a 1.
  idSala: v.pipe(v.number(), v.minValue(1)), // `idSala` debe ser un número mayor o igual a 1.
  fechaAsignacion: v.optional(
    // `fechaAsignacion` es un campo opcional.
    v.pipe(
      v.string(), // Se espera que `fechaAsignacion` sea una cadena de texto.
      v.transform((input) => new Date(input)), // Transformamos la cadena a un objeto Date.
      v.date() // Validamos que el objeto resultante sea una fecha válida.
    )
  ),
});

// Creamos un parser a partir del esquema `EsquemaAsignarSala` que se puede usar para validar los datos de entrada.
export const validarEsquemaAsignarSala = v.parser(EsquemaAsignarSala);
