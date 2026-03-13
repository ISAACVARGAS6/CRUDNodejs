const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Permitir frontend en Vite
app.use(express.json());

// Almacenamiento en memoria (ejemplo simple)
let items = [];
let nextId = 1;

// Rutas
app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  res.json(item);
});

app.post('/items', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Título es requerido' });
  }
  const newItem = { id: nextId++, title, description: description || '' };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  const updatedItem = { ...items[itemIndex], title, description };
  items[itemIndex] = updatedItem;
  res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  items.splice(itemIndex, 1);
  res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});