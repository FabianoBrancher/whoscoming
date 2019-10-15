import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Input, Button, Icon } from 'antd';

import { createGuestRequest } from '../../store/modules/guests/actions';

export default function Guests({ visible }) {
  const dispatch = useDispatch();
  const [mainGuest, setMainGuest] = useState({ name: '', arrived: null });
  const [extraguests, setExtraGuests] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createGuestRequest({ mainGuest, extraguests }));
  }

  function addExtraGuest() {
    setExtraGuests([...extraguests, { name: '', arrived: null }]);
  }

  function deleteExtraGuest(index) {
    const newArr = [...extraguests];
    newArr.splice(index, 1);
    setExtraGuests(newArr);
  }

  const handleChange = index => e => {
    const newArr = [...extraguests];
    newArr[index].name = e.target.value;
    setExtraGuests(newArr);
  };

  return (
    <Modal
      title="Adicionar um convidado"
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={() => { }}
      onOk={handleSubmit}
      visible={visible}
    >
      <Form layout="vertical">
        <Form.Item label="Nome do convidado">
          <Input
            style={{ width: '95%' }}
            name="name"
            placeholder="Nome do convidado"
            onChange={e => setMainGuest({ ...mainGuest, name: e.target.value })}
            value={mainGuest.name}
          />
        </Form.Item>

        {extraguests.map((guest, index) => (
          <Form.Item key={index} label="Nome do acompanhante">
            <Input
              style={{ width: '95%', marginRight: 8 }}
              name={`guest-name-${index}`}
              placeholder="Nome do acompanhante"
              onChange={handleChange(index)}
              value={guest.name}
            />
            {extraguests.length >= 1 ? (
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
