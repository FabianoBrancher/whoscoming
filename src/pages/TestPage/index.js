import React, { useState, useEffect } from 'react';
import { database } from '../../config/firebase';

import api from '../../services/api';

export default function TestPage() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    database.ref('users').on('value', snapshot => {
      const arr = Object.values(snapshot.val()).map(item => item);
      setUsers(arr);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      nome,
      idade
    };

    // db.ref()
    //   .child('users')
    //   .push(data);

    await api.put('/users.json', data);
  }

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={Object.keys(user)}>
            {user.nome}, {user.idade}
          </li>
        ))}
      </ul>

      <h1>TestPage</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do usuario"
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Idade"
          onChange={e => setIdade(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
