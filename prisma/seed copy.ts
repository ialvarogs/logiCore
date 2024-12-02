import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
  // 1. Crear Estados de Usuario
  await prisma.estadoUsuario.createMany({
    data: [{ estado: "Activo" }, { estado: "Inactivo" }],
  });

  // 2. Crear Roles
  const rolAdmin = await prisma.rol.create({
    data: { nombreRol: "Administrador" },
  });

  const rolDocente = await prisma.rol.create({
    data: { nombreRol: "Docente" },
  });

  // 3. Crear Usuarios
  const hashedPassword1 = await hashPassword("miContraseñaSegura");
  const usuario1 = await prisma.usuario.create({
    data: {
      nombre: "Juan",
      apellido: "Pérez",
      contrasena: hashedPassword1,
      email: "juan.perez@example.com",
      idEstadoUsuario: 1,
    },
  });

  const hashedPassword2 = await hashPassword("abcdefg");
  const usuario2 = await prisma.usuario.create({
    data: {
      nombre: "Ana",
      apellido: "López",
      contrasena: hashedPassword2,
      email: "ana@example.com",
      idEstadoUsuario: 1,
    },
  });

  // 4. Asignación de Roles a Usuarios
  await prisma.usuarioRol.createMany({
    data: [
      { idUsuario: usuario1.idUsuario, idRol: rolAdmin.idRol },
      { idUsuario: usuario2.idUsuario, idRol: rolDocente.idRol },
    ],
  });

  // 5. Crear Nivel Educativo
  const nivelBasico = await prisma.nivelEducativo.create({
    data: { nivelEducativo: "Básico" },
  });

  // 6. Crear Sala
  const sala1 = await prisma.sala.create({
    data: {
      numeroSala: 101,
      nombreSala: "Sala A",
      capacidad: 30,
      idNivel: nivelBasico.idNivel,
    },
  });

  // 7. Crear Categoría y Subcategoría
  const categoriaElectronica = await prisma.categoria.create({
    data: { nombreCategoria: "Electrónica" },
  });

  const subcategoriaComputadores = await prisma.subcategoria.create({
    data: {
      nombreSubcategoria: "Computadores",
      idCategoria: categoriaElectronica.idCategoria,
    },
  });

  // 8. Crear Estado de Conservación
  const estadoBueno = await prisma.estadoConservacion.create({
    data: { estado: "Bueno" },
  });

  // 9. Crear Procedencia
  const compraDirecta = await prisma.procedencia.create({
    data: { procedencia: "Logitech" },
  });

  // 10. Crear Proveedor
  const proveedor1 = await prisma.proveedor.create({
    data: {
      proveedor: "Proveedor A",
      email: "contacto@logitech.com",
      telefono: "123456789",
    },
  });

  // 11. Crear Producto
  const producto1 = await prisma.producto.create({
    data: {
      individualizacionDelBien: "Notebook Lenovo",
      fechaAdquisicion: new Date("2023-01-10"),
      idProcedencia: compraDirecta.idProcedencia,
      idEstado: estadoBueno.idEstado,
      idSubcategoria: subcategoriaComputadores.idSubcategoria,
      idUsuarioCreador: usuario1.idUsuario,
    },
  });

  // 12. Relación Producto-Proveedor
  await prisma.productoProveedor.create({
    data: {
      idProducto: producto1.idProducto,
      idProveedor: proveedor1.idProveedor,
    },
  });

  // 13. Relación Producto-Sala
  await prisma.productoSala.create({
    data: {
      idProducto: producto1.idProducto,
      idSala: sala1.idSala,
      fechaAsignacion: new Date(),
    },
  });

  // 14. Crear la Relación Producto-Responsable
  await prisma.productoResponsable.create({
    data: {
      idProducto: producto1.idProducto,
      idUsuario: usuario2.idUsuario,
      fechaAsignacion: new Date(),
    },
  });

  console.log("Semilla creada exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
