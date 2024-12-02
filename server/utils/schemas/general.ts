// Importamos la librería 'valibot' para realizar las validaciones de los datos.
import * as v from "valibot";

// Esquema para validar el ID numérico en la ruta
// Este esquema asegura que el parámetro `id` en la ruta sea un número entero válido mayor o igual a 1.
const esquemaIdNumericoRuta = v.object({
  id: v.pipe(
    v.string(), // Se espera que `id` sea una cadena de texto.
    v.transform((input) => Number(input)), // Convertimos la cadena de texto a número.
    v.number(), // Validamos que sea un número.
    v.integer(), // Validamos que sea un número entero.
    v.minValue(1) // Validamos que el número sea mayor o igual a 1.
  ),
});

// Esquema para validar la actualización del usuario
// Este esquema valida los campos necesarios para actualizar un usuario.
// Los campos `nombre` y `apellido` son opcionales, mientras que `email`, `idEstadoUsuario`, e `idRol` son requeridos.
const esquemaActualizacionUsuario = v.object({
  nombre: v.optional(v.string()), // `nombre` es un campo opcional, si está presente debe ser una cadena de texto.
  apellido: v.optional(v.string()), // `apellido` es un campo opcional, si está presente debe ser una cadena de texto.
  email: v.optional(
    v.pipe(
      v.string(), // Se espera que `email` sea una cadena de texto.
      v.email() // Validamos que el `email` tenga el formato adecuado.
    )
  ),
  idEstadoUsuario: v.pipe(v.number(), v.integer(), v.minValue(1)), // `idEstadoUsuario` debe ser un número entero mayor o igual a 1.
  idRol: v.pipe(v.number(), v.integer(), v.minValue(1)), // `idRol` debe ser un número entero mayor o igual a 1.
});

// Parser para validar el ID numérico de la ruta
// Creamos un parser utilizando el esquema `esquemaIdNumericoRuta` para validar el parámetro `id` en la ruta.
export const validarEsquemaIdNumericoRuta = v.parser(esquemaIdNumericoRuta);

// Parser para validar la actualización del usuario
// Creamos un parser utilizando el esquema `esquemaActualizacionUsuario` para validar los datos al actualizar un usuario.
export const validarActualizacionUsuario = v.parser(
  esquemaActualizacionUsuario
);

// Inferimos el tipo TypeScript para el formulario de actualización de usuario a partir del esquema de validación
// Esto nos permitirá tener un tipo fuerte y seguro para trabajar con los datos que llegan de la solicitud.
export type FormularioActualizacionUsuario = v.InferOutput<
  typeof esquemaActualizacionUsuario
>;

// Definimos un esquema para validar la actualización de la contraseña de un usuario.
const passSchema = v.object({
  // `idUsuario` debe ser un número entero mayor o igual a 1, representando el ID del usuario.
  idUsuario: v.pipe(
    v.string(), // El valor inicial es un string.
    v.transform((input) => Number(input)), // Convertimos la cadena a número.
    v.number(), // Validamos que el valor sea un número.
    v.integer(), // Aseguramos que el número sea entero.
    v.minValue(1, "El ID del usuario es requerido") // Validamos que el ID sea al menos 1.
  ),

  // `contrasena` debe ser una cadena de texto con al menos 8 caracteres.
  contrasena: v.pipe(
    v.string(), // El valor debe ser una cadena de texto.
    v.minLength(8, "La contraseña debe tener al menos 8 caracteres") // Validación de longitud mínima.
  ),
});

// Parser para validar los datos que siguen el esquema de `passSchema`
// `validarPassSchema` es una función que usará este esquema para validar los datos de la contraseña.
export const validarPassSchema = v.parser(passSchema);

// Esquema para validar la actualización de los datos de un proveedor.
export const esquemaActualizacionProveedor = v.object({
  // `proveedor` es un campo opcional para el nombre del proveedor.
  proveedor: v.optional(v.string()),

  // `email` es un campo opcional, si se proporciona debe tener un formato válido de correo electrónico.
  email: v.optional(
    v.pipe(
      v.string(), // El valor debe ser una cadena de texto.
      v.email() // Validamos que el valor tenga formato de email.
    )
  ),

  // `telefono` es un campo opcional, si se proporciona debe ser un número con entre 9 y 12 dígitos.
  telefono: v.optional(
    v.pipe(
      v.string(), // El valor debe ser una cadena de texto.
      v.regex(/^\d{9,12}$/) // Validación para un número con entre 9 y 12 dígitos.
    )
  ),
});

// Parser para validar la actualización de los datos del proveedor.
// `validarEsquemaActualizacionProveedor` es una función que usará este esquema para validar los datos del proveedor.
export const validarEsquemaActualizacionProveedor = v.parser(
  esquemaActualizacionProveedor
);

// Esquema para validar la actualización de los datos de la procedencia.
const esquemaActualizacionProcedencia = v.object({
  // `procedencia` es un campo opcional, si se proporciona debe ser una cadena de texto.
  procedencia: v.optional(v.string()),
});

// Parser para validar los datos de la procedencia.
// `validarEsquemaActualizacionProcedencia` es una función que usará este esquema para validar los datos de la procedencia.
export const validarEsquemaActualizacionProcedencia = v.parser(
  esquemaActualizacionProcedencia
);

// Esquema para validar la actualización del nivel educativo.
const esquemaActualizacionNivelEducativo = v.object({
  // `nivelEducativo` es un campo obligatorio, debe ser una cadena de texto.
  nivelEducativo: v.string(),
});

// Función para validar los datos del nivel educativo de la actualización.
// `validarEsquemaActualizacionNivelEducativo` es un parser que usará este esquema para validar los datos de nivel educativo.
export const validarEsquemaActualizacionNivelEducativo = v.parser(
  esquemaActualizacionNivelEducativo
);

// Esquema para validar la actualización de los datos de una sala
const esquemaActualizacionSala = v.object({
  // `numeroSala` es opcional, debe ser un número entero mayor o igual a 1.
  numeroSala: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),

  // `nombreSala` es un campo opcional de tipo string para almacenar el nombre de la sala.
  nombreSala: v.optional(v.string()),

  // `capacidad` es opcional, debe ser un número entero mayor o igual a 1, representando la capacidad de la sala.
  capacidad: v.optional(
    v.pipe(
      v.number(), // Acepta un valor numérico.
      v.integer(), // Verifica que sea un número entero.
      v.minValue(1) // Verifica que la capacidad sea al menos 1.
    )
  ),

  // `idNivel` es opcional, debe ser un número entero mayor o igual a 1, representando el ID del nivel educativo.
  idNivel: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
});

// Exporta el parser para que este esquema sea utilizado en la API para validar la actualización de una sala.
export const validarEsquemaActualizacionSala = v.parser(
  esquemaActualizacionSala
);

// Esquema para validar la actualización del estado de conservación de un objeto o producto.
const esquemaActualizacionEstadoConservacion = v.object({
  // `estado` es un campo opcional de tipo string que representa el estado de conservación.
  estado: v.optional(v.string()),
});

// Exporta el parser para que este esquema sea utilizado en la API para validar la actualización del estado de conservación.
export const validarEsquemaActualizacionEstadoConservacion = v.parser(
  esquemaActualizacionEstadoConservacion
);

// Inferir el tipo de datos que se utilizará en el formulario para actualizar el estado de conservación.
export type FormularioActualizacionEstado = v.InferOutput<
  typeof esquemaActualizacionEstadoConservacion
>;

// Esquema para validar la actualización de los datos de una subcategoría.
export const esquemaActualizacionSubcategoria = v.object({
  // `nombreSubcategoria` es un campo opcional de tipo string para almacenar el nombre de la subcategoría.
  nombreSubcategoria: v.optional(v.string()),

  // `idCategoria` es un campo opcional que debe ser un número entero mayor o igual a 1, representando el ID de la categoría a la que pertenece la subcategoría.
  idCategoria: v.optional(
    v.pipe(
      v.number(), // Acepta un valor numérico.
      v.integer(), // Verifica que sea un número entero.
      v.minValue(1) // Verifica que el ID de la categoría sea al menos 1.
    )
  ),
});

// Exporta el parser para que este esquema sea utilizado en la API para validar la actualización de una subcategoría.
export const validarEsquemaActualizacionSubcategoria = v.parser(
  esquemaActualizacionSubcategoria
);

// Inferir el tipo de datos que se utilizará en el formulario para actualizar una subcategoría.
export type FormularioActualizacionSubCategoria = v.InferOutput<
  typeof esquemaActualizacionSubcategoria
>;

// Esquema para validar la actualización de una categoría
export const esquemaActualizacionCategoria = v.object({
  // `nombreCategoria` es un campo opcional de tipo string para almacenar el nombre de la categoría.
  nombreCategoria: v.optional(v.string()), // Nombre de la categoría es opcional
});

// Exporta el parser para que este esquema sea utilizado en la API para validar la actualización de una categoría.
export const validarEsquemaActualizacionCategoria = v.parser(
  esquemaActualizacionCategoria
);

// Inferir el tipo de datos que se utilizará en el formulario para actualizar una categoría.
export type FormularioActualizacionCategoria = v.InferOutput<
  typeof esquemaActualizacionCategoria
>;

// Esquema de validación para la creación de una sala
const esquemaCreacionSala = v.object({
  // `numeroSala` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  numeroSala: v.pipe(
    v.string(), // Primero convierte el valor a string.
    v.transform((input) => Number(input)), // Luego convierte el string a número.
    v.number(), // Verifica que sea un número.
    v.integer(), // Verifica que sea un número entero.
    v.minValue(1) // Asegura que el número sea mayor o igual a 1.
  ),

  // `nombreSala` es un campo obligatorio que debe ser una cadena no vacía.
  nombreSala: v.pipe(
    v.string(), // Asegura que sea una cadena de texto.
    v.minLength(1) // Verifica que la cadena no esté vacía.
  ),

  // `capacidad` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  capacidad: v.pipe(
    v.number(), // Acepta un número.
    v.integer(), // Verifica que sea un número entero.
    v.minValue(1) // Asegura que la capacidad sea al menos 1.
  ),

  // `idNivel` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  idNivel: v.pipe(
    v.number(), // Acepta un número.
    v.integer(), // Verifica que sea un número entero.
    v.minValue(1) // Asegura que el ID sea mayor o igual a 1.
  ),
});

// Exporta el parser para que este esquema sea utilizado en la API para validar los datos de creación de una sala.
export const validarEsquemaCreacionSala = v.parser(esquemaCreacionSala);

// Esquema para validar la fecha de devolución de un producto
const esquemaFechaDevolucion = v.object({
  // `fecha` es un campo obligatorio que debe ser una fecha válida.
  fecha: v.pipe(
    v.string(), // Convierte el valor a string.
    v.transform((input) => new Date(input)), // Transforma la cadena a un objeto Date.
    v.date() // Verifica que sea una fecha válida.
  ),

  // `idProducto` es un campo obligatorio que debe ser un número entero mayor o igual a 1.
  idProducto: v.pipe(
    v.number(), // Acepta un número.
    v.integer(), // Verifica que sea un número entero.
    v.minValue(1) // Asegura que el ID del producto sea mayor o igual a 1.
  ),
});

// Exporta el parser para que este esquema sea utilizado en la API para validar la fecha de devolución de un producto.
export const validarEsquemaFechaDevolucion = v.parser(esquemaFechaDevolucion);

// Inferir el tipo de datos que se utilizará en el formulario para actualizar la fecha de devolución de un producto.
export type FormularioActualizacionFechaDevolucion = v.InferOutput<
  typeof esquemaFechaDevolucion
>;
