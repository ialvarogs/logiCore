<script setup>
  // Importa ref de Vue para manejar datos reactivos
  import { ref } from "vue";
  
  // Importa useRouter de Vue Router para manejar la navegación
  import { useRouter } from "vue-router";

  // Define la metadata de la página para control de autenticación
  definePageMeta({
    auth: ['Administrador', 'Encargado'] // Requiere que el usuario sea Administrador o Encargado
  });

  // Instancia de router para manejar las redirecciones
  const router = useRouter();

  // Definición de variables reactivas para almacenar datos del proveedor
  const nombreProveedor = ref("");  // Nombre del proveedor
  const emailProveedor = ref("");   // Correo del proveedor
  const telefonoProveedor = ref(""); // Teléfono del proveedor
  const errorMensaje = ref(""); // Mensaje de error (inicialmente vacío)

  // Función asíncrona para agregar un nuevo proveedor
  async function agregarProveedor() {
    try {
      errorMensaje.value = ""; // Reinicia el mensaje de error al inicio de la solicitud

      // Envía una solicitud POST para agregar el proveedor
      const response = await $fetch("/api/proveedores", {
        method: "POST",  // Definimos que es una solicitud POST
        body: {
          nombre: nombreProveedor.value,  // Datos del proveedor a agregar
          email: emailProveedor.value,
          telefono: telefonoProveedor.value,
        },
      });

      // Si la respuesta es exitosa, mostramos un mensaje o redirigimos
      console.log("Proveedor agregado:", response);
      router.push("/proveedores"); // Redirige a la lista de proveedores tras la inserción
    } catch (error) {
      // Si ocurre un error, mostramos el mensaje de error
      errorMensaje.value = error.message; // Actualiza el mensaje de error
      console.error("Error al agregar el proveedor:", error.message); // Muestra el error en consola
    }
  }
</script>

<template>
  <!-- Encabezado de la página -->
  <Header></Header>

  <!-- Contenedor principal con clases de estilo para la tipografía y color de fondo -->
  <div class="font-sans text-gray-900 antialiased">
    <div class="flex flex-col sm:justify-center items-center pt-50 sm:pt-50">
      
      <!-- Contenedor para el formulario de agregar proveedor con estilo -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">

        <!-- Formulario que ejecuta la función agregarProveedor al enviar -->
        <form @submit.prevent="agregarProveedor">

          <!-- Título de la sección -->
          <div class="py-2">
            <span class="text-2xl font-semibold">Agregar Proveedor</span>
          </div>

          <!-- Campo para ingresar el nombre del proveedor -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="nombreProveedor">
              Nombre del Proveedor:
            </label>
            <!-- Campo de entrada para el nombre del proveedor con enlace bidireccional -->
            <input
              v-model="nombreProveedor"
              type="text"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Campo para ingresar el correo del proveedor -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="emailProveedor">
              Email del Proveedor:
            </label>
            <!-- Campo de entrada para el email del proveedor con enlace bidireccional -->
            <input
              v-model="emailProveedor"
              type="email"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Campo para ingresar el teléfono del proveedor -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="telefonoProveedor">
              Teléfono del Proveedor:
            </label>
            <!-- Campo de entrada para el teléfono del proveedor con enlace bidireccional -->
            <input
              v-model="telefonoProveedor"
              type="tel"
              placeholder="Escribir aquí"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Mensaje de error que aparece si hay algún error al agregar el proveedor -->
          <p v-if="errorMensaje" class="text-red-500">{{ errorMensaje }}</p>

          <!-- Botón de envío para agregar el proveedor -->
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