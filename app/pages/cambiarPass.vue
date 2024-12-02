<script setup>
import { ref, onMounted } from "vue"; // Importación de ref y onMounted de Vue para el manejo de estado reactivo y ejecución de código al montar el componente
import { useRoute, useRouter } from "vue-router"; // Importación de useRoute y useRouter para la navegación dentro del router de Vue

const route = useRoute(); // Obtener la ruta actual para acceder a los parámetros de la URL
const router = useRouter(); // Crear un objeto para manejar la navegación dentro del router
const idUsuario = ref(""); // Definir una referencia reactiva para almacenar el ID del usuario
const nuevaContrasena = ref(""); // Definir una referencia reactiva para almacenar la nueva contraseña

// Asignar el ID del usuario desde los parámetros de la query de la URL
onMounted(() => {
  idUsuario.value = route.query.id || ""; // Obtener el ID del usuario desde los parámetros de la query
  if (!idUsuario.value) {
    console.error("ID de usuario no proporcionado"); // Mensaje de error si no se encuentra el ID del usuario
  }
});

definePageMeta({
  auth: ['Administrador'] // Configuración de metadatos para la página, indicando que solo los administradores pueden acceder a esta página
})

// Función asincrónica para cambiar la contraseña
async function cambiarContrasena() {
  try {
    if (!idUsuario.value) {
      throw new Error("ID del usuario no válido"); // Verificar que el ID del usuario sea válido
    }

    // Enviar la solicitud para cambiar la contraseña
    await $fetch("/api/auth/cambiarPass", {
      method: "POST", // Método POST para enviar los datos
      body: {
        idUsuario: idUsuario.value, // Incluir el ID del usuario en el cuerpo de la solicitud
        contrasena: nuevaContrasena.value, // Incluir la nueva contraseña en el cuerpo de la solicitud
      },
    });

    console.log("Contraseña cambiada correctamente"); // Mensaje de éxito en consola
    // Redirigir a la página de editar usuario después del cambio exitoso
    router.push("/editar-usuario");
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error.message); // Capturar y mostrar el error si ocurre
  }
}
</script>

<template>
  <Header></Header>
  
  <!-- Contenedor principal de la página con márgenes y tipografía configurada -->
  <div class="font-sans text-gray-900 antialiased mt-18">
    
    <!-- Contenedor para centrar el formulario -->
    <div class="flex flex-col sm:justify-center items-center pt-3 sm:pt-0">
      
      <!-- Contenedor del formulario de cambio de contraseña -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
        
        <!-- Formulario para cambiar la contraseña -->
        <form @submit.prevent="cambiarContrasena">
          
          <!-- Título de la sección -->
          <div class="py-2">
            <span class="text-2xl font-semibold">Cambiar Contraseña</span>
          </div>
          
          <!-- Campo para ingresar la nueva contraseña -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="newPassword">
              Ingrese su nueva contraseña:
            </label>
            <input
              v-model="nuevaContrasena"
              type="password"
              placeholder="Nueva Contraseña"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Botón para enviar el formulario y cambiar la contraseña -->
          <button
            type="submit"
            class="mt-2 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.cambiar-contrasena-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn-cambiar {
  background-color: #f84525;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cambiar:hover {
  background-color: #c73520;
}
</style>
