<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const nivelesEducativos = ref([]);
const nivelEducativoEditando = ref(null);
const mostrarModal = ref(false); // Variable para controlar la visibilidad del modal
const elementosPorPagina = 5;
const paginaActual = ref(1);

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Función para cargar la lista de niveles educativos
const cargarNivelesEducativos = async () => {
  try {
    const response = await $fetch("/api/nivelEducativo"); // Ajusta la URL según tu API
    nivelesEducativos.value = response; // Asigna los datos obtenidos a la variable nivelesEducativos
    console.log("Niveles educativos cargados:", nivelesEducativos.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar los niveles educativos:", error);
  }
};
// PAGINACION Calcular las filas para la página actual
const nivelesPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return nivelesEducativos.value.slice(inicio, inicio + elementosPorPagina);
});

// PAGINACION Calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(nivelesEducativos.value.length / elementosPorPagina);
});

// PAGINACION Función para cambiar la página
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};
// Llama a la función para cargar los niveles educativos al montar el componente
onMounted(() => {
  cargarNivelesEducativos();
});

function abrirFormularioEditar(nivelEducativo) {
  console.log("Abriendo formulario para editar:", nivelEducativo); // Log para verificar el objeto
  nivelEducativoEditando.value = { ...nivelEducativo }; // Cargar los datos del nivel educativo seleccionado para editar
  mostrarModal.value = true; // Mostrar el modal
}

async function actualizarNivelEducativo(id) {
  try {
    // Realizar una solicitud PATCH para actualizar el nivel educativo en el servidor
    await $fetch(`/api/nivelEducativo/${id}`, {
      method: "PATCH", // Método PATCH para actualizar
      body: {
        nivelEducativo: nivelEducativoEditando.value.nombre,
      },
    });

    // Actualizar la lista de niveles educativos en el frontend
    const index = nivelesEducativos.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      nivelesEducativos.value[index] = { ...nivelEducativoEditando.value };
    }

    console.log("Nivel educativo actualizado:", nivelEducativoEditando.value); // Verificar la actualización
    cancelarEdicion(); // Limpiar el formulario de edición después de guardar
  } catch (error) {
    console.error("Error al actualizar el nivel educativo:", error); // Manejo de errores
  }
}

async function eliminarNivelEducativo(id) {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar este nivel educativo?",
  ); // Confirmar la eliminación
  if (confirmar) {
    try {
      await $fetch(`/api/nivelEducativo/${id}`, {
        method: "DELETE", // Método DELETE para eliminar
      });
      // Actualizar la lista después de eliminar
      nivelesEducativos.value = nivelesEducativos.value.filter(
        (n) => n.id !== id,
      );
      console.log("Nivel educativo eliminado:", id); // Log para verificar la eliminación
    } catch (error) {
      console.error("Error al eliminar el nivel educativo:", error); // Manejo de errores
    }
  }
}

function cancelarEdicion() {
  nivelEducativoEditando.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Cerrar el modal
}

// Función para navegar a la página de agregar niveles educativos
function agregarNivelEducativo() {
  router.push({ name: "agregarNivelEducativo" }); // Navegar a la ruta de agregar niveles educativos
}
</script>

<template>
  <Header></Header>
  <div class="flex  flex-col sm:justify-center items-center sm:p-2">
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      <div class="container">
        <div class="header-container  m-10">
          <h2>Lista de Niveles Educativos</h2>
        <div class="area-boton">
          <button @click="agregarNivelEducativo" class="btn-agregar-nivel">
            Agregar Nivel Educativo
          </button>
        </div>

    <div class="table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>Nivel Educativo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="nivelesEducativos.length === 0">
          <td colspan="2">Cargando...</td>
        </tr>
        <tr
          v-for="nivelEducativo in nivelesPaginadas"
          :key="nivelEducativo.id"
        >
          <td>{{ nivelEducativo.nombre }}</td>
          <td>
            <button
              @click="abrirFormularioEditar(nivelEducativo)"
              class=" m-2px w-15 cursor-pointer  py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none">
            <div class="i-material-symbols-edit"></div>
            </button>
            <button
              @click="eliminarNivelEducativo(nivelEducativo.id)"
              class=" m-2px w-15 cursor-pointer  py-1.5 px-5.5  bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none">
              <div class="i-material-symbols-delete"  ></div> 
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

  <!-- Modal para editar subcategoría -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <span @click="cancelarEdicion" class="close">&times;</span>
      <label>Nivel Educativo:</label>
      <input
        v-model="nivelEducativoEditando.nombre"
        placeholder="Nombre del Nivel Educativo"
        class="input-field"
      />
      <div class="botones-modal">
      <button @click="actualizarNivelEducativo(nivelEducativoEditando.id)" class="button-primary">
        Guardar
      </button>
      <button @click="cancelarEdicion" class="button-secondary">
        Cancelar
      </button>
    </div>
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
.btn-agregar-nivel {
  padding: 8px 12px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}
.btn-agregar-nivel:hover {
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
