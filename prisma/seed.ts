import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  
  //Crear procedencias
  await prisma.procedencia.createMany({
      data: [
        { procedencia: 'Fondos SEP' },
        { procedencia: 'Sin información' },
      ]
    });

  //Crear roles
  await prisma.rol.createMany({
    data: [
      { nombreRol: 'Administrador' },
      { nombreRol: 'Encargado' },
      { nombreRol: 'Docente' },
    ]
  });
  console.log("Roles creados exitosamente");

  //Crear estado de usuario
  await prisma.estadoUsuario.createMany({
    data: [
      { estado: 'Activo' },
      { estado: 'Inactivo' },
    ]
  });

    //Crear estado de conservación
  await prisma.estadoConservacion.createMany({
    data: [
      { estado: 'Nuevo' },
      { estado: 'Con uso' },
      { estado: 'Descartable' },
    ]
  });

  // //Crear categorías  
  await prisma.categoria.createMany({
  data: [
    { nombreCategoria: 'Materiales y Equipos Pedagógicos' },
    { nombreCategoria: 'Equipos Tecnológicos y de Oficina' },
    { nombreCategoria: 'Materiales y Equipos de Apoyo Escolar' },
    { nombreCategoria: 'Otros' },
    { nombreCategoria: 'Equipo Mobiliario' },
  ]
  });
  console.log("Categorías creadas exitosamente");

    //Crear subcategorías
  await prisma.subcategoria.createMany({
    data: [
    { nombreSubcategoria: 'Implementos Deportivos', idCategoria: 1 },
    { nombreSubcategoria: 'Implementos de Laboratorio', idCategoria: 1 },
    { nombreSubcategoria: 'Instrumentos Musicales y/o Artísticos', idCategoria: 1 },
    { nombreSubcategoria: 'Libros y Revistas', idCategoria: 1 },
    { nombreSubcategoria: 'Equipos Informáticos', idCategoria: 2 },
    { nombreSubcategoria: 'Equipos Multicopiadoras', idCategoria: 2 },
    { nombreSubcategoria: 'Equipos de Amplificación y sonido', idCategoria: 2 },
    { nombreSubcategoria: 'Equipos de Climatización', idCategoria: 2 },
    { nombreSubcategoria: 'Útiles escolares, equipamiento especializado de liceos técnicos', idCategoria: 3 },
    { nombreSubcategoria: 'Materiales y Útiles de aseo', idCategoria: 3 },
    { nombreSubcategoria: 'Mobiliario escolar fuera de sala de clases', idCategoria: 5 },
    { nombreSubcategoria: 'Mobiliario escolar dentro de sala de clases', idCategoria: 5 },
    { nombreSubcategoria: 'Mobiliario no pedagógico o de oficina', idCategoria: 2 },
    { nombreSubcategoria: 'Otros equipos, materiales o insumos', idCategoria: 4 },
    ]
  });
  console.log("Subcategorías creadas exitosamente");
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
