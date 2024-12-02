<script setup>
// Importación de las funciones y utilidades necesarias
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Inicialización de variables y referencias
const router = useRouter();
const subcategorias = ref([]); // Lista de subcategorías
const categorias = ref([]); // Lista de categorías
const subcategoriaEditando = ref(null); // Subcategoría que se está editando actualmente
const mostrarModal = ref(false); // Variable para controlar la visibilidad del modal
const elementosPorPagina = 5; // Número de elementos por página
const paginaActual = ref(1); // Página actual en la paginación
const busqueda = ref(""); // Texto de búsqueda ingresado por el usuario

// Metadatos de la página para permisos de autenticación
definePageMeta({
  auth: ['Administrador', 'Encargado']
});

// Función para cargar la lista de subcategorías desde la API
const cargarSubcategorias = async () => {
  try {
    const response = await $fetch("/api/subCategoria");
    subcategorias.value = response; // Asignar los datos obtenidos
    console.log("Subcategorías cargadas:", subcategorias.value);
  } catch (error) {
    console.error("Error al cargar las subcategorías:", error);
  }
};

// Computed para filtrar las subcategorías basadas en la búsqueda
const subCategoriasFiltradas = computed(() => {
  if (busqueda.value === "") return subcategorias.value; // Sin búsqueda, devuelve todas las subcategorías
  return subcategorias.value.filter(subcategoria =>
    subcategoria.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) // Filtrado por coincidencia de texto
  );
});

// Computed para obtener las subcategorías de la página actual
const subcategoriasPaginadas = computed(() => {
  const subCategoriasParaMostrar = subCategoriasFiltradas.value;
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return subCategoriasParaMostrar.slice(inicio, inicio + elementosPorPagina); // Selección según la paginación
});

// Computed para calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(subcategorias.value.length / elementosPorPagina);
});

// Función para cambiar la página en la paginación
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};

// Función para cargar la lista de categorías desde la API
const cargarCategorias = async () => {
  try {
    const response = await $fetch("/api/categoria");
    categorias.value = response; // Asignar los datos obtenidos
    console.log("Categorías cargadas:", categorias.value);
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
};

// Hook onMounted para cargar datos al montar el componente
onMounted(() => {
  cargarSubcategorias(); // Cargar subcategorías
  cargarCategorias(); // Cargar categorías
});

// Función para abrir el formulario de edición de una subcategoría
function abrirFormularioEditar(subcategoria) {
  subcategoriaEditando.value = { ...subcategoria }; // Clonar datos de la subcategoría seleccionada
  mostrarModal.value = true; // Mostrar el modal de edición
  console.log("Editando subcategoría:", subcategoria);
}

// Función para actualizar una subcategoría en la API
async function actualizarSubcategoria(id) {
  try {
    await $fetch(`/api/subCategoria/${id}`, {
      method: "PATCH",
      body: {
        nombreSubcategoria: subcategoriaEditando.value.nombre,
        idCategoria: subcategoriaEditando.value.idCategoria
      }
    });
    console.log("Subcategoría actualizada:", id);
    cargarSubcategorias(); // Recargar la lista de subcategorías
    subcategoriaEditando.value = null;
    mostrarModal.value = false; // Cerrar el modal
  } catch (error) {
    console.error("Error al actualizar la subcategoría:", error);
  }
}

// Función para eliminar una subcategoría en la API
async function eliminarSubcategoria(id) {
  const confirmar = confirm("¿Estás seguro de que deseas eliminar esta subcategoría?");
  if (confirmar) {
    try {
      await $fetch(`/api/subCategoria/${id}`, { method: "DELETE" });
      subcategorias.value = subcategorias.value.filter((s) => s.id !== id); // Actualizar la lista local
      console.log("Subcategoría eliminada:", id);
    } catch (error) {
      console.error("Error al eliminar la subcategoría:", error);
    }
  }
}

// Función para cancelar la edición de una subcategoría
function cancelarEdicion() {
  subcategoriaEditando.value = null; // Limpiar datos de edición
  mostrarModal.value = false; // Cerrar el modal
}

// Función para redirigir a la página de agregar subcategoría
function agregarSubcategoria() {
  router.push({ name: "agregarSubcategoria" }); // Navegación a la vista de agregar
}
</script>

<template>
  <!-- Componente principal que incluye un encabezado y la estructura principal -->
  <Header></Header>
  <div class="flex flex-col sm:justify-center items-center sm:p-2">
    <!-- Contenedor principal con sombra y bordes redondeados -->
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      <div class="container">

        <!-- Encabezado y barra de búsqueda -->
        <div class="header-container m-10">
          <h2>Lista de Subcategorías</h2>
          <!-- Input de búsqueda con enlace bidireccional al modelo 'busqueda' -->
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar Subcategoría..."
            class="w-full mb2 rounded-md py-1 border text-sm outline-[#f84525]"
          />

          <div class="area-boton">
            <!-- Aquí podrían ir botones adicionales si son necesarios -->
          </div>

          <!-- Tabla para listar las subcategorías -->
          <div class="table-container">
            <table class="user-table">
              <thead>
                <tr>
                  <th class="categoria">Categoría</th>
                  <th>Subcategoría</th>
                  <th class="acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <!-- Mostrar un mensaje cuando no hay subcategorías -->
                <tr v-if="subCategoriasFiltradas.length === 0">
                  <td colspan="3">No se encontraron categorías</td>
                </tr>
                <!-- Ciclo para mostrar las subcategorías paginadas -->
                <tr v-for="subcategoria in subcategoriasPaginadas" :key="subcategoria.id">
                  <td>{{ subcategoria.categoria }}</td>
                  <td>{{ subcategoria.nombre }}</td>
                  <td>
                    <!-- Botón para abrir el formulario de edición -->
                    <button @click="abrirFormularioEditar(subcategoria)" class="m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none">
                      <div class="i-material-symbols-edit"></div>
                    </button>
                    <!-- Botón para eliminar una subcategoría -->
                    <button @click="eliminarSubcategoria(subcategoria.id)" class="m-2px w-15 cursor-pointer py-1.5 px-5.5 bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 focus:bg-red-800 focus:outline-none">
                      <div class="i-material-symbols-delete"></div>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Botón para agregar una nueva subcategoría -->
            <div class="agregar-area">
              <button @click="agregarSubcategoria" class="btn-agregar-sub-categoria">
                Agregar Subcategoría
              </button>
            </div>
          </div>

          <!-- Paginación -->
          <div class="pagination">
            <!-- Botón para ir a la página anterior -->
            <button
              @click="cambiarPagina(paginaActual - 1)"
              :disabled="paginaActual === 1"
            >
              <div class="i-material-symbols:navigate-before w-1.2rem h-1.2rem"></div>
            </button>
            <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
            <!-- Botón para ir a la página siguiente -->
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
      <!-- Botón para cerrar el modal -->
      <span @click="cancelarEdicion" class="close">&times;</span>

      <!-- Selector de categoría -->
      <label>Categoría:</label>
      <select v-model="subcategoriaEditando.idCategoria" class="input-field">
        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
          {{ categoria.nombre }}
        </option>
      </select>

      <!-- Input para editar el nombre de la subcategoría -->
      <label>Subcategoría:</label>
      <input v-model="subcategoriaEditando.nombre" placeholder="Nombre de la Subcategoría" class="input-field" />

      <!-- Botones para guardar cambios o cancelar -->
      <div class="botones-modal">
        <button @click="actualizarSubcategoria(subcategoriaEditando.id)" class="button-primary">
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

.container {
  margin: 2px;
}

.area-boton {
  position: relative;
  margin-right: 2%;
}
.agregar-area{
  display: flex;
  justify-content: center;
}


.btn-agregar-sub-categoria {
  padding: 8px 12px;
  margin-top: 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}
.btn-agregar-sub-categoria:hover {
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
