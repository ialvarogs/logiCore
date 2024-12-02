<template>
  <!-- Cabecera del componente -->
  <Header></Header>

  <!-- Contenedor principal para el formulario -->
  <div class="font-sans text-gray-900 antialiased">
    <div class="flex flex-col sm:justify-center items-center pt-10 sm:pt-15">
      <!-- Caja con el formulario -->
      <div class="w-full sm:max-w-md mt-3 px-6 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
        
        <!-- Sección para mostrar las etiquetas del checkbox y su valor -->
        <div class="container flex mx-27% my-10px">

          <!-- Etiqueta para 'Producto' -->
          <label for="checkboxInput" class="leftLabel font-bold">Producto</label>
          
          <!-- Caja del checkbox con su etiqueta -->
          <div class="checkboxWrapper">
            <input type="checkbox" id="checkboxInput" v-model="checkbox">
            <label for="checkboxInput" class="toggleSwitch"></label>
          </div>
          
          <!-- Etiqueta para 'Stock' -->
          <label for="checkboxInput" class="rightLabel font-bold">Stock</label>
        </div>

        <!-- Títulos que cambian si hay stock o no -->
        <h1 v-if="!stock" class="text-lg font-semibold" id="btn1">Agregar nuevo Producto</h1>
        <h1 v-else class="text-lg font-semibold" id="btn2">Agregar stock de un Producto</h1>
        
        <!-- Formulario de agregar producto o stock -->
        <form @submit.prevent="agregarProducto">
          
          <!-- Sección para ingresar la individualización del bien (producto) -->
          <div class="py-2">
            
            <!-- Mostrar este campo si estamos agregando stock -->
            <label v-if="stock" class="block font-medium text-sm text-gray-700" for="producto">Producto
              <select
                v-model="producto.individualizacionDelBien"
                id="producto"
                class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              >
                <option
                  v-for="producto in productosSelect"
                  :value="producto.individualizacionDelBien"
                >
                  {{ producto.individualizacionDelBien }}
                </option>
              </select>
            </label>

            <!-- Mostrar este campo si no estamos agregando stock -->
            <label v-if="!stock" class="block font-medium text-sm text-gray-700" for="individualizacion">
              Individualización del Bien:
              <input
                type="text"
                v-model="producto.individualizacionDelBien"
                class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
                required
              />
            </label>
          </div>
          
          <!-- Sección para ingresar la cantidad del producto -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="cantidad">
              Cantidad:
            </label>
            <input
              type="number"
              v-model="producto.cantidad"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
              min="1"
            />
          </div>

          <!-- Sección para ingresar la fecha de adquisición del producto -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="fechaAdquisicion">
              Fecha de Adquisición:
            </label>
            <input
              type="date"
              v-model="producto.fechaAdquisicion"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
            />
          </div>

          <!-- Sección para seleccionar la procedencia del producto -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="procedencia">
              Procedencia:
            </label>
            <select
              v-model="producto.idProcedencia"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            >
              <option value="" disabled>Selecciona una procedencia</option>
              <option v-for="procedencia in procedencias" :key="procedencia.idProcedencia" :value="procedencia.id">
                {{ procedencia.procedencia }}
              </option>
            </select>
          </div>

          <!-- Sección para seleccionar el estado del producto -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="estado">
              Estado:
            </label>
            <select
              v-model="producto.idEstado"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            >
              <option value="" disabled>Selecciona un estado</option>
              <option v-for="estado in estados" :key="estado.idEstado" :value="estado.id">
                {{ estado.estado }}
              </option>
            </select>
          </div>

          <!-- Subcategoría, solo visible cuando no estamos agregando stock -->
          <div class="py-2" v-if="!stock">
            <label class="block font-medium text-sm text-gray-700" for="subcategoria">
              Subcategoría:
            </label>
            <select
              v-model="producto.idSubcategoria"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]"
              required
            >
              <option value="" disabled>Selecciona una subcategoría</option>
              <option v-for="subcategoria in subcategorias" :key="subcategoria.idSubcategoria" :value="subcategoria.id">
                {{ subcategoria.nombre }}
              </option>
            </select>
          </div>

          <!-- Sección para seleccionar la sala a la que pertenece el producto -->
          <div class="py-2">
            <label class="block font-medium text-sm text-gray-700" for="sala">
              Sala:
            </label>
            <select
              v-model="selectedSala"
              class="w-full rounded-md py-2 border text-sm outline-[#f84525]" required>
              <option value="" disabled selected>Seleccione una sala</option>
              <option v-for="sala in salas" :key="sala.idSalas" :value="sala.id">
                {{ sala.nombre }}
              </option>
            </select>
          </div>

          <!-- Botón para enviar el formulario -->
          <button
            type="submit"
            class="mt-2 cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-800"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  auth: ['Administrador', 'Encargado'] // Define roles authorized to access the page
})

const router = useRouter();
const producto = ref({
  individualizacionDelBien: "",
  cantidad: 1,
  fechaAdquisicion: "",
  idProcedencia: null,
  idEstado: null,
  idSubcategoria: null,
  idUsuarioCreador: null,
  idSalas: [], // Un array para múltiples salas
});

const productosSelect = ref([]); // Lista de productos para selección
const procedencias = ref([]); // Lista de procedencias obtenidas de la API
const estados = ref([]); // Lista de estados de conservación obtenidos de la API
const subcategorias = ref([]); // Lista de subcategorías obtenidas de la API
const salas = ref([]); // Lista de salas obtenidas de la API
const errorMensaje = ref(""); // Mensaje de error para mostrar en caso de fallo
const stock = ref(false); // Indica si se tiene stock
const checkbox = ref(false); // Checkbox para controlar el stock
const { user } = useUserSession() // Obtiene la sesión del usuario

watch(checkbox, async (estadoStock) => { // Observa el cambio del checkbox para controlar el stock
  if (estadoStock){
    return stock.value = true; // Si está marcado, establece stock como true
  }else{
    return stock.value = false; // Si no está marcado, establece stock como false
  }
});

// Funciones para cargar datos de API
const cargarProcedencias = async () => {
  try {
    procedencias.value = await $fetch("/api/procedencia"); // Carga las procedencias desde la API
  } catch (error) {
    console.error("Error al cargar procedencias:", error); // Manejo de errores
  }
}

const cargarEstados = async () => {
  try {
    estados.value = await $fetch("/api/estadoConservacion"); // Carga los estados de conservación desde la API
  } catch (error) {
    console.error("Error al cargar estados:", error); // Manejo de errores
  }
};

const cargarSubcategorias = async () => {
  try {
    subcategorias.value = await $fetch("/api/subCategoria"); // Carga las subcategorías desde la API
  } catch (error) {
    console.error("Error al cargar subcategorías:", error); // Manejo de errores
  }
};

const cargarSalas = async () => {
  try {
    salas.value = await $fetch("/api/salas"); // Carga las salas desde la API
  } catch (error) {
    console.error("Error al cargar salas:", error); // Manejo de errores
  }
};

const selectedSala = ref(null); // Modelo temporal para el select de salas

const agregarProducto = async () => {
  if(stock.value === true){ // Si hay stock
    try {
    const response = await $fetch("/api/productos/agregarStock", { // Llama a la API para agregar producto con stock
      method: "POST",
      body: {
        idUsuarioCreador: user.value.id, // Asigna el ID del usuario creador
        individualizacionDelBien: producto.value.individualizacionDelBien, // Asigna la individualización del bien
        cantidad: producto.value.cantidad, // Asigna la cantidad
        idSalas: selectedSala.value ? [selectedSala.value] : [], // Asigna el ID de la sala seleccionada como un array
        fechaAdquisicion: new Date(producto.value.fechaAdquisicion).toISOString(), // Convierte la fecha de adquisición a formato ISO
        idProcedencia: producto.value.idProcedencia, // Asigna la procedencia del producto
        idEstado: producto.value.idEstado // Asigna el estado del producto
      },
    });
    console.log("Producto agregado:", response); // Muestra en consola la respuesta de la API
    router.push("/productos"); // Redirige a la página de productos
    }catch (error) {
    errorMensaje.value = "Error al agregar producto: " + error.message; // Muestra el mensaje de error
    console.error(errorMensaje.value); // Muestra el error en consola
    }
  }else{ // Si no está seleccionado el checkbox de stock, se agrega un nuevo producto
    try {
    const response = await $fetch("/api/productos", { // Llama a la API para crear un nuevo producto
      method: "POST",
      body: {
        ...producto.value, // Usa todos los datos del producto
        idSalas: selectedSala.value ? [selectedSala.value] : [], // Asigna el ID de la sala seleccionada como un array
        fechaAdquisicion: new Date(producto.value.fechaAdquisicion).toISOString(), // Convierte la fecha de adquisición a formato ISO
        idUsuarioCreador: user.value.id, // Asigna el ID del usuario creador
      },
    });
    console.log("Producto agregado:", response); // Muestra en consola la respuesta de la API
    router.push("/productos"); // Redirige a la página de productos
    }catch (error) {
    errorMensaje.value = "Error al agregar producto: " + error.message; // Muestra el mensaje de error
    console.error(errorMensaje.value); // Muestra el error en consola
    }
  }
  
};

async function cargarProductosParaSelect() {
  try {
    const response = await $fetch("/api/productos/obtenerProductosSelect"); // Obtiene los productos para el select desde la API
    productosSelect.value = response; // Asigna la respuesta al array de productosSelect
  } catch (error) {
    console.error("Error al cargar los productos:", error); // Manejo de errores
  }
}

onMounted(() => { // Se ejecuta cuando el componente es montado
  const storedUser = localStorage.getItem('user'); // Obtiene el usuario almacenado en el localStorage
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser); // Parsea el usuario
    producto.value.idUsuarioCreador = parsedUser.idUsuario; // Asigna el ID del usuario creador
  }
  cargarProcedencias(); // Carga las procedencias
  cargarEstados(); // Carga los estados
  cargarSubcategorias(); // Carga las subcategorías
  cargarSalas(); // Carga las salas
  cargarProductosParaSelect(); // Carga los productos para el select
});

</script>
<style scoped>
.container.flex {
  display: flex;
  align-items: center; /* Alinear verticalmente */
  gap: 10px; /* Espaciado entre elementos */
}

.checkboxWrapper {
  display: flex;
  align-items: center;
}

.leftLabel {
  margin-right: 5px;
}

.rightLabel {
  margin-left: 5px;
}
#checkboxInput {
  display: none;
}

.toggleSwitch {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50px;
  height: 30px;
  background-color: rgb(82, 82, 82);
  border-radius: 20px;
  cursor: pointer;
  transition-duration: .2s;
}

.toggleSwitch::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  left: 5px;
  background-color: transparent;
  border-radius: 50%;
  transition-duration: .2s;
  box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
  border: 5px solid white;
}

#checkboxInput:checked+.toggleSwitch::after {
  transform: translateX(100%);
  transition-duration: .2s;
  background-color: white;
}
/* Switch background change */
#checkboxInput:checked+.toggleSwitch {
  background-color: rgb(236, 89, 52);
  transition-duration: .2s;
}
</style>
