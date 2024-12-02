<script setup>
// Importa `ref` de Vue para definir variables reactivas
import { ref } from "vue";
// Importa `useRouter` de Vue Router para manejar la navegación
import { useRouter } from "vue-router";

// Define metadatos de la página, incluyendo restricciones de acceso por roles
definePageMeta({
  auth: ['Administrador', 'Encargado'] // Solo usuarios con estos roles pueden acceder
});

// Obtiene el objeto router para realizar navegaciones programáticas
const router = useRouter();
// Declara una variable reactiva para almacenar el nombre de la categoría
const categoria = ref("");
// Declara una variable reactiva para almacenar mensajes de error
const errorMensaje = ref("");

// Función asíncrona para agregar una nueva categoría
async function agregarCategoria() {
  try {
    // Limpia cualquier mensaje de error previo
    errorMensaje.value = "";

    // Envía una solicitud POST a la API para agregar la categoría
    const response = await $fetch("/api/categoria", { // URL del endpoint de la API
      method: "POST", // Método HTTP para crear datos
      body: {
        nombreCategoria: categoria.value, // Envia el nombre de la categoría como datos del cuerpo
      },
    });

    // Si la solicitud es exitosa, imprime la respuesta en la consola
    console.log("Categoría agregada:", response);
    // Redirige a la página de listado de categorías
    router.push("/categorias");
  } catch (error) {
    // Si ocurre un error, almacena el mensaje en la variable reactiva
    errorMensaje.value = error.message;
    // Imprime el error en la consola para depuración
    console.error("Error al agregar la categoría:", error.message);
  }
}
</script>

<template>
  <!-- Componente de encabezado -->
  <Header></Header>

  <!-- Contenedor principal con estilos -->
  <div class="font-sans text-gray-900 antialiased">
    <!-- Contenedor flexbox centrado vertical y horizontalmente -->
    <div class="flex flex-col sm:justify-center items-center pt-50 sm:pt-50">
      <!-- Caja de formulario con estilos de ancho máximo, margen y sombra -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <!-- Formulario con manejo de envío controlado por Vue -->
        <form @submit.prevent="agregarCategoria">
          <!-- Título del formulario -->
          <div class="py-2">
            <span class="text-2xl font-semibold">Agregar Categoría</span>
          </div>

          <!-- Campo para ingresar el nombre de la categoría -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="categoria">
              Nombre de la Categoría:
            </label>
            <!-- Entrada de texto vinculada a la variable reactiva `categoria` -->
            <input
              v-model="categoria" 
              type="text"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Mensaje de error mostrado si `errorMensaje` tiene contenido -->
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
