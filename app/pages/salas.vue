<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter(); // Inicializa el enrutador
const salas = ref([]); // Lista de salas
const salaEditando = ref(null); // Sala seleccionada para editar
const nivelesEducativos = ref([]); // Lista de niveles educativos
const mostrarModal = ref(false); // Variable para controlar la visibilidad del modal
const elementosPorPagina = 5; // Número de elementos por página
const paginaActual = ref(1); // Página actual

definePageMeta({
  auth: ['Administrador', 'Encargado'] // Define los roles autorizados para esta página
});

// Función para cargar la lista de salas
const cargarSalas = async () => {
  try {
    const response = await $fetch("/api/salas"); // Ajusta la URL según tu API
    salas.value = response; // Asigna los datos obtenidos a la variable salas
    console.log("Salas cargadas:", salas.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar las salas:", error); // Log de errores
  }
};

// Función para cargar la lista de niveles educativos
const cargarNivelesEducativos = async () => {
  try {
    const response = await $fetch("/api/nivelEducativo"); // Ajusta la URL según tu API
    nivelesEducativos.value = response; // Asigna los datos obtenidos a la variable nivelesEducativos
    console.log("Niveles educativos cargados:", nivelesEducativos.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar los niveles educativos:", error); // Log de errores
  }
};

// PAGINACIÓN Calcular las filas para la página actual
const salasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina; // Calcula el índice de inicio
  return salas.value.slice(inicio, inicio + elementosPorPagina); // Retorna los elementos de la página actual
});

// PAGINACIÓN Calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(salas.value.length / elementosPorPagina); // Calcula el total de páginas
});

// PAGINACIÓN Función para cambiar la página
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) { // Validación de rango
    paginaActual.value = nuevaPagina; // Actualiza la página actual
  }
};

// Llama a las funciones para cargar datos al montar el componente
onMounted(() => {
  cargarSalas(); // Carga la lista de salas
  cargarNivelesEducativos(); // Carga los niveles educativos
});

// Función para abrir el formulario de edición
function abrirFormularioEditar(sala) {
  salaEditando.value = { ...sala }; // Cargar los datos de la sala seleccionada para editar
  mostrarModal.value = true; // Mostrar el modal
  console.log("Editando sala:", sala); // Verificar que se está editando correctamente
}

// Función para actualizar una sala existente
async function actualizarSala(id) {
  try {
    await $fetch(`/api/salas/${id}`, {
      method: "PATCH", // Método PATCH para actualizar
      body: {
        numeroSala: salaEditando.value.numero,
        nombreSala: salaEditando.value.nombre,
        capacidad: salaEditando.value.capacidad,
        idNivel: salaEditando.value.idNivel,
      },
    });
    console.log(`Sala con ID ${id} actualizada correctamente.`); // Log para confirmar actualización

    cargarSalas(); // Recargar la lista de salas
    salaEditando.value = null; // Limpiar el formulario de edición
    mostrarModal.value = false; // Cerrar el modal
  } catch (error) {
    console.error("Error al actualizar la sala:", error); // Log de errores
  }
}

// Función para eliminar una sala
async function eliminarSala(id) {
  const confirmar = confirm("¿Estás seguro de que deseas eliminar esta sala?"); // Confirmar la eliminación
  if (confirmar) {
    try {
      await $fetch(`/api/salas/${id}`, {
        method: "DELETE", // Método DELETE para eliminar
      });
      salas.value = salas.value.filter((s) => s.id !== id); // Actualizar la lista después de eliminar
      console.log("Sala eliminada:", id); // Log para verificar la eliminación
    } catch (error) {
      console.error("Error al eliminar la sala:", error); // Manejo de errores
    }
  }
}

// Función para cancelar la edición
function cancelarEdicion() {
  salaEditando.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Cerrar el modal
}

// Función para navegar a la página de agregar salas
function agregarSala() {
  router.push({ name: "agregarSala" }); // Navegar a la ruta de agregar salas
}
</script>

<template>
  <Header></Header>
  <!-- Sección principal de la página -->
  <div class="flex  flex-col sm:justify-center items-center sm:p-2">
    <!-- Contenedor del contenido principal -->
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      <!-- Contenedor de la tabla -->
      <div class="container">
        <!-- Encabezado con título y botón -->
        <div class="header-container m-10">
          <h2>Lista de Salas</h2>
          <!-- Botón para agregar una nueva sala -->
          <div class="area-boton">
            <button @click="agregarSala" class="btn-agregar-sala">
              Agregar Sala
            </button>
          </div>
          <!-- Contenedor de la tabla de salas -->
          <div class="table-container">
            <table class="user-table">
              <thead>
                <!-- Encabezados de la tabla -->
                <tr>
                  <th>Nombre de Sala</th>
                  <th>Número de Sala</th>
                  <th>Capacidad</th>
                  <th>Nivel Educativo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <!-- Fila de carga si no hay datos -->
                <tr v-if="salas.length === 0">
                  <td colspan="5">Cargando...</td>
                </tr>
                <!-- Filas de las salas -->
                <tr v-for="sala in salasPaginadas" :key="sala.id">
                  <td>{{ sala.nombre }}</td>
                  <td>{{ sala.numero }}</td>
                  <td>{{ sala.capacidad }}</td>
                  <td>{{ sala.nivel }}</td>
                  <td>
                    <!-- Botón para editar una sala -->
                    <button
                      @click="abrirFormularioEditar(sala)"
                      class="m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none"
                    >
                      <div class="i-material-symbols-edit"></div>
                    </button>
                    <!-- Botón para eliminar una sala -->
                    <button
                      @click="eliminarSala(sala.id)"
                      class="m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none"
                    >
                      <div class="i-material-symbols-delete"></div>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Paginación -->
          <div class="pagination">
            <!-- Botón para página anterior -->
            <button
              @click="cambiarPagina(paginaActual - 1)"
              :disabled="paginaActual === 1"
            >
              <div class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"></div>
            </button>
            <!-- Indicador de la página actual -->
            <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
            <!-- Botón para página siguiente -->
            <button
              @click="cambiarPagina(paginaActual + 1)"
              :disabled="paginaActual === totalPaginas"
            >
              <div class="i-material-symbols:navigate-next w-1.2rem h-1.2rem"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para editar una sala -->
  <div v-if="mostrarModal" class="modal">
    <div class="modal-content">
      <span @click="cancelarEdicion" class="close">&times;</span>
      <!-- Formulario de edición -->
      <label>Nombre de Sala:</label>
      <input
        v-model="salaEditando.nombre"
        placeholder="Nombre de la Sala"
        class="input-field"
      />
      <label>Número de Sala:</label>
      <input
        v-model="salaEditando.numero"
        placeholder="Número de la Sala"
        type="number"
        class="input-field"
      />
      <label>Capacidad:</label>
      <input
        v-model="salaEditando.capacidad"
        placeholder="Capacidad"
        type="number"
        class="input-field"
      />
      <label>Nivel Educativo:</label>
      <select v-model="salaEditando.idNivel" class="input-field">
        <option
          v-for="nivel in nivelesEducativos"
          :key="nivel.id"
          :value="nivel.id"
        >
          {{ nivel.nombre }}
        </option>
      </select>
      <!-- Botones de acción en el modal -->
      <button @click="actualizarSala(salaEditando.id)" class="button-primary">
        Guardar
      </button>
      <button @click="cancelarEdicion" class="button-secondary">
        Cancelar
      </button>
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
.btn-agregar-sala {
  padding: 8px 12px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}
.btn-agregar-sala:hover {
  background-color: #218838;
}
/* Estilos para la paginacion */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}

.pagination span{
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
