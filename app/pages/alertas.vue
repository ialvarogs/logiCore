<script setup>
import { ref, computed, onMounted } from "vue";

// Lista de productos con stock bajo
const productosConStockBajo = ref([]);
const paginaActual = ref(1);
const elementosPorPagina = 5;
const busqueda = ref(""); // Nueva propiedad para el texto de búsqueda

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Obtener productos con stock bajo desde la API
async function obtenerAlertas() {
  try {
    const response = await $fetch("/api/alertas");
    productosConStockBajo.value = response;
  } catch (error) {
    console.error("Error al obtener las alertas:", error);
  }
}

// Cargar las alertas al montar el componente
onMounted(() => {
  obtenerAlertas();
});

// Filtrar los productos basados en la búsqueda
const productosFiltrados = computed(() => {
  if (busqueda.value === "") return productosConStockBajo.value;
  return productosConStockBajo.value.filter((producto) =>
    producto.individualizacionDelBien
      .toLowerCase()
      .includes(busqueda.value.toLowerCase())
  );
});

// Paginación: obtener los productos de la página actual
const productosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return productosFiltrados.value.slice(inicio, inicio + elementosPorPagina);
});

// Paginación: calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(productosFiltrados.value.length / elementosPorPagina);
});

// Función para cambiar de página
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};
</script>

<template>
  <Header></Header>

  <!-- Contenedor principal de la página -->
  <div class="flex flex-col sm:justify-center items-center sm:p-2">

    <!-- Contenedor de la sección de alertas de stock bajo -->
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">

      <!-- Contenedor interno que envuelve el encabezado y la tabla -->
      <div class="container">
        <div class="header-container m-10">
          
          <!-- Título de la sección -->
          <h2>Alertas de Stock Bajo</h2>

          <!-- Barra de búsqueda para filtrar productos -->
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar Producto..."
            class="w-full mb2 rounded-md py-1 border text-sm outline-[#f84525]"
          />

          <!-- Contenedor de la tabla -->
          <div class="table-container">

            <!-- Tabla que muestra los productos con bajo stock -->
            <table class="alertas-table">
              <thead>
                <!-- Encabezado de la tabla -->
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <!-- Iteración de los productos paginados para mostrarlos en la tabla -->
                <tr
                  v-for="producto in productosPaginados"
                  :key="producto.idProducto"
                >
                  <!-- Nombre del producto -->
                  <td>{{ producto.individualizacionDelBien }}</td>

                  <!-- Cantidad del producto, con clase dinámica si es menor a 10 -->
                  <td
                    :class="
                      producto.Cantidad < 10 ? 'alertas-cantidad-baja' : ''
                    "
                  >
                    {{ producto.cantidad }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Paginación -->
          <div class="pagination">
            <!-- Botón para ir a la página anterior -->
            <button
              @click="cambiarPagina(paginaActual - 1)"
              :disabled="paginaActual === 1"
            >
              <div
                class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"
              ></div>
            </button>

            <!-- Indicador de página actual y total -->
            <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>

            <!-- Botón para ir a la siguiente página -->
            <button
              @click="cambiarPagina(paginaActual + 1)"
              :disabled="paginaActual === totalPaginas"
            >
              <div
                class="i-material-symbols:navigate-next w-1.2rem h-1.2rem"
              ></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Contenedor principal para las alertas */
.alertas-container {
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}

/* Título de la sección */
h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

/* Estilos para la tabla de alertas */
.alertas-table {
  width: 100%;
  border-collapse: collapse;
}

/* Encabezados de la tabla */
.alertas-table th,
.alertas-table td {
  padding: 12px;
  border: 1px solid #eaeaea;
  text-align: center;
}

.alertas-table th {
  background-color: #f5f5f5;
}

/* Clase para resaltar cantidades bajas */
.alertas-cantidad-baja {
  color: red;
  font-weight: bold;
}

/* Estilos para la paginación */
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
</style>
