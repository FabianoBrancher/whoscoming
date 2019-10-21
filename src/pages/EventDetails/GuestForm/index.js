import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input, Button } from 'antd';

import { createGuestRequest } from '../../../store/modules/guests/actions';

export default function Guests({ visible, handleCancel }) {
  const dispatch = useDispatch();
  const { event, guest } = useSelector(state => state.event);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState({
    name: guest ? guest.name : '',
    rg: guest ? guest.rg : '',
    cpf: guest ? guest.cpf : '',
    city: guest ? guest.cpf : '',
    table: guest ? guest.table : '',
    phone: guest ? guest.phone : '',
    company: guest ? guest.company : ''
  });

  useEffect(() => {
    function loadOptions() {
      setOptions(event ? (event.options || 'name').split(',') : ['name']);
    }

    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    dispatch(createGuestRequest(event.key, values));
    handleCancel();
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
      default:
        return '';
    }
  }

  return (
    <Modal
      title="Adicionar um convidado"
      visible={visible}
      footer={null}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onSubmit={handleSubmit}>
        <Form.Item label="Nome do convidado">
          <Input
            style={{ width: '100%', marginRight: 8 }}
            name="name"
            placeholder="Nome do convidado"
            onChange={e => setValues({ ...values, name: e.target.value })}
          />
        </Form.Item>
        {options.map(
          o =>
            o !== 'name' && (
              <Form.Item label={getTitle(o)}>
                <Input
                  style={{ width: '100%', marginRight: 8 }}
                  name={o}
                  placeholder={getTitle(0)}
                  onChange={handleChange}
                />
              </Form.Item>
            )
        )}
        <Button type="default" size="large" onClick={() => handleCancel()}>
          Cancelar
        </Button>
        <Button
          type="default"
          size="large"
          onClick={handleSubmit}
          style={{ marginRight: 5 }}
        >
          Salvar e Cadastrar outro
        </Button>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          style={{ marginRight: 5 }}
        >
          Salvar
        </Button>
      </Form>
    </Modal>
  );
}
