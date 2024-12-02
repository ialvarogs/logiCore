<script setup>
// Importación de funciones reactivas y router desde Vue
import { ref } from "vue";
import { useRouter } from "vue-router";

// Creación de una instancia del router para manejar navegación entre vistas
const router = useRouter();

// Variable reactiva para almacenar el valor de la procedencia que se ingresará
const procedencia = ref("");

// Variable reactiva para mostrar mensajes de error en caso de fallos
const errorMensaje = ref("");

// Definición de metadatos de la página, especificando roles con acceso permitido
definePageMeta({
  auth: ['Administrador', 'Encargado'] // Sólo administradores y encargados tienen acceso
});

// Función asíncrona para manejar la adición de una nueva procedencia
async function agregarProcedencia() {
  try {
    // Reiniciar el mensaje de error antes de ejecutar el intento de envío
    errorMensaje.value = "";

    // Realizar la solicitud POST a la API para agregar la procedencia
    const response = await $fetch("/api/procedencia", { // Ruta de la API que recibe los datos
      method: "POST", // Método HTTP utilizado para crear el nuevo recurso
      body: {
        procedencia: procedencia.value, // Valor de la procedencia enviado en el cuerpo de la solicitud
      },
    });

    // Si la solicitud tiene éxito, mostrar la respuesta en consola para seguimiento
    console.log("Procedencia agregada:", response);

    // Redirigir al usuario a la lista de procedencias tras una inserción exitosa
    router.push("/procedencias");
  } catch (error) {
    // En caso de error, almacenar el mensaje en la variable reactiva de errores
    errorMensaje.value = error.message;

    // Registrar el error en consola para facilitar la depuración
    console.error("Error al agregar la procedencia:", error.message);
  }
}
</script>

<template>
  <!-- Componente de encabezado -->
  <Header></Header>

  <!-- Contenedor principal -->
  <div class="font-sans text-gray-900 antialiased">
    <!-- Caja que centra el formulario -->
    <div class="flex flex-col sm:justify-center items-center pt-50 sm:pt-50">
      <!-- Tarjeta donde se encuentra el formulario -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <!-- Formulario para agregar la procedencia -->
        <form @submit.prevent="agregarProcedencia">
          <div class="py-2">
            <span class="text-2xl font-semibold">Agregar Procedencia</span>
          </div>

          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="procedencia">
              Nombre Procedencia:
            </label>
            <input
              v-model="procedencia"
              type="text"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Mensaje de error mostrado en caso de fallos -->
          <p v-if="errorMensaje" class="text-red-500">{{ errorMensaje }}</p>

          <!-- Botón para enviar el formulario -->
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
