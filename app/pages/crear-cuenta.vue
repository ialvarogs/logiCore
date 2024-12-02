<script lang="ts" setup>
  // Importación de los hooks de Vue
  import { ref, onMounted } from 'vue';

  // Definir metadatos de la página, indicando que no requiere autenticación
  definePageMeta({
    auth: false
  })

  // Uso de la sesión del usuario
  const { fetch } = useUserSession();

  // Definición del formulario como referencia reactiva
  const formulario = ref({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    idEstadoUsuario: '',
    idRol: ''
  });

  // Definir metadatos de la página, indicando que solo los administradores pueden acceder
  definePageMeta({
    auth: ['Administrador']
  })

  // Definición de las variables reactivas para almacenar los estados y roles
  const estados = ref([]); // Para almacenar los estados obtenidos desde la API
  const roles = ref([]);   // Para almacenar los roles obtenidos desde la API

  // Función para obtener los estados desde la API
  async function obtenerEstados() {
    try {
      const response = await $fetch('/api/estados');
      estados.value = response; // Asignar los estados obtenidos a la variable reactiva
    } catch (error) {
      console.error("Error al obtener estados:", error.message); // Manejo de errores
    }
  }

  // Función para obtener los roles desde la API
  async function obtenerRoles() {
    try {
      const response = await $fetch('/api/roles');
      roles.value = response; // Asignar los roles obtenidos a la variable reactiva
    } catch (error) {
      console.error("Error al obtener roles:", error.message); // Manejo de errores
    }
  }

  // Función para crear una nueva cuenta de usuario
  async function crearCuenta() {
    try {
      const nuevoUsuario = await $fetch('/api/usuarios', {
        body: formulario.value, // Enviar los datos del formulario al servidor
        method: 'POST' // Usar el método POST para crear el nuevo usuario
      });
      
      // Si el usuario fue creado con éxito, proceder con la siguiente acción
      if (nuevoUsuario) {
        await despuesDeCrearCuenta();
      }
    } catch (error) {
      console.error("Error en la creación de cuenta:", error.message); // Manejo de errores
    }
  }

  // Función que se ejecuta después de crear la cuenta de usuario
  async function despuesDeCrearCuenta(usuario) {
    await fetch(); // Actualizar la sesión del usuario
    await navigateTo('/editar-usuario'); // Redirigir al formulario de edición de usuario
  }

  // Usar onMounted para obtener los estados y roles al montar el componente
  onMounted(async () => {
    await obtenerEstados();
    await obtenerRoles();
  });
</script>

<template>
  <!-- Componente de encabezado de la página -->
  <Header></Header>

  <!-- Contenedor del formulario, con estilos para centrar y dar formato -->
  <div class="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-18">
    
    <!-- Título del formulario -->
    <h2 class="text-md font-semibold text-center text-gray-800 mb-4">Crear Cuenta</h2>
    
    <!-- Formulario para la creación de cuenta -->
    <form @submit.prevent="crearCuenta" class="space-y-4">
      
      <!-- Campo para el nombre del usuario -->
      <div class="form-group">
        <label for="nombre" class="px-50px block text-sm font-medium text-gray-700">Nombre:</label>
        <input 
          type="text" 
          v-model="formulario.nombre" 
          id="nombre" 
          required 
          class="w-65% mx-10% bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        />
      </div>

      <!-- Campo para el apellido del usuario -->
      <div class="form-group">
        <label for="apellido" class="px-50px block text-sm font-medium text-gray-700">Apellido:</label>
        <input 
          type="text" 
          v-model="formulario.apellido" 
          id="apellido" 
          required 
          class="w-65% mx-10% bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        />
      </div>

      <!-- Campo para la contraseña del usuario -->
      <div class="form-group">
        <label for="contrasena" class="px-50px block text-sm font-medium text-gray-700">Contraseña:</label>
        <input 
          type="password" 
          v-model="formulario.contrasena" 
          id="contrasena" 
          required 
          class="w-65% mx-10% bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        />
      </div>

      <!-- Campo para el email del usuario -->
      <div class="form-group">
        <label for="email" class="px-50px block text-sm font-medium text-gray-700">Email:</label>
        <input 
          type="email" 
          v-model="formulario.email" 
          id="email" 
          required 
          class="w-65% mx-10% bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        />
      </div>

      <!-- Selección de estado del usuario -->
      <div class="form-group">
        <label for="idEstadoUsuario" class="px-50px block text-sm font-medium text-gray-700">Estado:</label>
        <select 
          v-model="formulario.idEstadoUsuario" 
          id="idEstadoUsuario" 
          required 
          class="w-70% mx-10% bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        >
          <!-- Opción predeterminada -->
          <option value="" disabled>Seleccione un estado</option>
          <!-- Iteración sobre los estados obtenidos para mostrarlos como opciones -->
          <option v-for="estado in estados" :key="estado.idEstadoUsuario" :value="estado.idEstadoUsuario">
            {{ estado.estado }}
          </option>
        </select>
      </div>

      <!-- Selección del rol del usuario -->
      <div class="form-group">
        <label for="idRol" class="px-50px block text-sm font-medium text-gray-700">Rol:</label>
        <select 
          v-model="formulario.idRol" 
          id="idRol" 
          required 
          class="w-70% mx-10% bg-transparent border border-slate-200 text-gray-700 text-sm rounded-md px-3 py-1 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        >
          <!-- Opción predeterminada -->
          <option value="" disabled>Seleccione un rol</option>
          <!-- Iteración sobre los roles obtenidos para mostrarlos como opciones -->
          <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">
            {{ rol.nombreRol }}
          </option>
        </select>
      </div>

      <!-- Botón para enviar el formulario -->
      <button 
        type="submit"  
        class="px-50px m-25% inline-block items-center py-1.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-red-600 focus:bg-red-700 focus:outline-none"
      >
        Crear Cuenta
      </button>
    </form>
  </div>
</template>




