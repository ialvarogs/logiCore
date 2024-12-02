<template>
  <!-- Utiliza v-cloak para evitar que el contenido se muestre hasta que Vue haya terminado de compilar -->
  <div v-cloak>
    <!-- Transición entre vistas, aplicando una animación de salida e entrada -->
    <transition mode="out-in">
      <div>
        <!-- Componente Header que se muestra solo si hay un usuario -->
        <Header v-if="user"></Header>

        <!-- Si no hay un usuario, se muestra el formulario de inicio de sesión -->
        <div v-if="!user">
          <!-- Componente LoginForm para el inicio de sesión -->
          <LoginForm></LoginForm>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  // Define las metainformaciones de la página, en este caso deshabilita la autenticación
  definePageMeta({
    auth: false
  })
  const { user } = useUserSession();
  // Variables que representan al usuario y al usuario almacenado (sin valor por defecto)
  
  if(user.value){
    navigateTo('/productos');
  }

  // Importación del componente Header para ser usado en la plantilla
  import Header from '@/components/Header.vue';
</script>