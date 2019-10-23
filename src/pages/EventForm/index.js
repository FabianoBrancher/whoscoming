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
  TimePicker,
  Checkbox
} from 'antd';

import moment from 'moment';

import Header from '../../components/Header';

import {
  createEventRequest,
  updateEventRequest
} from '../../store/modules/event/actions';

import history from '../../services/history';

const { Content } = Layout;

export default function EventForm() {
  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth.user);
  const { event, loading } = useSelector(state => state.event);

  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';

  const [values, setValues] = useState({
    name: event ? event.name : '',
    location: event ? event.location : '',
    eventDateStart: event ? event.dateStart : moment().format(dateFormat),
    eventDateEnd: event ? event.dateEnd : moment().format(dateFormat),
    options: event ? (event.options || 'name').split(',') : ['name']
  });

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

  function handleCancel() {
    history.push('/dashboard');
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
              <Form.Item label="Nome do Evento" for="name">
                <Input
                  id="name"
                  name="name"
                  size="large"
                  placeholder="Nome do evento"
                  onChange={e => setValues({ ...values, name: e.target.value })}
                  value={values.name}
                />
              </Form.Item>
              <Form.Item label="Localização do evento">
                <Input
                  name="location"
                  size="large"
                  placeholder="Localização do evento"
                  onChange={e =>
                    setValues({ ...values, location: e.target.value })
                  }
                  value={values.location}
                />
              </Form.Item>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item
                  label="Data de início do evento"
                  style={{ marginRight: 10 }}
                >
                  <DatePicker
                    name="eventDateStart"
                    size="large"
                    placeholder="Selecione a data de início do evento"
                    format={dateFormat}
                    disabledDate={current =>
                      moment().add(-1, 'days') >= current
                    }
                    onChange={(date, dateString) =>
                      setValues({ ...values, eventDateStart: dateString })
                    }
                    value={moment(values.eventDateStart, dateFormat)}
                  />
                </Form.Item>
                <Form.Item label="Horário de início do evento">
                  <TimePicker
                    size="large"
                    defaultValue={moment('12:08', timeFormat)}
                    format={timeFormat}
                  />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item
                  label="Data de fim do evento"
                  style={{ marginRight: 10 }}
                >
                  <DatePicker
                    name="eventDateEnd"
                    size="large"
                    placeholder="Selecione a data de término do evento"
                    format={dateFormat}
                    disabledDate={current =>
                      moment().add(-1, 'days') >= current
                    }
                    onChange={(date, dateString) =>
                      setValues({ ...values, eventDateEnd: dateString })
                    }
                    value={moment(values.eventDateEnd, dateFormat)}
                  />
                </Form.Item>
                <Form.Item label="Horário de término do evento">
                  <TimePicker
                    size="large"
                    defaultValue={moment('12:08', timeFormat)}
                    format={timeFormat}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Checkbox.Group
                  size="large"
                  options={defaultOptions}
                  value={values.options}
                  onChange={options => setValues({ ...values, options })}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  size="large"
                  loading={loading}
                  onClick={handleCancel}
                  style={{ marginRight: 5 }}
                >
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                >
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
