import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layout,
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox
} from 'antd';

import moment from 'moment';

import Header from '../../components/Header';

import {
  createEventRequest,
  updateEventRequest
} from '../../store/modules/event/actions';

const { Content } = Layout;

export default function Events() {
  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth.user);
  const { event, loading } = useSelector(state => state.event);

  const [values, setValues] = useState({
    name: event ? event.name : '',
    location: event ? event.location : '',
    eventDate: event ? event.date : moment().format('DD/MM/YYYY'),
    options: event ? (event.options || 'name').split(',') : ['name']
  });

  const dateFormat = ['DD/MM/YYYY'];
  function handleSubmit(e) {
    e.preventDefault();

    if (event) {
      const newData = {
        ...event,
        name: values.name,
        location: values.location,
        date: values.eventDate,
        options: values.options.join(','),
        uid
      };
      dispatch(updateEventRequest(newData));
    } else {
      dispatch(
        createEventRequest(
          values.name,
          values.location,
          values.eventDate,
          values.options.join(','),
          uid
        )
      );
    }
  }

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  const defaultOptions = [
    { label: 'Nome', value: 'name', disabled: true },
    { label: 'CPF', value: 'cpf' },
    { label: 'RG', value: 'rg' },
    { label: 'Telefone', value: 'phone' },
    { label: 'Cidade', value: 'city' },
    { label: 'Número da mesa', value: 'table' },
    { label: 'Empresa', value: 'company' },
    { label: 'Email', value: 'email' }
  ];

  return (
    <Layout>
      <Header />
      <Content>
        <Row type="flex" justify="center">
          <Col
            xs={24}
            sm={22}
            lg={18}
            xl={16}
            style={{ background: '#fff', padding: '12px 24px' }}
          >
            <h1>{event ? 'Editar Evento' : 'Novo Evento'}</h1>
            <Form layout="vertical" onSubmit={handleSubmit}>
              <Form.Item label="Nome do Evento">
                <Input
                  name="name"
                  placeholder="Nome do evento"
                  onChange={e => setValues({ ...values, name: e.target.value })}
                  value={values.name}
                />
              </Form.Item>
              <Form.Item label="Localização do evento">
                <Input
                  name="location"
                  placeholder="Localização do evento"
                  onChange={e =>
                    setValues({ ...values, location: e.target.value })
                  }
                  value={values.location}
                />
              </Form.Item>
              <Form.Item label="Data do evento">
                <DatePicker
                  name="eventDate"
                  placeholder="Selecione a data"
                  format={dateFormat}
                  disabledDate={current => moment().add(-1, 'days') >= current}
                  onChange={(date, dateString) =>
                    setValues({ ...values, eventDate: dateString })
                  }
                  value={moment(values.eventDate, dateFormat)}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox.Group
                  options={defaultOptions}
                  value={values.options}
                  onChange={options => setValues({ ...values, options })}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
