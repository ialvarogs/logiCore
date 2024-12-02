<script setup>
import { ref, onMounted, computed } from "vue";

const resumenResponsables = ref([]);
const totalProductosAsignados = ref(0);
const productosSinDevolver = ref(0);
const salas = ref([]);
const totalProductosAsignadosSala = ref(0);
const productosMasAsignados = ref([]);

const paginaResponsables = ref(1);
const paginaSalas = ref(1);
const elementosPorPagina = 5;
const buscadorResponsables = ref("");
const buscadorSalas = ref("");

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Obtener los datos de responsables
async function obtenerDatosResponsable() {
  try {
    const response = await fetch("/api/reportes/productoResponsable");
    const result = await response.json();
    if (result.data && Array.isArray(result.data.responsables)) {
      resumenResponsables.value = result.data.responsables;
      totalProductosAsignados.value = result.data.totalProductosAsignados;
      productosSinDevolver.value = result.data.productosSinDevolver;
    }
  } catch (error) {
    console.error("Error al obtener los datos del reporte:", error);
  }
}

// Obtener los datos de salas
async function obtenerDatosSala() {
  try {
    const response = await fetch("/api/reportes/productoSala");
    const result = await response.json();
    if (result.data && Array.isArray(result.data.salas)) {
      salas.value = result.data.salas;
      totalProductosAsignadosSala.value =
        result.data.totalProductosAsignadosSala;
    }
  } catch (error) {
    console.error("Error al obtener los datos del reporte:", error);
  }
}

// Obtener los productos más asignados
async function obtenerProductosMasAsignados() {
  try {
    const response = await fetch("/api/reportes/productoMasUtilizado");
    const result = await response.json();
    if (result && Array.isArray(result)) {
      productosMasAsignados.value = result;
    }
  } catch (error) {
    console.error("Error al obtener los productos más asignados:", error);
  }
}

onMounted(() => {
  obtenerDatosResponsable();
  obtenerDatosSala();
  obtenerProductosMasAsignados();
});

// Filtrar responsables por búsqueda
const responsablesFiltrados = computed(() => {
  return resumenResponsables.value.filter((responsable) =>
    responsable.nombre
      .toLowerCase()
      .includes(buscadorResponsables.value.toLowerCase()),
  );
});

// Paginación de responsables
const responsablesPaginados = computed(() => {
  const inicio = (paginaResponsables.value - 1) * elementosPorPagina;
  return responsablesFiltrados.value.slice(inicio, inicio + elementosPorPagina);
});

const totalPaginasResponsables = computed(() => {
  return Math.ceil(responsablesFiltrados.value.length / elementosPorPagina);
});

// Cambiar página de responsables
const cambiarPaginaResponsables = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginasResponsables.value) {
    paginaResponsables.value = nuevaPagina;
  }
};

// Filtrar salas por búsqueda
const salasFiltradas = computed(() => {
  return salas.value.filter((sala) =>
    sala.nombre.toLowerCase().includes(buscadorSalas.value.toLowerCase()),
  );
});

// Paginación de salas
const salasPaginadas = computed(() => {
  const inicio = (paginaSalas.value - 1) * elementosPorPagina;
  return salasFiltradas.value.slice(inicio, inicio + elementosPorPagina);
});

const totalPaginasSalas = computed(() => {
  return Math.ceil(salasFiltradas.value.length / elementosPorPagina);
});

// Cambiar página de salas
const cambiarPaginaSalas = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginasSalas.value) {
    paginaSalas.value = nuevaPagina;
  }
};

// Función para formatear el promedio de tiempo de asignación
const formatPromedioTiempo = (promedio) => {
  return `${Math.round(promedio)} días`; // Redondea el valor y agrega "días"
};
</script>
<template>
  <div>
    <Header></Header>
    <div class="flex flex-col sm:justify-center items-center sm:p-2">
      <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
        <div class="container">
          <!-- Reporte de Responsables -->
          <div class="header-container m-10">
            <h2 class="font-semibold text-2xl">
              Reporte de Productos y Responsables
            </h2>
            <div v-if="resumenResponsables.length > 0">
              <h3 class="font-medium text-xl">Resumen de Responsables</h3>
              <div class="my-4">
                <input
                  v-model="buscadorResponsables"
                  type="text"
                  placeholder="Buscar por responsable..."
                  class="w-full mb2 rounded-md py-1 border text-sm outline-[#f84525]"
                />
              </div>
              <div class="table-container">
                <table class="user-table">
                  <thead>
                    <tr>
                      <th>Responsable</th>
                      <th>Total de Productos Asignados</th>
                      <th>Promedio de Tiempo de Asignación (días)</th>
                      <th>Productos No Devueltos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(responsable, index) in responsablesPaginados"
                      :key="index"
                    >
                      <td>{{ responsable.nombre }}</td>
                      <td>{{ responsable.productosAsignados }}</td>
                      <td>
                        {{ formatPromedioTiempo(responsable.tiempoPromedio) }}
                      </td>
                      <td>{{ responsable.productosSinDevolver }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="pagination">
                  <button
                    @click="cambiarPaginaResponsables(paginaResponsables - 1)"
                    :disabled="paginaResponsables === 1"
                  >
                    <div
                      class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"
                    ></div>
                  </button>
                  <span
                    >Página {{ paginaResponsables }} de
                    {{ totalPaginasResponsables }}</span
                  >
                  <button
                    @click="cambiarPaginaResponsables(paginaResponsables + 1)"
                    :disabled="paginaResponsables === totalPaginasResponsables"
                    
                  >
                  <div class="i-material-symbols:navigate-next w-1.2rem h-1.2rem"></div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Estadísticas Generales -->
            <div v-if="totalProductosAsignados > 0">
              <h3 class="font-medium text-xl">Estadísticas Generales</h3>
              <p>
                <strong>Total de productos asignados:</strong>
                {{ totalProductosAsignados }}
              </p>
              <p>
                <strong>Total de productos no devueltos:</strong>
                {{ productosSinDevolver }}
              </p>
            </div>
            <div v-else>
              <p>No hay datos disponibles.</p>
            </div>
          </div>

          <!-- Reporte de Productos en Salas -->
          <div class="header-container m-10">
            <h2 class="font-semibold text-2xl">
              Reporte de Productos en Salas
            </h2>
            <div class="my-4 ">
              <input
                v-model="buscadorSalas"
                type="text"
                placeholder="Buscar por sala..."
                class="w-100% mb2 rounded-md py-1 border text-sm outline-[#f84525]"
              />
            </div>
            <div class="table-container">
              <table v-if="salasPaginadas.length > 0" class="user-table">
                <thead>
                  <tr>
                    <th>Sala</th>
                    <th>Cantidad de Productos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(sala, index) in salasPaginadas" :key="index">
                    <td>{{ sala.nombre }}</td>
                    <td>{{ sala.cantidad }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-else>
                <p>No hay datos disponibles.</p>
              </div>
            </div>

            <!-- Paginación para salas -->
            <div class="pagination">
              <button
                @click="cambiarPaginaSalas(paginaSalas - 1)"
                :disabled="paginaSalas === 1"
              >
                <div
                  class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"
                ></div>
              </button>
              <span>Página {{ paginaSalas }} de {{ totalPaginasSalas }}</span>
              <button
                @click="cambiarPaginaSalas(paginaSalas + 1)"
                :disabled="paginaSalas === totalPaginasSalas"
              >
                <div
                  class="i-material-symbols:navigate-next w-1.2rem h-1.2rem"
                ></div>
              </button>
            </div>
            <div>
              <p>
                <strong>Total de productos asignados a salas:</strong>
                {{ totalProductosAsignadosSala }}
              </p>
            </div>
          </div>
        </div>

        <!-- Reporte de Top 10 Productos Más Asignados -->
        <div class="header-container m-10">
          <h2 class="font-semibold text-2xl">
            Top 10 Productos con Más Asignaciones
          </h2>
          <div v-if="productosMasAsignados.length > 0">
            <table class="user-table">
              <thead>
                <tr>
                  <th>ID del Producto</th>
                  <th>Nombre del Producto</th>
                  <th>Total de Asignaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(producto, index) in productosMasAsignados"
                  :key="index"
                >
                  <td>{{ producto.idProducto }}</td>
                  <td>{{ producto.individualizacionDelBien }}</td>
                  <td>{{ producto.totalAsignaciones }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>No hay datos disponibles.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Agrega tus estilos personalizados aquí */
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
.btn-agregar-proveedor {
  padding: 8px 12px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-agregar-proveedor:hover {
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
  background-color: #f84525;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.button-primary:hover {
  background-color: #e33a1e;
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
</style>
