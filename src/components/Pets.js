import React, { useState, useEffect } from "react";
import axios from "axios";

function Pets({ token }) {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: "", species: "" });
  const [editingPet, setEditingPet] = useState(null);

  // Obtener mascotas
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pets", {
        headers: { Authorization: token },
      })
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Agregar o actualizar mascota
  const savePet = () => {
    if (editingPet) {
      axios
        .put(`http://localhost:5000/api/pets/${editingPet._id}`, newPet, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setPets(pets.map((pet) => (pet._id === res.data._id ? res.data : pet)));
          setNewPet({ name: "", species: "" });
          setEditingPet(null);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:5000/api/pets", newPet, {
          headers: { Authorization: token },
        })
        .then((res) => setPets([...pets, res.data]))
        .catch((err) => console.error(err));
    }
  };

  // Eliminar mascota
  const deletePet = (id) => {
    axios
      .delete(`http://localhost:5000/api/pets/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => setPets(pets.filter((pet) => pet._id !== id)))
      .catch((err) => console.error(err));
  };

  // Editar mascota
  const editPet = (pet) => {
    setNewPet({ name: pet.name, species: pet.species });
    setEditingPet(pet);
  };

  return (
    <div>
      <h2>Gestión de Mascotas</h2>
      <input
        placeholder="Nombre"
        value={newPet.name}
        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
      />
      <input
        placeholder="Especie"
        value={newPet.species}
        onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
      />
      <button onClick={savePet}>
        {editingPet ? "Actualizar Mascota" : "Agregar Mascota"}
      </button>

      <ul>
        {pets.map((pet) => (
          <li key={pet._id}>
            {pet.name} ({pet.species})
            <button onClick={() => editPet(pet)}>Editar</button>
            <button onClick={() => deletePet(pet._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pets;
