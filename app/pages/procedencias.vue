<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const procedencias = ref([]); // Lista de estados de procedencia
const procedenciaEditando = ref(null); // Estado de procedencia que se está editando
const mostrarModal = ref(false); // Variable para controlar la visibilidad del modal
const elementosPorPagina = 5;
const paginaActual = ref(1);

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Función para cargar la lista de estados de procedencia
const cargarProcedencias = async () => {
  try {
    const response = await $fetch("/api/procedencia"); // Ajusta la URL según tu API
    procedencias.value = response; // Asigna los datos obtenidos a la variable procedencias
    console.log("Estados de procedencia cargados:", procedencias.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar los estados de procedencia:", error);
  }
};
// PAGINACION Calcular las filas para la página actual
const procedenciasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return procedencias.value.slice(inicio, inicio + elementosPorPagina);
});

// PAGINACION Calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(procedencias.value.length / elementosPorPagina);
});

// PAGINACION Función para cambiar la página
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};
// Llama a la función para cargar los estados de procedencia al montar el componente
onMounted(() => {
  cargarProcedencias();
});

function abrirFormularioEditar(procedencia) {
  procedenciaEditando.value = { ...procedencia }; // Cargar los datos del estado de procedencia seleccionado para editar
  mostrarModal.value = true; // Mostrar el modal
  console.log("Editando estado de procedencia:", procedencia); // Verificar que se está editando correctamente
}

async function actualizarProcedencia(id) {
  try {
    await $fetch(`/api/procedencia/${id}`, {
      // Ajusta la URL según tu API
      method: "PATCH", // Método PUT para actualizar
      body: {
        procedencia: procedenciaEditando.value.procedencia, // Datos a enviar
      },
    });
    console.log("Estado de procedencia actualizado:", id); // Log para verificar la actualización
    cargarProcedencias(); // Recargar la lista después de actualizar
    procedenciaEditando.value = null; // Limpiar el formulario de edición
    mostrarModal.value = false; // Cerrar el modal
  } catch (error) {
    console.error("Error al actualizar el estado de procedencia:", error);
  }
}

async function eliminarProcedencia(id) {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar este estado de procedencia?",
  ); // Confirmar la eliminación
  if (confirmar) {
    try {
      await $fetch(`/api/procedencia/${id}`, {
        method: "DELETE", // Método DELETE para eliminar
      });
      // Actualizar la lista después de eliminar
      procedencias.value = procedencias.value.filter((e) => e.id !== id);
      console.log("Estado de procedencia eliminado:", id); // Log para verificar la eliminación
    } catch (error) {
      console.error("Error al eliminar el estado de procedencia:", error); // Manejo de errores
    }
  }
}

function cancelarEdicion() {
  procedenciaEditando.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Cerrar el modal
}

// Función para navegar a la página de agregar estados de procedencia
function agregarProcedencia() {
  router.push({ name: "agregarProcedencia" }); // Navegar a la ruta de agregar estados de procedencia
}
</script>

<template>
  <Header></Header>
  <div class="flex  flex-col sm:justify-center items-center sm:p-2">
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
  <div class="container">
    <div class="header-container  m-10">
    <h2>Lista de Procedencias</h2>
    <div class="area-boton">
    <button @click="agregarProcedencia" class="btn-agregar-procedencia">
      Agregar procedencia
    </button>
  </div>

            <div class="table-container">
            <table class="user-table">
              <thead>
                <tr>
                  <th>Procedencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="procedencias.length === 0">
                  <td colspan="2">Cargando...</td>
                </tr>
                <tr v-for="procedencia in procedenciasPaginadas" :key="procedencia.id">
                  <td>{{ procedencia.procedencia }}</td>
                  <td>
                    <button
                      @click="abrirFormularioEditar(procedencia)"
                      class="m-2px w-15 cursor-pointer  py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none"
                    >
                    <div class="i-material-symbols-edit"></div>
                    </button>
                    <button
                      @click="eliminarProcedencia(procedencia.id)"
                      class=" m-2px w-15 cursor-pointer  py-1.5 px-5.5  bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none"
                    >
                    <div class="i-material-symbols-delete "  ></div> 
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pagination">
            <button
              @click="cambiarPagina(paginaActual - 1)"
              :disabled="paginaActual === 1"
            >
            <div class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"></div>
            </button>
            <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
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


  <!-- Modal para editar subcategoría -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <span @click="cancelarEdicion" class="close">&times;</span>
      <label>Procedencia:</label>
      <input
        v-model="procedenciaEditando.procedencia"
        placeholder="Nombre del Estado de Procedencia"
        class="input-field"
      />
      <div class="botones-modal">
      <button @click="actualizarProcedencia(procedenciaEditando.id)" class="button-primary">
        Guardar
      </button>
      <button @click="cancelarEdicion" class="button-secondary">
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
.btn-agregar-procedencia {
  padding: 8px 12px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}
.btn-agregar-procedencia {
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
