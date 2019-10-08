import React, { useState, useEffect, useCallback } from 'react';
import firebase from '../../config/firebase';

const db = firebase.database();

export default function TestPage() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [users, setUsers] = useState({});

  function listenerUsers() {
    db.ref('users').on('value', snapshot => {
      setUsers(snapshot.val());
    });
  }

  useEffect(() => {
    listenerUsers();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      nome,
      idade
    };

    db.ref()
      .child('users')
      .push(data);
  }

  return (
    <>
      <ul>{JSON.stringify(users)}</ul>

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
