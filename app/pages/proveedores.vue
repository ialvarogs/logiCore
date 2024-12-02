<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Importar useRouter

const router = useRouter(); // Crear una instancia de router
const proveedores = ref([]);
const proveedorEditando = ref(null);
const mostrarModal = ref(false); // Variable para controlar la visibilidad del modal
const elementosPorPagina = 5;
const paginaActual = ref(1);

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Función para cargar la lista de proveedores
const cargarProveedores = async () => {
  try {
    const response = await $fetch("/api/proveedores"); // Ajusta la URL según tu API
    proveedores.value = response; // Asigna los datos obtenidos a la variable proveedores
  } catch (error) {
    console.error("Error al cargar los proveedores:", error);
  }
};

// PAGINACION Calcular las filas para la página actual
const proveedoresPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  return proveedores.value.slice(inicio, inicio + elementosPorPagina);
});

// PAGINACION Calcular el número total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(proveedores.value.length / elementosPorPagina);
});

// PAGINACION Función para cambiar la página
const cambiarPagina = (nuevaPagina) => {
  if (nuevaPagina > 0 && nuevaPagina <= totalPaginas.value) {
    paginaActual.value = nuevaPagina;
  }
};
// Llama a la función para cargar los proveedores al montar el componente
onMounted(() => {
  cargarProveedores();
});

function abrirFormularioEditar(proveedor) {
  proveedorEditando.value = { ...proveedor }; // Cargar los datos del proveedor seleccionado para editar
  mostrarModal.value = true; // Mostrar el modal
}

async function actualizarProveedor(id) {
  try {
    await $fetch(`/api/proveedores/${id}`, {
      method: "PATCH",
      body: {
        proveedor: proveedorEditando.value.nombre,
        email: proveedorEditando.value.email,
        telefono: proveedorEditando.value.telefono,
      },
    });
    console.log(`Proveedor con ID ${id} actualizado correctamente.`);

    // Recargar la lista de proveedores para reflejar los cambios
    cargarProveedores();
    proveedorEditando.value = null; // Limpiar el formulario de edición
    mostrarModal.value = false; // Cerrar el modal
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
  }
}

async function eliminarProveedor(id) {
  try {
    const response = await fetch(`/api/proveedores/${id}`, {
      method: "DELETE", // Método para eliminar
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el proveedor: ${response.statusText}`);
    }

    // Eliminar el proveedor de la lista localmente después de la eliminación exitosa
    proveedores.value = proveedores.value.filter(
      (proveedor) => proveedor.id !== id,
    );
    console.log(`Proveedor con ID ${id} eliminado correctamente.`);
  } catch (error) {
    console.error("Error en la eliminación del proveedor:", error);
  }
}

function cancelarEdicion() {
  proveedorEditando.value = null; // Limpiar el formulario de edición
  mostrarModal.value = false; // Cerrar el modal
}

// Función para navegar a la página de agregar proveedores
function agregarProveedor() {
  router.push({ name: "agregarProveedor" }); // Navegar a la ruta de agregar proveedores
}
</script>

<template>
  <Header></Header>
  <div class="flex  flex-col sm:justify-center items-center sm:p-2">
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">
      <div class="container">
        <div class="header-container  m-10">
          <h2>Lista de Proveedores</h2>
          <div class="area-boton">
            <button @click="agregarProveedor" class="btn-agregar-proveedor">
              Agregar Proveedor
            </button>
          </div>

          <div class="table-container">     
            <table class="user-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="proveedor in proveedoresPaginadas" :key="proveedor.id">
                  <td>{{ proveedor.nombre }}</td>
                  <td>{{ proveedor.email }}</td>
                  <td>{{ proveedor.telefono }}</td>
                  <td>
                    <button
                      @click="abrirFormularioEditar(proveedor)"
                    class=" m-2px w-15 cursor-pointer  py-1.5 px-5.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none"
                    >
                    <div class="i-material-symbols-edit"></div>
                    </button>
                    <button
                      @click="eliminarProveedor(proveedor.id)"
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
    <div v-if="proveedorEditando" class="modal">
      <div class="modal-content">
        <span @click="cancelarEdicion" class="close">&times;</span>
          <label>Nombre:</label>
          <input
            v-model="proveedorEditando.nombre"
            placeholder="Nombre"
            class="input-field"
          />

      <label>Email:</label>
      <input
        v-model="proveedorEditando.email"
        placeholder="Email"
        class="input-field"
      />

      <label>Teléfono:</label>
      <input
        v-model="proveedorEditando.telefono"
        placeholder="Teléfono"
        class="input-field"
      />
      <div class="botones-modal">
      <button @click="actualizarProveedor(proveedorEditando.id)" class="button-primary">
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
