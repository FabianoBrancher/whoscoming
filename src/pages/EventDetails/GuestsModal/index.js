import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input, Button, message } from 'antd';

import {
  newGuestRequest,
  createGuestRequest,
  updateGuestRequest
} from '../../../store/modules/guest/actions';

import { getTitle } from '../../../services/utils';

export default function AddGuestsModal({ visible, handleCancel }) {
  const dispatch = useDispatch();
  const { guest } = useSelector(state => state.guest);
  const { event } = useSelector(state => state.event);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState({
    rg: guest ? guest.rg : '',
    cpf: guest ? guest.cpf : '',
    city: guest ? guest.city : '',
    name: guest ? guest.name : '',
    type: guest ? guest.type : '',
    table: guest ? guest.table : '',
    phone: guest ? guest.phone : '',
    email: guest ? guest.email : '',
    status: guest ? guest.status : '',
    company: guest ? guest.company : ''
  });

  useEffect(() => {
    function loadOptions() {
      setOptions(event ? (event.options || 'name').split(',') : ['name']);
    }

    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearStateFields() {
    setValues({
      rg: '',
      cpf: '',
      name: '',
      city: '',
      type: '',
      email: '',
      table: '',
      phone: '',
      status: '',
      company: ''
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (guest) {
      dispatch(
        updateGuestRequest({
          eventId: event.key,
          id: guest.key,
          ...values
        })
      );
      handleCancel();
    } else if (!values.name.trim()) {
      message.error('O nome do convidado é obrigatório');
    } else if (!values.name.trim()) {
      message.error('O nome do convidado é obrigatório');
    } else {
      dispatch(createGuestRequest({ eventId: event.key, ...values }));
      handleCancel();
    }
  }

  function handleCreateAnotherGuest(e) {
    e.preventDefault();
    if (!values.name.trim()) {
      message.error('O nome do convidado é obrigatório');
    } else {
      clearStateFields();
      dispatch(newGuestRequest());
      dispatch(createGuestRequest({ eventId: event.key, ...values }));
    }
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <Modal
      destroyOnClose
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      title={guest ? 'Editar convidado' : 'Adicionar um convidado'}
    >
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Nome do convidado">
          <Input
            name="name"
            size="large"
            placeholder="Nome do convidado"
            value={values.name}
            style={{ width: '100%', marginRight: 8 }}
            onChange={e => setValues({ ...values, name: e.target.value })}
          />
        </Form.Item>
        {options.map(
          o =>
            o !== 'name' && (
              <Form.Item label={getTitle(o)} key={o}>
                <Input
                  size="large"
                  name={o}
                  value={values[o]}
                  onChange={handleChange}
                  placeholder={getTitle(o)}
                  style={{ width: '100%', marginRight: 8 }}
                />
              </Form.Item>
            )
        )}
        <Button
          size="large"
          type="default"
          onClick={handleCancel}
          style={{ marginRight: 5 }}
        >
          Cancelar
        </Button>
        <Button
          size="large"
          type="default"
          style={{ marginRight: 5 }}
          onClick={handleCreateAnotherGuest}
        >
          Salvar e Cadastrar outro
        </Button>
        <Button type="primary" size="large" htmlType="submit">
          Salvar
        </Button>
      </Form>
    </Modal>
  );
}
