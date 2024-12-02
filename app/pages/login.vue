<template>
  <!-- Contenedor principal que incluye el formulario de login -->
  <div>
    <!-- Componente LoginForm, que representa el formulario de inicio de sesión -->
    <LoginForm/>
  </div>
</template>

<script setup lang="ts">
  // Importación del componente LoginForm desde la ruta especificada
  import LoginForm from '@/components/LoginForm.vue';
</script>