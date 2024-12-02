<template>
  <!-- Componente de encabezado -->
  <Header></Header>

  <div class="flex flex-col sm:justify-center items-center sm:p-2">
    <div class="m-20 bg-white shadow-2xl overflow-hidden sm:rounded-lg">  
      <div class="container">
        <div class="header-container m-5"></div>
        <!-- Título de la página -->
        <h2>Lista de Usuarios</h2>
      </div>

      <div class="table-container">  
        <!-- Tabla de usuarios -->
        <table class="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Rol</th>
              <th class="acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Recorre cada usuario y muestra sus datos en filas -->
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td>{{ usuario.nombre }}</td>
              <td>{{ usuario.apellido }}</td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.estado }}</td>
              <td>{{ usuario.rol}}</td>
              <td>
                <!-- Botón para editar usuario -->
                <button @click="openEditForm(usuario)" class="m-2px w-25 cursor-pointer py-1.5 px-2.5 bg-[#f84525] border border-transparent rounded-md font-semibold text-white hover:bg-[#f84525] focus:bg-[#c7381f] focus:outline-none">
                  Editar
                </button>
                <!-- Botón para redirigir a la página de cambio de contraseña -->
                <button @click="redirigirACambiarContrasena(usuario.id)" class="m-2px w-25 cursor-pointer py-1.5 px-2.5 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:bg-blue-800 focus:outline-none">
                  Cambiar Contraseña
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para edición de usuario -->
    <div v-if="usuarioEditando" class="modal">
      <div class="modal-content">
        <!-- Botón para cerrar el modal -->
        <span class="close" @click="cancelarEdicion">&times;</span>

        <!-- Campos para editar los datos del usuario -->
        <label>Nombre:</label>
        <input v-model="usuarioEditando.nombre" placeholder="Nombre" class="input-field"/>

        <label>Apellido:</label>
        <input v-model="usuarioEditando.apellido" placeholder="Apellido" class="input-field" />

        <label>Email:</label>
        <input v-model="usuarioEditando.email" placeholder="Email" class="input-field"/>

        <label>Estado:</label>
        <!-- Selección del estado del usuario -->
        <select v-model="usuarioEditando.idEstadoUsuario" class="input-field">
          <option v-for="estado in estados" :key="estado.idEstadoUsuario" :value="estado.idEstadoUsuario">
            {{ estado.estado }}
          </option>
        </select>

        <label>Rol:</label>
        <!-- Selección del rol del usuario -->
        <select v-model="usuarioEditando.idRol" class="input-field">
          <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">
            {{ rol.nombreRol }}
          </option>
        </select>

        <div class="botones-modal">
          <!-- Botón para guardar los cambios del usuario -->
          <button @click="actualizarUsuario(usuarioEditando.id)" class="button-primary">
            Guardar
          </button>
          <!-- Botón para cancelar la edición -->
          <button @click="cancelarEdicion" class="button-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  auth: ['Administrador', 'Encargado']  // Define roles autorizados para acceder a la página
})

// Función personalizada para realizar solicitudes HTTP
async function myfetch(url, options = {}) {
  const response = await fetch(url, options);  // Realiza la solicitud HTTP
  if (!response.ok) {  // Si la respuesta no es exitosa, lanza un error
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();  // Devuelve la respuesta en formato JSON
}

export default {
  data() {
    return {
      usuarios: [],  // Array para almacenar los usuarios obtenidos
      estados: [],  // Array para almacenar los estados disponibles
      roles: [],  // Array para almacenar los roles disponibles
      usuarioEditando: null,  // Objeto para almacenar el usuario que está siendo editado
    };
  },
  async mounted() {
    await this.obtenerUsuarios();  // Obtiene los usuarios al montar el componente
    await this.obtenerEstados();  // Obtiene los estados disponibles al montar el componente
    await this.obtenerRoles();  // Obtiene los roles disponibles al montar el componente
  },
  methods: {
    // Función para obtener los usuarios
    async obtenerUsuarios() {
      try {
        const result = await myfetch("/api/usuarios");  // Llama al API para obtener usuarios
        console.log("Usuarios obtenidos:", result);  // Imprime en consola los usuarios obtenidos
        this.usuarios = result;  // Asigna los usuarios obtenidos al array `usuarios`
      } catch (error) {
        console.error("Error al obtener usuarios:", error.message);  // Muestra el error en consola si ocurre
      }
    },

    // Función para obtener los estados
    async obtenerEstados() {
      try {
        const result = await myfetch("/api/estados");  // Llama al API para obtener estados
        console.log("Estados obtenidos:", result);  // Imprime en consola los estados obtenidos
        this.estados = result;  // Asigna los estados obtenidos al array `estados`
      } catch (error) {
        console.error("Error al obtener estados:", error.message);  // Muestra el error en consola si ocurre
      }
    },

    // Función para obtener los roles
    async obtenerRoles() {
      try {
        const result = await myfetch("/api/roles");  // Llama al API para obtener roles
        console.log("Roles obtenidos:", result);  // Imprime en consola los roles obtenidos
        this.roles = result;  // Asigna los roles obtenidos al array `roles`
      } catch (error) {
        console.error("Error al obtener roles:", error.message);  // Muestra el error en consola si ocurre
      }
    },

    // Función para abrir el formulario de edición de un usuario
    openEditForm(usuario) {
      this.usuarioEditando = { ...usuario };  // Crea una copia del usuario para editarlo sin afectar el original
    },

    // Función para redirigir a la página de cambio de contraseña
    redirigirACambiarContrasena(userId) {
      this.$router.push({  // Redirige a la página de cambio de contraseña con el ID del usuario
        path: "/cambiarPass", 
        query: { id: userId } 
      });
    },

    // Función para actualizar los datos de un usuario
    async actualizarUsuario(id) {
      try {
        // Prepara los datos del usuario a enviar
        const datosUsuario = {
          nombre: this.usuarioEditando.nombre,
          apellido: this.usuarioEditando.apellido,
          email: this.usuarioEditando.email,
          idEstadoUsuario: this.usuarioEditando.idEstadoUsuario,
          idRol: this.usuarioEditando.idRol,
        };
        await myfetch(`/api/usuarios/${id}`, {  // Realiza la solicitud PATCH para actualizar el usuario
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",  // Establece el encabezado para contenido JSON
          },
          body: JSON.stringify(datosUsuario),  // Convierte los datos del usuario a formato JSON
        });
        this.usuarioEditando = null;  // Resetea el objeto de usuario en edición
        await this.obtenerUsuarios();  // Vuelve a obtener los usuarios actualizados
      } catch (error) {
        console.error("Error al actualizar usuario:", error.message);  // Muestra el error si ocurre
      }
    },

    // Función para cancelar la edición de un usuario
    cancelarEdicion() {
      this.usuarioEditando = null;  // Resetea el objeto de usuario en edición
    },
  },
};
</script>

  

  <style scoped>
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  .table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.user-table {
  width: 100%; /* Ajusta el ancho de la tabla */
  border-collapse: collapse;
  margin: 5%; /* Centra la tabla */
}

.user-table th,
.user-table td {
  padding: 5px;
  border: 1px solid #eaeaea;
  text-align: center;
}

.user-table th {
  background-color: #f5f5f5;
}

h2 {
  text-align: center;
}

.container {
  padding: 2px;
}
  
  
  
  
  .agregar-area{
    display: flex;
    justify-content: center;
  }
  
  .btn-agregar-categoria {
    padding: 8px 12px;
    margin-top: 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-agregar-categoria:hover {
    background-color: #218838;
  }
  
  
  /* Estilos para la paginacion */
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination span{
    margin-top: 7px;
    margin-left: 7px;
    margin-right: 7px;
  }
  .pagination button {
    padding: 8px 10px;
    margin: 0 5px;
    background-color: #333333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  /* Estilos para el modal */
  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    width: 210px; /* Ajusta el ancho según sea necesario */
    position: relative;
    text-align: center;
  }
  
  .close {
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 30px;
    cursor: pointer;
  }
  
  .button-primary {
    margin: 8px;
    background-color: green;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button-primary:hover {
    background-color: rgb(3, 99, 3);
  }
  
  .button-secondary {
    margin: 8px;
    background-color: gray;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button-secondary:hover {
    background-color: darkgray;
  }
  
  .input-field {
    width: 80%;
    padding: 8px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>