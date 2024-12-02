import * as v from "valibot"; // Importación de la librería Valibot para realizar validaciones

// Esquema de validación para el formulario de registro
const registroSchema = v.object({
  nombre: v.pipe(
    // Validación para el campo "nombre"
    v.string(), // El valor debe ser una cadena de texto
    v.minLength(1, "El nombre no puede estar vacío"), // El nombre no puede estar vacío
    v.trim() // Elimina espacios al principio y al final del nombre
  ),
  apellido: v.pipe(
    // Validación para el campo "apellido"
    v.string(), // El valor debe ser una cadena de texto
    v.minLength(1, "El apellido no puede estar vacío"), // El apellido no puede estar vacío
    v.trim() // Elimina espacios al principio y al final del apellido
  ),
  email: v.pipe(
    // Validación para el campo "email"
    v.string(), // El valor debe ser una cadena de texto
    v.minLength(1, "El email no puede estar vacío"), // El email no puede estar vacío
    v.email("El formato del email no es válido"), // El email debe ser válido
    v.trim() // Elimina espacios al principio y al final del email
  ),
  contrasena: v.pipe(
    // Validación para el campo "contrasena"
    v.string(), // El valor debe ser una cadena de texto
    v.minLength(6, "La contraseña debe tener al menos 6 caracteres") // La contraseña debe tener al menos 6 caracteres
  ),
  idEstadoUsuario: v.pipe(
    // Validación para el campo "idEstadoUsuario"
    v.number("El ID del estado debe ser numérico"), // El valor debe ser un número
    v.integer(), // El valor debe ser un número entero
    v.minValue(1) // El valor debe ser mayor o igual a 1
  ),
  idRol: v.pipe(
    // Validación para el campo "idRol"
    v.number("El ID del rol debe ser numérico"), // El valor debe ser un número
    v.integer(), // El valor debe ser un número entero
    v.minValue(1) // El valor debe ser mayor o igual a 1
  ),
});

// Función para validar el formulario de creación de usuario según el esquema definido
export const validarFormularioCreacionUsuario = v.parser(registroSchema); // Utiliza el esquema de validación para crear el validador

// Tipo de dato que representa el resultado del esquema de validación para el formulario de creación de usuario
export type FormularioCreacionUsuario = v.InferOutput<typeof registroSchema>; // Inferencia de tipo para el resultado de la validación
