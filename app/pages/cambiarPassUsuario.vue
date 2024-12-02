<script lang="ts" setup>
// Importación de librerías y funciones necesarias
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";  // Para redirigir a otra página después de cambiar la contraseña

// Definición de variables reactivas
const router = useRouter();
const contrasenaActual = ref("");  // Almacena la contraseña actual del usuario
const nuevaContrasena = ref("");   // Almacena la nueva contraseña
const confirmarNuevaContrasena = ref("");  // Almacena la confirmación de la nueva contraseña
const errorMensaje = ref("");  // Mensaje de error si ocurre algún problema

// Definición de la metadata de la página
definePageMeta({
  auth: ['Administrador', 'Encargado', 'Docente']  // Definir roles de usuario permitidos para acceder a esta página
})

// Obtener la sesión del usuario
const { user } = useUserSession();  // Obtener información del usuario actual

// Función para cambiar la contraseña
async function cambiarContrasena() {
  try {
    errorMensaje.value = "";  // Limpiar mensaje de error antes de intentar cambiar la contraseña

    // Validación de que las nuevas contraseñas coincidan
    if (nuevaContrasena.value !== confirmarNuevaContrasena.value) {
      throw new Error("La nueva contraseña y su confirmación no coinciden.");
    }

    // Enviar solicitud para cambiar la contraseña
    await $fetch("/api/usuarios/cambiarPassUsuario", {
      method: "POST",  // Método POST para enviar los datos
      body: {
        usuarioId: user.value.id,  // ID del usuario que está cambiando la contraseña
        contrasenaActual: contrasenaActual.value,  // Contraseña actual del usuario
        nuevaContrasena: nuevaContrasena.value,  // Nueva contraseña
        confirmarNuevaContrasena: confirmarNuevaContrasena.value,  // Confirmación de la nueva contraseña
      },
    });

    console.log("Contraseña cambiada correctamente");  // Mensaje de éxito en consola
    router.push("/editar-usuario");  // Redirigir al usuario a la página de edición de usuario tras el cambio exitoso
  } catch (error: any) {
    errorMensaje.value = error.message;  // Si hay error, mostrar el mensaje de error
    console.error("Error al cambiar la contraseña:", error.message);  // Registrar el error en la consola
  }
}
</script>

<template>
  <Header></Header> <!-- Componente de encabezado -->

  <div>
    <h1>a</h1> <!-- Título de prueba, se puede eliminar o modificar según sea necesario -->
  </div>

  <!-- Contenedor principal con clases de estilo para diseño -->
  <div class="font-sans text-gray-900 antialiased ">
    <div class="flex flex-col sm:justify-center items-center pt-3 sm:pt-0">
      <!-- Formulario dentro de un contenedor con bordes redondeados y sombra -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <!-- Formulario para cambiar la contraseña -->
        <form @submit.prevent="cambiarContrasena">
          <div class="py-2">
            <span class="text-2xl font-semibold">Cambiar Contraseña</span>
          </div>

          <!-- Entrada para la contraseña actual -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="currentPassword">
              Ingrese su contraseña actual:
            </label>
            <input
              v-model="contrasenaActual"
              type="password"
              placeholder="Contraseña Actual"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Entrada para la nueva contraseña -->
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

          <!-- Entrada para confirmar la nueva contraseña -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="confirmPassword">
              Confirme su nueva contraseña:
            </label>
            <input
              v-model="confirmarNuevaContrasena"
              type="password"
              placeholder="Confirmar Nueva Contraseña"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            />
          </div>

          <!-- Mensaje de error en caso de que ocurra un problema -->
          <p v-if="errorMensaje" class="text-red-500">{{ errorMensaje }}</p>

          <!-- Botón de envío para cambiar la contraseña -->
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