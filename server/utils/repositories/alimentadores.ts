// Importación de prisma y esquemas de validación para las actualizaciones
import prisma from "~~/server/utils/prisma/prisma";
import {
  FormularioActualizacionCategoria,
  FormularioActualizacionEstado,
} from "../schemas/general";
import { FormularioActualizacionSubCategoria } from "../schemas/general";

// Función para actualizar la información de un proveedor
export async function actualizarProveedor(
  id: number,
  proveedorActualizado: {
    proveedor?: string;
    email?: string;
    telefono?: string;
  }
) {
  try {
    // Log para mostrar el ID del proveedor y los datos a actualizar
    console.log("ID del proveedor a actualizar:", id);
    console.log("Datos a actualizar:", proveedorActualizado);

    // Actualiza el proveedor con los nuevos datos proporcionados
    const proveedor = await prisma.proveedor.update({
      where: { idProveedor: id }, // Identifica el proveedor a través de su ID
      data: {
        ...proveedorActualizado, // Utiliza desestructuración para actualizar solo los campos modificados
      },
    });

    // Log para mostrar el proveedor actualizado
    console.log("Proveedor actualizado:", proveedor);
    return proveedor; // Devuelve el proveedor actualizado
  } catch (error) {
    // En caso de error, lo registra y lanza un nuevo error
    console.error("Error en actualizarProveedor:", error);
    throw new Error("No se pudo actualizar el proveedor.");
  }
}

// Función para actualizar la procedencia de un registro
export async function actualizarProcedencia(
  id: number,
  datosActualizados: { procedencia?: string }
) {
  try {
    // Log para mostrar el ID de la procedencia y los datos a actualizar
    console.log("ID de procedencia a actualizar:", id);
    console.log("Datos a actualizar:", datosActualizados);

    // Actualiza la procedencia con los nuevos datos
    const procedenciaActualizada = await prisma.procedencia.update({
      where: { idProcedencia: id }, // Busca la procedencia por su ID
      data: {
        ...datosActualizados, // Utiliza desestructuración para actualizar solo los campos necesarios
      },
    });

    // Log para mostrar la procedencia actualizada
    console.log("Procedencia actualizada:", procedenciaActualizada);
    return procedenciaActualizada; // Devuelve la procedencia actualizada
  } catch (error) {
    // Manejo de error en caso de que no se pueda actualizar la procedencia
    console.error("Error en actualizarProcedencia:", error);
    throw new Error("No se pudo actualizar la procedencia.");
  }
}

// Función para actualizar el nivel educativo
export async function actualizarNivelEducativo(
  id: number,
  nivelEducativoActualizado: { nivelEducativo: string }
) {
  try {
    // Actualiza el nivel educativo con los nuevos datos
    const nivelEducativo = await prisma.nivelEducativo.update({
      where: { idNivel: id }, // Encuentra el nivel educativo por su ID
      data: nivelEducativoActualizado, // Actualiza los datos del nivel educativo
    });
    return nivelEducativo; // Devuelve el nivel educativo actualizado
  } catch (error) {
    // Manejo de errores si la actualización del nivel educativo falla
    console.error("Error en actualizarNivelEducativo:", error);
    throw new Error("No se pudo actualizar el nivel educativo.");
  }
}

// Función para actualizar los datos de una sala
export async function actualizarSala(
  id: number,
  salaActualizada: {
    numeroSala?: number;
    nombreSala?: string;
    capacidad?: number;
    idNivel?: number; // Posibilidad de actualizar el nivel educativo asociado
  }
) {
  try {
    // Actualiza la sala con los nuevos datos
    const sala = await prisma.sala.update({
      where: { idSala: id }, // Encuentra la sala por su ID
      data: {
        ...salaActualizada, // Utiliza desestructuración para actualizar solo los campos necesarios
      },
    });

    return sala; // Devuelve la sala actualizada
  } catch (error) {
    // Registra el error si la actualización de la sala falla
    console.error("Error en actualizarSala:", error);
    throw new Error("No se pudo actualizar la sala.");
  }
}

// Función para actualizar el estado de conservación de un objeto
export async function actualizarEstadoConservacion(
  id: number,
  estadoActualizado: Partial<FormularioActualizacionEstado>
) {
  try {
    // Actualiza el estado de conservación con los nuevos datos
    const estado = await prisma.estadoConservacion.update({
      where: { idEstado: id }, // Encuentra el estado por su ID
      data: estadoActualizado, // Actualiza los datos del estado de conservación
    });

    return estado; // Devuelve el estado actualizado
  } catch (error) {
    // Manejo de errores en caso de que falle la actualización del estado de conservación
    console.error("Error al actualizar el estado de conservación:", error);
    throw new Error("No se pudo actualizar el estado de conservación.");
  }
}

// Función para actualizar la subcategoría
export async function actualizarSubcategoria(
  id: number,
  subcategoriaActualizada: Partial<FormularioActualizacionSubCategoria>
) {
  try {
    // Actualiza la subcategoría con los nuevos datos
    const subcategoria = await prisma.subcategoria.update({
      where: { idSubcategoria: id }, // Encuentra la subcategoría por su ID
      data: subcategoriaActualizada, // Actualiza los campos de la subcategoría
    });

    return subcategoria; // Devuelve la subcategoría actualizada
  } catch (error) {
    // Registra el error si no se pudo actualizar la subcategoría
    console.error("Error al actualizar la subcategoría:", error);
    throw new Error("No se pudo actualizar la subcategoría.");
  }
}

// Función para actualizar la categoría
export async function actualizarCategoria(
  id: number,
  categoriaActualizada: Partial<FormularioActualizacionCategoria>
) {
  try {
    // Actualiza la categoría con los nuevos datos
    const categoria = await prisma.categoria.update({
      where: { idCategoria: id }, // Encuentra la categoría por su ID
      data: categoriaActualizada, // Actualiza los datos de la categoría
    });

    return categoria; // Devuelve la categoría actualizada
  } catch (error) {
    // Manejo de error si no se pudo actualizar la categoría
    console.error("Error al actualizar la categoría:", error);
    throw new Error("No se pudo actualizar la categoría.");
  }
}
