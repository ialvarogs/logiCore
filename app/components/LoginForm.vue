<template>
  <!-- Contenedor principal para el formulario de inicio de sesión -->
  <div class="font-sans text-gray-900 antialiased">
    <!-- Se ajusta para el centro de la pantalla, tanto horizontal como verticalmente -->
    <div class="flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <!-- Contenedor del formulario con estilos predeterminados -->
      <div class="w-full sm:max-w-sm mt-50 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <!-- Formulario de inicio de sesión que se envía al ser enviado con @submit.prevent -->
        <form @submit.prevent="login">
          <!-- Encabezado del formulario -->
          <div class="py-3">
            <span class="text-2xl font-semibold">Iniciar Sesión</span>
          </div>

          <!-- Campo para el correo electrónico del usuario -->
          <div>
            <label class="block text-sm font-medium text-slate-700" for="email">Ingrese su Email:</label>
            <div class="w-full max-w-sm min-w-[200px]">
              <input 
                v-model="formulario.email" 
                type="email" 
                placeholder="Email" 
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-0.5 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                required
              />
            </div>
          </div>

          <!-- Campo para la contraseña del usuario -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-slate-700" for="password">Ingrese su Contraseña:</label>
            <div class="w-full max-w-sm min-w-[200px]">
              <input 
                v-model="formulario.contrasena" 
                type="password" 
                placeholder="Contraseña" 
                required 
                autocomplete="current-password" 
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-0.5 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
            </div>
          </div>

          <!-- Botón de enviar para el formulario -->
          <button 
            type="submit" 
            class="mt-4 cursor-pointer inline-flex items-center px-3 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Ingresar
          </button>
          
          <!-- Muestra un mensaje de error si `error` tiene un valor -->
          <div v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Define metadatos de la página, en este caso, sin autenticación requerida
  definePageMeta({
    auth: false
  })

  // Estado de los campos del formulario
  const formulario = ref({
    email: '',
    contrasena: ''
  });

  const { fetch } = useUserSession(); // Hook para manejar sesiones del usuario

  const error = ref(""); // Estado para manejar errores

  // Función para manejar el inicio de sesión
  async function login() {
  error.value = ""; // Reinicia el estado de error antes de intentar iniciar sesión
  try {

    // Llamada a la API para hacer login
    const response = await $fetch("/api/auth/login", {
      body: formulario.value, // Envía los datos del formulario
      method: "POST"
    });

    // Si la respuesta es exitosa, manejamos la sesión y redirigimos
    if (response) {
      await fetch();
      await navigateTo('/productos');
    }
  } catch (err: any) {
    // Verifica si el error tiene una respuesta estructurada
    if (err && err.response) {
      // Si la respuesta contiene un mensaje de error, lo mostramos
      error.value = err.response.data?.message || "Usuario y/o contraseña incorrecto(s)";
    } else if (err && err.message) {
      // Si el error tiene un mensaje, lo mostramos
      error.value = err.message;
    } else {
      // En caso de que el error no tenga ninguna propiedad `message` o `response`
      error.value = "Ocurrió un error inesperado";
    }
    console.error("Error en login:", err);
  }
}


</script>