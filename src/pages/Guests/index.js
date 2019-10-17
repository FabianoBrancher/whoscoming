/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Input, Button, Icon } from 'antd';

import { database } from '../../config/firebase';

import { createGuestRequest } from '../../store/modules/guests/actions';

export default function Guests({ visible, event }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState([{ name: '', arrived: '' }]);

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(createGuestRequest(guests));

    const guestsRef = database.ref().child('guests');
    const eventGuests = database.ref().child(`eventGuests/${event.key}`);

    const updates = {};

    const parentKey = database.ref().push().key;
    guests.forEach((element, index) => {
      const { key } = database.ref().push();
      if (index === 0) {
        updates[`/guests/${parentKey}`] = { ...element, parent: parentKey };
        updates[`/eventGuests/${event.key}/${parentKey}`] = element;
      } else {
        updates[`/guests/${key}`] = { ...element, parent: parentKey };
        updates[`/eventGuests/${event.key}/${key}`] = element;
      }
    });

    database.ref().update(updates);
  }

  function addExtraGuest() {
    setGuests([...guests, { name: '', arrived: '' }]);
  }

  function deleteExtraGuest(index) {
    const newArr = [...guests];
    newArr.splice(index, 1);
    setGuests(newArr);
  }

  const handleChange = index => e => {
    const newArr = [...guests];
    newArr[index].name = e.target.value;
    setGuests(newArr);
  };

  return (
    <Modal
      title="Adicionar um convidado"
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={() => {}}
      onOk={handleSubmit}
      visible={visible}
    >
      <Form layout="vertical">
        {guests.map((guest, index = 1) => (
          <Form.Item
            key={index}
            label={index === 0 ? 'Nome do convidado' : 'Nome do acompanhante'}
          >
            <Input
              style={{ width: '95%', marginRight: 8 }}
              name={`guest-name-${index}`}
              placeholder={
                index === 0 ? 'Nome do convidado' : 'Nome do acompanhante'
              }
              onChange={handleChange(index)}
              value={guest.name}
            />
            {guests.length >= 1 && index !== 0 ? (
              <Icon
                type="minus-circle-o"
                style={{ color: 'red' }}
                onClick={() => deleteExtraGuest(index)}
              />
            ) : null}
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="dashed"
            onClick={addExtraGuest}
            style={{ width: '60%' }}
          >
            <Icon type="plus" /> Adicionar acompanhamente
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
