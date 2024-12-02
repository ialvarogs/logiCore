<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const subcategoria = ref(""); // Variable para la subcategoría
const idCategoria = ref(""); // Variable para la ID de la categoría
const categorias = ref([]); // Variable para almacenar las categorías
const errorMensaje = ref(""); // Variable para almacenar el mensaje de error

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Función para cargar las categorías disponibles
const cargarCategorias = async () => {
  try {
    const response = await $fetch("/api/categoria"); // Ajusta la URL según tu API
    categorias.value = response; // Asigna los datos obtenidos a la variable categorias
    console.log("Categorías cargadas:", categorias.value); // Verificar que los datos se han cargado
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
  }
};

// Llama a la función para cargar las categorías al montar el componente
onMounted(() => {
  cargarCategorias();
});

async function agregarSubcategoria() {
  // Función para agregar la subcategoría
  try {
    errorMensaje.value = ""; // Reiniciar mensaje de error

    // Enviar la solicitud para agregar la subcategoría
    const response = await $fetch("/api/subCategoria", {
      // URL de la API para agregar la subcategoría
      method: "POST",
      body: {
        nombreSubcategoria: subcategoria.value, // Datos a enviar
        idCategoria: idCategoria.value, // ID de la categoría
      },
    });

    // Si la respuesta es exitosa, redirigir o mostrar un mensaje
    console.log("Subcategoría agregada:", response);
    router.push("/subcategorias"); // Redirigir a la lista de subcategorías tras la inserción
  } catch (error) {
    errorMensaje.value = error.message; // Guardar el mensaje de error
    console.error("Error al agregar la subcategoría:", error.message);
  }
}
</script>

<template>
  <Header></Header>

  <!-- Contenedor principal de la página -->
  <div class="font-sans text-gray-900 antialiased">
    <div class="flex flex-col sm:justify-center items-center pt-50 sm:pt-50">
      
      <!-- Formulario para agregar una subcategoría -->
      <div class="w-full sm:max-w-md mt-18 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">

        <!-- Formulario que llama a la función agregarSubcategoria al enviar -->
        <form @submit.prevent="agregarSubcategoria">

          <!-- Título de la sección -->
          <div class="py-2">
            <span class="text-2xl font-semibold">Agregar Subcategoría</span>
          </div>

          <!-- Campo para seleccionar la categoría a la que pertenece la subcategoría -->
          <div class="py-2">
            <label
              class="block font-medium text-sm text-gray-700"
              for="idCategoria"
            >
              ID Categoría:
            </label>
            <select
              v-model="idCategoria"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            >
              <!-- Opción por defecto que no permite seleccionar ninguna categoría -->
              <option value="" disabled>Selecciona una categoría</option>

              <!-- Generación dinámica de opciones con las categorías disponibles -->
              <option
                v-for="categoria in categorias"
                :key="categoria.id"
                :value="categoria.id"
              >
                {{ categoria.nombre }}
              </option>
            </select>
          </div>

          <!-- Campo para ingresar el nombre de la subcategoría -->
          <div class="py-2">
            <label
              class="block font-medium text-sm text-gray-700"
              for="subcategoria"
            >
              Nombre de la Subcategoría:
            </label>
            <input
              v-model="subcategoria"
              type="text"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Mensaje de error que aparece si hay algún problema -->
          <p v-if="errorMensaje" class="text-red-500">{{ errorMensaje }}</p>

          <!-- Botón de envío para agregar la subcategoría -->
          <button
            type="submit"
            class="mt-2 cursor-pointer inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
