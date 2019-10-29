import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input, Button, message } from 'antd';

import {
  newGuestRequest,
  createGuestRequest,
  updateGuestRequest
} from '../../../store/modules/guest/actions';

export default function Guests({ visible, handleCancel }) {
  const dispatch = useDispatch();
  const { guest } = useSelector(state => state.guest);
  const { event } = useSelector(state => state.event);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState({
    name: guest ? guest.name : '',
    rg: guest ? guest.rg : '',
    cpf: guest ? guest.cpf : '',
    city: guest ? guest.city : '',
    table: guest ? guest.table : '',
    phone: guest ? guest.phone : '',
    company: guest ? guest.company : '',
    status: guest ? guest.status : '',
    type: guest ? guest.type : '',
    email: guest ? guest.email : ''
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
      name: '',
      rg: '',
      cpf: '',
      city: '',
      table: '',
      phone: '',
      company: '',
      status: '',
      type: '',
      email: ''
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
      message.error('O nome é obrigatório');
    } else {
      clearStateFields();
      dispatch(newGuestRequest());
      dispatch(createGuestRequest({ eventId: event.key, ...values }));
    }
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function getTitle(option) {
    switch (option) {
      case 'rg': {
        return 'R.G.';
      }
      case 'phone': {
        return 'Telefone';
      }
      case 'table': {
        return 'Mesa';
      }
      case 'email': {
        return 'Email';
      }
      case 'cpf': {
        return 'CPF';
      }
      case 'city': {
        return 'Cidade';
      }
      case 'company': {
        return 'Empresa';
      }
      case 'type': {
        return 'Tipo';
      }
      case 'status': {
        return 'Status';
      }
      default:
        return '';
    }
  }

  return (
    <Modal
      title={guest ? 'Editar convidado' : 'Adicionar um convidado'}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Nome do convidado">
          <Input
            style={{ width: '100%', marginRight: 8 }}
            size="large"
            name="name"
            placeholder="Nome do convidado"
            onChange={e => setValues({ ...values, name: e.target.value })}
            value={values.name}
          />
        </Form.Item>
        {options.map(
          o =>
            o !== 'name' && (
              <Form.Item label={getTitle(o)} key={o}>
                <Input
                  size="large"
                  name={o}
                  placeholder={getTitle(o)}
                  onChange={handleChange}
                  value={values[o]}
                  style={{ width: '100%', marginRight: 8 }}
                />
              </Form.Item>
            )
        )}
        <Button
          type="default"
          size="large"
          onClick={handleCancel}
          style={{ marginRight: 5 }}
        >
          Cancelar
        </Button>
        <Button
          type="default"
          size="large"
          onClick={handleCreateAnotherGuest}
          style={{ marginRight: 5 }}
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
