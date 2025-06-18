# 📚 API de Librería

API RESTful construida con Node.js, Express y MongoDB (Mongoose), para la gestión de libros, autores, usuarios y órdenes de compra.

---

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- Zod (validación de datos)
- JWT (autenticación)
- Bcrypt (hash de contraseñas)
- dotenv (configuración por entorno)

---

## 📂 Estructura del proyecto

```
.
├── config/              # Configuración general y variables de entorno (incluye index.js)
├── controllers/         # Controladores con la lógica de negocio (libros, usuarios, órdenes)
├── libs/                # Librerías como JWT, helpers reutilizables
├── middlewares/         # Middleware de autenticación, validación, etc.
├── models/              # Modelos de datos Mongoose
├── request/             # Módulo de cliente HTTP: consultas REST a servicios externos
├── routes/              # Definición de las rutas de la API
├── schemas/             # Validaciones de esquemas con Zod 
├── index.js             # Configuración general del servidor y punto de entrada principal de la aplicación
└── .env                 # Variables de entorno

```

---

## 📦 Instalación

```bash
git clone https://github.com/eduardoTrigo/bookStore-app-Backend
cd api-libreria
npm install
```

Crea un archivo `.env` con las siguientes variables:

```
MONGO_URI=mongodb://localhost:27017/libreria
JWT_SECRET=clave-secreta
PORT=3000
```

---

## 🧪 Rutas principales

### 📚 Libros

- `GET /books` → Listado de libros
- `GET /books/:id` → Obtener libro por ID
- `POST /books` → Crear libro
- `PUT /books/:id` → Actualizar libro
- `DELETE /books/:id` → Eliminar libro

### 👤 Usuarios

- `GET /users` → Listado de usuarios
- `POST /users` → Registro de usuario
- `PUT /users/:id` → Actualizar usuario
- `DELETE /users/:id` → Eliminar usuario

### ✍ Autores

- `GET /authors` → Listado de autores
- `POST /authors` → Crear autor
- `PUT /authors/:id` → Actualizar autor
- `DELETE /authors/:id` → Eliminar autor

### 🛒 Órdenes

- `GET /orders` → Historial del usuario autenticado
- `GET /orders/active` → Orden activa (carrito)
- `POST /orders` → Agregar producto al carrito
- `DELETE /orders` → Eliminar producto del carrito
- `POST /orders/checkout` → Finalizar compra

### 🔐 Autenticación

- `POST /auth/register` → Registro
- `POST /auth/login` → Login

---

## 🔎 Validación con Zod

Todas las entradas se validan usando `Zod`, con errores claros y estructurados.

Ejemplo:

```json
{
  "error": [
    {
      "path": ["email"],
      "message": "Invalid email"
    }
  ]
}
```

---

## ✅ Ejecución del proyecto

```bash
npm run dev
```

Servidor disponible en: [http://localhost:3000](http://localhost:3000)

---

## 🛡 Seguridad

- Las contraseñas se almacenan hasheadas con bcrypt
- Las rutas protegidas requieren token JWT válido

---

## 🧠 Recomendaciones de desarrollo

- Usar middlewares de validación con Zod para limpiar los controllers
- Separar la lógica de negocio en servicios (`services/`)
- Documentar la API con Swagger o Postman
- Implementar paginación, búsqueda y ordenamiento en `/books`
- Agregar roles de usuario (`admin`, `cliente`, etc.)

---

## ✍ Autor

Eduardo Trigo

---