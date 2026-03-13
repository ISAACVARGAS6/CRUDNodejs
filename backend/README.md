# Backend (Node.js + Express)

API REST simple para un CRUD de items.

## Requisitos

- Node.js 16+ (recomendado)

## Instalación

```bash
cd backend
npm install
```

## Ejecutar

```bash
npm run dev  # Con nodemon para recarga automática
# o
npm start
```

La API se expone en `http://localhost:3000`.

### Endpoints

- `GET /items` - lista todos los items
- `GET /items/{id}` - obtiene un item
- `POST /items` - crea un item (body: { title, description? })
- `PUT /items/{id}` - actualiza un item
- `DELETE /items/{id}` - elimina un item

> Nota: el backend usa almacenamiento en memoria; al reiniciar el servidor se pierden los datos.