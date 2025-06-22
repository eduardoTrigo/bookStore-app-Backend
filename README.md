# 📚 BookStore App - Backend

Backend de una aplicación de gestión de una librería online. Esta API permite a los usuarios registrarse, loguearse, consultar libros, autores, realizar pedidos, comprar y administrar sus datos. Incluye un sistema de autenticación con JWT, validaciones exhaustivas con Zod, manejo de errores centralizado y operaciones de compra protegidas mediante transacciones de MongoDB.

---

## 🚀 Tecnologías Utilizadas

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* **Zod** (validaciones de datos)
* **JWT** para autenticación
* **bcrypt** para hasheo de contraseñas
* **cookie-parser** para manejo seguro de sesiones
* **Morgan** para logging de requests
* **dotenv** para manejo de variables de entorno
* **Swagger** (opcional) para documentación interactiva de la API

---

## 📁 Estructura del Proyecto

```
bookstore-app-backend/
│
├── config/                 # Configuración de entorno
├── controllers/            # Lógica de negocio por entidad
├── middlewares/           # Middlewares de validación y errores
├── models/                # Modelos de MongoDB
├── routes/                # Endpoints agrupados por recurso
├── schemas/               # Validaciones con Zod
├── utils/                 # Funciones auxiliares
├── libs/                  # Librería JWT personalizada
├── index.js               # Punto de entrada de la aplicación
├── .env                   # Variables de entorno
└── package.json
```

---

## ⚙️ Características Técnicas Destacadas

* ✅ **CRUD completo** de libros, autores y usuarios
* 🔒 **Autenticación segura** usando JWT + Cookies HttpOnly
* 🧠 **Validaciones robustas** con Zod en cada endpoint
* 🧱 **Middleware personalizados**:

  * Validación de ObjectId de MongoDB
  * Verificación de token (authRequired, isGuest)
* 🔁 **Transacciones con sesiones MongoDB** al realizar compras:

  * Aseguran consistencia en el stock
  * Cancelan si no hay stock suficiente
* 📦 **Carrito persistente** para pedidos activos por usuario
* 🧨 **Manejo centralizado de errores**
* 📚 **Populate()** para obtener información anidada (libros en pedidos, autores de libros)

---

## 🔐 Autenticación

Se utiliza JWT almacenado en cookies seguras (`HttpOnly`) para mantener la sesión.

* `POST /auth/register`: Registro de nuevos usuarios
* `POST /auth/login`: Login del usuario y emisión de token
* `POST /auth/logout`: Cierre de sesión
* `GET /auth/myProfile`: Retorna los datos del usuario autenticado

---

## 🛒 Gestión de Pedidos (Carrito)

* `GET /transactions/myOrder`: Obtener el carrito activo del usuario
* `POST /transactions/order`: Agregar un libro al carrito
* `DELETE /transactions/order`: Eliminar un libro del carrito
* `PATCH /transactions/buyOrder`: Comprar el carrito
* `GET /transactions/orders`: Ver historial de pedidos del usuario

🧾 La compra usa una transacción MongoDB para:

* Validar stock de libros
* Actualizar cantidades
* Finalizar pedido como "completed"

---

## 📚 Libros y Autores

* CRUD completo para:

  * `Books`: `/books`
  * `Authors`: `/authors`
  * Incluye relaciones (`populate`) para mostrar los libros de cada autor

---

## 👤 Usuarios (admin o uso interno)

* CRUD disponible en `/users`
* Solo para propósitos de desarrollo o panel de admin

---

## ✅ Validaciones

Cada recurso tiene su schema Zod correspondiente:

* `registerSchema`, `loginSchema`
* `validateDataAuthor`, `updateDataAuthor`
* `validateDataBook`, `updateBookSchema`

Estos esquemas previenen datos incompletos o mal estructurados en el backend.

---

## 🧪 Middleware de Errores

Middleware centralizado que captura:

* Errores de validación (Zod)
* ObjectId inválidos
* Claves duplicadas en MongoDB (código 11000)

Ejemplo de error controlado:

```json
{
  "success": false,
  "message": "Email ya existe"
}
```

---

## 📝 Instalación y Ejecución

```bash
# Clonar el repositorio
$ git clone https://github.com/usuario/bookstore-app-backend.git
$ cd bookstore-app-backend

# Instalar dependencias
$ npm install

# Crear archivo .env
PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/bookstore
TOKEN=unaClaveSecreta

# Ejecutar la aplicación
$ npm run dev
```

---

## 📘 Documentación Swagger (opcional)

Si agregás `swagger-jsdoc` + `swagger-ui-express`, podés documentar tu API de forma interactiva:

```bash
npm install swagger-jsdoc swagger-ui-express
```

Luego agregá esto en `index.js`:

```js
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const specs = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
```

---

## 🧠 Posibles Mejoras Futuras

* [ ] Agregar roles y permisos para usuarios (admin, user)
* [ ] Paginación y filtros para listar libros/autores
* [ ] Emails de confirmación o recuperación de contraseña
* [ ] Webhooks o integración con plataformas de pago
* [ ] Tests automatizados con Jest o Supertest
* [ ] Desplegar en plataformas como Render, Vercel o Railway
* [ ] Agregar logs persistentes (Winston, LogRocket)

---

## 👨‍💻 Autor

Desarrollado por **Eduardo Trigo**. Proyecto educativo con enfoque en buenas prácticas de backend con Node + Mongo.