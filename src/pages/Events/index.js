/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Fuse from 'fuse.js';

import {
  Col,
  Layout,
  Input,
  Table,
  Row,
  Dropdown,
  Menu,
  Modal,
  Button,
  Icon,
  Tag
} from 'antd';

import { ButtonCreateEvent, DeleteMsg } from './styles';

import Header from '../../components/Header';

import { database } from '../../config/firebase';

import {
  newEventRequest,
  removeEventRequest,
  getEventRequest
} from '../../store/modules/event/actions';

import history from '../../services/history';

const { confirm } = Modal;
const { Content } = Layout;

export default function Events() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterOptions = { keys: ['name', 'location'] };
  const fuse = new Fuse(events, filterOptions);

  useEffect(() => {
    async function loadEvents() {
      const eventsRef = database.ref('events');
      eventsRef
        .orderByChild('createdBy')
        .equalTo(user.uid)
        .on('value', snapshot => {
          const arr = Object.entries(snapshot.val() || {}).map(item => ({
            key: item[0],
            ...item[1]
          }));
          setEvents(arr);
          setFilteredEvents(arr);
          setLoading(false);
        });
    }
    loadEvents();
  }, []);

  function newEvent() {
    dispatch(newEventRequest());
  }

  function getEventDetails(event) {
    dispatch(getEventRequest(event));
  }

  function handleEdit(event) {
    dispatch(getEventRequest(event));
    history.push(`/events/${event.key}/edit`);
  }

  function handleDelete(event) {
    dispatch(removeEventRequest(event.key));
  }

  function filterEvents(e) {
    const result = fuse.search(e.target.value);
    if (result.length > 0) {
      setFilteredEvents(result);
    } else {
      setFilteredEvents(events);
    }
  }

  function showConfirm(event) {
    confirm({
      centered: true,
      title: (
        <span>
          Deseja excluir o evento <strong>{event.name}</strong>?
        </span>
      ),
      okText: 'Excluir',
      cancelText: 'Cancelar',
      content: (
        <DeleteMsg>
          CUIDADO: Isto também irá excluir todos os convidados cadastrados neste
          evento.
        </DeleteMsg>
      ),
      onOk() {
        handleDelete(event);
      },
      onCancel() {}
    });
  }

  const columns = [
    {
      title: 'Nome do Event',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      render: (name, event) => (
        <Link
          to={`/events/${event.key}/details`}
          onClick={() => getEventDetails(event)}
        >
          {name}
        </Link>
      )
    },
    {
      title: 'Local do Evento',
      dataIndex: 'location',
      key: 'location',
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Data do Evento',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Campos',
      dataIndex: 'options',
      key: 'options',
      render: options => (
        <div>
          {(options || 'name').split(',').map(o => (
            <Tag key={o} color="green">
              {o}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: 'Ação',
      key: 'action',
      align: 'center',
      render: event => {
        const menu = (
          <Menu>
            <Menu.Item onClick={() => handleEdit(event)}>
              <Icon type="edit" />
              Editar
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => showConfirm(event)}
              style={{ color: 'red' }}
            >
              <Icon type="delete" />
              Excluir
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
            <Button type="link" icon="more" />
          </Dropdown>
        );
      }
    }
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '40px 0'
              }}
            >
              <Link to="/events/new">
                <ButtonCreateEvent
                  icon="plus-circle"
                  loading={loading}
                  onClick={newEvent}
                >
                  Criar novo evento
                </ButtonCreateEvent>
              </Link>
              <Input
                size="large"
                placeholder="Pesquisar por nome do evento"
                onChange={filterEvents}
              />
            </div>
            <h2>Lista de Eventos</h2>
            <Table
              size="small"
              dataSource={filteredEvents}
              columns={columns}
              loading={loading}
              locale={{
                emptyText: <span>Nenhum evento cadastrado.</span>
              }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
