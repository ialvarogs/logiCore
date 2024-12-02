import prisma from "~~/server/utils/prisma/prisma"; // Importamos la instancia de Prisma para interactuar con la base de datos
import { FormularioAgregarStock } from "../schemas/productos"; // Importamos el esquema de validación para agregar stock (aunque no se usa directamente aquí)

export const obtenerProductosParaSelect = async () => {
  try {
    // Realizamos una consulta a la base de datos utilizando Prisma.
    // Usamos el método `groupBy` para agrupar los productos por el campo `individualizacionDelBien`.
    // Esto nos permitirá obtener la cantidad de productos agrupados por su nombre o descripción única (individualizacionDelBien).
    const productosAgrupados = await prisma.producto.groupBy({
      by: ["individualizacionDelBien"], // Especificamos que queremos agrupar los productos solo por `individualizacionDelBien`
      _count: {
        idProducto: true, // Contamos la cantidad de productos para cada `individualizacionDelBien`
      },
    });

    // Una vez obtenidos los resultados agrupados, devolvemos un nuevo arreglo con el formato deseado.
    // Cada elemento del arreglo contiene el nombre o descripción del producto (individualizacionDelBien)
    // y la cantidad de productos con esa misma `individualizacionDelBien`.
    return productosAgrupados.map((grupo: any) => ({
      individualizacionDelBien: grupo.individualizacionDelBien, // Nombre del producto o descripción
      cantidad: grupo._count.idProducto, // Cantidad de productos con esa `individualizacionDelBien`
    }));
  } catch (error) {
    // Si ocurre un error durante la consulta, lo capturamos y mostramos en la consola.
    // Luego, lanzamos un error genérico para ser manejado por la capa superior de la aplicación.
    console.error("Error al obtener productos para select:", error);
    throw new Error("Error al obtener productos para select."); // Lanzamos un error genérico
  }
};

export const obtenerProductosParaPrestamo = async (
  individualizacionDelBien: string // Recibe el nombre o descripción del producto para filtrar
) => {
  try {
    // Realiza una consulta en la base de datos para obtener los productos disponibles para préstamo
    const productos = await prisma.producto.findMany({
      where: {
        // Filtra los productos por la `individualizacionDelBien`, es decir, el nombre o descripción del producto
        individualizacionDelBien,
        responsables: {
          none: {
            // Se asegura de que no haya registros asociados con el producto que tengan una `fechaDevolucion` nula.
            // Esto significa que el producto no está actualmente prestado o está esperando ser devuelto.
            fechaDevolucion: null,
          },
        },
      },
      select: {
        // Selecciona solo el `idProducto` de los productos que cumplen con el criterio
        idProducto: true,
      },
    });

    // Mapea los productos obtenidos para devolver solo los valores de `idProducto`
    // Esto es útil para obtener solo los identificadores de los productos disponibles
    return productos.map((producto) => producto.idProducto);
  } catch (error) {
    // Si ocurre un error durante la consulta, se captura y se muestra en la consola
    // Luego se lanza un error genérico para que pueda ser manejado a un nivel superior de la aplicación
    console.error("Error al obtener productos para préstamo:", error);
    throw new Error("Error al obtener productos para préstamo.");
  }
};

export const obtenerProductosParaDevolucion = async (idUsuario: number) => {
  try {
    // Realiza una consulta para obtener los productos asignados a un usuario que aún no han sido devueltos.
    const productosAsignados = await prisma.productoResponsable.findMany({
      where: {
        idUsuario: idUsuario, // Filtra por el ID del usuario, asegurando que solo se obtengan productos asignados a este usuario
        fechaDevolucion: null, // Filtra los productos que aún no han sido devueltos (fechaDevolucion es null)
      },
      select: {
        idProducto: true, // Solo seleccionamos el idProducto, ya que solo necesitamos los identificadores de los productos
      },
    });

    // Mapea los resultados obtenidos para devolver solo los `idProducto`
    // Esto devuelve un arreglo con los IDs de los productos que están asignados al usuario y aún no han sido devueltos
    return productosAsignados.map((item: any) => item.idProducto);
  } catch (error) {
    // En caso de error, se captura y se muestra en la consola
    // Luego se lanza un error genérico para ser manejado en un nivel superior
    console.error("Error al obtener productos para devolución:", error);
    throw new Error("Error al obtener productos para devolución.");
  }
};

export const obtenerProductosFiltroSala = async (idSala: number) => {
  try {
    // Realiza una consulta para obtener los productos asignados a la sala especificada (idSala)
    const productosAgrupados = await prisma.producto.findMany({
      where: {
        productoSalas: {
          some: {
            idSala: idSala, // Filtramos productos que están asignados a la sala proporcionada
          },
        },
      },
      select: {
        idProducto: true, // Seleccionamos el ID del producto
        individualizacionDelBien: true, // Seleccionamos el nombre o descripción del producto
        fechaAdquisicion: true, // Fecha en que el producto fue adquirido
        subcategoria: {
          select: {
            nombreSubcategoria: true, // Nombre de la subcategoría a la que pertenece el producto
          },
        },
        estado: {
          select: {
            estado: true, // Estado del producto (por ejemplo, 'bueno', 'en reparación', etc.)
          },
        },
        procedencia: {
          select: {
            procedencia: true, // Procedencia del producto (por ejemplo, 'compra', 'donación', etc.)
          },
        },
        productoSalas: {
          where: {
            idSala: idSala, // Filtramos las asignaciones específicas de la sala
          },
          orderBy: {
            fechaAsignacion: "desc", // Ordenamos las asignaciones por fecha, de la más reciente a la más antigua
          },
          take: 1, // Solo seleccionamos la asignación más reciente (la última asignación)
          select: {
            fechaAsignacion: true, // Tomamos la fecha de asignación (aunque no la utilizamos en la respuesta)
            sala: {
              select: {
                idSala: true, // ID de la sala asignada
                nombreSala: true, // Nombre de la sala asignada
                nivelEducativo: {
                  select: {
                    nivelEducativo: true, // Nivel educativo asociado con la sala
                  },
                },
              },
            },
          },
        },
      },
    });

    // Agrupamos los productos por "individualizacionDelBien" y contamos la cantidad de cada tipo
    const productosAgrupadosPorIndividualizacion = productosAgrupados.reduce(
      (acc: any, producto: any) => {
        const ultimaAsignacion = producto.productoSalas[0]; // Tomamos la asignación más reciente

        // Verificamos si el producto ya está en el acumulador (si ya existe en la agrupación)
        if (!acc[producto.individualizacionDelBien]) {
          acc[producto.individualizacionDelBien] = {
            individualizacionDelBien: producto.individualizacionDelBien,
            cantidad: 0, // Inicializamos el contador de productos
            fechaAdquisicion: producto.fechaAdquisicion, // Fecha de adquisición del producto
            Subcategoria: producto.subcategoria.nombreSubcategoria, // Subcategoría del producto
            Estado: producto.estado.estado, // Estado del producto
            Procedencia: producto.procedencia.procedencia, // Procedencia del producto
            Ubicacion: ultimaAsignacion.sala.nombreSala, // Última sala asignada al producto
            Niveleducativo: ultimaAsignacion.sala.nivelEducativo.nivelEducativo, // Nivel educativo de la sala
          };
        }

        // Aumentamos el contador de productos en la agrupación
        acc[producto.individualizacionDelBien].cantidad += 1;

        return acc;
      },
      {} // Inicializamos el acumulador como un objeto vacío
    );

    // Convertimos el acumulador en un array para obtener los resultados agrupados
    const resultados = Object.values(productosAgrupadosPorIndividualizacion);

    // Retornamos los productos agrupados como resultado
    return resultados;
  } catch (error) {
    // Si ocurre un error, se captura y muestra en la consola
    console.error("Error al obtener productos agrupados en sala:", error);
    // Lanza un error genérico para que sea manejado en el nivel superior
    throw new Error("Error al obtener productos agrupados en la sala.");
  }
};

export const obtenerProductosEditarFiltroSala = async (idSala: number) => {
  try {
    // Realiza una consulta para obtener los productos asignados a la sala especificada (idSala)
    const productos = await prisma.producto.findMany({
      where: {
        productoSalas: {
          some: {
            idSala: idSala, // Filtramos productos que están asignados a la sala proporcionada
          },
        },
      },
      select: {
        idProducto: true, // Seleccionamos el ID del producto
        individualizacionDelBien: true, // Seleccionamos el nombre o descripción del producto
        fechaAdquisicion: true, // Fecha en que el producto fue adquirido
        subcategoria: {
          select: {
            nombreSubcategoria: true, // Nombre de la subcategoría a la que pertenece el producto
          },
        },
        estado: {
          select: {
            estado: true, // Estado del producto (por ejemplo, 'bueno', 'en reparación', etc.)
          },
        },
        procedencia: {
          select: {
            procedencia: true, // Procedencia del producto (por ejemplo, 'compra', 'donación', etc.)
          },
        },
        productoSalas: {
          where: {
            idSala: idSala, // Filtramos las asignaciones específicas de la sala
          },
          orderBy: {
            fechaAsignacion: "desc", // Ordenamos las asignaciones por fecha, de la más reciente a la más antigua
          },
          take: 1, // Solo seleccionamos la asignación más reciente (la última asignación)
          select: {
            fechaAsignacion: true, // Tomamos la fecha de asignación (aunque no la utilizamos en la respuesta)
            sala: {
              select: {
                idSala: true, // ID de la sala asignada
                nombreSala: true, // Nombre de la sala asignada
                nivelEducativo: {
                  select: {
                    nivelEducativo: true, // Nivel educativo asociado con la sala
                  },
                },
              },
            },
          },
        },
      },
    });

    // Mapeamos los productos para incluir la información relevante, y devolvemos cada producto por separado
    const resultados = productos.map((producto: any) => {
      const ultimaAsignacion = producto.productoSalas[0]; // Tomamos la asignación más reciente
      return {
        idProducto: producto.idProducto,
        individualizacionDelBien: producto.individualizacionDelBien,
        fechaAdquisicion: producto.fechaAdquisicion,
        Subcategoria: producto.subcategoria.nombreSubcategoria,
        Estado: producto.estado.estado,
        Procedencia: producto.procedencia.procedencia,
        Ubicacion: ultimaAsignacion.sala.nombreSala, // Última sala asignada al producto
        Niveleducativo: ultimaAsignacion.sala.nivelEducativo.nivelEducativo, // Nivel educativo de la sala
      };
    });

    // Retornamos los productos sin agrupar
    return resultados;
  } catch (error) {
    // Si ocurre un error, se captura y muestra en la consola
    console.error("Error al obtener productos en la sala:", error);
    // Lanza un error genérico para que sea manejado en el nivel superior
    throw new Error("Error al obtener productos en la sala.");
  }
};

export const obtenerProductos = async () => {
  try {
    // Agrupamos los productos por los campos especificados
    const productosAgrupados = await prisma.producto.groupBy({
      by: [
        "individualizacionDelBien", // Agrupamos por la descripción del bien
        "idSubcategoria", // Agrupamos por ID de subcategoría
        "idEstado", // Agrupamos por ID de estado del producto
        "idProcedencia", // Agrupamos por ID de procedencia
        "fechaAdquisicion", // Agrupamos por fecha de adquisición
      ],
      _count: {
        idProducto: true, // Contamos cuántos productos hay por grupo
      },
      _max: {
        fechaAdquisicion: true, // Obtenemos la fecha de adquisición más reciente dentro del grupo
      },
    });

    // Para cada grupo de productos, obtenemos los detalles asociados
    const productosConDetalles = await Promise.all(
      productosAgrupados.map(async (grupo: any) => {
        // Buscamos todos los productos que coinciden con los criterios de agrupación
        const productos = await prisma.producto.findMany({
          where: {
            individualizacionDelBien: grupo.individualizacionDelBien,
            idSubcategoria: grupo.idSubcategoria,
            idEstado: grupo.idEstado,
            idProcedencia: grupo.idProcedencia,
            fechaAdquisicion: grupo.fechaAdquisicion, // Aseguramos que sea la misma fecha de adquisición que el grupo
          },
          include: {
            subcategoria: { select: { nombreSubcategoria: true } }, // Obtenemos el nombre de la subcategoría
            estado: { select: { estado: true } }, // Obtenemos el estado del producto
            procedencia: { select: { procedencia: true } }, // Obtenemos la procedencia del producto
            productoSalas: {
              orderBy: { fechaAsignacion: "desc" }, // Ordenamos por fecha de asignación de la sala, la más reciente primero
              include: {
                sala: {
                  select: {
                    nombreSala: true, // Nombre de la sala
                    numeroSala: true, // Número de la sala
                    nivelEducativo: { select: { nivelEducativo: true } }, // Nivel educativo de la sala
                  },
                },
              },
            },
            responsables: {
              orderBy: { fechaAsignacion: "desc" }, // Ordenamos por la fecha de asignación más reciente
              include: {
                usuarioResponsable: {
                  select: { nombre: true, apellido: true }, // Obtenemos el nombre y apellido del responsable
                },
              },
            },
          },
        });

        // Agrupamos los productos por responsable o ubicación
        const productosPorResponsable = productos.reduce(
          (acc: any, producto: any) => {
            const responsableActual = producto.responsables[0]; // Tomamos el primer responsable asignado
            const ultimaSala = producto.productoSalas[0]; // Tomamos la primera sala asignada (más reciente)

            // Verificamos si el producto ha sido devuelto
            const esDevuelto = responsableActual?.fechaDevolucion !== null;

            // Definimos la ubicación del producto dependiendo de si está devuelto o no
            const ubicacion = esDevuelto
              ? `${ultimaSala?.sala.nombreSala || "No asignado"} ${
                  ultimaSala?.sala.numeroSala || "No Sala"
                }`
              : `Asignado a ${
                  responsableActual?.usuarioResponsable.nombre || "No asignado"
                } ${responsableActual?.usuarioResponsable.apellido || ""}`;

            // Si la ubicación no existe en el acumulador, la inicializamos
            if (!acc[ubicacion]) {
              acc[ubicacion] = { productos: [], cantidad: 0 };
            }
            // Agregamos el producto al grupo de la ubicación correspondiente
            acc[ubicacion].productos.push(producto);
            acc[ubicacion].cantidad += 1;
            return acc;
          },
          {} // Inicializamos el acumulador vacío
        );

        // Mapeamos los resultados de los productos agrupados por responsable o ubicación
        const detalles = Object.keys(productosPorResponsable).map(
          (ubicacionKey) => {
            const responsableInfo = productosPorResponsable[ubicacionKey];
            const producto = responsableInfo.productos[0]; // Tomamos un producto para obtener detalles comunes
            const sala = producto.productoSalas[0]?.sala || {
              nombreSala: "No asignado",
              nivelEducativo: { nivelEducativo: "No asignado" },
            };
            const numeroSala =
              "numeroSala" in sala ? sala.numeroSala : "No Sala"; // Si no tiene número de sala, asignamos "No Sala"

            // Devolvemos los detalles de cada grupo de productos agrupados por ubicación
            return {
              individualizacionDelBien: grupo.individualizacionDelBien, // Descripción del producto
              cantidad: responsableInfo.cantidad, // Cantidad de productos por responsable o ubicación
              Subcategoria:
                producto.subcategoria.nombreSubcategoria || "Sin subcategoría", // Nombre de la subcategoría
              fechaAdquisicion: grupo.fechaAdquisicion, // Fecha de adquisición del grupo
              Ubicacion: ubicacionKey, // La ubicación o responsable (dependiendo de si el producto fue devuelto)
              Estado: producto.estado.estado || "Sin estado", // Estado del producto
              Procedencia:
                producto.procedencia.procedencia || "Sin procedencia", // Procedencia del producto
              Niveleducativo: sala.nivelEducativo.nivelEducativo, // Nivel educativo de la sala
            };
          }
        );
        return detalles; // Devuelve los detalles agrupados por responsable/ubicación
      })
    );

    // Aplanamos la respuesta final para devolver todos los resultados
    return productosConDetalles.flat(); // Utilizamos flat() para aplanar el array de resultados
  } catch (error) {
    // Si ocurre algún error durante la ejecución, lo mostramos en la consola
    console.error("Error al obtener productos agrupados:", error);
    // Lanza un error genérico para que pueda ser capturado en el nivel superior
    throw new Error("Error al obtener productos agrupados.");
  }
};

export const obtenerProductosNoAgrupados = async () => {
  try {
    // Obtenemos todos los productos sin agrupación
    const productos = await prisma.producto.findMany({
      include: {
        subcategoria: {
          select: { nombreSubcategoria: true, idSubcategoria: true }, // Obtenemos el nombre y el ID de la subcategoría
        },
        estado: {
          select: { estado: true, idEstado: true }, // Obtenemos el estado del producto y su ID
        },
        procedencia: {
          select: { procedencia: true, idProcedencia: true }, // Obtenemos la procedencia del producto y su ID
        },
        productoSalas: {
          orderBy: { fechaAsignacion: "desc" }, // Ordenamos por fecha de asignación más reciente
          include: {
            sala: {
              select: {
                nombreSala: true, // Nombre de la sala
                numeroSala: true, // Número de la sala
                nivelEducativo: { select: { nivelEducativo: true } }, // Nivel educativo asociado con la sala
              },
            },
          },
        },
        responsables: {
          orderBy: { fechaAsignacion: "desc" }, // Ordenamos por fecha de asignación más reciente
          include: {
            usuarioResponsable: {
              select: { nombre: true, apellido: true }, // Obtenemos el nombre y apellido del responsable
            },
          },
        },
      },
    });

    // Mapeamos los productos para incluir solo la asignación más reciente de sala y responsable
    const productosConDetalles = productos.map((producto) => {
      // Tomamos la sala más reciente (la primera después de ordenar por fecha de asignación)
      const sala = producto.productoSalas[0]?.sala || {
        nombreSala: "No asignado",
        nivelEducativo: { nivelEducativo: "No asignado" },
      };
      const numeroSala = "numeroSala" in sala ? sala.numeroSala : "NoSala"; // Si no tiene número de sala, asignamos "No Sala"

      // Tomamos el responsable más reciente (el primero después de ordenar por fecha de asignación)
      const responsable = producto.responsables.length
        ? `Asignado a ${producto.responsables[0].usuarioResponsable.nombre} ${producto.responsables[0].usuarioResponsable.apellido}`
        : `${producto.productoSalas[0]?.sala.nombreSala || "No asignado"} N${
            producto.productoSalas[0]?.sala.numeroSala || "NoSala"
          }`;

      return {
        idProducto: producto.idProducto, // ID del producto
        individualizacionDelBien: producto.individualizacionDelBien, // Nombre o descripción del producto
        cantidad: 1, // Cada producto se cuenta por sí mismo
        Subcategoria:
          producto.subcategoria.nombreSubcategoria || "Sin subcategoría", // Nombre de la subcategoría o "Sin subcategoría" si no está disponible
        idSubcategoria: producto.subcategoria.idSubcategoria, // ID de la subcategoría
        fechaAdquisicion: producto.fechaAdquisicion, // Fecha de adquisición del producto
        Ubicacion: responsable || numeroSala, // Mostramos la ubicación del producto, ya sea el responsable o la sala
        Estado: producto.estado.estado || "Sin estado", // Estado del producto o "Sin estado" si no está disponible
        idEstado: producto.estado.idEstado, // ID del estado
        Procedencia: producto.procedencia.procedencia || "Sin procedencia", // Procedencia del producto o "Sin procedencia" si no está disponible
        idProcedencia: producto.procedencia.idProcedencia, // ID de la procedencia
        Niveleducativo: sala.nivelEducativo.nivelEducativo, // Nivel educativo de la sala asociada
      };
    });

    return productosConDetalles; // Devolvemos todos los productos con sus detalles mapeados
  } catch (error) {
    console.error("Error al obtener productos no agrupados:", error); // Si hay un error, lo registramos en la consola
    throw new Error("Error al obtener productos no agrupados."); // Lanza un error para que se maneje en el nivel superior
  }
};

export async function obtenerProductosTotales() {
  // Agrupamos los productos por su 'individualizacionDelBien' y contamos cuántos hay de cada uno
  const productosAgrupados = await prisma.producto.groupBy({
    by: ["individualizacionDelBien"], // Agrupamos por 'individualizacionDelBien'
    _count: {
      idProducto: true, // Contamos la cantidad de productos en cada grupo
    },
  });

  // Devolvemos los productos con su respectiva cantidad
  return productosAgrupados.map((producto) => ({
    individualizacionDelBien: producto.individualizacionDelBien, // Código de individualización del bien
    cantidad: producto._count.idProducto, // Cantidad de productos en este grupo
  }));
}

export async function crearProducto(data: {
  individualizacionDelBien: string; // Identificador único del producto
  cantidad: number; // Número de productos a crear
  fechaAdquisicion: Date; // Fecha de adquisición del producto
  idProcedencia: number; // ID de la procedencia del producto
  idEstado: number; // ID del estado del producto
  idSubcategoria: number; // ID de la subcategoría a la que pertenece el producto
  idUsuarioCreador: number; // ID del usuario que está creando el producto
  idSalas: number[]; // IDs de las salas a las que se asignará el producto
}) {
  try {
    // Creamos una lista para almacenar los productos creados
    const productosCreados = [];

    // Creamos los productos según la cantidad especificada
    for (let i = 0; i < data.cantidad; i++) {
      // Para cada producto, creamos uno nuevo en la base de datos
      const nuevoProducto = await prisma.producto.create({
        data: {
          individualizacionDelBien: data.individualizacionDelBien, // Asignamos el código de individualización
          fechaAdquisicion: data.fechaAdquisicion, // Asignamos la fecha de adquisición
          procedencia: {
            connect: { idProcedencia: data.idProcedencia }, // Conectamos con la procedencia
          },
          estado: {
            connect: { idEstado: data.idEstado }, // Conectamos con el estado del producto
          },
          subcategoria: {
            connect: { idSubcategoria: data.idSubcategoria }, // Conectamos con la subcategoría
          },
          usuarioCreador: {
            connect: { idUsuario: data.idUsuarioCreador }, // Conectamos con el usuario creador
          },
          productoSalas: {
            // Asignamos el producto a las salas especificadas
            create: data.idSalas.map((idSala) => ({
              idSala, // ID de la sala
              fechaAsignacion: new Date(), // Fecha de asignación actual
            })),
          },
        },
      });

      // Agregamos el producto creado a la lista
      productosCreados.push(nuevoProducto);
    }

    // Retornamos todos los productos creados
    return productosCreados;
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y lo lanzamos
    console.error("Error al crear los productos:", error);
    throw error;
  }
}

export async function actualizarProducto(
  id: number,
  datosProductoActualizados: {
    individualizacionDelBien?: string;
    idSubcategoria?: number; // O el campo correspondiente
    idEstado?: number; // O el campo correspondiente
    idProcedencia?: number; // O el campo correspondiente
    idUsuarioCreador?: number; // O el campo correspondiente
  }
) {
  try {
    // Actualiza el producto
    const producto = await prisma.producto.update({
      where: { idProducto: id }, // Asegúrate de que id sea el campo correcto en tu base de datos
      data: {
        ...datosProductoActualizados,
      },
    });
    return producto;
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    throw new Error("No se pudo actualizar el producto.");
  }
}

export const asignarResponsableAProducto = async ({
  idProducto,
  fechaAsignacion,
  idUsuario,
}: {
  idProducto: number;
  idUsuario: number;
  fechaAsignacion: Date;
}) => {
  try {
    // Obtener la fecha actual del servidor
    const fechaActual = new Date();

    // Si 'fechaAsignacion' tiene solo la fecha (sin hora), se actualiza con la hora del servidor
    if (fechaAsignacion) {
      fechaAsignacion.setHours(
        fechaActual.getHours(),
        fechaActual.getMinutes(),
        fechaActual.getSeconds(),
        fechaActual.getMilliseconds()
      );
      console.log(fechaAsignacion);
    } else {
      // Si no se pasa una fecha, asignamos la hora actual del servidor
      fechaAsignacion = fechaActual;
    }

    // Crear el nuevo responsable con la fecha modificada
    const nuevoResponsable = await prisma.productoResponsable.create({
      data: {
        idProducto,
        idUsuario,
        fechaAsignacion,
      },
    });

    return nuevoResponsable;
  } catch (error) {
    console.error("Error al asignar responsable al producto:", error);
    throw new Error("No se pudo asignar el responsable al producto.");
  }
};

export const obtenerProductosPorIndividualizacion = async (
  individualizacionDelBien: any
) => {
  try {
    // Consulta los productos cuyo individualizacionDelBien coincida
    const productos = await prisma.producto.findMany({
      where: {
        individualizacionDelBien: individualizacionDelBien,
      },
      select: {
        idProducto: true, // Solo selecciona el campo idProducto
      },
    });

    // Retorna los IDs de los productos
    return productos.map((producto: any) => producto.idProducto);
  } catch (error) {
    console.error(
      "Error al obtener productos por individualizacionDelBien:",
      error
    );
    throw new Error("Error al obtener productos por individualizacionDelBien.");
  }
};

export const moverProductosASala = async (
  productos: number[], // Lista de IDs de los productos que se moverán
  idSala: number, // ID de la sala a la que se moverán los productos
  fechaAsignacion: Date | undefined // Fecha de asignación del movimiento, si no se proporciona se usa la actual
) => {
  try {
    const fechaActual = new Date(); // Fecha actual del servidor

    // Verificamos si fechaAsignacion es válida
    if (fechaAsignacion) {
      // Si tiene solo la fecha (sin hora), se actualiza con la hora del servidor
      fechaAsignacion.setHours(
        fechaActual.getHours(),
        fechaActual.getMinutes(),
        fechaActual.getSeconds(),
        fechaActual.getMilliseconds()
      );
    } else {
      // Si no se pasa una fecha (undefined o null), asignamos la hora actual del servidor
      fechaAsignacion = fechaActual;
    }

    // Crear un nuevo registro por cada producto que se mueve a la nueva sala
    const movimientos = await prisma.productoSala.createMany({
      data: productos.map((idProducto) => ({
        idProducto, // El producto que se mueve
        idSala, // La nueva sala a la que se mueve
        fechaAsignacion, // La fecha de asignación al mover el producto
      })),
    });

    // Retorna true si se insertaron registros, o false si no hubo cambios
    return movimientos.count > 0;
  } catch (error) {
    console.error("Error al mover productos a la sala:", error);
    throw new Error("Hubo un problema al mover los productos.");
  }
};

export async function obtenerAlertas() {
  try {
    // Agrupamos los productos solo por 'individualizacionDelBien'
    const productosAgrupados = await prisma.producto.groupBy({
      by: ["individualizacionDelBien"], // Agrupamos solo por 'individualizacionDelBien'
      _count: {
        idProducto: true, // Cantidad total de productos en el grupo
      },
    });

    // Filtramos los productos cuya cantidad sea menor o igual a 5
    const productosFiltrados = productosAgrupados.filter(
      (grupo: any) => grupo._count.idProducto <= 5
    );

    // Devolvemos solo los productos filtrados con 'individualizacionDelBien' y 'cantidad'
    return productosFiltrados.map((grupo: any) => ({
      individualizacionDelBien: grupo.individualizacionDelBien, // Identificación del producto
      cantidad: grupo._count.idProducto, // Cantidad de productos con la misma 'individualizacionDelBien'
    }));
  } catch (error) {
    console.error("Error al obtener productos agrupados:", error);
    throw new Error("Error al obtener productos agrupados.");
  }
}

export async function asignarFechaDevolucion(
  fecha: any, // Fecha de devolución a asignar
  idProducto: any, // ID del producto
  id: number // ID del responsable
) {
  // Verifica si el registro existe primero
  const responsableExistente = await prisma.productoResponsable.findFirst({
    where: {
      idProducto: idProducto, // Se busca el responsable del producto específico
      idUsuario: id, // Se busca el responsable por ID de usuario
    },
  });

  // Si no existe el registro, lanzamos un error o retornamos una respuesta adecuada
  if (!responsableExistente) {
    throw new Error(
      `No se encontró el responsable con idProducto ${idProducto} e idResponsable ${id}`
    );
  }

  // Si el registro existe, se procede a actualizarlo
  const nuevoResponsable = await prisma.productoResponsable.update({
    data: {
      fechaDevolucion: fecha, // Actualiza la fecha de devolución
    },
    where: {
      idResponsable: responsableExistente.idResponsable, // Se actualiza el responsable del producto
    },
  });

  return nuevoResponsable; // Retorna el registro actualizado
}

export async function agregarStock(data: FormularioAgregarStock) {
  try {
    // Busca la subcategoría relacionada a través de la `individualizacionDelBien`
    const productoExistente = await prisma.producto.findFirst({
      where: { individualizacionDelBien: data.individualizacionDelBien }, // Busca el producto por su identificación
      select: { subcategoria: { select: { idSubcategoria: true } } }, // Obtiene el ID de la subcategoría del producto
    });

    // Verifica si existe la subcategoría
    if (!productoExistente?.subcategoria) {
      throw new Error(
        "Subcategoría no encontrada para el producto especificado."
      );
    }

    const idSubcategoria = productoExistente.subcategoria.idSubcategoria; // Obtiene el ID de la subcategoría
    const productosCreados = []; // Array para almacenar los productos creados

    // Crear los productos según la cantidad especificada
    for (let i = 0; i < data.cantidad; i++) {
      const nuevoProducto = await prisma.producto.create({
        data: {
          individualizacionDelBien: data.individualizacionDelBien, // Asigna el producto con la identificación especificada
          fechaAdquisicion: data.fechaAdquisicion, // Fecha de adquisición del producto
          procedencia: {
            connect: { idProcedencia: data.idProcedencia }, // Conecta con la procedencia especificada
          },
          estado: {
            connect: { idEstado: data.idEstado }, // Conecta con el estado del producto
          },
          subcategoria: {
            connect: { idSubcategoria: idSubcategoria }, // Conecta con la subcategoría
          },
          usuarioCreador: {
            connect: { idUsuario: data.idUsuarioCreador }, // Conecta con el usuario creador del producto
          },
          productoSalas: {
            create: data.idSalas.map((idSala) => ({
              idSala, // Asigna la sala al producto
              fechaAsignacion: new Date(), // Asigna la fecha de la creación
            })),
          },
        },
      });
      productosCreados.push(nuevoProducto); // Agrega el producto creado al array
    }

    return productosCreados; // Retorna los productos creados
  } catch (error) {
    console.error("Error al crear los productos:", error); // Muestra el error en consola
    throw error; // Lanza el error
  }
}
