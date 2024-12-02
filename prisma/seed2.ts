import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Leer archivo Excel
const workbook = XLSX.readFile('C:\\Users\\PC1\\Documents\\Inventario.xlsx');

// Obtener todos los nombres de las hojas
const sheetNames = workbook.SheetNames;

const mapProcedencia = (procedencia: any) => {
  if (procedencia === "Fondos SEP") return 1;
  return 2; // Sin información si está vacío
};

const mapEstadoConservacion = (estado: any) => {
  if (estado === "nuevo") return 1;
  if (estado === "con uso") return 2;
  return 3; // descartable
};

const mapSubcategoria = (categorizacion: any) => {
  const subcategorias: any = {
    "Implementos Deportivos": 1,
    "Implementos de Laboratorio": 2,
    "Instrumentos Musicales y/o Artísticos": 3,
    "Libros y Revistas": 4,
    "Equipos Informáticos": 5,
    "Equipos Multicopiadoras": 6,
    "Equipos de Amplificación y sonido": 7,
    "Equipos de Climatización": 8,
    "Utiles escolares, equipamiento especializado de liceos tecnicos": 9,
    "Materiales y Útiles de aseo": 10,
    "Mobiliario escolar fuera de sala de clases": 11,
    "Mobiliario escolar dentro de sala de clases": 12,
    "Mobiliario no pedagógico o de oficina": 13,
    "Otros equipos, materiales o insumos": 14,
  };

  return subcategorias[categorizacion] || null; // Devuelve null si no encuentra la subcategoría
};

const parseDate = (fecha: any) => {
  // Si la fecha es una cadena en formato dd-mm-yyyy
  if (typeof fecha === 'string') {
    const [day, month, year] = fecha.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Si la fecha es un número (formato interno de Excel)
  if (!isNaN(fecha)) {
    // Excel maneja fechas como números de serie, por lo que convertimos a un objeto Date
    const excelDate = new Date(Math.round((fecha - 25569) * 86400 * 1000)); // 25569 es el "offset" de Excel para fechas
    return excelDate;
  }

  // Si ya es un objeto Date o un valor timestamp, devolverlo tal cual
  if (fecha instanceof Date || !isNaN(fecha)) {
    return new Date(fecha);
  }

  return null; // Si no es una fecha válida, devolver null
};


async function seed() {
  
  //Recorrer todas las hojas
  for (let sheetName of sheetNames) {
    const sheet = workbook.Sheets[sheetName]; // Obtener cada hoja

    // Verificar si la hoja existe antes de procesarla
    if (!sheet) {
      console.error(`La hoja ${sheetName} no existe.`);
      continue; // Salta esta iteración si la hoja no existe
    }

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convertir a JSON
    
    const headerRowIndex = 2; // La tercera fila (índice 2) es donde comienzan los datos
    const filteredData = data.slice(headerRowIndex); // Filtrar las filas de datos

    // Mapeo de los productos por sala
    const productosPorSala: any[] = [];

    filteredData.forEach((row: any) => {
      const cantidad = row[3] ? Number(row[3]) : 1;
      
      const producto = {
        individualizacionDelBien: row[1] || "",
        fechaAdquisicion: row[6] ? parseDate(row[6]) : null, // parseDate para convertir la fecha
        idProcedencia: mapProcedencia(row[7]),
        idEstado: mapEstadoConservacion(row[4]),
        idSubcategoria: mapSubcategoria(row[2]),
        idUsuarioCreador: 1,
        sala: sheetName, // Asociamos el nombre de la hoja como la sala
        cantidad: cantidad,
      };

      if (producto.individualizacionDelBien.trim() !== "" && producto.idSubcategoria) {
        productosPorSala.push(producto);
      }
    });

    console.log(`Número de productos a insertar en la sala ${sheetName}: ${productosPorSala.length}`);
    // Insertar los productos considerando la cantidad
    for (let producto of productosPorSala) {
      for (let i = 0; i < producto.cantidad; i++) {
        console.log(`Insertando producto: ${producto.individualizacionDelBien}, ${producto.fechaAdquisicion}, ${producto.idProcedencia}, ${producto.idEstado}, ${producto.idSubcategoria}, ${producto.idUsuarioCreador} , cantidad: ${i + 1}`);

        try {
          await prisma.producto.create({
            data: {
              individualizacionDelBien: producto.individualizacionDelBien,
              fechaAdquisicion: producto.fechaAdquisicion,
              idProcedencia: producto.idProcedencia,
              idEstado: producto.idEstado,
              idSubcategoria: producto.idSubcategoria,
              idUsuarioCreador: 1,
            }
          });
        } catch (error) {
          console.error('Error al insertar el producto:', error);
        }
      }
    }

    console.log(`Productos insertados correctamente en la sala ${sheetName}`);
  }
}

// Ejecutar la semilla
seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
