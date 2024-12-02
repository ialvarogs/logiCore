<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Definición de las variables reactivas utilizadas para almacenar datos de productos, salas, responsables, etc.
const productos = ref<any[]>([]); // Lista de productos
const botonExportar = ref(false);
const productosSelect = ref<any[]>([]); // Productos disponibles para un select
const salasSelect = ref<any[]>([]); // Lista de salas disponibles
const salaSelect = ref<number | null>(null); // Sala seleccionada
const productoSeleccionado = ref<any>({}); // Producto seleccionado
const procedencias = ref<any[]>([]); // Procedencias de productos
const estados = ref<any[]>([]); // Estados de los productos
const subcategorias = ref<any[]>([]); // Subcategorías de los productos
const salas = ref<any[]>([]); // Lista de salas
const usuarios = ref<any[]>([]); // Usuarios disponibles
const mostrarModalAsignarResponsable = ref(false); // Control de visibilidad del modal de asignación de responsable
const mostrarModalAsignarSala = ref(false); // Control de visibilidad del modal de asignación de sala
const mostrarModalRegistrarDevolucion = ref(false); // Control de visibilidad del modal de registro de devolución
const responsableSeleccionado = ref(null); // Responsable seleccionado
const salaFiltro = ref(null); // Sala a filtrar en la vista
const cantidadAsignada = ref(0); // Cantidad de productos asignados
const subproductos = ref<any[]>([]); // Lista de subproductos
const subproductoSeleccionado = ref(null); // Subproducto seleccionado
const subproductosSeleccionados = ref<any[]>([]); // Subproductos seleccionados para alguna acción
const mostrarModal = ref(false); // Control de visibilidad del modal general
const elementosPorPagina = 5; // Número de elementos por página en la paginación
const paginaActual = ref(1); // Página actual en la paginación
const busqueda = ref(""); // Valor de la búsqueda
const fechaAsignacion = ref<Date | null>(null); // Fecha de asignación de un producto
const fechaDevolucion = ref<Date | null>(null); // Fecha de devolución de un producto
const usuarioSeleccionado = ref(null); // Usuario seleccionado para alguna acción
const productosADevolver = ref<any[]>([]); // Productos seleccionados para devolución
const { user } = useUserSession(); // Datos del usuario actual desde la sesión
const type = ref(''); // Tipo de vista o acción actual

// Definir las restricciones de acceso por roles a esta página
definePageMeta({
  auth: ['Administrador', 'Encargado', 'Docente'] // Roles permitidos para acceder a la página
})

// Se ejecuta cuando el componente se monta
onMounted(async () => {
  // Verificar el rol del usuario y cargar los datos correspondientes
  if (user.value.rol ===  'Docente'){
    await cargarProductos(); // Cargar solo productos para el docente
  } else {
    await cargarProductos(); // Cargar productos para otros roles
    await cargarProcedencias(); // Cargar procedencias de productos
    await cargarEstados(); // Cargar estados de productos
    await cargarSubcategorias(); // Cargar subcategorías de productos
    await cargarSalas(); // Cargar salas disponibles
    await cargarUsuarios(); // Cargar lista de usuarios
    await cargarProductosParaSelect(); // Cargar productos para los selects
  }
});

// Monitorear el cambio de la sala seleccionada para filtrar los productos
watch(salaSelect, async (newSala) => {
  if (newSala) {
    await cargarProductosFiltroSala(newSala); // Cargar productos filtrados por la nueva sala seleccionada
    paginaActual.value = 1;
    botonExportar.value = true;
  }
});

// Monitorear el cambio en el usuario seleccionado para productos a devolver
watch(usuarioSeleccionado, async (devolver) => {
  console.log("Usuario seleccionado:", devolver); // Mostrar el ID del usuario seleccionado
  if (devolver) {
    await cargarProductosDevolucion(devolver); // Cargar productos que pueden ser devueltos por el usuario
  } else {
    productosADevolver.value = []; // Limpiar los productos a devolver si no hay usuario seleccionado
  }
});

// Monitorear el cambio en el producto seleccionado para cargar sus subproductos
watch(productoSeleccionado, async (nuevoProducto) => {
  console.log("Producto seleccionado:", nuevoProducto); // Verificar el cambio en el producto seleccionado
  if (nuevoProducto) {
    await cargarProductosParaSelectSala(nuevoProducto); // Cargar subproductos para el producto seleccionado
  } else {
    subproductos.value = []; // Limpiar los subproductos si no hay producto seleccionado
  }
});

// Función para cargar productos para la vista de edición
async function cargarProductosEdicion() {
  await cargarProductosEditar(); // Cargar productos para edición
  paginaActual.value=1;
  botonExportar.value = false;
  type.value = 'productos-editar'; // Establecer el tipo de vista como 'productos-editar'
  salaSelect.value = null; // Limpiar la selección de sala
}

// Función para cargar todos los productos
async function cargarProductosTotal() {
  await cargarProductosTotales(); // Cargar todos los productos disponibles
  paginaActual.value=1;
  botonExportar.value = false;
  type.value = 'productos-totales'; // Establecer el tipo de vista como 'productos-totales'
}

// Definimos la interfaz para los datos
interface Producto {
  individualizacionDelBien: string;
  cantidad: number;
  Estado: string;
}

async function exportPdf(sala: number) {
  try {
    // Hacemos la solicitud a la API para obtener los datos
    const response = await fetch(`/api/exportarPdf/${encodeURIComponent(sala)}`);

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API');
    }

    // Parseamos los datos recibidos en formato JSON y los tratamos como un array de Producto
    const data: Producto[] = await response.json();

    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Definimos las columnas de la tabla
    const columns = ["Nombre", "Cantidad", "Estado"];

    // Definir el ancho de cada columna en un arreglo
    const columnWidths: number[] = [118, 35, 40]; // Anchos personalizados para cada columna

    // Verificar si el número de columnas y los anchos coinciden
    if (columns.length !== columnWidths.length) {
      throw new Error('El número de columnas no coincide con el número de anchos definidos');
    }

    // Añadir un título al PDF (opcional)
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte de Productos', 20, 20);  // Título en la parte superior


    doc.setFontSize(14);
    
    // Empieza en la línea 30, dejando espacio para el título
    let y = 30;
    const xStart = 8; // X de inicio de las celdas

    // Dibujamos las cabeceras con los anchos personalizados
    columns.forEach((title, index) => {
      const columnWidth = columnWidths[index] ?? 0;  // Si `columnWidths[index]` es undefined, usamos 0
      doc.rect(xStart + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), y, columnWidth, 10); // Dibuja la celda con el ancho específico
      doc.text(title, xStart + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + 2, y + 7); // Escribe el texto
    });


    doc.setFont('helvetica', 'normal');
    // Dibuja las filas de la tabla
    y += 10; // Empieza en la siguiente línea

    data.forEach((item) => {
      const row = [
        item.individualizacionDelBien || "No disponible",  // Nombre
        String(item.cantidad) || "No disponible",  // Cantidad
        item.Estado || "No asignado", // Estado
      ];

      row.forEach((cell, index) => {
        const columnWidth = columnWidths[index] ?? 0;  // Si `columnWidths[index]` es undefined, usamos 0
        doc.rect(xStart + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), y, columnWidth, 10); // Dibuja la celda con el ancho específico
        doc.text(cell, xStart + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + 2, y + 7); // Escribe el texto
      });

      y += 10; // Salto de línea después de cada fila
    });

    // Guardar el PDF generado con el nombre 'reporte.pdf'
    doc.save('reporte.pdf');

  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
}







// Función para cargar los productos principales
async function cargarProductos() {
  try {
    const response = await $fetch("/api/productos"); // Hacer la solicitud para obtener los productos
    productos.value = response; // Asignar los productos obtenidos a la variable reactiva
    paginaActual.value=1;
    botonExportar.value = false;
    type.value = 'productos'; // Establecer el tipo de vista como 'productos'
    salaSelect.value = null; // Limpiar la selección de sala
  } catch (error) {
    console.error("Error al cargar los productos:", error); // Manejo de errores si falla la carga
  }
}

// Función para cargar los productos para edición
async function cargarProductosEditar() {
  try {
    const response = await $fetch("/api/productos/editar"); // Hacer la solicitud para obtener productos para edición
    productos.value = response; // Asignar los productos obtenidos a la variable reactiva
  } catch (error) {
    console.error("Error al cargar los productos:", error); // Manejo de errores si falla la carga
  }
}

// Función para cargar todos los productos totales
async function cargarProductosTotales() {
  try {
    const response = await $fetch("/api/productos/obtenerProductosTotales"); // Obtener todos los productos
    productos.value = response; // Asignar los productos obtenidos a la variable reactiva
  } catch (error) {
    console.error("Error al cargar los productos:", error); // Manejo de errores si falla la carga
  }
}

// Función para cargar los productos que se utilizarán en los selects
async function cargarProductosParaSelect() {
  try {
    const response = await $fetch("/api/productos/obtenerProductosSelect"); // Obtener productos para los selects
    productosSelect.value = response; // Asignar los productos obtenidos a la variable reactiva
  } catch (error) {
    console.error("Error al cargar los productos:", error); // Manejo de errores si falla la carga
  }
}

async function cargarProductosParaSelectSala(individualizacionDelBien: string) {
  try {
    const response = await $fetch(
      `/api/productos/asignarResponsable?individualizacionDelBien=${encodeURIComponent(individualizacionDelBien)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response) {
      subproductos.value = response;
      console.log("Subproductos cargados:", subproductos.value); // Verifica si los subproductos son asignados
    }
  } catch (error) {
    console.error("Error al cargar los subproductos:", error);
  }
}

// Función para cargar productos filtrados por sala
async function cargarProductosFiltroSala(sala: number) {
  try {
    if(type.value === 'productos-editar'){
      // Realizar la solicitud GET para obtener los productos filtrados por sala
    const response = await $fetch(
      `/api/productos/filtrarSala/filtrarSalaEditar/${encodeURIComponent(sala)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response) {
      productos.value = response;
      console.log("Productos cargados:", productos.value); // Verifica si los productos son asignados correctamente
    }
    }
    else{
          // Realizar la solicitud GET para obtener los productos filtrados por sala
    const response = await $fetch(
      `/api/productos/filtrarSala/${encodeURIComponent(sala)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response) {
      productos.value = response;
      console.log("Productos cargados:", productos.value); // Verifica si los productos son asignados correctamente
    }
    }


    // Verificar si la respuesta contiene productos y asignarlos a la variable 'productos'

  } catch (error) {
    // Manejar cualquier error ocurrido durante la carga de productos
    console.error("Error al cargar los productos filtrados:", error);
  }
}

// Función para cargar productos a devolver según el ID proporcionado
async function cargarProductosDevolucion(id: any) {
  try {
    // Realizar la solicitud GET para obtener los productos a devolver
    const response = await $fetch(
      `/api/productos/obtenerProductosDevolucion/${id}`,
    );
    
    // Asignar la respuesta al arreglo 'productosADevolver'
    productosADevolver.value = response; 
    console.log("Productos a devolver:", productosADevolver.value); // Para verificar los datos que llegan
  } catch (error) {
    // Manejar cualquier error ocurrido durante la carga de productos a devolver
    console.error("Error al cargar los productos:", error);
  }
}

// Función para asignar un responsable a un producto
async function asignarResponsable() {
  try {
    // Crear el objeto con los datos que se enviarán para asignar el responsable
    const datos = {
      idProducto: subproductoSeleccionado.value, // Usar 'subproductoSeleccionado' para el idProducto
      idUsuario: responsableSeleccionado.value, // Usar '.value' si es un ref de Vue
      fechaAsignacion: fechaAsignacion.value, // Usar '.value' si es un ref de Vue
    };

    console.log("Datos enviados:", datos);

    // Realizar la solicitud POST para asignar el responsable
    const response = await $fetch("/api/productos/asignarResponsable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: datos, // Asegurarse de que este objeto esté limpio y contenga los datos correctos
    });

    console.log("Responsable asignado con éxito:", response);
    
    // Ocultar el modal después de asignar el responsable
    mostrarModalAsignarResponsable.value = false;
    
    // Mostrar alerta de éxito y recargar los productos
    alert("Responsable asignado con éxito!");
    await cargarProductos();
  } catch (error) {
    // Manejar cualquier error ocurrido durante la asignación del responsable
    console.error("Error al asignar el responsable:", error);
  }
}

// Función para registrar la devolución de un producto
async function registrarDevolucion(id: any) {
  try {
    // Formatear la fecha de devolución si existe
    const fecha = fechaDevolucion.value
      ? new Date(fechaDevolucion.value).toISOString() // Convertir a formato ISO si existe
      : null;

    // Realizar la solicitud PATCH para registrar la devolución
    await $fetch(`/api/productos/asignarResponsable/${id}`, {
      method: "PATCH",
      body: {
        idProducto: productoSeleccionado.value, // Usar el producto seleccionado
        fecha: fecha, // Enviar la fecha de devolución si está definida
      },
    });

    // Ocultar el modal después de registrar la devolución
    mostrarModalRegistrarDevolucion.value = false;

    // Recargar los productos después de la devolución
    await cargarProductos();

    // Mostrar alerta de éxito
    alert("Producto actualizado correctamente");
  } catch (error) {
    // Manejar cualquier error ocurrido durante el proceso de devolución
    console.error("Error al actualizar el producto:", error);
  }
}

async function asignarSala() {
  try {
    // Validar la fecha de asignación
    let fechaFormateada = undefined;
    if (fechaAsignacion.value) {
      const fechaObj = new Date(fechaAsignacion.value);
      if (!isNaN(fechaObj.getTime())) {
        // Si la fecha es válida, formatearla
        fechaFormateada = fechaObj.toISOString();
      } else {
        // Si la fecha no es válida, asignar undefined
        console.log("Fecha inválida, se usará undefined.");
        fechaFormateada = undefined;
      }
    }

    // Preparar los datos con la fecha validada
    const datos = {
      idProducto: subproductosSeleccionados.value, // Usamos subproductosSeleccionados para los productos seleccionados
      idSala: salaFiltro.value, // Usamos salaFiltro para el id de la sala
      fechaAsignacion: fechaFormateada, // Usamos la fecha formateada (undefined si no es válida)
    };

    console.log("Datos enviados:", datos);

    // Realizar la solicitud POST
    await $fetch("/api/productos/asignarSala", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos), // Convertir los datos a JSON
    });

    // Cerrar el modal y actualizar las listas
    subproductos.value = [];
    subproductosSeleccionados.value = [];
    mostrarModalAsignarSala.value = false;
    await cargarProductos();
    alert("Sala asignada con éxito!");
  } catch (error) {
    console.error("Error al asignar la sala:", error);
  }
}

// Función para cargar las procedencias desde la API
async function cargarProcedencias() {
  try {
    // Realizar una solicitud para obtener las procedencias
    const response = await $fetch("/api/procedencia");
    procedencias.value = response; // Asignar los datos obtenidos a la variable reactiva 'procedencias'
  } catch (error) {
    console.error("Error al cargar las procedencias:", error); // Manejo de errores en caso de que falle la solicitud
  }
}

// Función para cargar los estados de conservación desde la API
async function cargarEstados() {
  try {
    // Realizar una solicitud para obtener los estados de conservación
    const response = await $fetch("/api/estadoConservacion");
    estados.value = response; // Asignar los datos obtenidos a la variable reactiva 'estados'
  } catch (error) {
    console.error("Error al cargar los estados:", error); // Manejo de errores en caso de que falle la solicitud
  }
}

// Función para cargar las subcategorías desde la API
async function cargarSubcategorias() {
  try {
    // Realizar una solicitud para obtener las subcategorías
    const response = await $fetch("/api/subCategoria");
    subcategorias.value = response; // Asignar los datos obtenidos a la variable reactiva 'subcategorias'
  } catch (error) {
    console.error("Error al cargar las subcategorías:", error); // Manejo de errores en caso de que falle la solicitud
  }
}

// Función para cargar las salas desde la API
async function cargarSalas() {
  try {
    // Realizar una solicitud para obtener las salas
    const response = await $fetch("/api/salas");
    salas.value = response; // Asignar los datos obtenidos a la variable reactiva 'salas'
  } catch (error) {
    console.error("Error al cargar las salas:", error); // Manejo de errores en caso de que falle la solicitud
  }
}

// Función para cargar los usuarios desde la API
// Función para cargar los usuarios desde la API
async function cargarUsuarios() {
  try {
    // Realizar una solicitud para obtener la lista de usuarios
    const response = await $fetch("/api/usuarios");

    // Verificar si la respuesta es un arreglo
    if (Array.isArray(response)) {
      usuarios.value = response; // Asignar los datos obtenidos a la variable reactiva 'usuarios'
    } else {
      console.error("La respuesta no es un arreglo de usuarios.");
      usuarios.value = []; // O puedes asignar un arreglo vacío si la respuesta no es válida
    }
  } catch (error) {
    console.error("Error al cargar los usuarios:", error); // Manejo de errores en caso de que falle la solicitud
  }
}


// Función para abrir el modal de asignación de responsable
function abrirModalAsignarResponsable() {
  productoSeleccionado.value = null; // Limpiar el producto seleccionado antes de abrir el modal
  responsableSeleccionado.value = null; // Limpiar el responsable seleccionado antes de abrir el modal
  mostrarModalAsignarResponsable.value = true; // Mostrar el modal de asignación de responsable
}

// Función para abrir el modal de asignación de sala
function abrirModalAsignarSala() {
  productoSeleccionado.value = null; // Limpiar el producto seleccionado antes de abrir el modal
  salaFiltro.value = null; // Limpiar el filtro de sala antes de abrir el modal
  cantidadAsignada.value = 0; // Restablecer la cantidad asignada a cero
  mostrarModalAsignarSala.value = true; // Mostrar el modal de asignación de sala
}

// Función para abrir el modal de registro de devolución
function abrirModalRegistrarDevolucion() {
  productoSeleccionado.value = null; // Limpiar el producto seleccionado antes de abrir el modal
  salaFiltro.value = null; // Limpiar el filtro de sala antes de abrir el modal
  cantidadAsignada.value = 0; // Restablecer la cantidad asignada a cero
  mostrarModalRegistrarDevolucion.value = true; // Mostrar el modal de registro de devolución
}
// Filtrar las categorías basadas en la búsqueda
const productosFiltrados = computed(() => {
  if (busqueda.value === "") return productos.value;
  return productos.value.filter((producto) =>
    producto.individualizacionDelBien
      .toLowerCase()
      .includes(busqueda.value.toLowerCase()),
  );
});
// PAGINACION Calcular las filas para la página actual
const productosPaginados = computed(() => {
  const productosParaMostrar = productosFiltrados.value;
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return productosParaMostrar.slice(inicio, inicio + elementosPorPagina);
});

// PAGINACION Calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(productos.value.length / elementosPorPagina);
});

// PAGINACION Función para cambiar la página
const cambiarPagina = (nuevaPagina: any) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};
async function eliminarProducto(id: any) {
  const confirmacion = confirm(
    "¿Estás seguro de que deseas eliminar este producto?",
  );
  if (!confirmacion) return;
  try {
    const response = await $fetch(`/api/productos/${id}`, { method: "DELETE" });
    if (response) {
      await cargarProductosEditar();
      console.log("Producto eliminado con éxito.");
    } else {
      console.error("No se pudo eliminar el producto.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    alert("Error al eliminar el producto. Inténtalo de nuevo más tarde.");
  }
}

// Función para convertir la fecha a un formato compatible con el input type="date"
function convertirFechaAPI(fechaAPI: any) {
  if (!fechaAPI) return { formatoISO: "" };

  const fecha = new Date(fechaAPI);
  // Retorna en formato ISO (yyyy-mm-dd) para usar con el input[type="date"]
  const formatoISO = fecha.toISOString().split("T")[0];

  return { formatoISO };
}

function editarProducto(producto: any) {
  // Convertir la fecha de adquisición al formato necesario
  const fecha = convertirFechaAPI(producto.fechaAdquisicion);
  console.log("Producto seleccionado para editar:", producto);
  
  // Asignar el producto seleccionado a la variable reactiva 'productoSeleccionado'
  productoSeleccionado.value = { ...producto };
  
  // Formatear la fecha de adquisición y asignarla
  productoSeleccionado.value.fechaAdquisicion = fecha.formatoISO;
  
  console.log();
  mostrarModal.value = true; // Mostrar el modal de edición del producto
}

// Función para actualizar los datos del producto
async function actualizarProducto(id: any) {
  try {
    // Obtener la fecha de adquisición del producto seleccionado
    const fechaAdquisicion = productoSeleccionado.value.fechaAdquisicion;

    // Verificar si la fecha es válida, si no, asignar undefined
    let fechaFormateada = undefined;
    if (fechaAdquisicion) {
      const fechaObj = new Date(fechaAdquisicion);
      if (!isNaN(fechaObj.getTime())) {
        // Si la fecha es válida, formatearla
        fechaFormateada = fechaObj.toISOString();
      } else {
        // Si la fecha no es válida, asignar undefined
        console.log("Fecha inválida, se usará undefined.");
        fechaFormateada = undefined;
      }
    }

    // Crear el objeto con los datos actualizados del producto
    const bodyRequest: any = {
      individualizacionDelBien: productoSeleccionado.value.individualizacionDelBien,
      idSubcategoria: productoSeleccionado.value.idSubcategoria,
      fechaAdquisicion: fechaFormateada, // Usar fecha formateada (undefined si no es válida)
      idEstado: productoSeleccionado.value.idEstado,
      idProcedencia: productoSeleccionado.value.idProcedencia,
    };

    // Eliminar las propiedades con valor undefined antes de enviar la solicitud
    for (const key in bodyRequest) {
      if (bodyRequest[key] === undefined) {
        delete bodyRequest[key];
      }
    }

    // Realizar la solicitud PATCH para actualizar el producto en la base de datos
    await $fetch(`/api/productos/${id}`, {
      method: "PATCH",
      body: bodyRequest,
    });

    console.log(`Producto con ID ${id} actualizado correctamente.`);
    mostrarModal.value = false; // Cerrar el modal después de la actualización
    productoSeleccionado.value = null; // Limpiar el producto seleccionado
    await cargarProductosEditar(); // Recargar los productos editados
    alert("Producto actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el producto:", error); // Manejo de errores
  }
}

// Función para guardar los cambios realizados en el producto
async function guardarCambios() {
  // Verificar que exista un producto seleccionado
  if (!productoSeleccionado.value) return;

  const id = productoSeleccionado.value.idProducto;

  // Verificar que el producto tenga un ID válido
  if (!id) {
    console.error("El ID del producto seleccionado es undefined");
    return;
  }

  // Llamar a la función para actualizar el producto con el ID seleccionado
  await actualizarProducto(id);
}

// Función para cancelar la edición del producto
function cancelarEdicion() {
  productoSeleccionado.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Ocultar el modal de edición
}

// Función para redirigir a la página de agregar un nuevo producto
function irAgregarProducto() {
  window.location.href = "/agregarProductos"; // Navegar a la página de agregar producto
}

// Función para formatear la fecha a un formato específico (DD-MM-YYYY)
function formatearFecha(fecha: unknown): string {
  // Si la fecha es null o está indefinida, retornamos una cadena vacía
  if (fecha == null) return "";

  const fechaObj = new Date(fecha);

  // Verificamos si la fecha es válida
  if (isNaN(fechaObj.getTime())) return ""; // Si no es válida, retornamos cadena vacía

  // Devolvemos la fecha en formato DD-MM-YYYY
  return fechaObj.toISOString().split("T")[0].split("-").reverse().join("-");
}
</script>
<template>
  <Header></Header> <!-- Componente de cabecera -->
  
  <!-- Contenedor principal de la página -->
  <div class="principal flex flex-col sm:justify-center items-center sm:p-2">
    
    <!-- Contenedor de la lista de productos con sombra y bordes redondeados -->
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      
      <div class="container">
        <div class="header-container m-8">
          
          <!-- Título de la página según el tipo (modo edición o lista de productos) -->
          <h2 v-if="type==='productos-editar'">Lista de Productos - Modo edición</h2>
          <h2 v-else>Lista de Productos</h2>

          <div class="area-botones">
            <div class="flex items-center">
              
              <!-- Botón para mostrar los totales -->
              <div class="flex items-center mr-1">
                <button @click=cargarProductosTotal type="button" id="mostrar-totales" class="button-tertiary"> Mostrar totales </button>
              </div>
              
              <!-- Barra de búsqueda para filtrar productos -->
              <input v-model="busqueda" type="text" placeholder="Buscar Producto..." class="rounded-md py-1 mx-2 border text-sm outline-[#f84525]"/>
              
              <!-- Botón para cambiar al modo de edición (solo si el usuario no es docente) -->
              <div v-if="user.rol !== 'Docente'" class="flex items-center ">
                <button @click=cargarProductosEdicion type="button" id="modo-edicion" class="button-tertiary"> Modo edición </button>
              </div>

              <!-- Botón para cargar productos -->
              <button @click=cargarProductos type="button" id="productos" class="button-tertiary">Ver productos </button>
            </div>

            <!-- Sección de botones para agregar y asignar productos -->
            <div v-if="user.rol !== 'Docente'" class="flex items-center mt-2">
              <button @click="irAgregarProducto" class="button-tertiary">
                Agregar producto
              </button>
              <button @click="abrirModalAsignarResponsable" class="button-tertiary">
                Asignar responsable
              </button>
              <button @click="abrirModalAsignarSala" class="button-tertiary">
                Asignar sala
              </button>
              <button @click="abrirModalRegistrarDevolucion" class="button-tertiary"> Registrar devolución</button>
              
              <!-- Select para seleccionar la sala -->
              <select  v-if="type==='productos' ||  type==='productos-editar'" v-model="salaSelect" id="sala" class="input-field">
                <option value=null disabled> Seleccione una sala </option>
                <option v-for="sala in salas" :key="sala.sala" :value="sala.id"> {{ sala.nombre }} </option>
              </select>
              <button v-if="botonExportar && type==='productos'" type="button" @click="exportPdf(salaSelect)" class="bg-red-500 rounded-md border-transparent cursor-pointer hover:bg-red-700">
                
                <div class="i-material-symbols:sim-card-download-sharp w-35px h-35px" style="color: #ffff;"></div>
              </button>
            </div>
          </div>

          <!-- Contenedor de la tabla de productos -->
          <div class="table-container">
            
            <!-- Tabla de productos (modo estándar) -->
            <div v-if="type==='productos'">
              <table class="user-table">
                <thead>
                  <tr>
                    <th v-if="user.rol==='Administrador' || user.rol==='Encargado'">Nivel Educativo</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Subcategoría</th>
                    <th v-if="user.rol==='Administrador' || user.rol==='Encargado'">Fecha de Adquisición</th>
                    <th>Ubicación / estado</th>
                    <th v-if="user.rol==='Administrador' || user.rol==='Encargado'">Estado</th>
                    <th v-if="user.rol==='Administrador' || user.rol==='Encargado'">Procedencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="productosFiltrados.length === 0">
                    <td colspan="2">No se encontraron productos</td>
                  </tr>
                  <tr v-for="producto in productosPaginados" :key="producto.id">
                    <td v-if="user.rol==='Administrador' || user.rol==='Encargado'">{{ producto.Niveleducativo || "No asignado" }}</td>
                    <td>{{ producto.individualizacionDelBien }}</td>
                    <td>{{ producto.cantidad }}</td>
                    <td>{{ producto.Subcategoria }}</td>
                    <td v-if="user.rol==='Administrador' || user.rol==='Encargado'">{{ formatearFecha(producto.fechaAdquisicion) }}</td>
                    <td>{{ producto.Ubicacion }}</td>
                    <td v-if="user.rol==='Administrador' || user.rol==='Encargado'">{{ producto.Estado }}</td>
                    <td v-if="user.rol==='Administrador' || user.rol==='Encargado'">{{ producto.Procedencia }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Tabla de productos totales -->
            <div v-if="type==='productos-totales'">
              <table class="user-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="productosFiltrados.length === 0">
                    <td colspan="2">No se encontraron productos</td>
                  </tr>
                  <tr v-for="producto in productosPaginados" :key="producto.id">
                    <td>{{ producto.individualizacionDelBien }}</td>
                    <td>{{ producto.cantidad }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Tabla de productos en modo edición (con acciones de editar y eliminar) -->
            <div v-if="type==='productos-editar'">
              <table class="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nivel Educativo</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Subcategoría</th>
                    <th>Fecha de Adquisición</th>
                    <th>Ubicación / estado</th>
                    <th>Estado</th>
                    <th>Procedencia</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="productosFiltrados.length === 0">
                    <td colspan="2">No se encontraron productos</td>
                  </tr>
                  <tr v-for="producto in productosPaginados" :key="producto.id">
                    <td>{{ producto.idProducto }}</td>
                    <td>{{ producto.Niveleducativo || "No asignado" }}</td>
                    <td>{{ producto.individualizacionDelBien }}</td>
                    <td>{{ producto.cantidad }}</td>
                    <td>{{ producto.Subcategoria }}</td>
                    <td>{{ formatearFecha(producto.fechaAdquisicion) }}</td>
                    <td>{{ producto.Ubicacion }}</td>
                    <td>{{ producto.Estado }}</td>
                    <td>{{ producto.Procedencia }}</td>
                    <td>
                      <!-- Botones para editar y eliminar producto -->
                      <button @click="editarProducto(producto)" class="m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:bg-red-700 focus:outline-none">
                        <div class="i-material-symbols-edit"></div>
                      </button>
                      <button @click="eliminarProducto(producto.idProducto)" class="m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none">
                        <div class="i-material-symbols-delete"></div>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Paginación de productos -->
          <div class="pagination">
            <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">
              <div class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"></div>
            </button>
            <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
            <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas">
              <div class="i-material-symbols:navigate-next w-1.2rem h-1.2rem"></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Modal Asignar Responsable -->
  <div v-if="mostrarModalAsignarResponsable" class="modal">
    <div class="modal-content">
      <h3>Asignar Responsable</h3>
      <form>
        <label for="producto">Producto</label>
        <select
          v-model="productoSeleccionado"
          id="producto"
          class="input-field"
        >
          <option
            v-for="producto in productosSelect"
            :value="producto.individualizacionDelBien"
          >
            {{ producto.individualizacionDelBien }}
          </option>
        </select>
        <br />
        <!-- Nuevo select para los subproductos -->
        <label for="subproducto">Id del producto</label>
        <select
          v-model="subproductoSeleccionado"
          id="subproducto"
          class="input-field"
        >
          <option v-for="subproducto in subproductos" :value="subproducto">
            {{ subproducto }}
          </option>
        </select>
        <label for="responsable">Responsable</label>
        <select
          v-model="responsableSeleccionado"
          id="responsable"
          class="input-field"
        >
          <option v-for="usuario in usuarios" :value="usuario.id">
            {{ usuario.nombre }} {{ usuario.apellido }}
          </option>
        </select>
        <!-- Input de fecha para la asignación -->
        <label for="fechaAsignacion">Fecha de asignación</label>
        <input
          type="date"
          v-model="fechaAsignacion"
          id="fechaAsignacion"
          required
          class="input-field"
        />
        <div class="botones-modal">
          <button
            type="button"
            @click="asignarResponsable"
            class="button-primary"
          >
            Asignar
          </button>
          <button
            type="button"
            @click="mostrarModalAsignarResponsable = false"
            class="button-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Modal Asignar Sala -->
  <div v-if="mostrarModalAsignarSala" class="modal">
    <div class="modal-content">
      <h3>Asignar Sala</h3>
      <form>
        <label for="producto">Producto</label>
        <select v-model="productoSeleccionado" id="producto" class="input-field">
          <option
            v-for="producto in productosSelect"
            :value="producto.individualizacionDelBien"> {{ producto.individualizacionDelBien }}
          </option>
        </select>
        <!-- Checkboxes para los subproductos -->
        <label for="subproductos">Id del producto</label>
        <div id="subproductos">
          <div
            v-for="subproducto in subproductos" :key="subproducto" class="checkbox">
            <input type="checkbox" :value="subproducto" v-model="subproductosSeleccionados"/>
            <label>{{ subproducto }}</label>
          </div>
        </div>
        <label for="sala">Sala</label>
        <select v-model="salaFiltro" id="sala" class="input-field">
          <option v-for="sala in salas" :value="sala.id">
            {{ sala.nombre }}
          </option>
        </select>
        <!-- Input de fecha para la asignación -->
        <label for="fechaAsignacion">Fecha de asignación</label>
        <input
          type="date"
          v-model="fechaAsignacion"
          id="fechaAsignacion"
          class="input-field"
        />
        <div class="botones-modal">
          <button type="button" @click="asignarSala" class="button-primary">
            Asignar
          </button>
          <button
            type="button"
            @click="mostrarModalAsignarSala = false"
            class="button-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal Registrar Devolucion -->
  <div v-if="mostrarModalRegistrarDevolucion" class="modal">
    <div class="modal-content">
      <h3>Registrar Devolución</h3>
      <form @submit.prevent="registrarDevolucion(usuarioSeleccionado)">
        <!-- Select para los Usuarios -->
        <label for="usuario">Selecciona un Usuario</label>
        <select v-model="usuarioSeleccionado" id="usuario" class="input-field">
          <option
            v-for="usuario in usuarios"
            :key="usuario.id"
            :value="usuario.id"
          >
            {{ usuario.nombre }}
          </option>
        </select>

        <!-- Select para los Productos Asociados -->
        <label for="producto">Selecciona un ID de producto</label>
        <select
          v-model="productoSeleccionado"
          id="producto"
          class="input-field"
          :disabled="!usuarioSeleccionado || productosADevolver.length === 0"
        >
          <!-- Mostrar mensaje si no hay productos -->
          <option v-if="productosADevolver.length === 0" disabled>
            No hay productos para devolver
          </option>

          <!-- Mostrar opciones de productos con idProducto -->
          <option
            v-for="productoId in productosADevolver"
            :key="productoId"
            :value="productoId"
          >
            {{ productoId }}
            <!-- Mostrar el idProducto explícitamente -->
          </option>
        </select>

        <!-- Campo de Fecha para la Devolución -->
        <label for="fechaDevolucion">Fecha de Devolución</label>
        <input
          type="date"
          v-model="fechaDevolucion"
          id="fechaDevolucion"
          class="input-field"
          required
        />

        <!-- Botón de Enviar -->
        <button type="submit" class="button-primary">Guardar</button>
        <button
          type="button"
          @click="mostrarModalRegistrarDevolucion = false"
          class="button-secondary"
        >
          Cancelar
        </button>
      </form>
    </div>
  </div>
  <!-- Modal para editar -->
  <div v-if="mostrarModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="cancelarEdicion">&times;</span>
      <form @submit.prevent="guardarCambios">
        <div class="form-group">
          <label for="producto">Nombre:</label>
          <input
            v-model="productoSeleccionado.individualizacionDelBien"
            id="producto"
            class="input-field"
            required
          />
        </div>
        <div class="form-group">
  <!-- Label para la selección de subcategoría -->
  <label>Subcategoría:</label>
  <!-- Select para elegir la subcategoría, enlazado con 'productoSeleccionado.idSubcategoria' -->
  <select
    v-model="productoSeleccionado.idSubcategoria"
    class="input-field"
    required
  >
    <!-- Opción por defecto deshabilitada -->
    <option value="" disabled>Selecciona una subcategoría</option>
    <!-- Itera sobre las subcategorías disponibles -->
    <option
      v-for="subcategoria in subcategorias"
      :key="subcategoria.idSubcategoria"
      :value="subcategoria.id"
    >
      {{ subcategoria.nombre }}
    </option>
  </select>
</div>

<div class="form-group">
  <!-- Label para la selección de fecha de adquisición -->
  <label>Fecha de Adquisición:</label>
  <!-- Input de tipo fecha para la adquisición del producto, enlazado con 'productoSeleccionado.fechaAdquisicion' -->
  <input
    type="date"
    v-model="productoSeleccionado.fechaAdquisicion"
    class="input-field"
  />
</div>

<div class="form-group">
  <!-- Label para la selección del estado del producto -->
  <label>Estado:</label>
  <!-- Select para elegir el estado, enlazado con 'productoSeleccionado.idEstado' -->
  <select
    v-model="productoSeleccionado.idEstado"
    class="input-field"
    required
  >
    <!-- Opción por defecto deshabilitada -->
    <option value="" disabled>Selecciona un estado</option>
    <!-- Itera sobre los estados disponibles -->
    <option
      v-for="estado in estados"
      :key="estado.idEstado"
      :value="estado.id"
    >
      {{ estado.estado }}
    </option>
  </select>
</div>

<div class="form-group">
  <!-- Label para la selección de la procedencia del producto -->
  <label>Procedencia:</label>
  <!-- Select para elegir la procedencia, enlazado con 'productoSeleccionado.idProcedencia' -->
  <select
    v-model="productoSeleccionado.idProcedencia"
    class="input-field"
    required
  >
    <!-- Opción por defecto deshabilitada -->
    <option value="" disabled>Selecciona una procedencia</option>
    <!-- Itera sobre las procedencias disponibles -->
    <option
      v-for="procedencia in procedencias"
      :key="procedencia.idProcedencia"
      :value="procedencia.id"
    >
      {{ procedencia.procedencia }}
    </option>
  </select>
</div>

<!-- Contenedor de los botones dentro del modal -->
<div class="botones-modal">
  <!-- Botón para enviar el formulario -->
  <button type="submit" class="button-primary">Guardar</button>
  <!-- Botón para cancelar la edición, ejecuta 'cancelarEdicion' al hacer clic -->
  <button type="button" @click="cancelarEdicion" class="button-secondary">
    Cancelar
  </button>
</div>
</form>
</div>
</div>
</template>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
}
.table-container {
  width: 100%;
  overflow-x: auto; /* Permite desplazamiento horizontal */
}
.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #eaeaea;
  text-align: center;
}

.user-table th {
  background-color: #f5f5f5;
}

h2 {
  text-align: center;
}

.area-boton {
  position: relative;
  margin-right: 2%;
}
.area-botones {
  justify-items: center;
}

.button-tertiary {
  margin: 8px; /* Ajusta el margen entre botones */
  background-color: #7e7f86;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.button-tertiary:hover {
  background-color: #4565f1;
}

.btn-agregar-estado {
  padding: 8px 12px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-agregar-estado:hover {
  background-color: #218838;
}
/* Estilos para la paginacion */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}

.pagination span {
  margin-top: 7px;
  margin-left: 7px;
  margin-right: 7px;
}
.pagination button {
  padding: 8px 10px;
  margin: 0 5px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
/* Estilos para el modal */

.input-field {
  width: 80%;
  padding: 8px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  width: 210px; /* Ajusta el ancho según sea necesario */
  position: relative;
  text-align: center;
}

.close {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 30px;
  cursor: pointer;
}

.button-primary {
  margin: 8px; /* Ajusta el margen entre botones */
  background-color: green;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.button-primary:hover {
  background-color: #0c6b29;
}

.button-secondary {
  margin: 8px; /* Ajusta el margen entre botones */
  background-color: gray;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-secondary:hover {
  background-color: darkgray;
}

/* Contenedor de los checkboxes con una altura máxima y desplazamiento */
#subproductos {
  display: flex;
  flex-direction: column; /* Los checkboxes se apilan verticalmente */
  max-height: 300px; /* Altura máxima del contenedor */
  overflow-y: auto; /* Si hay más checkboxes, aparecerá una barra de desplazamiento */
  padding-right: 10px; /* Espacio para la barra de desplazamiento */
}

/* Alineación y tamaño de los checkboxes */
.checkbox {
  display: flex;
  align-items: center; /* Alinea el checkbox y el texto verticalmente */
  margin-bottom: 8px; /* Espaciado entre las opciones */
}

.checkbox input {
  margin-right: 8px; /* Espacio entre el checkbox y el texto */
  width: 16px; /* Tamaño del checkbox */
  height: 16px; /* Tamaño del checkbox */
}

/* Estilo adicional para el label */
.checkbox label {
  font-size: 14px; /* Tamaño del texto */
  cursor: pointer; /* Cambiar el cursor cuando se pasa sobre el texto */
}

/* Estilo para la etiqueta de 'Id del producto' */
label[for="subproductos"] {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
}

@media (max-width: 640px) {
.area-botones button {
  
  width: 80px;
  font-size: 10px;
  margin-right: -5px;

}
}
</style>
