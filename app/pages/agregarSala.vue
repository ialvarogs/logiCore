<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const nombreSala = ref(""); // Variable para el nombre de la sala
const numeroSala = ref(""); // Variable para el número de la sala
const capacidad = ref(""); // Variable para la capacidad de la sala
const idNivel = ref(""); // Variable para el nivel educativo seleccionado
const nivelesEducativos = ref([]); // Array para almacenar los niveles educativos
const errorMensaje = ref(""); // Variable para almacenar el mensaje de error

definePageMeta({
  auth: ['Administrador', 'Encargado']
})

// Función para cargar los niveles educativos desde la API
const cargarNivelesEducativos = async () => {
  try {
    const response = await $fetch("/api/nivelEducativo"); // URL de la API para obtener niveles educativos
    nivelesEducativos.value = response; // Asigna los datos obtenidos a la variable nivelesEducativos
  } catch (error) {
    console.error("Error al cargar los niveles educativos:", error);
  }
};

// Carga los niveles educativos al montar el componente
onMounted(() => {
  cargarNivelesEducativos();
});

// Función para agregar la sala
async function agregarSala() {
  try {
    errorMensaje.value = ""; // Reiniciar mensaje de error

    // Enviar la solicitud para agregar la sala
    const response = await $fetch("/api/salas", { // URL de la API para agregar la sala
      method: "POST",
      body: {
        nombreSala: nombreSala.value, // Datos a enviar
        numeroSala: numeroSala.value,
        capacidad: capacidad.value,
        idNivel: idNivel.value,
      },
    });

    // Si la respuesta es exitosa, redirigir o mostrar un mensaje
    console.log("Sala agregada:", response);
    router.push("/salas"); // Redirigir a la lista de salas tras la inserción
  } catch (error) {
    errorMensaje.value = error.message; // Guardar el mensaje de error
    console.error("Error al agregar la sala:", error.message);
  }
}
</script>

<template>
  <!-- Encabezado de la página -->
  <Header></Header>

  <!-- Contenedor principal con clases de estilo para la tipografía y color de fondo -->
  <div class="font-sans text-gray-900 antialiased">
    <div class="flex flex-col sm:justify-center items-center pt-50 sm:pt-50">
      
      <!-- Contenedor para el formulario de agregar sala con estilo -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">

        <!-- Formulario que ejecuta la función agregarSala al enviar -->
        <form @submit.prevent="agregarSala">
          
          <!-- Título de la sección -->
          <span class="text-2xl font-semibold">Agregar Sala</span>

          <!-- Campo para ingresar el nombre de la sala -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="nombreSala">
              Nombre de la Sala:
            </label>
            <!-- Campo de entrada para el nombre de la sala con enlace bidireccional -->
            <input
              v-model="nombreSala"
              type="text"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Campo para ingresar el número de la sala -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="numeroSala">
              Número de Sala:
            </label>
            <!-- Campo de entrada para el número de la sala con enlace bidireccional -->
            <input
              v-model="numeroSala"
              type="text"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Campo para ingresar la capacidad de la sala -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="capacidad">
              Capacidad:
            </label>
            <!-- Campo de entrada para la capacidad de la sala con enlace bidireccional -->
            <input
              v-model="capacidad"
              type="number"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Campo de selección para elegir el nivel educativo -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="idNivel">
              Nivel Educativo:
            </label>
            <!-- Menú desplegable para seleccionar el nivel educativo -->
            <select
              v-model="idNivel"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            >
              <!-- Opción deshabilitada por defecto -->
              <option disabled value="">Seleccione un Nivel Educativo</option>

              <!-- Opciones dinámicas generadas a partir del array 'nivelesEducativos' -->
              <option v-for="nivel in nivelesEducativos" :key="nivel.id" :value="nivel.id">
                {{ nivel.nombre }}
              </option>
            </select>
          </div>

          <!-- Mensaje de error que aparece si hay algún error al agregar la sala -->
          <p v-if="errorMensaje" class="text-red-500">{{ errorMensaje }}</p>

          <!-- Botón de envío para agregar la sala -->
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
