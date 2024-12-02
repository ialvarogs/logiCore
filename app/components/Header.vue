<template>
  <!-- Menú y contenedor que se muestra si el usuario está logueado -->
  <div class="navcontainer" v-if="loggedIn">
    <nav class="navbar">
      <div class="logo">
        <!-- Título y saludo con el nombre del usuario -->
        <a class="cursor-default text-4xl">Inventario </a>
        <a class="text-gray border border-transparent rounded-sm text-sm ">  Hola, {{ user.nombre }}</a>
      </div>

      <ul class="nav-links">
      </ul>

      <!-- Menú desplegable que se activa si 'isMenuOpen' es verdadero -->
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <AuthState v-slot="{ loggedIn, user }">
          <div v-if="loggedIn">
            <!-- Contenido cuando el usuario está logueado (vacío aquí) -->
          </div>
        </AuthState>

        <!-- Menú para el usuario con rol 'Administrador' -->
        <li v-if="user.rol==='Administrador'">
          <a class="cursor-pointer">Administrador</a>
          <ul class="dropdown 2">
            <li><NuxtLink to="/crear-cuenta">Crear Cuenta</NuxtLink></li>
            <li><NuxtLink to="/editar-usuario">Usuarios</NuxtLink></li>
          </ul>
        </li>

        <!-- Enlace para cambiar la contraseña del usuario -->
        <li>
          <NuxtLink to="/cambiarPassUsuario">Contraseña</NuxtLink>
        </li>

        <!-- Menú para el inventario y submenú con enlaces a otras páginas -->
        <li>
          <NuxtLink to="/productos">Inventario</NuxtLink>
          <ul class="dropdown3">
            <li>
              <NuxtLink to="/productos">Ver inventario</NuxtLink>
            </li>
            <!-- Enlaces para alertas y reportes, solo si el rol no es 'Docente' -->
            <li v-if="user.rol!=='Docente'">
              <router-link to="/alertas">Alertas</router-link>
            </li>
            <li v-if="user.rol!=='Docente'">
              <router-link to="/reportes">Reportes</router-link>
            </li>
          </ul>
        </li>

        <!-- Menú con opciones de administración solo si el rol no es 'Docente' -->
        <li v-if="user.rol!=='Docente'">
          <a class="cursor-pointer">Alimentadores</a>
          <ul class="dropdown">
            <li><NuxtLink to="/categorias">Categoría</NuxtLink></li>
            <li><NuxtLink to="/subcategorias">Sub Categoría</NuxtLink></li>
            <li>
              <NuxtLink to="/conservaciones">Estado de Conservación</NuxtLink>
            </li>
            <li><NuxtLink to="/salas">Salas</NuxtLink></li>
            <li>
              <NuxtLink to="/nivelesEducativos">Nivel Educativo</NuxtLink>
            </li>
            <li><NuxtLink to="/procedencias">Procedencia</NuxtLink></li>
            <li><NuxtLink to="/proveedores">Proveedor</NuxtLink></li>
          </ul>
        </li>

        <!-- Botón para cerrar sesión -->
        <li>
          <button
            class="items-center py-0.6 bg-[#f84525] border border-transparent rounded-md text-sm text-white tracking-widest hover:bg-red-500 focus:bg-red-550" @click="logout">
            Cerrar Sesión
          </button>
        </li>
      </ul>

      <!-- Botón de menú para dispositivos móviles que alterna el estado del menú -->
      <div class="menu-toggle" @click="toggleMenu">
        <div class="bar-container">
          <!-- Contenedor con las tres barras del ícono del menú -->
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
  // Obtener los métodos y datos de la sesión del usuario
  const { clear, user, loggedIn } = useUserSession();

  // Función para cerrar sesión y redirigir al inicio
  async function logout() {
    await clear(); // Limpia la sesión del usuario
    navigateTo("/"); // Redirige a la página de inicio
  }

  // Estado reactivo para controlar si el menú está abierto o cerrado
  import { ref } from "vue"; 
  const isMenuOpen = ref(false); // Estado del menú

  // Función para alternar el estado del menú
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value; // Cambia el estado de 'isMenuOpen'
  }
</script>


<style scoped>

* {
    box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}
  
  
  
  
  .navbar {
    
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      top: 0;
      background-color: #333;
      padding: 10px 20px; /* Ajusta según sea necesario */
      position:  fixed; /* Necesario para el dropdown */
  z-index: 3;
      width: 100%; /* Asegura que el navbar ocupe todo el ancho */
  }
  
  .navbar .logo a {
      color: white;
      text-decoration: none;
      border-style: none;
  }
  
  
  .nav-links {
      list-style: none;
      display: flex;
      margin: 0; /* Eliminar margen */
      padding: 0; /* Eliminar padding */
  }
  
  .nav-links li {
      margin: 0 15px;
      position: relative; /* Necesario para el dropdown */
  }
  
  .nav-links a {
      color: rgb(255, 255, 255);
      text-decoration: none;
      font-size: 21px;
  
  }
  
  
  a:hover{
    border-color: rgba(255, 0, 0, 0.89);
  }
  
  
  .menu-toggle {
      display: none; /* Ocultar por defecto */
      cursor: pointer; /* Cambiar el cursor al pasar el puntero */
      align-items: center; /* Centra el contenido del toggle */
  }
  
  .bar-container {
      display: flex;
      flex-direction: column; /* Asegura que las barras se apilen */
      align-items: center; /* Centra las barras */
  }
  
  .menu-toggle .bar {
    height: 3px;
      width: 25px;
      background-color: white;
      margin: 3px 0;
      text-align: center;
      transition: background-color 0.3s;
  }
  .menu-toggle:active .bar {
      background-color: rgba(255, 255, 255, 0.5); /* Color más claro al hacer clic */
  }
  

  
  
  /* Estilos para la lista desplegable */
  .dropdown {
      display: none; /* Ocultar por defecto */
      position: absolute;
      background-color: #333;
      border-radius: 1%;
      min-width: 160px;
      z-index: 3;
      padding: 0; /* Eliminar padding */
      top: 28px; /* Alinea el dropdown justo debajo del navbar */
      right: -20px;
      padding-top: 15%;
      padding-bottom: 15%;
      list-style: none; /* Eliminar viñetas */
  }
  
  .nav-links li:hover .dropdown {
      display: block; /* Mostrar en hover */
  
  }
  
  .dropdown li {
      padding: 5px ; /* Aumentar el padding para más separación */
      text-align: center; /* Centra el texto */
      
  }
  
  .dropdown li a {
      display: block; /* Hacer que el área de clic sea completo */
      color: white; /* Color del texto */
  
      text-decoration: none; 
      padding: 2px 2px; /* Aumenta el padding para un área de clic más grande */
  }
  
  .dropdown li a:hover {
      background-color: #f84525; /* Color de fondo en hover */
      border-radius: 2px ;
  }
  








  .dropdown3 {
      display: none; /* Ocultar por defecto */
      position: absolute;
      background-color: #333;
      border-radius: 1%;
      min-width: 160px;
      z-index: 3;
      padding: 0; /* Eliminar padding */
      top: 28px; /* Alinea el dropdown justo debajo del navbar */
      right: -35px;
      padding-top: 15%;
      padding-bottom: 15%;
      list-style: none; /* Eliminar viñetas */
  }
  
  .nav-links li:hover .dropdown3 {
      display: block; /* Mostrar en hover */
  
  }
  
  .dropdown3 li {
      padding: 5px ; /* Aumentar el padding para más separación */
      text-align: center; /* Centra el texto */
      
  }
  
  .dropdown3 li a {
      display: block; /* Hacer que el área de clic sea completo */
      color: white; /* Color del texto */
  
      text-decoration: none; 
      padding: 2px 2px; /* Aumenta el padding para un área de clic más grande */
  }
  
  .dropdown3 li a:hover {
      background-color: #f84525; /* Color de fondo en hover */
      border-radius: 2px ;
  }
  


  button{
    cursor: pointer; /* Cambiar el cursor al pasar el puntero */
  }
  
  
  /* Estilos para pantallas pequeñas */
  @media (max-width: 1000px) {
      .menu-toggle {
          display: flex; /* Mostrar el menú toggle en pantallas pequeñas */
      }
  
      .nav-links {
          display: none; /* Ocultar por defecto */
          flex-direction: column; /* Asegúrate de que se apilen verticalmente */
          position: absolute; /* Necesario para que se superponga al navbar */
          background-color: #333;
          border-radius: 5px; /* Aumenta el borde redondeado */
          top: 100%; /* Alinea el menú justo debajo del navbar */
          left: 90%; /* Centramos el menú horizontalmente */
          transform: translateX(-60%); /* Compensamos el desplazamiento */
          width: 28%; /* Puedes ajustar el ancho según lo necesites */
          padding: 10px 0; /* Espacio interno vertical */
          text-align: center;
          z-index: 10; /* Asegúrate de que esté por encima de otros elementos */
          /* Agrega un borde transparente */
  
      }
  
      .nav-links.active {
          display: flex; /* Mostrar menú cuando está activo */
  
      }
  
      .nav-links  li{
          margin: 2px 0; /* Aumenta el margen vertical entre los elementos */
  
      }
  
      .nav-links a {
          padding: 10px 20px; /* Añade más padding horizontal */
          display: block; /* Asegura que el área de clic sea completo */
          border-radius: 5px; /* Borde redondeado en los enlaces */
          border-bottom: 2px solid rgba(165, 151, 151, 0.055);
  
      }
  
      .nav-links a:hover {
          background-color: #f84525; /* Fondo en hover */
      }
  
      .dropdown {
          position: absolute; /* Mantiene el dropdown en relación a su padre */
          background-color: #333;
          border-radius: 5px; /* Aumenta el borde redondeado */
          width: 160px; /* Ajusta el ancho según sea necesario */
          z-index: 40;
          left: -140px; /* Mueve el dropdown hacia la izquierda */
          top: 0; /* Alinea el dropdown a la misma altura que el enlace */
          display: none; /* Ocultar por defecto */
          padding: 10px 0; /* Espacio interno vertical */
  
      }
      .dropdown3 {
          position: absolute; /* Mantiene el dropdown en relación a su padre */
          background-color: #333;
          border-radius: 5px; /* Aumenta el borde redondeado */
          width: 160px; /* Ajusta el ancho según sea necesario */
          z-index: 40;
          left: -140px; /* Mueve el dropdown hacia la izquierda */
          top: 0; /* Alinea el dropdown a la misma altura que el enlace */
          display: none; /* Ocultar por defecto */
          padding: 10px 0; /* Espacio interno vertical */
  
      }
  
      li:hover .dropdown {
          display: block; /* Mostrar en hover */
  
      }
      button {
        margin-top: 5px;
      }
  }
  
  </style>