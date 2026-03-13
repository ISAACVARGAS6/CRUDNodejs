import { useEffect, useMemo, useState } from 'react'
import { createItem, deleteItem, listItems, updateItem } from './api'

function ItemRow({ item, onEdit, onDelete }) {
  return (
    <div className="item-row">
      <div className="item-content">
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </div>
      <div className="actions">
        <button className="btn secondary" onClick={() => onEdit(item)}>
          Editar
        </button>
        <button className="btn danger" onClick={() => onDelete(item.id)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const isFormValid = useMemo(() => title.trim().length > 0, [title])

  useEffect(() => {
    refresh()
  }, [])

  async function refresh() {
    const data = await listItems()
    setItems(data)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isFormValid) return

    setIsSaving(true)
    try {
      if (editingId) {
        await updateItem(editingId, { title, description })
      } else {
        await createItem({ title, description })
      }
      setTitle('')
      setDescription('')
      setEditingId(null)
      await refresh()
    } finally {
      setIsSaving(false)
    }
  }

  function handleEdit(item) {
    setEditingId(item.id)
    setTitle(item.title)
    setDescription(item.description)
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este ítem?')) return
    await deleteItem(id)
    await refresh()
  }

  function handleCancel() {
    setEditingId(null)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>CRUD React + Node.js</h1>
      </header>

      <main className="container">
        <section className="panel">
          <h2>{editingId ? 'Editar ítem' : 'Nuevo ítem'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Título
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Comprar frutas"
              />
            </label>
            <label>
              Descripción
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opcional"
              />
            </label>
            <div className="form-actions">
              <button className="btn primary" type="submit" disabled={!isFormValid || isSaving}>
                {editingId ? 'Guardar cambios' : 'Agregar'}
              </button>
              {editingId && (
                <button type="button" className="btn" onClick={handleCancel}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel">
          <h2>Lista de ítems</h2>
          {items.length === 0 ? (
            <p className="empty">No hay ítems todavía.</p>
          ) : (
            <div className="list">
              {items.map((item) => (
                <ItemRow key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <span>Backend: Node.js + Express · Frontend: React + Vite</span>
      </footer>
    </div>
  )
}