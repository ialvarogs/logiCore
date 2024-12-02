// Importación del cliente Prisma para interactuar con la base de datos
import prisma from "~~/server/utils/prisma/prisma";

// Función asincrónica para obtener datos relevantes sobre los responsables de productos
export const obtenerDatosReporteResponsables = async () => {
  try {
    // Recupera todos los registros de asignación de productos (productoResponsable)
    const asignaciones = await prisma.productoResponsable.findMany({
      include: {
        producto: {
          select: {
            individualizacionDelBien: true, // Obtiene el nombre o descripción del producto
            idProducto: true, // Obtiene el ID del producto
          },
        },
        usuarioResponsable: {
          select: {
            nombre: true, // Obtiene el nombre del usuario responsable
            apellido: true, // Obtiene el apellido del usuario responsable
            idUsuario: true, // Obtiene el ID del usuario responsable
          },
        },
      },
    });

    // Analiza las asignaciones para extraer datos relevantes sobre cada responsable
    const analisis = asignaciones.reduce(
      (acc: any, item) => {
        // Combina el nombre y apellido del usuario responsable
        const responsable = `${item.usuarioResponsable.nombre} ${item.usuarioResponsable.apellido}`;
        const idUsuario = item.usuarioResponsable.idUsuario; // ID del usuario responsable
        const producto = item.producto.individualizacionDelBien; // Nombre del producto
        const fechaAsignacion = item.fechaAsignacion; // Fecha en la que se asignó el producto
        const fechaDevolucion = item.fechaDevolucion; // Fecha de devolución (si existe)

        // Inicializa un registro para el responsable si no existe aún en el acumulador
        if (!acc.responsables[idUsuario]) {
          acc.responsables[idUsuario] = {
            nombre: responsable,
            productosAsignados: 0, // Contador de productos asignados al responsable
            tiempoPromedio: 0, // Tiempo promedio de asignación (en días)
            productosSinDevolver: 0, // Contador de productos no devueltos
          };
        }

        // Incrementa el contador de productos asignados al responsable
        acc.responsables[idUsuario].productosAsignados++;

        // Si el producto tiene una fecha de devolución, calcula el tiempo de asignación
        if (fechaDevolucion) {
          const tiempoAsignacion =
            (new Date(fechaDevolucion).getTime() -
              new Date(fechaAsignacion).getTime()) /
            (1000 * 60 * 60 * 24); // Calcula el tiempo en días (en milisegundos convertido a días)

          // Suma el tiempo de asignación al total acumulado
          acc.responsables[idUsuario].tiempoPromedio += tiempoAsignacion;
        } else {
          // Si no tiene fecha de devolución, se cuenta como un producto no devuelto
          acc.responsables[idUsuario].productosSinDevolver++;
        }

        return acc; // Retorna el acumulador con las actualizaciones
      },
      { responsables: {} } // Estructura inicial del acumulador (vacío)
    );

    // Calcula el tiempo promedio de asignación por responsable
    Object.values(analisis.responsables).forEach((responsable: any) => {
      if (responsable.productosAsignados > 0) {
        // Si el responsable tiene productos asignados, divide el total de tiempo por la cantidad
        responsable.tiempoPromedio /= responsable.productosAsignados;
      }
    });

    // Convierte los resultados de los responsables a un arreglo para facilitar el análisis posterior
    const resumenResponsables = Object.values(analisis.responsables);

    // Devuelve los resultados finales: información de responsables y estadísticas de asignaciones
    return {
      responsables: resumenResponsables, // Información detallada por cada responsable
      totalProductosAsignados: asignaciones.length, // Total de productos asignados en general
      productosSinDevolver: resumenResponsables.reduce(
        (acc: number, responsable: any) =>
          acc + responsable.productosSinDevolver, // Total de productos no devueltos
        0
      ),
    };
  } catch (error) {
    // Captura cualquier error durante la ejecución y lo registra
    console.error("Error al obtener el historial de productos:", error);
    throw new Error("Error al obtener el historial de productos.");
  }
};

// Función asincrónica para obtener el reporte de asignaciones de productos a las salas
export async function obtenerDatosReporteSala() {
  try {
    // Recupera todos los registros de asignación de productos a las salas
    const datos = await prisma.productoSala.findMany({
      include: {
        producto: {
          select: {
            individualizacionDelBien: true, // Obtiene la descripción o nombre del producto
            idProducto: true, // Obtiene el ID del producto
          },
        },
        sala: {
          select: {
            numeroSala: true, // Obtiene el número de la sala
            nombreSala: true, // Obtiene el nombre de la sala
          },
        },
      },
    });

    // Procesa los datos obtenidos para analizarlos y agruparlos por sala
    const resumen = datos.reduce(
      (acc: any, item) => {
        // Crea un nombre único para la sala que combina el nombre y número
        const salaNombre = `${item.sala.nombreSala} (Sala ${item.sala.numeroSala})`;

        // Si la sala no está registrada en el acumulador, la inicializa
        if (!acc.salas[salaNombre]) {
          acc.salas[salaNombre] = {
            nombre: salaNombre, // Nombre de la sala
            cantidad: 0, // Contador de productos asignados a esta sala
          };
        }

        // Incrementa el contador de productos asignados a la sala
        acc.salas[salaNombre].cantidad += 1;
        // Incrementa el contador total de productos asignados
        acc.totalProductosAsignados += 1;

        return acc; // Retorna el acumulador actualizado
      },
      { salas: {}, totalProductosAsignados: 0 } // Estructura inicial del acumulador
    );

    // Devuelve un objeto con la lista de salas y el total de productos asignados
    return {
      salas: Object.values(resumen.salas), // Convierte el objeto de salas a un arreglo
      totalProductosAsignadosSala: resumen.totalProductosAsignados, // Total de productos asignados
    };
  } catch (error) {
    // Si ocurre un error, lo captura y lanza un nuevo error con mensaje personalizado
    console.error("Error al obtener datos de productoSala:", error);
    throw new Error("Error al obtener datos de productoSala.");
  }
}

// Función asincrónica para obtener los productos más asignados, ya sea a responsables o a salas
export async function obtenerProductosMasAsignados() {
  try {
    // Consulta para obtener las asignaciones de productos a responsables, agrupados por idProducto
    const asignacionesResponsables = await prisma.productoResponsable.groupBy({
      by: ["idProducto"], // Agrupa los registros por el idProducto
      _count: {
        idProducto: true, // Cuenta la cantidad de asignaciones por cada producto
      },
    });

    // Consulta para obtener las asignaciones de productos a salas, agrupados por idProducto
    const asignacionesSalas = await prisma.productoSala.groupBy({
      by: ["idProducto"], // Agrupa los registros por el idProducto
      _count: {
        idProducto: true, // Cuenta la cantidad de asignaciones por cada producto
      },
    });

    // Definición de un objeto para almacenar el total de asignaciones por producto
    const conteoAsignaciones: { [key: string]: number } = {};

    // Sumar las asignaciones de productos a responsables
    asignacionesResponsables.forEach((item) => {
      const { idProducto, _count } = item;
      conteoAsignaciones[idProducto] = _count.idProducto || 0; // Guarda el número de asignaciones
    });

    // Sumar las asignaciones de productos a salas
    asignacionesSalas.forEach((item) => {
      const { idProducto, _count } = item;
      if (conteoAsignaciones[idProducto]) {
        // Si el producto ya existe en el conteo, se suma el número de asignaciones
        conteoAsignaciones[idProducto] += _count.idProducto;
      } else {
        // Si el producto no existe en el conteo, se agrega con el valor de asignaciones
        conteoAsignaciones[idProducto] = _count.idProducto;
      }
    });

    // Ordena los productos por el total de asignaciones de mayor a menor y selecciona los 10 primeros
    const productosOrdenados = Object.entries(conteoAsignaciones)
      .map(([idProducto, totalAsignaciones]) => ({
        idProducto, // ID del producto
        totalAsignaciones, // Total de asignaciones (sumadas de responsables y salas)
      }))
      .sort((a, b) => b.totalAsignaciones - a.totalAsignaciones) // Ordena de mayor a menor
      .slice(0, 10); // Limita el resultado a los 10 productos más asignados

    // Recupera los productos más asignados desde la base de datos utilizando los ID obtenidos previamente
    const productosMasAsignados = await prisma.producto.findMany({
      where: {
        idProducto: {
          in: productosOrdenados.map((item) => Number(item.idProducto)), // Filtra por los ID de productos más asignados
        },
      },
      select: {
        idProducto: true, // Selecciona el ID del producto
        individualizacionDelBien: true, // Selecciona el nombre o descripción del producto
      },
    });

    // Combina los datos de productos con el total de asignaciones y genera el resultado final
    const resultadoFinal = productosOrdenados.map((item) => ({
      ...productosMasAsignados.find(
        (prod) => prod.idProducto === Number(item.idProducto) // Encuentra el producto correspondiente
      ),
      totalAsignaciones: item.totalAsignaciones, // Asocia el total de asignaciones con el producto
    }));

    // Devuelve los productos más asignados con su descripción y el total de asignaciones
    return resultadoFinal;
  } catch (error) {
    // Si ocurre un error, se captura y se lanza un nuevo error con mensaje personalizado
    console.error("Error al obtener los productos más asignados:", error);
    throw new Error("Error al obtener los productos más asignados.");
  }
}

// Función asincrónica para obtener el total de asignaciones por producto en las salas
export async function obtenerTotalPorProducto() {
  try {
    // Recupera todas las asignaciones de productos a las salas desde la base de datos
    const datos = await prisma.productoSala.findMany({
      include: {
        producto: {
          select: {
            individualizacionDelBien: true, // Nombre o descripción del producto
            idProducto: true, // Identificador único del producto
          },
        },
      },
    });

    // Procesa los datos obtenidos para generar un resumen por producto
    const resumen = datos.reduce(
      (acc: any, item) => {
        const productoNombre = item.producto.individualizacionDelBien; // Nombre del producto

        // Si el producto aún no está registrado en el acumulador, se inicializa
        if (!acc.productos[productoNombre]) {
          acc.productos[productoNombre] = {
            nombre: productoNombre,
            cantidad: 0, // Inicializa la cantidad en 0
          };
        }

        // Incrementa el contador de asignaciones para el producto correspondiente
        acc.productos[productoNombre].cantidad += 1;
        acc.totalProductosAsignados += 1; // Suma al total de productos asignados

        return acc; // Devuelve el acumulador actualizado
      },
      { productos: {}, totalProductosAsignados: 0 } // Inicializa el acumulador
    );

    // Devuelve el resumen de productos y el total de productos asignados
    return {
      productos: Object.values(resumen.productos), // Convierte el objeto de productos a un array
      totalProductosAsignados: resumen.totalProductosAsignados, // Total de asignaciones
    };
  } catch (error) {
    // Si ocurre un error durante la ejecución, se captura y se lanza un error personalizado
    console.error("Error al obtener datos de producto:", error);
    throw new Error("Error al obtener datos de producto.");
  }
}
