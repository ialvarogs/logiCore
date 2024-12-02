<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const estadosConservacion = ref([]);
const estadoConservacionEditando = ref(null);
const mostrarModal = ref(false); // Variable para controlar la visibilidad del modal
const elementosPorPagina = 5;
const paginaActual = ref(1);

definePageMeta({
  auth: ['Administrador', 'Encargado']
})


// Función para cargar la lista de estados de conservación
const cargarEstadosConservacion = async () => {
  try {
    const response = await $fetch("/api/estadoConservacion"); // Ajusta la URL según tu API
    estadosConservacion.value = response; // Asigna los datos obtenidos a la variable estadosConservacion
    console.log("Estados de conservación cargados:", estadosConservacion.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar los estados de conservación:", error);
  }
};
// Calcular las filas para la página actual
const estadosConservacionPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return estadosConservacion.value.slice(inicio, inicio + elementosPorPagina);
});

// Calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(estadosConservacion.value.length / elementosPorPagina);
});

// Función para cambiar la página
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};
// Llama a la función para cargar los estados de conservación al montar el componente
onMounted(() => {
  cargarEstadosConservacion();
});

function abrirFormularioEditar(estadoConservacion) {
  estadoConservacionEditando.value = { ...estadoConservacion }; // Cargar los datos del estado de conservación seleccionado para editar
  mostrarModal.value = true; // Mostrar el modal
  console.log("Editando estado de conservación:", estadoConservacion); // Verificar que se está editando correctamente
}

async function actualizarEstadoConservacion(id) {
  try {
    await $fetch(`/api/estadoConservacion/${id}`, {
      method: "PATCH", // Método PATCH para actualizar
      body: { estado: estadoConservacionEditando.value.estado }, // Actualizar con el nuevo valor
    });

    // Actualizar la lista localmente para reflejar los cambios
    const index = estadosConservacion.value.findIndex((e) => e.id === id);
    if (index !== -1) {
      estadosConservacion.value[index] = {
        ...estadoConservacionEditando.value,
      };
    }

    console.log(
      "Estado de conservación actualizado:",
      estadoConservacionEditando.value,
    ); // Verificar la actualización
    cargarEstadosConservacion();
    cancelarEdicion(); // Limpiar el formulario después de actualizar
    mostrarModal.value = false; // Cerrar el modal
  } catch (error) {
    console.error("Error al actualizar el estado de conservación:", error); // Manejo de errores
  }
}

async function eliminarEstadoConservacion(id) {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar este estado de conservación?",
  ); // Confirmar la eliminación
  if (confirmar) {
    try {
      await $fetch(`/api/estadoConservacion/${id}`, {
        method: "DELETE", // Método DELETE para eliminar
      });
      // Actualizar la lista después de eliminar
      estadosConservacion.value = estadosConservacion.value.filter(
        (e) => e.id !== id,
      );
      console.log("Estado de conservación eliminado:", id); // Log para verificar la eliminación
    } catch (error) {
      console.error("Error al eliminar el estado de conservación:", error); // Manejo de errores
    }
  }
}

function cancelarEdicion() {
  estadoConservacionEditando.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Cerrar el modal
}

// Función para navegar a la página de agregar estados de conservación
function agregarEstadoConservacion() {
  router.push({ name: "agregarEstadoConservacion" }); // Navegar a la ruta de agregar estados de conservación
}
</script>

<template>
  <!-- Cabecera de la página -->
  <Header></Header>

  <!-- Contenedor principal con clases para diseño responsivo -->
  <div class="flex  flex-col sm:justify-center items-center sm:p-2">
    
    <!-- Sección de la tarjeta que contiene la lista de estados de conservación -->
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      <div class="container">
        
        <!-- Contenedor para el título y el botón de agregar estado -->
        <div class="header-container  m-10">
          <h2>Lista de Estados de Conservación</h2>
          
          <!-- Botón para agregar un nuevo estado de conservación -->
          <button @click="agregarEstadoConservacion" class="btn-agregar-estado">
            Agregar Estado Conservación
          </button>
        </div>

        <!-- Contenedor de la tabla de estados de conservación -->
        <div class="table-container">
          <table class="user-table">
            <thead>
              <tr>
                <!-- Encabezado de las columnas de la tabla -->
                <th>Estado de Conservación</th>
                <th class="acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- Fila que se muestra mientras se cargan los datos -->
              <tr v-if="estadosConservacion.length === 0">
                <td colspan="2">Cargando...</td>
              </tr>
              <!-- Iteración sobre los estados de conservación con paginación -->
              <tr
                v-for="estadoConservacion in estadosConservacionPaginadas"
                :key="estadoConservacion.id"
              >
                <td>{{ estadoConservacion.estado }}</td>
                <td>
                  <!-- Botón para abrir el formulario de edición de estado -->
                  <button
                    @click="abrirFormularioEditar(estadoConservacion)"
                    class=" m-2px w-15 cursor-pointer  py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none"
                  >
                    <div class="i-material-symbols-edit"></div>
                  </button>
                  <!-- Botón para eliminar un estado de conservación -->
                  <button
                    @click="eliminarEstadoConservacion(estadoConservacion.id)"
                    class=" m-2px w-15 cursor-pointer  py-1.5 px-5.5  bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none"
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
          <!-- Botón para retroceder una página -->
          <button
            @click="cambiarPagina(paginaActual - 1)"
            :disabled="paginaActual === 1"
          >
            <div class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"></div>
          </button>
          
          <!-- Indicador de la página actual y el total de páginas -->
          <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
          
          <!-- Botón para avanzar una página -->
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

  <!-- Modal para editar estado de conservación -->
  <div v-if="estadoConservacionEditando" class="modal">
    <div class="modal-content">
      <!-- Botón para cerrar el modal -->
      <span @click="cancelarEdicion" class="close">&times;</span>
      
      <!-- Formulario de edición del estado de conservación -->
      <label>Estado de Conservación:</label>
      <input
        v-model="estadoConservacionEditando.estado"
        placeholder="Nombre del Estado de Conservación"
        class="input-field"
      />

      <div class="botones-modal">
        <!-- Botón para guardar los cambios -->
        <button
          @click="actualizarEstadoConservacion(estadoConservacionEditando.id)"
          class="button-primary"
        >
          Guardar
        </button>
        <!-- Botón para cancelar la edición -->
        <button
          @click="cancelarEdicion"
          class="button-secondary"
        >
          Cancelar
        </button>
      </div>
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
