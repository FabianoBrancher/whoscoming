import React, { useState, useEffect } from 'react';
import './App.css';

import firebase from './config/firebase';

const useDatabase = endpoint => {
  const [data, setData] = useState({});

  useEffect(() => {
    const ref = firebase.database().ref(endpoint);

    ref.on('value', snapshot => {
      setData(snapshot.val());
    });

    // limpa a conexão com o firebase
    return () => {
      ref.off();
    };
  }, [endpoint]);
  return { ...data, endpoint };
};

const useDatabasePush = endpoint => {
  const [status, setStatus] = useState('');
  const save = data => {
    const ref = firebase.database().ref(endpoint);
    ref.push(data, err => {
      if (err) {
        setStatus('Error');
      } else {
        setStatus('Success');
      }
    });
  };
  return [status, save];
};

const Comments = ({ visible }) => {
  const endpoint = visible ? 'test' : 'test/a';
  const data = useDatabase(endpoint);

  return <pre>{JSON.stringify(data)}</pre>;
};

const A = () => {
  const data = useDatabase('test/a');
  return <pre>{JSON.stringify(data)}</pre>;
};

function App() {
  const [visible, toggle] = useState(true);
  const [status, save] = useDatabasePush('test');

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          toggle(!visible);
          save({ valor: 1, b: 2 });
        }}
      >
        Toggle
      </button>
      Status: {status}
      <Comments visible={visible} />
      <A />
    </div>
  );
}

export default App;
