// utils/validations/producto.ts
import * as v from "valibot";

const esquemaCreacionProducto = v.object({
  individualizacionDelBien: v.pipe(
    v.string(),
    v.minLength(1), // Asegurar que no esté vacío
    v.maxLength(255) // Longitud máxima según tu requerimiento
  ),
  cantidad: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // Asegurar que sea un número entero positivo
  ),
  fechaAdquisicion: v.pipe(
    v.string(),
    v.transform((input) => new Date(input)), // Convertir a objeto Date
    v.date() // Validar que sea una fecha válida
  ),
  idProcedencia: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idEstado: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de estado, debe ser un número entero mayor o igual a 1
  ),
  idSubcategoria: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de subcategoría, debe ser un número entero mayor o igual a 1
  ),
  idUsuarioCreador: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID del usuario creador, debe ser un número entero mayor o igual a 1
  ),
  idSalas: v.pipe(
    v.array(v.number()),
    v.minLength(1), // Al menos un ID de sala debe ser proporcionado
    v.array(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1) // Asegurar que cada ID de sala sea un entero positivo
      )
    )
  ),
});

// Exporta el parser para usarlo en la API
export const validarEsquemaCreacionProducto = v.parser(esquemaCreacionProducto);

export type FormularioCreacionProducto = v.InferOutput<
  typeof esquemaCreacionProducto
>;

const esquemaActualizacionProducto = v.object({
  individualizacionDelBien: v.optional(
    v.pipe(v.string(), v.minLength(1), v.maxLength(255))
  ),
  cantidad: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1)) // Hacer este campo opcional
  ),
  fechaAdquisicion: v.optional(
    v.pipe(
      v.string(),
      v.transform((input) => new Date(input)),
      v.date()
    )
  ),
  idProcedencia: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1)) // Hacer este campo opcional
  ),
  idEstado: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1)) // Hacer este campo opcional
  ),
  idSubcategoria: v.optional(
    v.pipe(v.number(), v.integer(), v.minValue(1)) // Hacer este campo opcional
  ),
  idSalas: v.optional(
    v.pipe(
      v.array(v.number()),
      v.minLength(1),
      v.array(v.pipe(v.number(), v.integer(), v.minValue(1)))
    )
  ),
});

// Exporta el parser para usarlo en la API
export const validarEsquemaActualizacionProducto = v.parser(
  esquemaActualizacionProducto
);

export type FormularioActualizacionProducto = v.InferOutput<
  typeof esquemaActualizacionProducto
>;

const esquemaAgregarStock = v.object({
  individualizacionDelBien: v.pipe(
    v.string(),
    v.minLength(1), // Asegurar que no esté vacío
    v.maxLength(255) // Longitud máxima según tu requerimiento
  ),
  cantidad: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // Asegurar que sea un número entero positivo
  ),
  fechaAdquisicion: v.optional(
    v.pipe(
      v.string(),
      v.transform((input) => new Date(input)), // Convertir a objeto Date
      v.date() // Validar que sea una fecha válida
    )
  ),
  idProcedencia: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idEstado: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de estado, debe ser un número entero mayor o igual a 1
  ),
  idUsuarioCreador: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID del usuario creador, debe ser un número entero mayor o igual a 1
  ),
  idSalas: v.pipe(
    v.array(v.number()),
    v.minLength(1), // Al menos un ID de sala debe ser proporcionado
    v.array(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1) // Asegurar que cada ID de sala sea un entero positivo
      )
    )
  ),
});

// Exporta el parser para usarlo en la API
export const validaresquemaAgregarStock = v.parser(esquemaAgregarStock);
export type FormularioAgregarStock = v.InferOutput<typeof esquemaAgregarStock>;

const esquemaAgregarProducto = v.object({
  individualizacionDelBien: v.pipe(
    v.string(),
    v.minLength(1), // Asegurar que no esté vacío
    v.maxLength(255) // Longitud máxima según tu requerimiento
  ),
  cantidad: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // Asegurar que sea un número entero positivo
  ),
  fechaAdquisicion: v.optional(
    v.pipe(
      v.string(),
      v.transform((input) => new Date(input)), // Convertir a objeto Date
      v.date() // Validar que sea una fecha válida
    )
  ),
  idProcedencia: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idSubcategoria: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de procedencia, debe ser un número entero mayor o igual a 1
  ),
  idEstado: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID de estado, debe ser un número entero mayor o igual a 1
  ),
  idUsuarioCreador: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1) // ID del usuario creador, debe ser un número entero mayor o igual a 1
  ),
  idSalas: v.pipe(
    v.array(v.number()),
    v.minLength(1), // Al menos un ID de sala debe ser proporcionado
    v.array(
      v.pipe(
        v.number(),
        v.integer(),
        v.minValue(1) // Asegurar que cada ID de sala sea un entero positivo
      )
    )
  ),
});

// Exporta el parser para usarlo en la API
export const validaresquemaAgregarProducto = v.parser(esquemaAgregarProducto);
