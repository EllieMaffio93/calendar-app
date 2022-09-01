import React, { useState } from 'react'
import './index.css'

export default function EventModal({ handleClose, selectedDate, saveEvent }) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: selectedDate.toISODate(),
    endDate: selectedDate.toISODate(),
    category: ''
  })

  /*
  function handleChange(key, value) {
      setFormData({
          ...formData,
          [key]: value
      })
  }
  */

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    saveEvent(formData)
    console.log(formData)
    handleClose(true);
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close-button" onClick={handleClose}>CHIUDI</button>
        <h1>Crea evento</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            required
          />
          <label>Data inizio</label>
          <input
            type="date"
            id="start-date"
            name="startDate"
            placeholder="Data inizio"
            value={formData.startDate}
            onChange={(e) => handleChange(e)}
            required
          />
          <label>Data fine</label>
          <input
            type="date"
            id="end-date"
            name="endDate"
            placeholder="Data fine"
            value={formData.endDate}
            onChange={(e) => handleChange(e)}
            required
          />
          <label>Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="" disabled>Scegli la categoria</option>
            <option value="Sviluppo">Sviluppo</option>
            <option value="BugFixing">Bug fixing</option>
            <option value="Testing">Testing</option>
          </select>
          <button class="modal-submit-button" type="submit">Salva</button>
        </form>
      </div>
    </div>
  )
}
