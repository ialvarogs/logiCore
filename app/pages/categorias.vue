<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const categorias = ref([]);  // Lista de categorías
const categoriaEditando = ref(null);  // Almacena la categoría que se está editando
const mostrarModal = ref(false); // Nueva variable para controlar la visibilidad del modal
const elementosPorPagina = 5;  // Cantidad de elementos por página en la paginación
const paginaActual = ref(1);  // Página actual
const busqueda = ref("");  // Nueva propiedad para el texto de búsqueda

// Definición de roles autorizados para acceder a esta página
definePageMeta({
  auth: ['Administrador', 'Encargado']  // Roles de usuario autorizados para esta página
})

// Función para cargar la lista de categorías desde la API
const cargarCategorias = async () => {
  try {
    const response = await $fetch("/api/categoria"); // Ajusta la URL según tu API
    categorias.value = response; // Asigna los datos obtenidos a la variable categorias
    console.log("Categorías cargadas:", categorias.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
};

// Filtrar las categorías basadas en la búsqueda ingresada
const categoriasFiltradas = computed(() => {
  if (busqueda.value === "") return categorias.value;
  return categorias.value.filter(categoria =>
    categoria.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

// PAGINACION: Calcular las filas para la página actual
const categoriasPaginadas = computed(() => {
  const categoriasParaMostrar = categoriasFiltradas.value;
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return categoriasParaMostrar.slice(inicio, inicio + elementosPorPagina);
});

// PAGINACION: Calcular el número total de páginas basadas en el número de categorías
const totalPaginas = computed(() => {
  return Math.ceil(categorias.value.length / elementosPorPagina);
});

// PAGINACION: Función para cambiar la página actual
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};

// Llamar a la función para cargar las categorías al montar el componente
onMounted(() => {
  cargarCategorias();
});

// Función para abrir el formulario de edición de una categoría
function abrirFormularioEditar(categoria) {
  categoriaEditando.value = { ...categoria }; // Cargar los datos de la categoría seleccionada para editar
  mostrarModal.value = true; // Mostrar el modal de edición
  console.log("Editando categoría:", categoria); // Verificar que se está editando correctamente
}

// Función para actualizar una categoría en la base de datos
async function actualizarCategoria(id) {
  if (!categoriaEditando.value.nombre) {
    console.error("El nombre de la categoría no puede estar vacío.");
    return; // Detener la función si el nombre está vacío
  }

  try {
    // Realizar el request PATCH para actualizar la categoría
    await $fetch(`/api/categoria/${id}`, {
      method: "PATCH",
      body: { nombreCategoria: categoriaEditando.value.nombre },
    });

    // Actualizar la categoría localmente en la lista
    const index = categorias.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      categorias.value[index] = { ...categoriaEditando.value };
    }

    console.log("Categoría actualizada:", categoriaEditando.value);
    cargarCategorias();  // Recargar la lista de categorías
    cancelarEdicion();  // Limpiar los datos de edición
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
  }
}

// Función para eliminar una categoría
async function eliminarCategoria(id) {
  const confirmar = confirm(
    "¿Estás seguro de que deseas eliminar esta categoría?"
  ); // Confirmar la eliminación
  if (confirmar) {
    try {
      await $fetch(`/api/categoria/${id}`, {
        method: "DELETE", // Método DELETE para eliminar
      });
      // Actualizar la lista después de eliminar la categoría
      categorias.value = categorias.value.filter((c) => c.id !== id);
      console.log("Categoría eliminada:", id); // Log para verificar la eliminación
    } catch (error) {
      console.error("Error al eliminar la categoría:", error); // Manejo de errores
    }
  }
}

// Función para cancelar la edición de una categoría
function cancelarEdicion() {
  categoriaEditando.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Ocultar el modal
}

// Función para navegar a la página de agregar categorías
function agregarCategoria() {
  router.push({ name: "agregarCategoria" }); // Navegar a la ruta de agregar categorías
}
</script>

<template>
  <Header></Header>
  <div class="flex flex-col sm:justify-center items-center sm:p-2">
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      <div class="container">
        <div class="header-container m-10">
          <h2>Lista de Categorías</h2>
          
           <!-- Barra de búsqueda: Campo para filtrar categorías -->
           <input
              v-model="busqueda"
              type="text"
              placeholder="Buscar Categoría..."
              class="w-full mb2 rounded-md py-1 border text-sm outline-[#f84525]"
            />
          <div class="area-boton">
            <!-- Botón o área para acciones adicionales (vacío por ahora) -->
          </div>

          <div class="table-container">     
            <table class="user-table">
              <thead>
                <tr>
                  <th class="categoria">Categoría</th>
                  <th class="acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="categoriasFiltradas.length === 0">
                  <!-- Mensaje cuando no hay categorías filtradas -->
                  <td colspan="2">No se encontraron categorías</td>
                </tr>
                <!-- Mostrar las categorías filtradas y paginadas -->
                <tr v-for="categoria in categoriasPaginadas" :key="categoria.id">
                  <td>{{ categoria.nombre }}</td>
                  <td>
                    <button
                      @click="abrirFormularioEditar(categoria)"
                      class=" m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none"
                    >
                      <div class="i-material-symbols-edit"></div>
                    </button>
                    <button
                      @click="eliminarCategoria(categoria.id)"
                      class=" m-2px w-15 cursor-pointer py-1.5 px-5.5  bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none"
                    >
                      <div class="i-material-symbols-delete "></div>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Botón para agregar una nueva categoría -->
            <div class="agregar-area"> 
              <button @click="agregarCategoria" class="btn-agregar-categoria">
                Agregar Categoría
              </button>
            </div>
        
          </div>

          <!-- Paginación de categorías -->
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

  <!-- Modal para editar categoría -->
  <div v-if="mostrarModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="cancelarEdicion">&times;</span>
      
      <label>Categoría:</label>
      <input
        v-model="categoriaEditando.nombre"
        placeholder="Nombre de la Categoría"
        class="input-field"
      />
      
      <!-- Botones para guardar o cancelar la edición de la categoría -->
      <div class="botones-modal">
        <button
          @click="actualizarCategoria(categoriaEditando.id)"
          class="button-primary"
        >
          Guardar
        </button>

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

.container {
  margin: 2px;
}




.agregar-area{
  display: flex;
  justify-content: center;
}

.btn-agregar-categoria {
  padding: 8px 12px;
  margin-top: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-agregar-categoria:hover {
  background-color: #218838;
}


/* Estilos para la paginacion */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  margin: 8px;
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
  margin: 8px;
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

.input-field {
  width: 80%;
  padding: 8px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>