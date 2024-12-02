import * as v from "valibot"; // Importación de la librería Valibot para validación de datos

// Esquema de validación para el formulario de login
const loginSchema =
  v.object({
    email: v.pipe( // Validación para el campo "email"
      v.string(), // El valor debe ser una cadena de texto
      v.minLength(1, "El email no puede estar vacío"), // El email no puede estar vacío
      v.email() // El valor debe ser un email válido
    ),
    contrasena: v.string(), // El campo "contrasena" debe ser una cadena de texto
  });

// Función para validar el formulario de login según el esquema definido
export const validarFormularioLogin = v.parser(loginSchema); // Utiliza el esquema de validación para crear el validador

// Tipo de dato que representa el resultado del esquema de validación para el formulario de login
export type FormularioLogin = v.InferOutput<typeof loginSchema>; // Inferencia de tipo para el resultado de la validación