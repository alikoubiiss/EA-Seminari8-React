# Backoffice autores y libros (React)

Backoffice hecho con React 19, TypeScript y Vite para el Seminario 8 de EA. Es lo mismo que el backoffice de Angular del Seminario 6 pero en React, usa la misma API y tiene las mismas pantallas (listar, buscar, paginar, crear, editar y borrar autores y libros).

En [GUIA.md](GUIA.md) hay mas explicacion de como funciona por dentro. El ejercicio esta en [EJERCICIO.md](EJERCICIO.md).

## requisitos

- Node.js 22 o superior
- MongoDB (local o Atlas) para el backend
- el backend arrancado (carpeta EA-Seminari8-React-BackOffice-API)
- recomendado VS Code

## como arrancarlo

hacen falta dos terminales

**backend:**

primero MongoDB tiene que estar corriendo (o tener la url de atlas en el .env)

```
cd EA-Seminari8-React-BackOffice-API
npm install
cp .env.example .env
npm run seed
npm run dev
```

la API queda en http://localhost:1337 y el swagger en http://localhost:1337/api-docs

el seed mete 5 autores y 12 libros de ejemplo, con `npm run seed -- --reset` se resetea todo. la contraseña de los autores de ejemplo es `seminari5`

**frontend:**

```
cd EA-Seminari8-React-BackOffice
npm install
npm run dev
```

abre la url que dice vite, normalmente http://localhost:5173

## configuracion

si hay que cambiar la url de la api se hace en un solo sitio:

```typescript
// src/config/environment.ts
export const environment = {
  apiUrl: 'http://localhost:1337',
};
```

## scripts disponibles

| comando | que hace |
|---|---|
| `npm run dev` | servidor de desarrollo, recarga solo al guardar |
| `npm run build` | compila para produccion en dist/ |
| `npm run preview` | sirve el dist/ para probar |
| `npm test` | tests con vitest |
| `npm run lint` | linter con oxlint |

## pantallas

| ruta | que es |
|---|---|
| `/authors` | lista de autores con buscador y paginacion |
| `/authors/new` | crear autor |
| `/authors/:id/edit` | editar autor |
| `/books` | lista de libros con buscador y paginacion |
| `/books/new` | crear libro |
| `/books/:id/edit` | editar libro |
| `/favourites` | lista de libros marcados como favoritos |

el buscador y la pagina se guardan en la URL (/authors?q=cervantes&page=2)

## estructura

```
src/
├── components/
│   ├── Layout.tsx          # barra de arriba + Outlet, comun a todas las rutas
│   ├── Navbar.tsx          # menu de navegacion
│   ├── AuthorsList.tsx     # lista de autores
│   ├── AuthorForm.tsx      # crear y editar autores
│   ├── AuthorCard.tsx      # tarjeta de autor
│   ├── BooksList.tsx       # lista de libros
│   ├── BookForm.tsx        # crear y editar libros
│   ├── FavouriteButton.tsx # boton estrella para marcar favoritos
│   ├── FavouritesList.tsx  # lista de libros favoritos
│   ├── Pagination.tsx      # paginacion
│   ├── ConfirmModal.tsx    # modal para confirmar antes de borrar
│   ├── ViewToggle.tsx      # cambiar entre tabla y tarjetas
│   └── Field.tsx           # campo de formulario con label y error
├── hooks/
│   ├── useApiList.ts       # pedir listas a la api
│   ├── useListControls.ts  # busqueda y paginacion en la url
│   └── useForm.ts          # formularios con validacion
├── services/
│   ├── http.ts             # fetch con manejo de errores
│   ├── author.service.ts   # operaciones crud de autores
│   └── book.service.ts     # operaciones crud de libros
├── context/
│   └── ToastContext.tsx    # notificaciones
├── stores/
│   ├── viewMode.ts         # nanostores: tabla o tarjetas
│   └── favourites.ts       # nanostores: libros favoritos (con localStorage)
├── models/                 # tipos Author y Book
├── utils/
│   ├── format.ts           # funciones de formato (precio, fecha, idioma...)
│   ├── api-error.ts        # convierte errores en texto
│   └── remove-empty.ts     # limpia campos vacios antes de enviar
├── config/environment.ts   # url de la api
├── App.tsx                 # rutas
├── main.tsx                # punto de entrada
└── index.css               # estilos
```

## librerias

| libreria | para que |
|---|---|
| React 19 | componentes y renderizado |
| React Router (react-router-dom 7) | rutas y navegacion |
| Nanostores + @nanostores/react | estado global compartido entre componentes |
| Vite | servidor de desarrollo y build |
| Vitest | tests |
| Oxlint | linter |

los formularios y la validacion estan hechos a mano sin librerias externas, y las peticiones con fetch normal sin axios, para que se entienda bien que hace cada cosa

## cosas de la api que hay que saber

- editar es un PUT y siempre pide todos los campos obligatorios, en autores hay que escribir la contraseña otra vez al editar
- si un campo opcional se deja vacio al editar no se borra (la api rechaza valores vacios, asi que el form directamente no los envia)
- borrar un autor no borra sus libros, se quedan sin autor
- los errores de validacion de la api (422) vienen en ingles porque son de Joi
- si la api no esta arrancada las pantallas muestran "No se puede conectar con la API"
