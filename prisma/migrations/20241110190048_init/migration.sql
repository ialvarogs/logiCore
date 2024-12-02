-- CreateTable
CREATE TABLE "Proveedor" (
    "idProveedor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proveedor" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductoProveedor" (
    "idProducto" INTEGER NOT NULL,
    "idProveedor" INTEGER NOT NULL,

    PRIMARY KEY ("idProducto", "idProveedor"),
    CONSTRAINT "ProductoProveedor_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto" ("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductoProveedor_idProveedor_fkey" FOREIGN KEY ("idProveedor") REFERENCES "Proveedor" ("idProveedor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Producto" (
    "idProducto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "individualizacionDelBien" TEXT NOT NULL,
    "fechaAdquisicion" DATETIME,
    "idProcedencia" INTEGER NOT NULL,
    "idEstado" INTEGER NOT NULL,
    "idSubcategoria" INTEGER NOT NULL,
    "idUsuarioCreador" INTEGER NOT NULL,
    CONSTRAINT "Producto_idProcedencia_fkey" FOREIGN KEY ("idProcedencia") REFERENCES "Procedencia" ("idProcedencia") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producto_idEstado_fkey" FOREIGN KEY ("idEstado") REFERENCES "EstadoConservacion" ("idEstado") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producto_idSubcategoria_fkey" FOREIGN KEY ("idSubcategoria") REFERENCES "Subcategoria" ("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producto_idUsuarioCreador_fkey" FOREIGN KEY ("idUsuarioCreador") REFERENCES "Usuario" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductoResponsable" (
    "idResponsable" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProducto" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "fechaAsignacion" DATETIME NOT NULL,
    "fechaDevolucion" DATETIME,
    CONSTRAINT "ProductoResponsable_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto" ("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductoResponsable_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductoSala" (
    "idProducto" INTEGER NOT NULL,
    "idSala" INTEGER NOT NULL,
    "fechaAsignacion" DATETIME,
    "fechaDevolucion" DATETIME,

    PRIMARY KEY ("idProducto", "idSala"),
    CONSTRAINT "ProductoSala_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto" ("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductoSala_idSala_fkey" FOREIGN KEY ("idSala") REFERENCES "Sala" ("idSala") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Procedencia" (
    "idProcedencia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "procedencia" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subcategoria" (
    "idSubcategoria" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreSubcategoria" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    CONSTRAINT "Subcategoria_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria" ("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categoria" (
    "idCategoria" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCategoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EstadoConservacion" (
    "idEstado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idEstadoUsuario" INTEGER NOT NULL,
    CONSTRAINT "Usuario_idEstadoUsuario_fkey" FOREIGN KEY ("idEstadoUsuario") REFERENCES "EstadoUsuario" ("idEstadoUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "idUsuario" INTEGER NOT NULL,
    "idRol" INTEGER NOT NULL,

    PRIMARY KEY ("idUsuario", "idRol"),
    CONSTRAINT "UsuarioRol_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsuarioRol_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol" ("idRol") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rol" (
    "idRol" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreRol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EstadoUsuario" (
    "idEstadoUsuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sala" (
    "idSala" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroSala" INTEGER NOT NULL,
    "nombreSala" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "idNivel" INTEGER NOT NULL,
    CONSTRAINT "Sala_idNivel_fkey" FOREIGN KEY ("idNivel") REFERENCES "NivelEducativo" ("idNivel") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NivelEducativo" (
    "idNivel" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivelEducativo" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_email_key" ON "Proveedor"("email");

-- CreateIndex
CREATE INDEX "ProductoResponsable_idProducto_idx" ON "ProductoResponsable"("idProducto");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
