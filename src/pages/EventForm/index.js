import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
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

import history from '../../services/history';

import Header from '../../components/Header';

import {
  createEventRequest,
  updateEventRequest
} from '../../store/modules/event/actions';

const { Content } = Layout;

export default function EventForm() {
  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth.user);
  const { event, loading } = useSelector(state => state.event);

  const [values, setValues] = useState({
    name: event ? event.name : '',
    location: event ? event.location : '',
    eventStartDate: event
      ? moment(event.startDate).format('DD/MM/YYYY')
      : moment().format('DD/MM/YYYY'),
    eventEndDate: event
      ? moment(event.endDate).format('DD/MM/YYYY')
      : moment().format('DD/MM/YYYY'),
    eventStartTime: event
      ? moment(event.startDate).format('HH:mm')
      : moment().format('HH:mm'),
    eventEndTime: event
      ? moment(event.endDate).format('HH:mm')
      : moment().format('HH:mm'),
    options: event ? (event.options || 'name').split(',') : ['name']
  });

  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';

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

  function toISOFormat(dateString, timeString) {
    const [DD, MM, YYYY] = dateString.split('/');
    const [HH, mm] = timeString.split(':');
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const startDate = toISOFormat(values.eventStartDate, values.eventStartTime);
    const endDate = toISOFormat(values.eventEndDate, values.eventEndTime);

    // Se eu estiver fazendo update
    if (event) {
      const newData = {
        id: event.key,
        createdBy: uid,
        name: values.name,
        location: values.location,
        startDate,
        endDate,
        options: values.options.join(',')
      };
      dispatch(updateEventRequest(newData));
    } else {
      // Se eu estiver criando um evento novo
      dispatch(
        createEventRequest({
          createdBy: uid,
          name: values.name,
          location: values.location,
          startDate,
          endDate,
          options: values.options.join(',')
        })
      );
    }
  }

  function handleCancel() {
    history.push('/events');
  }

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
                  name="name"
                  size="large"
                  placeholder="Nome do evento"
                  value={values.name}
                  onChange={e => setValues({ ...values, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Localização do evento">
                <Input
                  name="location"
                  size="large"
                  placeholder="Localização do evento"
                  value={values.location}
                  onChange={e =>
                    setValues({ ...values, location: e.target.value })
                  }
                />
              </Form.Item>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item
                  label="Data de início do evento"
                  style={{ marginRight: 10 }}
                >
                  <DatePicker
                    name="eventStartDate"
                    size="large"
                    placeholder="Selecione a data de início do evento"
                    format={dateFormat}
                    value={moment(values.eventStartDate, dateFormat)}
                    disabledDate={current =>
                      moment().add(-1, 'days') >= current
                    }
                    onChange={(date, dateString) =>
                      setValues({ ...values, eventStartDate: dateString })
                    }
                  />
                </Form.Item>
                <Form.Item label="Data de término do evento">
                  <DatePicker
                    name="eventEndDate"
                    size="large"
                    placeholder="Selecione a data de término do evento"
                    format={dateFormat}
                    disabledDate={current =>
                      moment().add(-1, 'days') >= current
                    }
                    onChange={(date, dateString) =>
                      setValues({ ...values, eventEndDate: dateString })
                    }
                    value={moment(values.eventEndDate, dateFormat)}
                  />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Item label="Hora de início" style={{ marginRight: 10 }}>
                  <TimePicker
                    size="large"
                    format={timeFormat}
                    onChange={(time, timeString) =>
                      setValues({ ...values, eventStartTime: timeString })
                    }
                    value={moment(values.eventStartTime, timeFormat)}
                  />
                </Form.Item>
                <Form.Item label="Hora de término">
                  <TimePicker
                    size="large"
                    format={timeFormat}
                    onChange={(time, timeString) =>
                      setValues({ ...values, eventEndTime: timeString })
                    }
                    value={moment(values.eventEndTime, timeFormat)}
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
