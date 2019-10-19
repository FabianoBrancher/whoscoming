import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Form, Input, Button, Icon, InputNumber } from 'antd';

export default function Guests({ visible }) {
  const dispatch = useDispatch();
  const { event } = useSelector(state => state.event);
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState([
    {
      name: event ? event.name : '',
      rg: event ? event.rg : '',
      cpf: event ? event.cpf : '',
      city: event ? event.cpf : '',
      table: event ? event.table : '',
      phone: event ? event.phone : '',
      company: event ? event.company : ''
    }
  ]);

  useEffect(() => {
    function loadOptions() {
      setOptions(event ? (event.options || 'name').split(',') : ['name']);
    }

    loadOptions();
  }, []);

  function handleSubmit(e) {
    e.preventDetaul();
    console.log(values);
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
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={() => { }}
      onOk={() => { }}
      visible={visible}
    >
      <Form layout="vertical" onSubmit={handleSubmit}>
        {JSON.stringify(options)}
        <Form.Item label="Nome do convidado">
          <Input
            style={{ width: '100%', marginRight: 8 }}
            name="name"
            placeholder="Nome do convidado"
            onChange={() => { }}
          />
        </Form.Item>
        {options.map(
          o =>
            o !== 'name' && (
              <Form.Item label={getTitle(o)}>
                <Input
                  style={{ width: '100%', marginRight: 8 }}
                  name={o}
                  placeholder={getTitle(o)}
                  value={`values.${o}`}
                  onChange={e => setValues({ ...values, o: e.target.value })}
                />
              </Form.Item>
            )
        )}
      </Form>
    </Modal>
  );
}
